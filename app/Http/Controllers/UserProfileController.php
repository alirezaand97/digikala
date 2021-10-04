<?php

namespace App\Http\Controllers;

use App\AdditionalInfo;
use App\Address;
use App\Favorite;
use App\GiftCart;
use App\Http\Requests\SaveAdditionalInfo;
use App\Http\Requests\SaveLegalInfo;
use App\Lib\Mobile_Detect;
use App\Order;
use App\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;

class UserProfileController extends Controller
{
    protected $view = '';

    public function __construct()
    {
        View::share('categories', get_category());
        $detect = new Mobile_Detect();
        if ($detect->isMobile() || $detect->isTablet()) {
            $this->view = 'mobile.';
        }
    }

    public function giftCart()
    {
        $gifts = GiftCart::with(['getProduct'])
            ->where(['user_id' => Auth::id()])
            ->orderBy('id', 'DESC')
            ->paginate(10);
        return view('user_panel.gift_cart', compact('gifts'));
    }

    public function getUserOrders()
    {
        $userId = \auth()->id();
        $orders = Order::where('user_id', $userId)->with('getOrderProductsWithProducts')->orderBy('id', 'DESC')->get();
        return \view($this->view . 'user_panel.orders', compact('orders'));
    }

    public function getOrder($order_id)
    {
        $order = Order::where('id', $order_id)->with(['getOrderProducts', 'getAddress', 'getOrderInfo'])->first();
        return \view($this->view . 'user_panel.order-show', compact('order'));
    }

    public function profile()
    {
        $userId = \auth()->id();
        $orders = Order::where('user_id', $userId)->limit(10)->get();
        $additionalInfos = AdditionalInfo::where('user_id', $userId)->first();
        return view($this->view . 'user_panel.profile', compact('additionalInfos', 'orders'));
    }

    public function additionalInfo()
    {
        $user = Auth::user();
        $provinces = [0 => 'انتخاب استان'] + Province::pluck('name', 'id')->toArray();
        $additionalInfos = AdditionalInfo::where('user_id', $user->id)->first();
        return \view('user_panel.additional-info', compact('user', 'provinces', 'additionalInfos'));
    }

    public function saveAdditionalInfo(SaveAdditionalInfo $request)
    {
        $user = \auth()->user();
        $isExist = AdditionalInfo::where('user_id', $user->id)->first();
        $data = $request->all();
        $data['newsletter'] = $request->newsletter ? 'yes' : 'no';
        if ($isExist) { //آپدیت اطلاعات در صورت وجود از قبل
            $isExist->update($data);
        } else { //ایجاد اطلاعات کاربر در صورتی که قبلا پر نکرده است
            $data['user_id'] = $user->id;
            $additionalInfo = new AdditionalInfo($data);
            $additionalInfo->save();
        }
        $fullName = $request->first_name . ' ' . $request->last_name;
        $user->name = $fullName;
        $user->update();

        //اعتبار سنجی موبایل کاربر در صورت تغییر شماره موبایل
        if ($user->mobile != $request->mobile_phone) {
            $user->active_code = generate_active_code();
            $user->update();
            return redirect('/change-mobile-confirm')->with('mobile', $request->mobile_phone);
        }
        return redirect()->back()->with(['status' => 'success', 'message' => 'اطلاعات کاربری شما با موفقیت به روزرسانی شد']);
    }

    public function saveLegalInfo(SaveLegalInfo $request)
    {
        $userId = \auth()->id();
        $isExist = AdditionalInfo::where('user_id', $userId)->first();
        if ($isExist) {
            $isExist->update($request->all());
        } else {
            $data = $request->all();
            $data['user_id'] = $userId;
            $legalInfo = new AdditionalInfo($data);
            $legalInfo->save();
        }
        return redirect()->back();
    }

    public function addresses()
    {
        return \view('user_panel.address');
    }

    public function getUserAddressList(Request $request)
    {
        $user = Auth::user();
        $addressList = Address::where('user_id', $user->id)->with(['province', 'city'])->orderBy('id', 'DESC')->paginate(10);
        return $addressList;
    }

    public function showFavorites()
    {
        return \view($this->view . 'user_panel.favorites');
    }

    public function favorites()
    {
        $favorites = Favorite::with('getProduct')->where('user_id', Auth::id())->paginate(5);
        return $favorites;
    }

    public function removeFavorite(Request $request)
    {
        $favoriteId = $request->get('favorite_id');
        $favorite = Favorite::where(['id'=> $favoriteId])->first();
        if ($favorite) {
            $favorite->delete();
            return 'success';
        }
    }
}
