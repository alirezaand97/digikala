<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    protected $table='addresses';
    protected $fillable=['province_id', 'city_id', 'user_id', 'name', 'mobile', 'post_address', 'plaque', 'unit', 'post_code', 'national_code', 'lat','lng','is_selected'];

    public function province()
    {
        return $this->hasOne(Province::class,'id','province_id');
    }
    public function city()
    {
        return $this->hasOne(City::class,'id','city_id');
    }
}
