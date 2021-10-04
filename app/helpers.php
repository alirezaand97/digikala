<?php

use App\CatBrand;
use App\Category;
use App\Jdf;
use App\OrderProduct;
use App\ProductPrice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

if (!function_exists('get_url')) {
    function get_url($string)
    {
        $url = str_replace('-', ' ', $string);
        $url = str_replace('/', ' ', $url);
        $url = str_replace(' ', '-', $url);
        return $url;
    }
}

if (!function_exists('upload_file')) {
    function upload_file($request, $name, $directory, $unique = '')
    {
        if ($request->hasFile($name)) {
            $fileName = $unique . time() . '.' . $request->file($name)->getClientOriginalExtension();
            if ($request->file($name)->move('files/' . $directory, $fileName)) {
                return $fileName;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

if (!function_exists('in_trashed')) {
    function in_trashed($request)
    {
        if (!empty($request['trashed']) && $request['trashed'] == 'true') {
            return true;
        } else {
            return false;
        }
    }
}

if (!function_exists('create_paginate_url')) {
    function create_paginate_url($url, $additional)
    {
        if ($url === '?') {
            return $url . $additional;
        } else {
            return $url . '&' . $additional;
        }
    }

}

if (!function_exists('create_product_thumbnail')) {
    function create_product_thumbnail($image_path, $name)
    {
        //از تصویر آپلود شده در پوشه products یک thumb می سازیم و ذخیره می کنیم
        $thumb = \Intervention\Image\Facades\Image::make($image_path);
        $thumb->resize(350, 350);
        $thumb->save('files/thumbnails/' . $name);
    }

}


if (!function_exists('convert_keywords')) {
    function convert_keywords($keywords)
    {
        $keywords = str_replace(',', '،', $keywords);
        return $keywords;
    }

}

if (!function_exists('remove_file')) {
    function remove_file($image_path)
    {
        unlink($image_path);
    }

}


if (!function_exists('update_product_price')) {
    function update_product_price($product)
    {
        $productWarranty = \App\ProductWarranty::where('product_id', $product->id)->where('product_number', '>', 0)->orderBy('price2', 'ASC')->first();
        //کوتاه ترین زمان ارسال باید به عنوان زمان ارسال محصول لحاظ شود
        $productWarranty2 = \App\ProductWarranty::where('product_id', $product->id)->orderBy('send_time', 'ASC')->first();
        if ($productWarranty) {
            /**
             * اگر تنوع قیمیتی با کمترین قیمت و موجود پیدا کردیم قیمت را آپدیت می کنیم
             */
            if ($productWarranty->price1 > $productWarranty->price2) {
                $discount = $productWarranty->price1 - $productWarranty->price2;
                $product->discount_price = $discount;
            } else {
                $product->discount_price = 0;
            }
            $product->status = 1;
            $product->price = $productWarranty->price2;
            $product->ready_to_shipment = $productWarranty2->send_time;
            $product->update();

        } else {
            /**
             * اگر پیدا نکردیم وضعیت محصول را ناموجود می کنیم
             */
            $product->status = 0;
            $product->update();
        }
    }

}


if (!function_exists('add_min_product_price')) {
    function add_min_product_price($productWarranty)
    {
        /**
         * قیمت محصول را به جدول قیمت ها اضافه می کنیم تا بتوانیم نمودار تغییر قیمت بر اساس رنگ را پیاده سازی کنیم
         */
        /**
         * هر وقت یک تنوع قیمت وارد شود بررسی می شود که در آن روز کمترین قیمت است یا خیر. اگر کمترین قیمت آن روز بود اپدیت می شود در.
         */

        $productId = $productWarranty->product_id;
        $v = verta();
        $year = $v->year;
        $month = $v->month;
        $day = $v->day;
        $time = $v->timestamp;

        $alreadyHasRecord = ProductPrice::where(['year' => $year, 'month' => $month, 'day' => $day, 'product_id' => $productId, 'color_id' => $productWarranty->color_id])
            ->orderBy('price', 'ASC')->first();
        if ($alreadyHasRecord) {
            /**
             * اگر از پیش در این روز یک قیمتی ثبت شده تنها در صورتی که قیمت جدید از ان کمتر باشد ان را جایگزین می کنیم
             */
            if ($productWarranty->price2 < $alreadyHasRecord->price || $alreadyHasRecord->price == 0) {
                $alreadyHasRecord->price = $productWarranty->price2;
                $alreadyHasRecord->warranty_id = $productWarranty->id;
                $alreadyHasRecord->update();
            }
        } else {
            ProductPrice::create(['price' => $productWarranty->price2,
                'warranty_id' => $productWarranty->id,
                'time' => $time,
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'product_id' => $productId,
                'color_id' => $productWarranty->color_id])
                ->save();
        }
    }
}


if (!function_exists('check_has_product_warranty')) {
    function check_has_product_warranty($productWarranty)
    {
        /**
         * چک می کنیم که اگر تنوع قیمت دیگری دارد از ان برای قیمت گذاری جدید در product_price استفاده کند
         * اگر هم ندارد قیمت محصول را صفر کند
         */
        /**
         * در تنوع قیمت پارامتر مهم برای ما رنگ است
         */
        $replacePW = \App\ProductWarranty::where(['product_id' => $productWarranty->product_id, 'color_id' => $productWarranty->color_id])
            ->where('product_number', '>', 0)->orderBy('price2', 'ASC')->first();
        $newPrice = $replacePW ? $replacePW->price2 : 0;
        $newWid = $replacePW ? $replacePW->warranty_id : 0;
        $v = verta();
        $year = $v->year;
        $month = $v->month;
        $day = $v->day;
        $time = $v->timestamp;

        $product_price = ProductPrice::where(['year' => $year, 'month' => $month, 'day' => $day, 'product_id' => $productWarranty->product_id, 'color_id' => $productWarranty->color_id])
            ->first();
        if ($product_price) {
            //اگر در قیمت ها(مربوط به نمودار) در روز جاری قیمتی داشت
            $product_price->warranty_id = $newWid;
            $product_price->price = $newPrice;
            $product_price->update();

        } else {
            ProductPrice::create([
                'price' => $newPrice,
                'warranty_id' => $newWid,
                'time' => $time,
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'product_id' => $productWarranty->product_id,
                'color_id' => $productWarranty->color_id
            ])->save();
        }
    }
}


if (!function_exists('is_option_selected')) {
    function is_option_selected($list, $searchKyInList, $option, $isArray = false)
    {
        foreach ($list as $item) {
            if ($isArray) {
                if ($item == $option) {
                    return true;
                }
            } else {
                if ($item->$searchKyInList == $option) {
                    return true;
                }
            }


        }
    }
}

if (!function_exists('get_timestamp_from_jalali')) {
    /**
     * تبدیل تاریخ شمسی به تایم استمپ
     */
    function get_timestamp_from_jalali($date, $isFirst)
    {
        $jdf = new Jdf();
        $newDate = explode('/', $date);
        if (sizeof($newDate) == 3) {
            $year = $newDate[0];
            $month = $newDate[1];
            $day = $newDate[2];
        }
        if ($isFirst) {
            $time = $jdf->jmktime(0, 0, 0, $month, $day, $year);
        } else {
            $time = $jdf->jmktime(23, 59, 59, $month, $day, $year);
        }
        return $time;
    }
}


if (!function_exists('get_category')) {
    /**
     * دسته بندی ها ممکن است تا مدت طولانی تغییر نکنند پس لازم نیست هر بار از سرور دریافت شوند و می توانیم از بار اول در کش ذخیره و بعد ازش دریافت کنیم
     * هر تغییری که در دسته بندی ها اتفاق بیفتد یکبار فایل کش را حذف می کنیم تا تغییرات را دوباره دریافت کند
     */
    function get_category()
    {
        if (Cache::has('shop-category')) {
            $category = Cache::get('shop-category');
        } else {
            $category = Category::with('children.children.children')->where('parent_id', 0)->get();
            Cache::put('shop-category', $category, 2592000);
        }
        return $category;
    }
}

if (!function_exists('get_product_discount_price')) {
    function get_product_discount_price($price, $discount)
    {
        return 100 - round($price / ($price + $discount) * 100);
    }
}


if (!function_exists('get_product_dis_with_prices')) {
    function get_product_dis_with_prices($price, $old_price)
    {
        return 100 - round(($price / $old_price) * 100);
    }
}

if (!function_exists('is_color_in_product_warranty')) {
    function is_color_in_product_warranty($productWarranty, $colorId)
    {
        foreach ($productWarranty as $item) {
            if ($item->color_id == $colorId) {
                return true;
            }
        }
    }
}


if (!function_exists('first_color')) {
    function first_color($productWarranty, $colorId)
    {
        if (sizeof($productWarranty) > 0) {
            if ($productWarranty[0]->color_id == $colorId) {
                return true;
            }
        }
    }
}

if (!function_exists('get_first_color')) {
    function get_first_color($colors, $colorId)
    {
        foreach ($colors as $value) {
            if ($value->color_id == $colorId) {
                return $value;
            }
        }
    }
}

if (!function_exists('getFieldFromProductWarranty')) {
    function getFieldFromProductWarranty($productWarranty, $list, $filed)
    {
        foreach ($list as $item) {
            if ($productWarranty->$filed == $item->id) {
                return $item;
            }
        }
    }
}


if (!function_exists('get_shipment_price')) {
    function get_shipment_price($orderProducts, $orderInfo)
    {
        $productsId = explode('_', $orderInfo['products_id']);
        $warrantiesIds = explode('_', $orderInfo['warranties_id']);
        $colorsId = explode('_', $orderInfo['colors_id']);
        $orderInfoProducts = array();
        $orderInfoProducts['total_price'] = $orderInfo['send_price'];
        foreach ($productsId as $key => $value) {
            if (!empty($value)) {
                foreach ($orderProducts as $product) {
                    if ($product && $product['product_id'] == $value
                        && $product['warranty_id'] == $warrantiesIds[$key]
                        && $product['color_id'] == $colorsId[$key]) {
                        $pPrice = $product['product_price2'] * $product['product_count'];
                        $pDiscountPrice = ($product['product_price1'] - $product['product_price2']) * $product['product_count'];
                        $orderInfoProducts['total_price'] = $orderInfoProducts['total_price'] + $pPrice;
                        $orderInfoProducts['products'][$product['id']] = $product;
                    }
                }
            }
        }
        return $orderInfoProducts;
    }
}


if (!function_exists('update_order_info_products_status')) {
    function update_order_info_products_status($orderInfo, $status)
    {
        $productsId = explode('_', $orderInfo->products_id);
        $colorsId = explode('_', $orderInfo->colors_id);
        $warrantiesId = explode('_', $orderInfo->warranties_id);
        foreach ($productsId as $key => $pId) {
            OrderProduct::where([
                'order_id' => $orderInfo->order_id,
                'product_id' => $pId,
                'color_id' => $colorsId[$key],
                'warranty_id' => $warrantiesId[$key]
            ])->update(['send_status' => $status]);
        }
    }
}


if (!function_exists('update_cat_brands')) {
    function update_cat_brands($product, $productUpdated)
    {
        if ($productUpdated) {
            if ($productUpdated['cat_id'] !== $product->cat_id || $productUpdated['brand_id'] !== $product->brand_id) {
                remove_cat_brand($product->cat_id, $product->brand_id);
                add_or_update_cat_brand($productUpdated['cat_id'], $productUpdated['brand_id']);
            }

        } else {
            add_or_update_cat_brand($product->cat_id, $product->brand_id);
        }
    }
}

if (!function_exists('add_or_update_cat_brand')) {
    function add_or_update_cat_brand($catId, $brandId)
    {
        $alreadyExist = CatBrand::where(['cat_id' => $catId, 'brand_id' => $brandId])->first();
        if ($alreadyExist) {
            $alreadyExist->update([
                'product_number' => $alreadyExist->product_number + 1
            ]);
        } else {
            CatBrand::create([
                'cat_id' => $catId,
                'brand_id' => $brandId,
                'product_number' => 1
            ])->save();
        }
    }
}

if (!function_exists('remove_cat_brand')) {
    function remove_cat_brand($catId, $brandId)
    {
        $alreadyExist = CatBrand::where(['cat_id' => $catId, 'brand_id' => $brandId])->first();
        if ($alreadyExist && $alreadyExist->product_number > 1) {
            $alreadyExist->update([
                'product_number' => $alreadyExist->product_number - 1
            ]);
        } else {
            $alreadyExist->delete();
        }
    }
}

if (!function_exists('get_compare_products_id')) {
    function get_compare_products_id($data)
    {
        $i = 0;
        $array = array();
        if (is_array($data)) {
            foreach ($data as $value) {
                if (!empty($value)) {
                    $array[$i] = str_replace('dgk-', '', $value);
                    $i++;
                }
            }
            return $array;
        }
    }
}

if (!function_exists('get_product_spec')) {
    function get_product_spec($products, $key, $itemId)
    {
        $string = '';
        if (sizeof($products) > $key) {
            foreach ($products[$key]->specificationValue as $item) {
                if ($item->specification_id == $itemId) {
                    $string .= $item->value;
                }
            }
        }
        return $string;
    }
}

if (!function_exists('comment_get_item')) {
    function comment_get_item($items)
    {
        $string = '';
        foreach ($items as $item) {
            $string .= $item . '**';
        }
        return $string;
    }
}

if (!function_exists('sum_score')) {
    function sum_score($product, $scores)
    {
        $sum = $product->score;
        foreach ($scores as $score) {
            $sum += $score;
        }
        return $sum;
    }
}


if (!function_exists('get_comment_order_id')) {
    function get_comment_order_id($product, $userId)
    {
        define('productId', $product->id);
        $orderId = \App\Order::whereHas('getOrderProductsNoRel', function (\Illuminate\Database\Eloquent\Builder $query) {
            $query->where('product_id', productId);
        })
            ->where(['user_id' => $userId, 'pay_status' => \App\Order::PAY_STATUS_OK])
            ->select(['id'])->first();

        return $orderId;
    }
}


if (!function_exists('get_scores_info')) {
    function get_scores_info($scores)
    {
        $scoreArray = [
            ['label' => 'کیفیت ساخت', 'value' => $scores->score1, 'type' => get_score_value_type($scores->score1)],
            ['label' => 'نوآوری', 'value' => $scores->score2, 'type' => get_score_value_type($scores->score2)],
            ['label' => 'سهولت استفاده', 'value' => $scores->score3, 'type' => get_score_value_type($scores->score3)],
            ['label' => 'ارزش خرید نسبت به قیمت', 'value' => $scores->score4, 'type' => get_score_value_type($scores->score4)],
            ['label' => 'امکانات و قابلیت ها', 'value' => $scores->score5, 'type' => get_score_value_type($scores->score5)],
            ['label' => 'طراحی و ظاهر', 'value' => $scores->score6, 'type' => get_score_value_type($scores->score6)],
        ];
        return $scoreArray;
    }
}


if (!function_exists('get_score_value_type')) {
    function get_score_value_type($score)
    {
        $array = [
            0 => 'خیلی بد',
            1 => 'بد',
            2 => 'معمولی',
            3 => 'خوب',
            4 => 'عالی',
        ];

        return $array[$score];
    }
}


if (!function_exists('getAdditionalItem')) {
    function getAdditionalItem($infos, $attr1, $attr2 = null)
    {
        if ($infos && !empty($infos->$attr1)) {
            $data = $infos->$attr1;
            if ($attr2) {
                $data = $infos->$attr1 . ' ' . $infos->$attr2;
            }
            return $data;
        } else {
            return '-';
        }
    }
}


if (!function_exists('getUserData')) {
    function getUserData($infos, $attr)
    {
        if ($attr == 'mobile_phone') {
            return auth()->user()->mobile;
        }

        if ($infos) {
            if (!empty($infos->$attr)) {
                return $infos->$attr;
            }
        } else {
            return old($attr);
        }

    }
}


if (!function_exists('generate_active_code')) {
    function generate_active_code()
    {
        return rand(100000, 999999);
    }
}

if (!function_exists('getNewsletter')) {
    function getNewsletter($infos)
    {
        if ($infos) {
            if ($infos->newsletter === 'yes') {
                return 'بله';
            }
        }
        return 'خیر';
    }
}


if (!function_exists('accessChecked')) {
    function accessChecked($userAccess, $accessField, $accessItem)
    {
        $result = false;
        if ($userAccess) {
            if (property_exists($userAccess, $accessField)) {
                foreach ($userAccess->$accessField as $item) {
                    if ($item == $accessItem) {
                        $result = true;
                    }
                }
            }
        }

        return $result;
    }
}


if (!function_exists('check_user_access')) {
    function check_user_access($userAccess, $route)
    {
        $result = false;
        $userAccessList = json_decode($userAccess->access);
        $accessList = \App\UserAccess::ACCESS_LIST;

        if (is_object($userAccessList)) {
            foreach ($userAccessList as $accessName => $accessValue) {
                if (array_key_exists($accessName, $accessList)) {
                    $accessItem = $accessList[$accessName]['access'];

                    foreach ($accessValue as $accessValueItem) {
                        if (array_key_exists($accessValueItem, $accessItem)) {
                            if (array_key_exists('routes', $accessItem[$accessValueItem])) {
                                foreach ($accessItem[$accessValueItem]['routes'] as $routeName) {
                                    if ($routeName == $route) {
                                        $result = true;
                                    }
                                }
                            }

                        }

                    }
                }
            }
        }
        return $result;
    }
}

if (!function_exists('check_parent_menu_access')) {
    function check_parent_menu_access($menuItemAccess)
    {
        $result = false;
        $user = Auth::user();
        if ($user->role == 'admin') {
            $result = true;
        } else {
            $userAccess = \App\UserAccess::where('role_id', $user->role_id)->first();
            $userAccessList = json_decode($userAccess->access);
            $ex = explode('|', $menuItemAccess);
            if (sizeof($ex) > 0) {
                foreach ($ex as $item) {
                    if (array_key_exists($item, $userAccessList)) {
                        $result = true;
                    }
                }
            }

        }

        return $result;
    }
}


if (!function_exists('check_child_menu_access')) {
    function check_child_menu_access($menuItemAccess)
    {
        $result = false;
        $user = Auth::user();
        if ($user->role == 'admin') {
            $result = true;
        } else {
            $userAccess = \App\UserAccess::where('role_id', $user->role_id)->first();
            $userAccessList = json_decode($userAccess->access);
            $property = $menuItemAccess['access'];
            if (property_exists($userAccessList, $property)) {
                if (!array_key_exists('accessValue', $menuItemAccess)) {
                    $result = true;
                } else {
                    foreach ($userAccessList->$property as $item) {
                        if ($item == $menuItemAccess['accessValue']) {
                            $result = true;
                        }
                    }

                }
            }

        }

        return $result;
    }
}


if (!function_exists('calc_stockroom_product_count')) {
    function calc_stockroom_product_count($list)
    {
        $count = 0;
        foreach ($list as $item) {
            if (!empty($item)) {
                $e = explode('_', $item);
                if (sizeof($e) == 2) {
                    $a = $e[1];
                    settype($a, 'integer');
                    $count = $count + $a;
                }
            }
        }
        return $count;
    }
}

if (!function_exists('get_sale_report')) {
    function get_sale_report($table, $request, $selectedYear, $whereClause, $now)
    {
        $sales = [0 => 0, 1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0, 11 => 0, 12 => 0];
        $commissions = [0 => 0, 1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0, 11 => 0, 12 => 0];
        $statistics = DB::table($table)->where($whereClause)->get();

        $selectedYearSales = DB::table($table)->where($whereClause)->sum('price');
        $selectedYearCommission = DB::table($table)->where($whereClause)->sum('price');
        $totalSale = DB::table($table)->sum('price');
        $totalCommission = DB::table($table)->sum('price');

        foreach ($statistics as $item) {
            if (array_key_exists($item->month, $sales)) {
                $sales[$item->month] = $sales[$item->month] + $item->price;
            }

            if (array_key_exists($item->month, $commissions)) {
                $commissions[$item->month] = $commissions[$item->month] + $item->commission;
            }
        }

        $firstSale = DB::table($table)->first();
        $yearList = [];
        if ($firstSale && $firstSale->year != $now) {
            $firstSaleYear = $firstSale->year;
            settype($firstSaleYear, 'integer');
            $index = 0;
            for ($i = $firstSaleYear; $i <= $now; $i++) {
                $yearList[$index] = $i;
                $index++;
            }
        } else {
            $yearList[0] = $now;
        }

        return [
            'sales' => $sales,
            'commissions' => $commissions,
            'year_list' => $yearList,
            'selected_year' => $selectedYear,
            'total_sale' => $totalSale,
            'total_commission' => $totalCommission,
            'selected_sale' => $selectedYearSales,
            'selected_commission' => $selectedYearCommission,
        ];
    }
}


if (!function_exists('get_priceof_return_to_customer')) {
    function get_priceof_return_to_customer($catId, $discounts, $orderProduct)
    {
        //قیمت محصول
        $orderProductPrice = $orderProduct->product_count * $orderProduct->product_price2;
        foreach ($discounts as $discount) {
            $discountMinusProductPrice = $discount->total_price - $orderProductPrice; //هزینه محصول را از هزینه کل که شانمل تخفیف شده کم می کنیم تا ببینم هنوز شامل تخفیف می شود یا خیر

            if ($discount->cat_id == $catId) {

                if ($discountMinusProductPrice > $discount->min_order_price) {
                    if (!empty($discount->discount_percent)) {
                        //اگر تخفیف بر اساس درصد باشد از انجایی که قیمت کالای مرجوعی بر روی درصد تاثیر گذار بوده و باعث تخفیف بیشتر بوده باید درصد تخفیف کالا را از هزینه ای که مرجوع می کنیم کم کنیم
                        $discountOfProduct = ($discount->discount_percent * $orderProductPrice) / 100;
                        $orderProductPrice = $orderProductPrice - $discountOfProduct;
                    }
                    return $orderProductPrice; //اگر درصدی نبود و با کسر قیمت محصول باز هم به کف قیمت لازم برای تخفیف رسیدیم باید تمام هزینه را برگردانیم
                } else {
                    return $orderProductPrice - $discount->discount_value;//اگر به کف تخفیف نرسید هر چه تخفیف داده بودیم را پس می گیریم و بقیه را پرداخت می کنیم
                }
            } else if ($discount->cat_id == 0) {
                if ($discountMinusProductPrice > $discount->min_order_price) {
                    if (!empty($discount->discount_percent)) {
                        $discountOfProduct = ($discount->discount_percent * $orderProductPrice) / 100;
                        $orderProductPrice = $orderProductPrice - $discountOfProduct;
                    }
                    return $orderProductPrice;
                } else {
                    return $orderProductPrice - $discount->discount_value;
                }
            } else {
                return $orderProductPrice;
            }
        }

    }
}


if (!function_exists('is_image_file')) {
    function is_image_file($request, $key)
    {
        $imageType = ['png', 'jpeg', 'jpg', 'bmp', 'gif','svg'];
        $fileExtension = $request->file($key)->getClientOriginalExtension();
        if (in_array($fileExtension, $imageType)) {
            return true;
        }
        return false;
    }
}
