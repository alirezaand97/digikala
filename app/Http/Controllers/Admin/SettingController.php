<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function showSendTimeForm()
    {
        $setting = new Setting();
        $data = $setting->getData(['send_time', 'send_price', 'min_order_price']);
        return view('setting.send-time', compact('data'));
    }

    public function changeSendTime(Request $request)
    {
        $setting = new Setting();
        $data = $setting->setData($request->all());
        return view('setting.send-time', compact('data'));
    }

    public function showShopSetting()
    {
        $config = config('shop_setting');
        return view('setting.shop',compact('config'));
    }

    public function saveShopSetting(Request $request)
    {
        $setting = new Setting();
        $setting->saveShopSetting($request);
        return redirect('admin/setting/shop')->with(['message' => 'عملیات با موفق انجام شد']);
    }
}
