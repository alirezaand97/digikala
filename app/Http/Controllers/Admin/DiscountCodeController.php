<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\City;
use App\DiscountCode;
use App\Http\Requests\DiscountCode\DiscountCodeRequest;
use Illuminate\Http\Request;

class DiscountCodeController extends AdminBaseController
{
    protected $model = '\App\DiscountCode';
    protected $routeName = 'discount-codes';
    protected $modelName = ' کد تخفیف';

    public function index(Request $request)
    {
        $discounts = DiscountCode::getData($request);
        $trashed_count = DiscountCode::onlyTrashed()->count();
        return view('discount-code.index', ['discounts' => $discounts, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }

    public function create()
    {
        $categories = Category::get_list();
        return view('discount-code.create', compact('categories'));
    }

    public function store(DiscountCodeRequest $request)
    {
        $incredibleOffersAllowable = $request->get('incredible_offers_allowable') ? 1 : 0;
        $expireTime = get_timestamp_from_jalali($request->expire_time, false);
        $discountCode = new DiscountCode($request->all());
        $discountCode->expire_time = $expireTime;
        $discountCode->incredible_offers_allowable = $incredibleOffersAllowable;
        $discountCode->save();
        return redirect('admin/discount-codes');
    }

    public function edit($id)
    {
        $categories = Category::get_list();
        $discount = DiscountCode::findOrFail($id);
        return view('discount-code.edit', compact('categories', 'discount'));
    }

    public function update(DiscountCodeRequest $request, $id)
    {
        $incredibleOffersAllowable = $request->get('incredible_offers_allowable') ? 1 : 0;
        $expireTime = get_timestamp_from_jalali($request->expire_time, false);
        $discountCode = DiscountCode::findOrFail($id);

        $formData = $request->all();
        $formData['expire_time'] = $expireTime;
        $formData['incredible_offers_allowable'] = $incredibleOffersAllowable;
        $discountCode->update($formData);

        return redirect('admin/discount-codes');
    }
}
