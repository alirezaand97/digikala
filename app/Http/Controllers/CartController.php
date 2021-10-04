<?php

namespace App\Http\Controllers;

use App\Cart;
use App\Lib\Mobile_Detect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View as ViewAlias;
use Illuminate\View\View;
use function GuzzleHttp\Promise\all;

class CartController extends Controller
{
    protected $view = '';

    public function __construct()
    {
        ViewAlias::share('categories', get_category());
        $detect = new Mobile_Detect();
        if ($detect->isTablet() || $detect->isMobile()) {
            $this->view = 'mobile.';
        }
    }

    public function addToCart(Request $request)
    {
        return Cart::addToCart($request->all());
    }

    public function showCart()
    {
        $cart_data = Cart::showCart();
        return view($this->view . 'shop.shopping-cart', ['cart_data' => $cart_data]);
    }

    public function removeCartItem(Request $request)
    {
        $cart_data = Cart::removeCartItem($request);
        return $cart_data;
    }

    public function changeProductCount(Request $request)
    {
        $cart_data = Cart::changeProductCount($request);
        return $cart_data;
    }
}
