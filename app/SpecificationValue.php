<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SpecificationValue extends Model
{
    protected $table = 'specification_values';
    protected $fillable = ['specification_id', 'product_id', 'value'];

    public function getImportantSpecification()
    {
        return $this->hasOne(Specification::class,'id','specification_id')
            ->where('show_item',1);
    }

}
