<?php

namespace App;

use App\Http\Requests\Seller\SellerDocumentsRequest;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Seller extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'sellers';
    protected $fillable = ['fname', 'lname', 'email', 'mobile', 'password', 'step', 'brand_name', 'account_status', 'active_code', 'province_id', 'city_id', 'account_type', 'total_commission', 'paid_commission', 'total_price', 'new_order_count'];
    protected $hidden = [
        'password'
    ];

    public static function registerFirstStep(Request $request)
    {
        $mobile = $request->mobile;
        $email = $request->email;
        $password = $request->password;
        if (Seller::sellerIsExist('mobile', $mobile)) {
            return ['status' => 'error', 'message' => 'شماره موبایل وارد شده قبلا توسط فروشنده دیگری استفاده شده است'];
        } elseif (Seller::sellerIsExist('email', $email)) {
            return ['status' => 'error', 'message' => ' ایمیل وارد شده قبلا توسط فروشنده دیگری استفاده شده است'];
        }
        Seller::where(['mobile' => $mobile])->orWhere(['email' => $email])->delete();
        $seller = new Seller($request->all());
        $activeCode = generate_active_code();
        $seller->active_code = $activeCode;
        $seller->step = 1;
        $seller->password = Hash::make($password);
        $seller->save();
        return ['status' => 'success', 'mobile' => $mobile];

    }

    public static function sellerIsExist($sellerFiled, $value)
    {
        return Seller::where([$sellerFiled => $value, 'step' => 4])->first();
    }

    public static function registerSecondStep(Request $request)
    {
        $seller = Seller::where(['mobile' => $request->mobile])->where('step', '<=', 4)->first();
        if ($seller) {
            $seller->step = 2;
            $seller->update($request->all());
            return ['status' => 'success', 'mobile' => $request->mobile];
        }
        return ['status' => 'error', 'message' => 'خطایی رخ داده است. مجددا تلاش کنید'];
    }

    public static function registerThirdStep(Request $request)
    {
        $seller = Seller::where(['mobile' => $request->mobile, 'step' => 2, 'active_code' => $request->active_code])->first();
        if ($seller) {
            $seller->step=3;
            $seller->update();
            return ['status' => 'success', 'mobile' => $request->mobile];
        }
            return ['status' => 'error', 'message' => 'کد وارد شده صحیح نمی باشد'];
    }

    public static function resendActiveCode(Request $request)
    {
        $seller = Seller::where(['mobile' => $request->mobile])->where('step', '<=', 4)->first();
        if ($seller) {
            $activeCode = generate_active_code();
            $seller->active_code = $activeCode;
            $seller->update();
            return ['status' => 'success'];
        } else {
            return ['status' => 'error', 'message' => 'خطایی رخ داده است. مجددا تلاش کنید'];
        }
    }

    public static function saveSellerDocuments(SellerDocumentsRequest $request)
    {

        $seller=Seller::where(['mobile'=>$request->mobile,'step'=>3,'account_type'=>$request->account_type])->first();
        if($seller){
            $birthCertificate=upload_file($request,'birth_certificate','sellers','birth_certificate');
            $nationalCard=upload_file($request,'national_card','sellers','national_card');
            $sellerDocument=new SellerDocument();
            $sellerDocument->seller_id=$seller->id;
            $sellerDocument->birth_certificate=$birthCertificate;
            $sellerDocument->national_card=$nationalCard;
            if($request->newsletter){
                $newsletter=upload_file($request,'newsletter','sellers','newsletter');
                $sellerDocument->newsletter=$newsletter;
            }
            if($sellerDocument->save())
                return ['status'=>'success','message'=>'مدارک شما با موفقیت دریافت شد'];
            return ['status'=>'error','message'=>'در دریافت مدارک شما خطایی رخ داده است. مجددا تلاش کنید'];
        }
    }

    public function findForPassport($username)
    {
        return Seller::where('mobile', $username)->first();
    }
}
