<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class InventoryList extends Model
{
    //لیستی از محصولات موجود در یک انبار و تعداد موجودی هریک
    protected $table = 'inventory_lists';
    protected $fillable = ['stockroom_id', 'product_warranty_id', 'product_count',];

    public static function getStockroomInventory($id, Request $request)
    {
        $url = '?';
        define('search', $request->get('search', ''));
        define('seller_id', $request->get('seller_id', ''));
        $inventoryList = InventoryList::where('stockroom_id', $id)
            ->where('product_count', '>', 0)
            ->with(['getProductWarranty' => function ($query) {
                $query->with(['getSeller', 'getColor', 'getWarranty', 'getProduct']);
            }])->whereHas('getProductWarranty', function (Builder $query) {
                $query->whereHas('getProduct', function (Builder $query2) {
                    $query2->where('title', 'like', '%' . search . '%');
                });

                if (!empty(seller_id)) {
                    $query->where('seller_id', seller_id);
                }
            })
            ->orderBy('id', 'DESC')
            ->paginate(10);

        if (!empty(search)) {
            $url = create_paginate_url($url, 'search=' . search);
        }
        if (!empty(seller_id) || seller_id==0) {
            $url = create_paginate_url($url, 'seller_id=' . seller_id);

        }

        $inventoryList->withPath($url);
        return $inventoryList;
    }

    public function getProductWarranty()
    {
        return $this->hasOne(ProductWarranty::class, 'id', 'product_warranty_id');
    }
}
