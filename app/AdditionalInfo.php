<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdditionalInfo extends Model
{
    protected $table='additional_infos';
    protected $fillable=['user_id','first_name','last_name','national_identity_number','mobile_phone','email','company_name','company_economic_number','company_registration_number','company_national_identity_number','company_phone','province_id','city_id','bank_card_number','newsletter'];
}
