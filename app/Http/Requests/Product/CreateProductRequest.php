<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
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
            'title' => 'required|string',
            'cat_id' => 'required',
            'brand_id' => 'required',
            'ename' => 'required|string',
            'product_url' => 'nullable',
            'price' => 'nullable',
            'discount_price' => 'nullable',
            'show' => 'nullable',
            'view' => 'nullable',
            'keywords' => 'required',
            'description' => 'string',
            'special' => 'nullable',
            'image_url' => 'required',
            'full_description' => 'nullable',
            'order_number' => 'nullable',
            'colors'=>'required',
            'status' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'عنوان محصول',
            'cat_id' => 'دسته بندی محصول',
            'brand_id' => 'برند محصول',
            'ename' => 'نام انگلیسی محصول',
            'product_url' => 'ادرس محصول',
            'price' => 'قیمت',
            'discount_price' => 'تخفیف',
            'show' => 'نمایش',
            'keywords' => 'کلید واژه ها',
            'description' => 'توضحیحات',
            'special' => 'پیشنهاد ویژه',
            'image_url' => 'تصویر',
            'full_description' => 'توضیحات کامل',
            'order_number' => 'شماره سفارش',
            'status' => 'وضعیت',
            'colors' => 'رنگ',

        ];
    }
}
