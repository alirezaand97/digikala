<?php

namespace App\Http\Requests\City;

use Illuminate\Foundation\Http\FormRequest;

class CityRequest extends FormRequest
{
    /**
     *
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
            'name' => 'required|string|max:250',
            'min_order_price' => 'nullable|numeric',
            'send_price' => 'nullable|numeric',
            'send_time' => 'nullable|numeric',
            'province_id' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'نام استان',
            'send_time' => 'زمان حدودی ارسال سفارش',
            'send_price' => 'هزینه حدودی ارسال سفارش',
            'min_order_price' => 'حداقل مبلغ خرید برای ارسال رایگان',
            'province_id' => 'استان',


        ];
    }
}
