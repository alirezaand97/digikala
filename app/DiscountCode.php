<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Session;

class DiscountCode extends Model
{
    use SoftDeletes;
    protected $table = 'discount_codes';
    protected $fillable = ['code', 'category_id', 'min_order_price', 'discount_value', 'discount_percent', 'number_usable', 'expire_time', 'incredible_offers_allowable'];

    public static function getData($request)
    {
        $url = '?';
        $discounts = DiscountCode::with('getCategory')->orderBy('id', 'DESC');

        if (in_trashed($request)) {
            $discounts = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search'] != '') {
            $searchVal = $_GET['search'];
            $discounts->withTrashed()->where('code', 'like', '%' . $searchVal . '%');
        }

        $discounts = $discounts->paginate(10);
        $discounts = $discounts->withPath($url);
        return $discounts;
    }

    public function getCategory()
    {
        return $this->hasOne(Category::class, 'id', 'category_id')->withDefault(['name' => 'دسته اصلی']);
    }

    public static function setDiscount($discounts)
    {
        $cartPrice = Session::get('cartPrice');
        $cartData = Cart::showCart();
        $discountsArray = array();//تخفیف ها به ازای هر دسته بندی
        $priceOfAllCatsArray = array();//هزینه مجموع تمام دسته بندی ها. این هزینه از هزینه کارت کم می شود تا تخفیف خود کارت را حساب کنیم برای بدون دسته بندی
        $discountInfo = array();
        foreach ($discounts as $discount) {
            $categoryId = $discount->category_id;
            if ($categoryId > 0) {
                $priceOfAllCatsArray = DiscountCode::getPriceOfCatProducts($priceOfAllCatsArray, $cartData, $categoryId);
                $priceOfCatProducts = $priceOfAllCatsArray[$categoryId];
                $result = DiscountCode::setDiscountValue($discount, $priceOfCatProducts);
                if ($result['status'] == 'ok') {
                    $discountsArray = DiscountCode::setMostDiscountPerCat($discountsArray, $result['discountPrice'], $categoryId);
                    $discountInfo[$categoryId] = [
                        'category_id' => $discount->category_id,
                        'min_order_price' => $discount->min_order_price,
                        'discount_price' => $discount->discount_value,
                        'discount_percent' => $discount->discount_percent,
                        'price'=>$priceOfCatProducts
                    ];
                }
            }
        }

        $priceOfAllCats = DiscountCode::getPriceOfAllCats($priceOfAllCatsArray); //هزینه تمام دسته بندی ها. این هزینه از هزینه کارت کسر و بعد تخفیف کارت محاسبه می شود

        //اول باید تخفیف دسته ها را محاسبه کنیم. بعد قیمت محصولات دسته ها را از هزینه کارت کم کنیم بعد بررسی کنیم کارت شامل تخفیف می شود یا خیر
        $cartPrice = $cartPrice - $priceOfAllCats;
        foreach ($discounts as $discount) {
            $categoryId = $discount->category_id;
            if ($categoryId == 0) {
                $result = DiscountCode::setDiscountValue($discount, $cartPrice);
                if ($result['status'] == 'ok') {
                    $discountsArray = DiscountCode::setMostDiscountPerCat($discountsArray, $result['discountPrice'], $categoryId);
                    $discountInfo[$categoryId] = [
                        'category_id' =>$categoryId,
                        'min_order_price' => $discount->min_order_price,
                        'discount_price' => $discount->discount_value,
                        'discount_percent' => $discount->discount_percent,
                        'price'=>$cartPrice
                    ];
                }
            }
        }
        //تخفیفی که در نهایت لحاظ می شود
        $sumOfAllDiscounts = DiscountCode::getSumOfAllDiscount($discountsArray);
        if ($sumOfAllDiscounts > 0) {
            Session::put('discountsInfoArray', $discountInfo);
            Session::put('discountValue', $sumOfAllDiscounts);
            Session::put('discountCode', $discounts[0]->code);

            $cartFinalPrice = Session::get('cart_final_price');
            $cartFinalPriceWithDiscount = $cartFinalPrice - $sumOfAllDiscounts;
            if (!Session::has('discountValue')) {
                //محاسبه مجدد هزینه نهایی کارت تا از آن در صورت وجود کارت هدیه استفاده کنیم
                Session::put('cart_final_price', $cartFinalPriceWithDiscount);
            }

            return [
                'status' => 'success',
                'discountValue' => $sumOfAllDiscounts,
                'cartFinalPriceWithDiscount' => $cartFinalPriceWithDiscount
            ];
        } else {
            return 'امکان استفاده از این تخفیف برای محصولات موجود در سبد خرید شما وجود ندارد';
        }
    }

    /**
     * محاسبه میزان تخفیف که آیا بر اساس مبلغ است یا درصد.
     * میزان تخفیف بر اساس قیمت دسته مورد تخفیف قرار گرفته تعیین میشود
     */
    public static function setDiscountValue($discount, $priceToCalcDis)
    {
        if ($priceToCalcDis > 0) {//سبد خرید هزینه ای داشت
            if ($priceToCalcDis > $discount->min_order_price) {//اگر هزینه سبد از کف قیمت مجاز برای استفاده از تخفیف بیشتر بود
                $discountPrice = 0; //میزان تخفیفی که به دست می اید
                if (!empty($discount->discount_value)) {//تخفیف دارای مبلغ است یا درصد
                    $discountPrice = $discount->discount_value;
                } elseif (!empty($discount->discount_percent)) {
                    $discountPrice = ($priceToCalcDis * $discount->discount_percent) / 100;
                }
                return [
                    'status' => 'ok',
                    'discountPrice' => $discountPrice,
                ];
            }
        }

    }

    /**
     * در صورت داشتن چندین تخفیف با کد یکسان، بیشترین تخفیف باید برای دسته موردنظر لحاظ شود
     */
    public static function setMostDiscountPerCat($discountsArray, $discountPrice, $categoryId)
    {
        if (array_key_exists($categoryId, $discountsArray)) { //اگر از پیش برای این دسته تخفیفی داشتیم
            if ($discountPrice > $discountsArray[$categoryId]) { //اگر تخفیف فعلی بیشتر از تخفیف قبلی برای این دسته ان را جایگزین کن وگرنه هیچ تاثیری ندارد
                $discountsArray[$categoryId] = $discountPrice;
            }
        } else {
            $discountsArray[$categoryId] = $discountPrice;
        }
        return $discountsArray;
    }

    /**
     * محاسبه قیمت کل دسته بندی ای که شامل تخفیف شده
     */
    public static function getPriceOfCatProducts($priceOfAllCatsArray, array $cartData, $categoryId)
    {
        $priceOfCatProducts = 0;
        foreach ($cartData['product_data'] as $product) {
            if ($product['category_id'] == $categoryId) {
                $priceOfCatProducts += $product['price2'];
            }
        }
        $priceOfAllCatsArray[$categoryId] = $priceOfCatProducts;
        return $priceOfAllCatsArray;
    }

    /**
     * اگر به ازای هر دسته یک تخفیف داشته باشیم و تخفیف کل سبد هم هستش پس باید بیشترین مقدار رو به عنوان تخفیف برگردونیم
     * یک تخفیف کلا لحاظ میشه
     */
    public static function getSumOfAllDiscount($discountsArray)
    {
        $sumOfAllDiscounts = 0;
        foreach ($discountsArray as $disPrice) {
            $sumOfAllDiscounts = $sumOfAllDiscounts + $disPrice;
        }
        return $sumOfAllDiscounts;
    }

    public static function getPriceOfAllCats($priceOfAllCatsArray)
    {
        $priceOfAllCats = 0;
        foreach ($priceOfAllCatsArray as $catPrice) {
            $priceOfAllCats = $priceOfAllCats + $catPrice;
        }
        return $priceOfAllCats;
    }
}
