<?php

namespace App\Http\Requests;

use App\Rules\bankCardNumberRule;
use App\Rules\NationalIdentityNumberRule;
use Illuminate\Foundation\Http\FormRequest;

class SaveLegalInfo extends FormRequest
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
            'company_name' => 'required',
            'company_economic_number' => 'required',
            'company_registration_number' => 'required',
            'company_national_identity_number' => 'required',
            'company_phone' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'company_name' => 'نام سازمان',
            'company_economic_number' => 'کد اقتصادی',
            'company_registration_number' => 'شناسه ثبت',
            'company_national_identity_number' => 'شناسه ملی',
            'company_phone' => 'شماره تلفن ثابت'
        ];
    }
}
