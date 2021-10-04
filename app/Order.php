<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Session;

class Order extends Model
{
    use SoftDeletes;
    protected $table = 'orders';
    protected $fillable = ['date', 'user_id', 'address_id', 'pay_status', 'total_price', 'price', 'order_code', 'pay_code1', 'pay_code2', 'order_read', 'send_type', 'discount_code', 'discount_value', 'gift_value', 'gift_id'];
    //pay status
    const PAY_STATUS_AWAITING_PAYMENT = 'awaiting_payment';
    const PAY_STATUS_OK = 'ok';
    //seller read
    const ORDER_READ_NO = 'no';
    //type of send
    const NORMAL_SEND = 'normal_send';
    const FAST_SEND = 'fast_send';
    //send status
    const SEND_STATUS_CONNECT_ERROR = -2;
    const SEND_STATUS_CANCELED = -1;
    const SEND_STATUS_PENDING = 0;
    const SEND_STATUS_OK = 1;
    const SEND_STATUS_PREPARATION = 2;
    const SEND_STATUS_EXIT_PROCESS_CENTER = 3;
    const SEND_STATUS_DELIVERY_POST = 4;
    const SEND_STATUS_DELIVERY_CUSTOMER = 6;
    const SEND_STATUSES = [
        -2 => 'خطا در اتصال به درگاه پرداخت',
        -1 => 'لغو شده',
        0 => 'در انتظار پرداخت',
        1 => 'تایید سفارش',
        2 => 'آماده سازی سفارش',
        3 => 'خروج از مرکز پردازش',
        4 => 'تحویل به پست',
        5 => 'دریافت از مرکز مبادلات کالا',
        6 => 'تحویل به مشتری',
    ];
    //pay status
    const PAY_STATUS = ['awaiting_payment' => 'در انتظار پرداخت', 'ok' => 'پرداخت شده', 'others' => 'خطا در اتصال به درگاه پرداخت'];
    const PAY_STATUS_COLOR = ['awaiting_payment' => 'light', 'ok' => 'primary', 'others' => 'warning'];
    //order read
    const ORDER_READ = 'ok';
    const ORDER_NOT_RED = 'no';

    protected $dateFormat = 'U';

    public static function createNewOrder($globalSendData, $addressId)
    {
        $orderCode = substr(time(), 0, 5) . auth()->id() . substr(time(), 5, 10);
        $sendType = Session::get('send_type');
        $jdf = new Jdf();
        $date = $jdf->tr_num($jdf->jdate('Y-n-j'));
        //هزینه های زیر با احتساب کارت هدیه است
        $cartPrice = $sendType == Order::NORMAL_SEND
            ? $globalSendData['cart_price_with_normal_send']
            : $globalSendData['cart_price_with_fast_send'];

        $totalPrice = $sendType == Order::NORMAL_SEND
            ? $globalSendData['cart_price_with_normal_send'] + $globalSendData['normal_send_price']
            : $globalSendData['cart_price_with_normal_send'] + $globalSendData['fast_send_price'];

        //هزینه کل بدون احتساب کارت هدیه و کد تخفیف است و این مبالغ که قبلا از کل کم شده اند باید به آن اضافه شوند
        $totalPrice = $totalPrice + Session::get('giftValue', 0) + Session::get('discountValue', 0);
        $newOrder = Order::create([
            'date' => $date,
            'user_id' => auth()->id(),
            'address_id' => $addressId,
            'pay_status' => self::PAY_STATUS_AWAITING_PAYMENT,
            'order_read' => self::ORDER_READ_NO,
            'order_code' => $orderCode,
            'send_type' => $sendType,
            'total_price' => $totalPrice,
            'price' => $cartPrice
        ]);
        if (Session::has('giftValue')) {
            $newOrder->gift_value = Session::get('giftValue');
            $newOrder->gift_id = Session::get('giftId');
        }
        if (Session::has('discountValue')) {
            $newOrder->discount_value = Session::get('discountValue');
            $newOrder->discount_code = Session::get('discountCode');
        }


        if ($newOrder->save()) {
            return $newOrder;
            //TODO: در این قسمت باید اطلاعات ثبت سفارش هم بر گردانده شود در زمان پرداخت
        }
    }


    public static function getData($request)
    {
        $url = '?';
        $order = Order::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $order = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (array_key_exists('user_id', $request->all())) {
            $order->where(['user_id' => $request->user_id]);
            $url = create_paginate_url($url, 'user_id=' . $request->user_id);
        }
        if (isset($_GET['order_code']) && $_GET['order_code'] != '') {
            $order->where(['order_code' => $request->order_code]);
            $url = create_paginate_url($url, 'order_code=' . $request->order_code);
        }
        if (isset($_GET['start_date']) && $_GET['start_date'] != '') {
            $startDate = get_timestamp_from_jalali($request->start_date, true);
            $order->where('created_at', '>=', $startDate);
            $url = create_paginate_url($url, 'start_date=' . $request->order_code);
        }
        if (isset($_GET['end_date']) && $_GET['end_date'] != '') {
            $startDate = get_timestamp_from_jalali($request->end_date, false);
            $order->where('created_at', '<=', $startDate);
            $url = create_paginate_url($url, 'end_date=' . $request->order_code);
        }


        $order = $order->paginate(10);
        $order = $order->withPath($url);
        return $order;
    }


    public static function orderChartData()
    {

        //jdate به فارسی بر می گرداند
        //tr_num حاصل را به انگلیسی نمایش می دهد
        $jdf = new Jdf();
        $firstOfMonth = $jdf->tr_num($jdf->jdate('Y/n')) . '/1';
        $firsOftMonthTime = get_timestamp_from_jalali($firstOfMonth, true);
        $year = $jdf->tr_num($jdf->jdate('Y'));
        $month = $jdf->tr_num($jdf->jdate('n'));
        $lastDayOfMonth = $jdf->tr_num($jdf->jdate('t'));

        $dateArray = [];
        $countArray = [];
        $priceArray = [];

        for ($i = 0; $i <= $lastDayOfMonth; $i++) {
            $dateArray[$i] = $year . '-' . $month . '-' . $i;
        }

        $orders = Order::where('pay_status', Order::PAY_STATUS_OK)->where('created_at', '>', $firsOftMonthTime)->get();

        foreach ($orders as $order) {
            if (array_key_exists($order->date, $priceArray)) {
                $countArray[$order->date] = $countArray[$order->date] + 1;
                $priceArray[$order->date] = $priceArray[$order->date] + $order->price;
            } else {
                $countArray[$order->date] = 1;
                $priceArray[$order->date] = $order->price;
            }
        }

        $datesString = '';
        $priceString = '';
        $countString = '';
        //در هhightchart داده ها را باید به فرمت رشته ای زیر بدهیم
        foreach ($dateArray as $date) {
            $datesString .= "'$date',";

            if (array_key_exists($date, $priceArray)) {
                $priceString .= "$priceArray[$date],";
            } else {
                $priceString .= "0,";
            }

            if (array_key_exists($date, $countArray)) {
                $countString .= "$countArray[$date],";
            } else {
                $countString .= "0,";
            }
        }

        return [
            'datesString' => $datesString,
            'priceString' => $priceString,
            'countString' => $countString
        ];
    }

    public function getOrderProducts()
    {
        return $this->hasMany(OrderProduct::class, 'order_id', 'id')
            ->with(['getProduct', 'getWarranty', 'getColor']);
    }

    public function getOrderProductsWithProducts()
    {
        return $this->hasMany(OrderProduct::class, 'order_id', 'id')
            ->with(['getProduct']);
    }

    public function getOrderProductsNoRel()
    {
        return $this->hasMany(OrderProduct::class, 'order_id', 'id');
    }

    public function getOrderInfo()
    {
        return $this->hasMany(OrderInfo::class, 'order_id', 'id');
    }

    public function getAddress()
    {
        return $this->hasOne(Address::class, 'id', 'address_id')
            ->with(['province', 'city'])->withTrashed();
    }

    public function getOrderDiscounts()
    {
        return $this->hasMany(OrderDiscount::class, 'order_id', 'id');
    }

    public function getUserInfo()
    {
        return $this->hasOne(AdditionalInfo::class, 'user_id', 'user_id')
            ->withDefault(['email' => '']);
    }


    //region getter and setter
    function getCreatedAtAttribute($value)
    {
        return $value;
    }
    //endregion  getter and setter

}
