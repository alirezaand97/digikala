<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockroomProduct extends Model
{
    protected $table = 'stockroom_products';
    protected $fillable = ['event_id', 'stockroom_id', 'product_warranty_id', 'product_count'];

    public function getProductWarranty()
    {
        return $this->hasOne(ProductWarranty::class, 'id', 'product_warranty_id');
    }
}
