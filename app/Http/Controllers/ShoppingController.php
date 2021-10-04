<?php

namespace App\Http\Controllers;

use App\Address;
use App\Cart;
use App\City;
use App\DiscountCode;
use App\GiftCart;
use App\Jobs\SaveSaleStatisticJob;
use App\Lib\Mobile_Detect;
use App\Mail\SendOrderFactorToCustomerMail;
use App\Order;
use App\OrderDiscount;
use App\OrderInfo;
use App\OrderingTime;
use App\OrderProduct;
use App\Province;
use App\SaleStatistic;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class ShoppingController extends Controller
{

    protected $view = '';

    public function __construct()
    {
        $detect = new Mobile_Detect();
        if ($detect->isMobile() || $detect->isTablet()) {
            $this->view = 'mobile.';
        }
    }

    public function showShipping()
    {
        Session::forget('giftId');
        Session::forget('giftValue');
        Session::forget('discountValue');
        Session::forget('discountCode');

        $cart_count = Cart::getCartCount();
        $address_list = auth()->user()->address()->with(['province', 'city'])->get();
        return view($this->view . 'shopping.set-data', compact('address_list', 'cart_count'));
    }

    public function getProvinces()
    {
        $provinces = Province::orderBy('name', 'ASC')->get();
        return $provinces;
    }

    public function getCities(Request $request)
    {
        $cities = City::where('province_id', $request->province_id)->orderBy('name', 'ASC')->get();
        return $cities;
    }

    public function getSendData(Request $request)
    {
        $cityId = $request->city_id;
        if ($cityId) {
            $sendData = new OrderingTime($cityId);
            return $sendData->getGlobalSendData();
        } else {
            return 'error';
        }
    }

    public function payment(Request $request)
    {
        if (Session::has('giftValue')) {
            Session::forget('giftValue');
        }
        if (Session::has('discountValue')) {
            Session::forget('discountValue');
        }
        $userId = auth()->id();
        $addressId = $request->get('address_id');
        $isNormalSend = $request->get('is_normal_send');
        Session::put('address_id', $addressId);
        $send_type = $isNormalSend == 'true' ? Order::NORMAL_SEND : Order::FAST_SEND;
        Session::put('send_type', $send_type);

        if (Cart::getCartCount() > 0) {
            $address = Address::where(['id' => $addressId, 'user_id' => $userId])->first();
            $orderingTime = new OrderingTime($address->city_id);
            $cartData = $orderingTime->getGlobalSendData();

            //سشن برای استفاده در متد setGift و دسترسی داشتن به مبلغ نهایی کارت
            $cartFinalPrice = $isNormalSend == 'true' ? $cartData['cart_price_with_normal_send'] : $cartData['cart_price_with_fast_send'];
            Session::put('cart_final_price', $cartFinalPrice);

            return view($this->view . 'shopping.payment', compact('cartData', 'address', 'isNormalSend'));
        } else {
            return redirect('/');
        }
    }

    public function orderPayment()
    {

        $addressId = Session::get('address_id');
        $address = Address::where(['id' => $addressId, 'user_id' => auth()->id()])->first();
        if ($address) {
            $orderingTime = new OrderingTime($address->city_id);
            $globalSendData = $orderingTime->getGlobalSendData();
            if ($globalSendData) {
                DB::beginTransaction();
                try {
                    $newOrder = Order::createNewOrder($globalSendData, $addressId);
                    OrderDiscount::createOrderDiscount($newOrder);
                    OrderProduct::createOrderProducts($globalSendData, $newOrder);
                    OrderInfo::createNewOrderInfo($globalSendData, $newOrder);
                    DB::commit();
                    //حذف می کنیم تا با برگشت به صفحه قبل موجود نباشد
                    Session::forget('giftId');
                    Session::forget('giftValue');
                    Session::forget('discountValue');
                    Session::forget('discountCode');
                } catch (\Exception $e) {
                    DB::rollBack();
                    throw $e;
                }
            }
        } else {
            //اگر آدرس انتخاب نشده بود
            return redirect('shipping');
        }
    }

    public function orderVerify()
    {
        try {
            DB::beginTransaction();
            $orderId = 94;

            //اگر در خرید از کارت هدیه استفاده کردیم باید اعتبار کارت هدیه را آپدیت کنیم
            if (Session::has('giftValue') && Session::get('giftValue') > 0) {

                $giftCart = GiftCart::where('id', Session::get('giftId'))->first();

                if ($giftCart) {
                    $giftCart->credit_used = Session::get('giftValue') + $giftCart->credit_used;
                    $giftCart->update();
                }
                Session::forget('giftId');
                Session::forget('giftValue');
                Session::forget('discountValue');
                Session::forget('discountCode');
            }
            $order = Order::where(['id' => $orderId])->with(['getOrderProducts', 'getOrderInfo', 'getAddress'])->firstOrFail();

            //یک صف برای ذخیره آمار فروش در سه جدول فروش کل، فروش فروشنده و فروش محصول
            SaveSaleStatisticJob::dispatch($order);
            //ارسال فاکتور سفارش به کاربر
            if (!empty($order->getUserInfo->email)) {
                Mail::to($order->getUserInfo->email)->queue(new SendOrderFactorToCustomerMail($order));
            }

            $order->pay_status = Order::PAY_STATUS_OK;
            $order->update();
            OrderInfo::where('order_id', $orderId)->update(['send_status' => Order::SEND_STATUS_OK]);
            OrderProduct::where('order_id', $orderId)->update(['send_status' => Order::SEND_STATUS_OK]);
            $orderStatuses = Order::SEND_STATUSES;

            DB::commit();
            return view('shopping.verify', compact('order', 'orderStatuses'));
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }


    }

    public function setGift(Request $request)
    {
        $giftCode = $request->get('code');
        $gift = GiftCart::where('code', $giftCode)->first();
        if ($gift) {
            $remaining = $gift->cart_credit - $gift->credit_used;
            //اگر کارت دارای اعتبار بود
            if ($remaining > 0) {
                //در حالت عادی از تمام اعتبار کارت استفاده می کنیم اما اگر هزینه سفارش از اعتبار کارت کمتر بود به میزان سفارش از اعتبار ور می داریم
                $valueToUse = $remaining;
                $finalPrice = Session::get('cart_final_price');
                if ($finalPrice < $valueToUse) {
                    $valueToUse = $finalPrice;
                }

                $cartFinalWithGiftCart = $finalPrice - $valueToUse;

                if (!Session::has('giftValue')) {
                    //محاسبه مجدد هزینه نهایی کارت تا از آن در صورت وجود کد تخفیف استفاده کنیم
                    Session::put('cart_final_price', $cartFinalWithGiftCart);
                }

                Session::put('giftId', $gift->id);
                Session::put('giftValue', $valueToUse);
                return [
                    'status' => 'success',
                    'giftValue' => $valueToUse,
                    'cartFinalWithGiftCart' => $cartFinalWithGiftCart
                ];
            } else {
                return 'اعتبار کارت هدیه به پایان رسیده است';
            }
        } else {
            return 'کد کارت هدیه نادرست است';
        }
    }

    public function setDiscount(Request $request)
    {
        $discounts = DiscountCode::where('code', $request->code)
            ->where('expire_time', '>=', time())
            ->get();
        $cart = Cart::showCart();
        return DiscountCode::setDiscount($discounts);
    }
}
