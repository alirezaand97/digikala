<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class OrderInfo extends Model
{
    protected $table = 'order_infos';
    protected $fillable = ['order_id', 'products_id', 'warranties_id', 'colors_id', 'send_status', 'delivery_order_interval', 'send_price', 'send_time'];

    public static function createNewOrderInfo(array $globalSendData, $newOrder)
    {
        $sendType = Session::get('send_type');
        $jdf = new Jdf();
        $hourToEndOfDay = 24 - $jdf->tr_num($jdf->jdate('H'));//ساعت تا پایان روز برای زمان اماده سازی زیرا از پایان روز محاسبه می کنیم
        if ($sendType == Order::NORMAL_SEND) {
            OrderInfo::create([
                'order_id' => $newOrder->id,
                'products_id' => self::getNormalProductsId($globalSendData),
                'warranties_id' => self::getNormalSendWIds($globalSendData),
                'colors_id' => self::getNormalSendColors($globalSendData),
                'send_status' => 0,
                'delivery_order_interval' => $globalSendData['normal_min_send_day'] . ' تا ' . $globalSendData['normal_max_send_day'],
                'send_price' => $globalSendData['normal_send_price'],
                'send_time' => time() + $globalSendData['normal_send_day'] * 86400 + $hourToEndOfDay * 3600
            ])->save();
        } else {
            foreach ($globalSendData['delivery_order_interval'] as $key => $order) {
                $sendTime = $order['send_time'];
                OrderInfo::create([
                    'order_id' => $newOrder->id,
                    'products_id' => self::getFastSendProductsId($globalSendData, $key),
                    'warranties_id' => self::getFastSendWIds($globalSendData, $key),
                    'colors_id' => self::getFastSendColors($globalSendData, $key),
                    'send_status' => 0,
                    'delivery_order_interval' => $order['minDayslabels'] . ' تا ' . $order['maxDayslabels'],
                    'send_price' => $order['send_fast_price_number'],
                    'send_time' => time() + $sendTime * 86400 + $hourToEndOfDay * 3600
                ])->save();
            }
        }
    }

    public static function getFastSendProductsId($globalSendData, $key)
    {
        $collection = collect($globalSendData['product_id_array'][$key]);
        $ids = $collection->implode('_');
        return $ids;
    }

    public static function getFastSendWIds($globalSendData, $key)
    {
        $collection = collect($globalSendData['warranty_array'][$key]);
        $ids = $collection->implode('_');
        return $ids;
    }

    public static function getNormalProductsId($globalSendData)
    {
        $productsId = '';
        $j = 1;
        foreach ($globalSendData['cart_product_data'] as $key => $product) {
            $productsId = $productsId . $product['product_id'];
            if ($j != sizeof($globalSendData['cart_product_data'])) {
                $productsId .= '_';
            }
            $j++;
        }
        return $productsId;

    }

    public static function getNormalSendWIds($globalSendData)
    {
        $warranty = '';
        $j = 1;
        foreach ($globalSendData['cart_product_data'] as $key => $product) {
            $warranty = $warranty . $product['warranty_id'];
            if ($j != (sizeof($globalSendData['cart_product_data']))) {
                $warranty .= '_';
            }
            $j++;

        }
        return $warranty;
    }

    private static function getNormalSendColors(array $globalSendData)
    {
        $productColors = '';
        $j = 1;
        foreach ($globalSendData['cart_product_data'] as $key => $product) {
            $productColors = $productColors . $product['color_id'];
            if ($j != (sizeof($globalSendData['cart_product_data']))) {
                $productColors .= '_';
            }
            $j++;

        }
        return $productColors;
    }

    private static function getFastSendColors(array $globalSendData, int $key)
    {
        $collection = collect($globalSendData['product_colors_array'][$key]);
        $ids = $collection->implode('_');
        return $ids;
    }

    public static function getData($request, $sendStatus, $orderBy)
    {

        $url = '?';
        //بر اساس زمان ارسال اولویت بندی می کنیم نه زمان ثبت سفارش
        $orderInfo = OrderInfo::orderBy('send_time', $orderBy);


        if (isset($_GET['submission_id']) && $_GET['submission_id'] != '') {
            $orderInfo->where(['id' => $request->submission_id]);
            $url = create_paginate_url($url, 'submission_id=' . $request->submission_id);
        }
        if ($sendStatus >= 1) {
            $orderInfo->where(['send_status' => $sendStatus]);
        }

        $orderInfo = $orderInfo->paginate(10);
        $orderInfo = $orderInfo->withPath($url);
        return $orderInfo;
    }

    public function getOrder()
    {
        return $this->hasOne(Order::class, 'id', 'order_id');
    }
}
