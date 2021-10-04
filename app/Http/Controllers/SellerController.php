<?php

namespace App\Http\Controllers;

use App\Http\Requests\Seller\SellerDocumentsRequest;
use App\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function registerFirstStep(Request $request)
    {
        return Seller::registerFirstStep($request);
    }

    public function registerSecondStep(Request $request)
    {
        return Seller::registerSecondStep($request);
    }

    public function registerThirdStep(Request $request)
    {
        return Seller::registerThirdStep($request);
    }

    public function resendActiveCode(Request $request)
    {
        return Seller::resendActiveCode($request);
    }

    public function saveSellerDocuments(SellerDocumentsRequest $request)
    {
       return Seller::saveSellerDocuments($request);
    }
}
