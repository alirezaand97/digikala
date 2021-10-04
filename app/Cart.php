<?php


namespace App;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class Cart
{

    public static function addToCart($data)
    {
        $product_id = array_key_exists('product_id', $data) ? $data['product_id'] : 0;
        $warranty_id = array_key_exists('warranty_id', $data) ? $data['warranty_id'] : 0;
        $color_id = array_key_exists('color_id', $data) ? $data['color_id'] : 0;
        $cart = Session::get('cart', array());
        $w_c = $warranty_id . '_' . $color_id;

        if (array_key_exists($product_id, $cart)) {
            $product_data = $cart[$product_id]['product_data'];
            if (array_key_exists($w_c, $product_data)) {
                $count = $cart[$product_id]['product_data'][$w_c] + 1;
                if (self::isAllowedAdd($product_id, $color_id, $warranty_id, $count)) {
                    $cart[$product_id]['product_data'][$w_c]++;
                }
            } else {
                $cart[$product_id]['product_data'][$w_c] = 1;
            }
        } else {
            $cart[$product_id]['product_data'][$w_c] = 1;
        }

        Session::put('cart', $cart);
        return redirect('/show-cart');
    }

    private static function isAllowedAdd(int $product_id, int $color_id, int $warranty_id, $count)
    {
        $productWarranty = ProductWarranty::where(['product_id' => $product_id, 'color_id' => $color_id, 'warranty_id' => $warranty_id])->first();

        if ($productWarranty && $productWarranty->product_number >= $count && $productWarranty->product_number_cart >= $count) {
            return true;
        } else {
            return false;
        }
    }

    public static function showCart()
    {
        $cart = Session::get('cart', array());
        $colors_id = array();
        $products_id = array();
        $warranties_id = array();
        $i = 0;
        $data = array();
        foreach ($cart as $productId => $productInstance) {
            foreach ($productInstance['product_data'] as $wc => $productCount) {
                $products_id[$productId] = $productId;
                $wcExploded = explode('_', $wc);
                if (sizeof($wcExploded) == 2) {
                    $warranties_id[$wcExploded[0]] = $wcExploded[0];
                    $colors_id[$wcExploded[1]] = $wcExploded[1];
                    $productWarranty = ProductWarranty::where(['color_id' => $wcExploded[1], 'product_id' => $productId, 'warranty_id' => $wcExploded[0]])->first();
                    if ($productWarranty) {
                        $data[$i] = $productWarranty;
                        $pwc = $productId . '_' . $wcExploded['0'] . '_' . $wcExploded[1];
                        $cart_product_number[$pwc] = $productCount;
                        $i++;
                    }
                }
            }
        };

        $products = Product::whereIn('id', $products_id)->get();
        $colors = Color::whereIn('id', $colors_id)->get();
        $warranties = Warranty::whereIn('id', $warranties_id)->get();

        $j = 0;
        $cart_data = array();
        $total_price = 0;
        $cart_price = 0;
        foreach ($data as $pw) {
            $color = getFieldFromProductWarranty($pw, $colors, 'color_id');
            $product = getFieldFromProductWarranty($pw, $products, 'product_id');
            $warranty = getFieldFromProductWarranty($pw, $warranties, 'warranty_id');
            $index = $product->id . '_' . $warranty->id . '_' . $color->id;
            $product_count = $cart_product_number[$index];
            if ($product && $warranty) {
                $cart_data['product_data'][$j]['product_id'] = $product->id;
                $cart_data['product_data'][$j]['warranty_id'] = $warranty->id;
                $cart_data['product_data'][$j]['category_id'] = $product->cat_id;
                $cart_data['product_data'][$j]['color_id'] = $color->id;
                $cart_data['product_data'][$j]['product_warranty_id'] = $pw->id;
                $cart_data['product_data'][$j]['product_name'] = $product->title;
                $cart_data['product_data'][$j]['product_ename'] = $product->ename;
                $cart_data['product_data'][$j]['product_url'] = $product->product_url;
                $cart_data['product_data'][$j]['product_image'] = $product->image_url;
                $cart_data['product_data'][$j]['warranty_name'] = $warranty->name;
                $cart_data['product_data'][$j]['send_time'] = $pw->send_time;
                $cart_data['product_data'][$j]['discount'] =$product_count* ($pw->price1 - $pw->price2);
                if ($color) {
                    $cart_data['product_data'][$j]['color_name'] = $color->name;
                    $cart_data['product_data'][$j]['color_code'] = $color->code;
                }
                $cart_data['product_data'][$j]['product_count'] = $product_count;
                $cart_data['product_data'][$j]['is_gift_cart'] = $product->is_gift_cart;
                $cart_data['product_data'][$j]['product_allowed_count'] = $pw->product_number_cart;
                $cart_data['product_data'][$j]['price1'] = $product_count * $pw->price1;
                $cart_data['product_data'][$j]['price2'] = $product_count * $pw->price2;
                $total_price += $product_count * $pw->price1;
                $cart_price += $product_count * $pw->price2;
                $j++;
            }
        }

        $cart_data['total_price'] = $total_price;
        $cart_data['cart_price'] = $cart_price;
        $cart_data['cart_discount'] = $total_price - $cart_price;

        return $cart_data;

    }

    public static function removeCartItem($request)
    {
        $productId = $request->get('product_id', 0);
        $colorId = $request->get('color_id', 0);
        $warrantyId = $request->get('warranty_id', 0);
        $cart = Session::get('cart', array());
        if (!empty($cart) && array_key_exists($productId, $cart)) {
            $currentProducts = $cart[$productId]['product_data'];
            $productKey = $warrantyId . '_' . $colorId;
            if (array_key_exists($productKey, $currentProducts)) {
                unset($cart[$productId]['product_data'][$productKey]);//حذف محصول با مشخصات وارده از کارت(آرایه)
                if (empty($cart[$productId]['product_data'])) {
                    //اگر ان محصول با مشخصات مختلفش در کارت نبود ان محصول را از سبد حذف می کنیم
                    unset($cart[$productId]);
                }
                if (empty($cart)) {
                    //اگر سبد خرید خالی بود سبد را حذف کن
                    Session::forget('cart');
                } else {
                    Session::put('cart', $cart);
                }
            }
            return self::showCart(); //دریافت اطلاعات کارت بر اساس سشن جدید
        } else {
            return 'error';
        }

    }

    public static function changeProductCount($request)
    {
        $productId = $request->get('product_id', 0);
        $colorId = $request->get('color_id', 0);
        $warrantyId = $request->get('warranty_id', 0);
        $productCount = $request->get('product_count', 0);
        $cart = Session::get('cart', array());
        if (!empty($cart) && array_key_exists($productId, $cart)) {
            $currentProducts = $cart[$productId]['product_data'];
            $productKey = $warrantyId . '_' . $colorId;
            if (array_key_exists($productKey, $currentProducts)) {
                $cart[$productId]['product_data'][$productKey] = $productCount;
                Session::put('cart', $cart);
            }
            return self::showCart(); //دریافت اطلاعات کارت بر اساس سشن جدید
        } else {
            return 'error';
        }

    }

    public static function getCartCount()
    {
        $cart = Session::get('cart', array());
        return sizeof($cart);
    }


}
