<?php

namespace App\Http\Controllers\Admin;

use App\Order;
use App\OrderInfo;
use App\OrderProduct;
use App\Stockroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Sodium\compare;

class OrderController extends AdminBaseController
{
    protected $model = '\App\Order';
    protected $routeName = 'orders';
    protected $modelName = 'سفارش';

    public function index(Request $request)
    {

        $orders = Order::getData($request);
        $trashed_count = Order::onlyTrashed()->count();
        return view('order.index', compact('orders', 'trashed_count', 'request'));
    }

    public function showOrder(Request $request)
    {
        $orderId = $request->order_id;
        $order = Order::where(['id' => $orderId])->with(['getOrderProducts', 'getOrderInfo', 'getAddress', 'getOrderDiscounts'])->firstOrFail();
        if ($order->order_read == Order::ORDER_READ_NO) {
            $order->order_read = Order::ORDER_READ;
            $order->update();
        }
        $orderStatuses = Order::SEND_STATUSES;

        return view('order.show', compact('order', 'orderStatuses'));
    }

    public function updateStatus(Request $request)
    {
        $orderInfoId = $request->order_info_id;
        $status = $request->status;
        $orderInfo = OrderInfo::where('id', $orderInfoId)->first();
        if ($orderInfo) {
            DB::beginTransaction();
            try {
                $orderInfo->update(['send_status' => $status]);
                update_order_info_products_status($orderInfo, $status);
                DB::commit();
                return 'success';
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } else {
            return 'error';
        }
    }

    public function submission(Request $request)
    {
        $submissions = OrderInfo::getData($request, 0, 'ASC');
        return view('order.submission', [
            'title' => 'همه ی مرسوله ها',
            'url' => 'admin/orders/submissions',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    public function submissionInfo(Request $request)
    {
        $orderInfo = OrderInfo::with(['getOrder.getAddress', 'getOrder.getOrderProducts'])->where('id', $request->id)->firstOrFail();
        $orderInfoStatuses = Order::SEND_STATUSES;
        return view('order.submission-info', compact('orderInfo', 'orderInfoStatuses'));
    }

    //انواع مرسوله ها از نظر وضعیت را می توانستیم توسط کویری استرینگ و تنها یک تابع هم انجام دهیم ولی از چند تابع استفاده کردیم تا سطح دسترسی لحاظ کنیم

    /**
     * مرسوله های تایید شده
     */
    public function submissionApproved(Request $request)
    {
        $submissions = OrderInfo::getData($request, 1, 'ASC');
        return view('order.submission', [
            'title' => 'مرسوله های تایید شده',
            'url' => 'admin/orders/submissions/approved',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    /**
     * مرسوله هایی که امروز باید برای ارسال آماده شوند
     */
    public function submissionToday(Request $request)
    {
        $submissions = OrderInfo::getData($request, 2, 'ASC');
        return view('order.submission', [
            'title' => 'مرسوله های امروز',
            'url' => 'admin/orders/submissions/today',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    /**
     * مرسوله هایی که اماده ارسال شده اند و باید به پست تحویل داده بشوند
     */
    public function submissionReady(Request $request)
    {
        $submissions = OrderInfo::getData($request, 3, 'ASC');
        return view('order.submission', [
            'title' => 'مرسوله های آماده ارسال',
            'url' => 'admin/orders/submissions/ready',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    /**
     * مرسوله هایی که به پست ارسال شده اند
     */
    public function submissionPostingSend(Request $request)
    {
        $submissions = OrderInfo::getData($request, 4, 'ASC');
        return view('order.submission', [
            'title' => 'مرسوله های ارسال شده به پست',
            'url' => 'admin/orders/submissions/posting/send',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    /**
     * مرسوله هایی که به پست ارسال شده اند
     */
    public function submissionPostingReceive(Request $request)
    {
        $submissions = OrderInfo::getData($request, 5, 'ASC');
        return view('order.submission', [
            'title' => 'مرسوله های آماده دریافت از پست',
            'url' => 'admin/orders/submissions/posting/receive',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    /**
     * مرسوله هایی که به مشتری ها تحویل داده شده اند
     */
    public function submissionDelivered(Request $request)
    {
        $submissions = OrderInfo::getData($request, 6, 'ASC');
        return view('order.submission', [
            'title' => 'مرسوله های تحویل داده شده به مشتری',
            'url' => 'admin/orders/submissions/delivered/customer',
            'submissions' => $submissions,
            'request' => $request
        ]);
    }

    public function submissionFactor($id)
    {


        $orderInfo = OrderInfo::with(['getOrder.getAddress', 'getOrder.getOrderProducts'])->where('id', $id)->firstOrFail();
        $orderInfoStatuses = Order::SEND_STATUSES;
        return view('factor.submission-factor', compact('orderInfo', 'orderInfoStatuses'));
    }

    public function showReturnProductDetail($id)
    {
        $stockrooms = ['0' => 'انتخاب انبار'] + Stockroom::pluck('name', 'id')->toArray();
        $orderProduct = OrderProduct::where(['id' => $id, 'send_status' => Order::SEND_STATUS_DELIVERY_CUSTOMER])
            ->with(['getProduct', 'getWarranty', 'getColor', 'getSeller', 'getOrder.getAddress'])
            ->whereHas('getOrder')
            ->firstOrFail();
        return view('order.return-product', compact('orderProduct', 'stockrooms'));
    }

    public function setReturnProduct(Request $request, $id)
    {
        $orderProduct = OrderProduct::where(['id' => $id, 'send_status' => Order::SEND_STATUS_DELIVERY_CUSTOMER])
            ->with(['getProduct'])
            ->whereHas('getOrder')
            ->firstOrFail();
        return OrderProduct::setReturnProduct($request, $orderProduct);
    }

    public function returnProductsList(Request $request)
    {
        $url = '?';
        $orderProducts = OrderProduct::with(['getProduct', 'getWarranty', 'getColor', 'getSeller', 'getStockroom'])
            ->where(['send_status' => Order::SEND_STATUS_CANCELED]);

        if (isset($_GET['search']) && $_GET['search'] != '') {
            $searchVal = $_GET['search'];
            define('searchVal', $searchVal);
            $orderProducts = $orderProducts->whereHas('getProduct', function ($query) {
                $query->where('title', 'like', '%' . searchVal . '%');
            });
            $url = create_paginate_url($url, 'search=' . $searchVal);
        }
        $orderProducts = $orderProducts->paginate(10);
        $orderProducts = $orderProducts->withPath($url);

        return view('order.return-product-list', compact('orderProducts','request'));
    }

    public function removeReturnProduct(Request $request)
    {
        $orderProduct = OrderProduct::where(['id' => $request->id, 'send_status' => Order::SEND_STATUS_CANCELED])
            ->with(['getProduct'])
            ->whereHas('getOrder')
            ->firstOrFail();
        OrderProduct::removeReturnProduct($request, $orderProduct);
    }
}
