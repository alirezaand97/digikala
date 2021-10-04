<?php


namespace App;


use Illuminate\Support\Facades\Session;

class OrderingTime
{
    protected $cityId; //شهر مقصد
    protected $send_time = 0;
    protected $send_price = 0;
    protected $min_order_price = 0;
    protected $cart_product_data = array(); //آرایه ای از محصولات
    protected $cart_price = 0; //هزینه قابل پرداخت کارت
    protected $send_days = array();
    protected $product_id_array = array();
    protected $product_warranty_id_array = array();
    protected $product_colors_array = array();
    protected $warranty_id_array = array();
    protected $order_price_by_fast_sending = array();
    protected $minDays = array();//حداقل زمانی که ارسال طول می کشد
    protected $maxDays = array();// حداکیر زمانی که طول می کشد
    protected $maxDaysTimestamp = array();
    protected $minDaysTimestamp = array();
    protected $minDayslabels = array();
    protected $maxDayslabels = array();
    const maxDelay = 3;
    protected $cart_discount = 0;
    protected $total_price = 0;
    protected $fast_send_price = 0;
    protected $fast_send_price_label = 0;
    protected $normal_send_days = 0;

    public function __construct($cityId)
    {
        $this->cityId = $cityId;
    }

    /**
     * اگر شهر مقصد اطلاعات ارسال خاص خود را داشت اطلاعات ارسال آن را نگه می داریم
     * اگر اطلاعات خاص نداشت از اطلاعات عمومی که در تنظیمات مشخص شده استفاده می کنیم
     */

    public function getGlobalSendData()
    {
        $city = City::where('id', $this->cityId)->first();
        if ($city && !empty($city->send_time) && !empty($city->send_price) && !empty($city->min_order_price)) {
            $this->send_time = $city->send_time;
            $this->send_price = $city->send_price;
            $this->min_order_price = $city->min_order_price;
        } else {
            $setting = new Setting();
            $globalSendData = $setting->getData(['send_time', 'send_price', 'min_order_price']);
            settype($globalSendData['send_time'], 'integer');
            settype($globalSendData['send_price'], 'integer');
            settype($globalSendData['min_order_price'], 'integer');
            $this->send_time = $globalSendData['send_time'];
            $this->send_price = $globalSendData['send_price'];
            $this->min_order_price = $globalSendData['min_order_price'];
        }
        return $this->getCartData();
    }

    public function getCartData()
    {
        $cart = Cart::showCart();
        foreach ($cart['product_data'] as $product) {
            $productKey = $product['product_id'] . '_' . $product['product_warranty_id'];
            //آرابه ای از محصولات با کلیدی ترکیبی از محصول و تنوع قیمت آن
            $this->cart_product_data[$productKey] = $product;
            //قیمت قابل پرداخت کارت
            $this->setFastSendingTime($product);
        }
        $this->cart_discount = $cart['cart_discount'];
        $this->total_price = $cart['total_price'];
        $this->cart_price = $cart['cart_price'];
        $array = array();
        $array['delivery_order_interval'] = $this->get_delivery_order_interval();
        if ($this->cart_price < $this->min_order_price) {
            $array['normal_send_price'] = $this->send_price;
            $array['normal_send_price_label'] = $this->send_price;
        } else {
            $array['normal_send_price'] = 0;
            $array['normal_send_price_label'] = 'رایگان';
        }
        $array['send_days'] = $this->send_days;
        $array['cart_discount'] = $this->cart_discount;
        $array['total_price'] = $this->total_price;
        $array['cart_price'] = $this->cart_price;

        Session::put('cartPrice', $array['cart_price']);

        //اگر کارت هدیه داریم باید در هزینه نهایی لحاظ کنیم
        $giftValue = Session::get('giftValue', 0);
        if ($giftValue && $giftValue > 0) {
            $array['cart_price'] = $array['cart_price'] - $giftValue;
        }

        $discountValue = Session::get('discountValue', 0);
        if ($discountValue && $discountValue > 0) {
            $array['cart_price'] = $array['cart_price'] - $discountValue;
        }
        $array['fast_send_price'] = $this->fast_send_price;
        $array['fast_send_price_label'] = $this->fast_send_price_label;
        $array['cart_price_with_fast_send'] = $array['cart_price'] + $array['fast_send_price'];
        $array['cart_price_with_normal_send'] = $array['cart_price'] + $array['normal_send_price'];


        $array['product_id_array'] = $this->product_id_array;
        $array['cart_product_data'] = $this->cart_product_data;
        $array['product_warranty_id_array'] = $this->product_warranty_id_array;
        $array['product_colors_array'] = $this->product_colors_array;
        $array['warranty_array'] = $this->warranty_id_array;
        $array['normal_min_send_day'] = $this->normal_min_send_day();
        $array['normal_max_send_day'] = $this->normal_max_send_day();
        $array['normal_send_day'] = $this->normal_send_days;


        return $array;
    }

    public function setFastSendingTime($product)
    {
        $productSendTime = $product['send_time'];
        $sendStatusCol = collect($this->send_days);
        $hasProductInThatDay = $sendStatusCol->search($productSendTime); //اگر در آرایه وجود نداشت false و اگر داشت کلید آن را می دهد
        if ($hasProductInThatDay === false) {
            //اگر در زمان ارسال یک محصول، محصولات دیگری هم داشتیم این محصول را به ان زمان اضافه می کنیم
            $this->product_id_array[sizeof($this->send_days)][$product['product_warranty_id']] = $product['product_id'];
            $this->product_warranty_id_array[sizeof($this->send_days)][$product['product_warranty_id']] = $product['product_warranty_id'];
            $this->warranty_id_array[sizeof($this->send_days)][$product['warranty_id']] = $product['warranty_id'];
            $this->product_colors_array[sizeof($this->send_days)][$product['color_id']] = $product['color_id'];
            $this->order_price_by_fast_sending[sizeof($this->send_days)] = $product['price2'];
            $this->send_days[sizeof($this->send_days)] = $productSendTime;
        } else {
            //اگر در یک روز محصولی برای ارسال نداشتیم برای ان یک ایندکس می سازیم که یعنی در این روز جدید هم ارسال دارریم
            $this->product_id_array[$hasProductInThatDay][$product['product_warranty_id']] = $product['product_id'];
            $this->product_warranty_id_array[$hasProductInThatDay][$product['product_warranty_id']] = $product['product_warranty_id'];
            $this->warranty_id_array[$hasProductInThatDay][$product['product_warranty_id']] = $product['warranty_id'];
            $this->product_colors_array[$hasProductInThatDay][$product['product_warranty_id']] = $product['color_id'];
            //چون ایندکس همه بر اساس سایز روز ارسال است می توانیم بفهمیم در یک روز مشخص چه محصولاتی ارسال می شوند
            $this->order_price_by_fast_sending[$hasProductInThatDay] = $this->order_price_by_fast_sending[$hasProductInThatDay] + $product['price2'];

        }


    }

    public function get_delivery_order_interval()
    {
        $jdf = new Jdf();
        $send_price_and_days = array();
        foreach ($this->send_days as $index => $sendDay) {
            settype($sendDay, 'integer');
            $totalSendDay = $sendDay + $this->send_time; //تعداد روز اماده سازی را با تعداد روز ارسال به شهر مقصد جمع می کنیم تا زمان کل به دست بیاید
            $maxSendDay = $sendDay + OrderingTime::maxDelay;
            $this->minDays[$index] = $sendDay;
            $this->maxDays[$index] = $maxSendDay;
            $this->minDaysTimestamp[$index] = strtotime('+' . $sendDay . ' day');
            $this->maxDaysTimestamp[$index] = strtotime('+' . $maxSendDay . ' day');
            $this->minDayslabels[$index] = $jdf->jdate('j F', $this->minDaysTimestamp[$index]);
            $this->maxDayslabels[$index] = $jdf->jdate('j F', $this->maxDaysTimestamp[$index]);
            if ($sendDay > $this->normal_send_days) {
                $this->normal_send_days = $sendDay;
            }

            $send_price_and_days[$index] = ['minDayslabels' => $this->minDayslabels[$index], 'maxDayslabels' => $this->maxDayslabels[$index]];
            $send_price_and_days[$index]['send_time'] = $sendDay;
            if ($this->order_price_by_fast_sending[$index] < $this->min_order_price) {
                $send_price_and_days[$index]['send_fast_price'] = $this->send_price;
                $send_price_and_days[$index]['send_fast_price_number'] = $this->send_price;
                $this->fast_send_price = $this->fast_send_price + $this->send_price;
                $this->fast_send_price_label = $this->fast_send_price_label + $this->send_price;
            } else {
                $send_price_and_days[$index]['send_fast_price'] = "رایگان";
                $send_price_and_days[$index]['send_fast_price_number'] = 0;
            }
        }
        return $send_price_and_days;
    }

    public function normal_min_send_day()
    {
        $minDaysCollect = collect($this->minDays);
        $min = $minDaysCollect->min();
        $key = $minDaysCollect->search($min);
        return $this->minDayslabels[$key];
    }

    public function normal_max_send_day()
    {
        $maxDaysCollect = collect($this->maxDays);
        $max = $maxDaysCollect->max();
        $key = $maxDaysCollect->search($max);
        return $this->maxDayslabels[$key];
    }
}
