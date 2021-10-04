<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProductWarrantyRequest;
use App\Http\Requests\ProductWarrantyRequest\UpdateProductWarrantyRequest;
use App\Product;
use App\ProductColor;
use App\ProductWarranty;
use App\Warranty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductWarrantyController extends AdminBaseController
{
    protected $model = '\App\ProductWarranty';
    protected $routeName = 'product_warranties';
    protected $modelName = ' گارانتی';

    protected $product;
    protected $query_string;

    public function __construct(Request $request)
    {
        $product_id = $request->get('product_id');
        $this->product = Product::findOrFail($product_id);
        $this->query_string = 'product_id=' . $product_id;
    }

    public function index(Request $request)
    {
        $productWarranties = ProductWarranty::getData($request);
        $product = $this->product;
        $trashed_count = ProductWarranty::onlyTrashed()->count();

        return view('product_warranties.index', [
            'product' => $product,
            'queryString' => $this->query_string,
            'product_warranties' => $productWarranties,
            'trashed_count' => $trashed_count,
            'search' => $request->search]);
    }


    public function create()
    {
        $warranties = Warranty::pluck('name', 'id')->toArray();
        $colors = ProductColor::with('getColor')->where('product_id', $this->product->id)->get();
        $product = $this->product;
        return view('product_warranties.create', compact('warranties', 'colors', 'product'));
    }


    public function store(ProductWarrantyRequest\CreateProductWarrantyRequest $request)
    {
        /**
         * تنوع قیمت بر اساس رنگ یا گارانتی می باشد پس یک محصول با رنگ و گارانتی مشترک را دوباره ذخیره نمی کنیم به عنوان تنوع قیمت و فقط قیمتش رو آپدیت می کنیم
         */
        try {
            DB::beginTransaction();
            $isExist = ProductWarranty::where([
                'seller_id' => 0,
                'product_id' => $request->product_id,
                'color_id' => $request->color_id,
                'warranty_id' => $request->warranty_id
            ])->first();

            if ($isExist) {
                return redirect()->back()->withInput()->with('warning', 'این تنوع قیمت از پیش موجود است. می توانید از قسمت ویرایش آن را تغییر دهید');
            } else {
                $productWarranty = new ProductWarranty($request->all());
                $productWarranty->save();
                /**
                 * با ثبت تنوع قیمت، باید کمترین قیمت به عنوان قیمت قیمت محصول درج یا آپدیت شود
                 */
                update_product_price($this->product);
                add_min_product_price($productWarranty);
                return redirect('admin/product_warranties?product_id=' . $request->product_id)->with('message', 'تنوع قیمت جدید با موفقیت ایجاد شد');
            }
            DB::commit();
        } catch (\Exception $e) {
            throw $e;
            DB::rollBack();
        }
    }


    public function edit($id)
    {
        $product_warranties = ProductWarranty::findOrFail($id);
        $warranties = Warranty::pluck('name', 'id')->toArray();
        $colors = ProductColor::with('getColor')->where('product_id', $this->product->id)->get();
        $product = $this->product;
        return view('product_warranties.edit', compact('product_warranties', 'warranties', 'colors', 'product'));
    }


    public function update(UpdateProductWarrantyRequest $request, $id)
    {
        $productWarranty = ProductWarranty::findOrFail($id);
        $productWarranty->update($request->all());
        update_product_price($this->product);
        add_min_product_price($productWarranty);
        return redirect('admin/product_warranties?product_id=' . $request->product_id)->with('message', 'تنوع قیمت جدید با موفقیت ویرایش شد');
    }
}
