<?php

namespace App\Rules;

use App\User;
use Illuminate\Contracts\Validation\Rule;

class ValidMobileRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $alreadyExist = false;
        $user = User::where(['mobile' => $value])->first();
        if ($user) {
            if ($user->account_status == User::USER_INACTIVE) {
                //اگر کاربر موجود ولی verify نشده باشد اطلاعات را حذف و دوباره ثبت می کنیم
                $user->delete();
            } else {
                $alreadyExist = true;
            }
        }
        $mobileRegex = '~^(\+?98|0098|0)9\d{9}$~';
        preg_match($mobileRegex, $value, $matches);
        return !empty($matches) && !$alreadyExist;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'شماره موبایل وارد شده نا معتبر است یا از پیش موجود است';
    }
}
