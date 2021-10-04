<?php

namespace App\Http\Requests\Slider;

use Illuminate\Foundation\Http\FormRequest;

class CreateSliderRequest extends FormRequest
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
            'title' => 'required|string|max:250',
            'url' => 'required|string',
            'image_url' => 'required|image',
            'mobile_image_url' => 'nullable|image',

        ];
    }

    public function attributes()
    {
        return [
            'title' => 'عنوان اسلایدر',
            'url' => 'آدرس اسلایدر',
            'image_url' => 'تصویر اسلایدر',
            'mobile_image_url' => 'تصویر برای موبایل و تبلت اسلایدر',
        ];
    }
}
