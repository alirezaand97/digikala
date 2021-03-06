<?php

namespace App\Http\Requests\ProductWarrantyRequest;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductWarrantyRequest extends FormRequest
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
            'warranty_id' => 'required',
            'color_id' => 'required',
            'price1' => 'required|numeric',
            'price2' => 'required|numeric',
            'product_number' => 'required|numeric',
            'product_number_cart' => 'required|numeric',
            'send_time' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'warranty_id' => 'گارانتی',
            'color_id' => 'رنگ',
            'price1' => 'قیمت محصول',
            'price2' => 'قیمت فروش محصول',
            'product_number' => 'تعداد موجودی محصول',
            'product_number_cart' => 'تعداد مجاز خرید مشتری',
            'send_time' => 'زمان آماده سازی محصول',

        ];
    }


    protected function getValidatorInstance()
    {
        $this->merge([
            'price1' => str_replace(',', '', $this->request->get('price1')),
            'price2' => str_replace(',', '', $this->request->get('price2')),
            'product_number' => str_replace(',', '', $this->request->get('product_number')),
            'product_number_cart' => str_replace(',', '', $this->request->get('product_number_cart')),
            'send_time' => str_replace(',', '', $this->request->get('send_time')),
        ]);
        return parent::getValidatorInstance(); // TODO: Change the autogenerated stub
    }
}
