<?php

namespace App\Http\Requests\Brand;

use Illuminate\Foundation\Http\FormRequest;

class CreateBrandRequest extends FormRequest
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
            'name' => 'required|string|max:250',
            'ename' => 'required_without:url|string|max:250',
            'icon' => 'nullable|image',
            'description'=>'nullable|string'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'نام برند',
            'ename' => 'نام انگلیسی برند',
            'icon' => 'تصویر برند',
            'description' => 'توضیحات برند',
        ];
    }
}
