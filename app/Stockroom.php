<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Stockroom extends Model
{
    use SoftDeletes;
    protected $table = 'stockrooms';
    protected $fillable = ['name', 'description'];

    public static function getData($request)
    {
        $url = '?';
        $stockroom = Stockroom::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $stockroom = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search'] != '') {
            $searchVal = $_GET['search'];
            $stockroom->withTrashed()->where('name', 'like', '%' . $searchVal . '%');
        }

        $stockroom = $stockroom->paginate(10);
        $stockroom = $stockroom->withPath($url);
        return $stockroom;
    }

    public static function saveProducts(Request $request, $productCount = null, $list = null, $stockroomId = null)
    {
        $stockroomId = $stockroomId ? $stockroomId : $request->get('stockroom_id', 0);
        $list = $list ? $list : $request->get('list', []);
        $list = explode('-', $list);
        $productCount = $productCount ? $productCount : calc_stockroom_product_count($list);
        $type = $request->get('type', 'input');


        DB::beginTransaction();
        try {
            $stockroomEvent = new StockroomEvent($request->all());
            $stockroomEvent->user_id = Auth::id();
            $stockroomEvent->time = time();
            $stockroomEvent->stockroom_id = $stockroomId;
            $stockroomEvent->product_count = $productCount;
            $stockroomEvent->type = $type;
            $stockroomEvent->save();


            foreach ($list as $item) {
                if (!empty($item)) {
                    $e = explode('_', $item);
                    if (sizeof($e) == 2) {
                        $stockroomProduct = new StockroomProduct();
                        $stockroomProduct->event_id = $stockroomEvent->id;
                        $stockroomProduct->stockroom_id = $stockroomId;
                        $stockroomProduct->event_id = $stockroomEvent->id;
                        $stockroomProduct->product_warranty_id = $e[0];
                        $stockroomProduct->product_count = $e[1];
                        $stockroomProduct->save();

                        self::inventoryList($e[0], $e[1], $type, $stockroomId);
                    }
                }
            }
            DB::commit();
            return 'success';
        } catch (\Exception $e) {
            DB::rollBack();
        }


    }

    public static function inventoryList($pwId, $productCount, $type, $stockroomId)
    {
        if ($type == 'input') {
            $check = InventoryList::where(['stockroom_id' => $stockroomId, 'product_warranty_id' => $pwId])->first();
            if ($check) {
                $check->product_count = $check->product_count + $productCount;
                $check->update();
            } else {
                $inventory = new InventoryList();
                $inventory->stockroom_id = $stockroomId;
                $inventory->product_warranty_id = $pwId;
                $inventory->product_count = $productCount;
                $inventory->save();
            }
        } else {
            $check = InventoryList::where(['stockroom_id' => $stockroomId, 'product_warranty_id' => $pwId])->first();
            $check->product_count = $check->product_count - $productCount;
        }

    }

    public static function getEventProducts(Request $request, $type, $event_id)
    {
        $search = $request->get('search', '');
        define('search', $search);
        //اطلاعات  رویداد ورودی یا خروجی از انبار
        $stockroomEvent = StockroomEvent::with(['getUser', 'getStockroom'])->where(['id' => $event_id, 'type' => $type])->firstOrFail();

        //اطلاعات محصولاتی که در رویداد مورد نظر وارد یا خارج شده اند
        $eventProducts = StockroomProduct::with(['getProductWarranty' => function ($query) {
            $query->with(['getSeller', 'getColor', 'getWarranty', 'getProduct']);
        }])->whereHas('getProductWarranty', function (Builder $query) {
            $query->whereHas('getProduct', function (Builder $query2) {
                $query2->where('title', 'like', '%' . search . '%');
            });
        })->where('event_id', $event_id)->get();
        return [
            'stockroomEvent' => $stockroomEvent,
            'eventProducts' => $eventProducts
        ];
    }

    public static function getEvents(Request $request, $type)
    {
        $url = '?';
        $stockroomId = $request->get('stockroom_id', 0);
        $events = StockroomEvent::with(['getUser', 'getStockroom'])
            ->where('type', $type);

        if ($stockroomId > 0) {
            $events = $events->where('stockroom_id', $stockroomId);
            $url = create_paginate_url($url, 'stockroom_id=' . $stockroomId);
        }

        $events = $events->orderBy('id', 'DESC')->paginate(10);
        $events->withPath($url);

        return $events;
    }
}
