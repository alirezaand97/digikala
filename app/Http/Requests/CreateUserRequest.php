<?php

namespace App\Http\Requests;

use App\Rules\ValidMobileRule;
use App\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CreateUserRequest extends FormRequest
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
        $rule = [
            'name' => 'required',
            'mobile' => ['required', Rule::unique('users')->ignore($this->user),new ValidMobileRule()],
            'role' => 'required',
            'password' => 'nullable|min:6',
            'account_status' => 'required',
        ];
        if ($this->role == 'admin') {
            $rule['username'] = 'required';
        }

        return $rule;
    }

    public function attributes()
    {
        return [
            'name' => 'نام و نام خانوادگی',
            'mobile' => 'شماره موبایل',
            'role' => 'نقش کاربری',
            'password' => 'رمز عبور',
            'account_status' => 'وضعیت اکانت',
            'username'=>'نام کاربری مدیر'
        ];
    }
}
