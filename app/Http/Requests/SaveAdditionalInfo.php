<?php

namespace App\Http\Requests;

use App\Rules\bankCardNumberRule;
use App\Rules\NationalIdentityNumberRule;
use Illuminate\Foundation\Http\FormRequest;

class SaveAdditionalInfo extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'national_identity_number' => ['required',new NationalIdentityNumberRule()],
            'mobile_phone' => 'required',
            'email' => 'nullable',
            'bank_card_number' => ['nullable',new bankCardNumberRule()],
        ];
    }

    public function attributes()
    {
        return [
                'first_name' => 'نام',
                'last_name' => 'نام خانوادگی',
                'national_identity_number' => 'کد ملی',
                'mobile_phone' => 'شماره تلفن همراه',
                'email' => 'پست الکترونیکی',
                'bank_card_number' => 'کارت بانکی'
        ];
    }
}
