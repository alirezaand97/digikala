<?php

namespace App\Http\Controllers;

use App\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;

class UserController extends Controller
{
    public function addAddress(Request $request)
    {
        $user = Auth::user();
        $user->address()->where('is_selected', 1)->update(['is_selected' => 0]);
        $address = $user->address()->create($request->all());
        return $user->address()->with(['province','city'])->get();
    }

    public function updateAddress(Request $request)
    {
        $user = Auth::user();
        $address = $user->address()->where('id',$request->id)->update($request->all());
        return $user->address()->with(['province','city'])->get();
    }

    public function removeAddress(Request $request)
    {
        $user = auth()->user();
        $address = $user->address()->where('id', $request->address_id)->first();
        if ($address) {
            $address->delete();
            if ($address->is_selected == 1) {
                $address->update(['is_selected' => 0]);
                $latest = $user->address()->where('deleted_at', null)->orderBy('id', 'DESC')->first();
                $latest->update(['is_selected' => 1]);
            }
        } else {
            return 'error';
        }
    }

    public function changeSelectedAddress(Request $request)
    {
        $user=auth()->user();
        $user->address()->update(['is_selected'=>0]);
        Address::where('id',$request->address_id)->update(['is_selected'=>1]);
        return $user->address()->with(['province','city'])->get();
    }
}
