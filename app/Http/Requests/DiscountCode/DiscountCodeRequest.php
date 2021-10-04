<?php

namespace App\Http\Requests\DiscountCode;

use Illuminate\Foundation\Http\FormRequest;

class DiscountCodeRequest extends FormRequest
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
            'code' => 'required',
            'min_order_price' => 'required|numeric',
            'discount_value' => 'required_without:discount_percent',
            'discount_percent' => 'required_without:discount_value',
            'expire_time' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'code' => 'کد تخفیف',
            'min_order_price' => 'حداقل سفارش تا استفاده از کد تخفیف',
            'discount_value' => 'مبلغ تخفیف',
            'discount_percent' => 'درصد تحفیف',
            'expire_time' => 'زمان اعتبار کد تخفیف',

        ];
    }


    protected function getValidatorInstance()
    {
        $this->merge([
            'min_order_price' => str_replace(',', '', $this->request->get('min_order_price')),
            'discount_value' => str_replace(',', '', $this->request->get('discount_value')),
            'discount_percent' => str_replace(',', '', $this->request->get('discount_percent')),
            'number_usable' => str_replace(',', '', $this->request->get('number_usable')),
        ]);
        return parent::getValidatorInstance(); // TODO: Change the autogenerated stub
    }
}