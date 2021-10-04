<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockroomEvent extends Model
{
    protected $table='stockroom_events';
    protected $fillable=['type', 'user_id', 'stockroom_id', 'description', 'time', 'product_count'];

    public function getUser()
    {
        return $this->hasOne(User::class,'id','user_id')
            ->withDefault(['name' => ' دیجی کالا']);
    }

    public function getStockroom()
    {
        return $this->hasOne(Stockroom::class,'id','stockroom_id')->withDefault(['name'=>'انبار انتخاب نشده است']);
    }
}
