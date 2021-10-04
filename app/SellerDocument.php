<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SellerDocument extends Model
{
    protected $table='seller_documents';
    protected $fillable=['seller_id','newsletter', 'birth_certificate', 'national_card'];
}
