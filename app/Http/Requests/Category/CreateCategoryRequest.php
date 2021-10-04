<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
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
            'url' => 'required_without:ename',
            'img' => 'nullable|image',
            'search_url' => 'nullable|string',
            'parent_id' => 'nullable|int',
            'not_show' => 'nullable',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'نام دسته بندی',
            'ename' => 'نام انگلیسی دسته بندی',
            'url' => 'url',
            'img' => 'تصویر دسته بندی',
            'parent_id' => 'والد دسته بندی',
        ];
    }
}
