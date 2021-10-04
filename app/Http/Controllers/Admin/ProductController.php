<?php

namespace App\Http\Controllers\Admin;

use App\Brand;
use App\Category;
use App\Color;
use App\Filter;
use App\GiftCart;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\CreateProductWarranty;
use App\Jdf;
use App\Product;
use App\ProductColor;
use App\ProductFilter;
use App\ProductGallery;
use App\Specification;
use App\SpecificationValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\Promise\all;

class ProductController extends AdminBaseController
{

    protected $model = '\App\Product';
    protected $routeName = 'products';
    protected $modelName = ' محصول';

    public function index(Request $request)
    {
        $products = Product::getData($request);
        $trashed_count = Product::onlyTrashed()->count();
        return view('product.index', ['trashed_count' => $trashed_count, 'products' => $products, 'search' => $request->get('search')]);
    }


    public function create()
    {
        $categories = Category::get_list();
        $colors = Color::all();
        $brands = Brand::pluck('name', 'id');
        $product_status = Product::PRODUCT_STATUS;
        return view('product.create', compact('categories', 'brands', 'colors', 'product_status'));

    }


    public function store(CreateProductRequest $request)
    {
        $product = new Product($request->all());
        $image_url = upload_file($request, 'image_url', 'products');
        create_product_thumbnail('files/products/' . $image_url, $image_url);
        $product->image_url = $image_url;
        $product->product_url = get_url($request->ename);
        $product->keywords = convert_keywords($request->keywords);
        $product->is_gift_cart = $request->is_gift == 'on' ? GiftCart::IS_GIFT_CART : GiftCart::IS_NOT_GIFT_CART;
        $product->saveOrFail();

        foreach ($request->colors as $color) {
            DB::table('product_colors')->insert([
                'product_id' => $product->id,
                'color_id' => $color,
                'cat_id' => $product->cat_id
            ]);
        }
        update_cat_brands($product, []);

        return redirect('admin/products')->with('message', 'محصول جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $categories = Category::get_list();
        $colors = Color::get();
        $brands = Brand::pluck('name', 'id');
        $product_status = Product::PRODUCT_STATUS;
        $product = Product::findOrFail($id);
        $selected_colors = DB::table('product_colors')->where('product_id', $id)->pluck('color_id', 'color_id');
        return view('product.edit', compact('product', 'categories', 'colors', 'brands', 'product_status', 'selected_colors'));
    }


    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $request->merge([
            'keywords' => convert_keywords($request->keywords),
        ]);
        $data = $request->all();
        update_cat_brands($product, $data);
        if ($request->has('image_url')) {
            $image_url = upload_file($request, 'image_url', 'products');
            create_product_thumbnail('files/products/' . $image_url, $image_url);
            /**
             * حذف عکس های قبلی
             */
            remove_file('files/products/' . $product->image_url);
            remove_file('files/thumbnails/' . $product->image_url);
            $data['image_url'] = $image_url;
        }
        ProductColor::where('product_id', $product->id)->forceDelete();
        foreach ($request->colors as $color) {
            ProductColor::create([
                'cat_id' => $product->cat_id,
                'product_id' => $product->id,
                'color_id' => $color
            ])->save();
        }
        $data['is_gift_cart'] = $request->is_gift == 'on' ? GiftCart::IS_GIFT_CART : GiftCart::IS_NOT_GIFT_CART;
        $product->update($data);
        return redirect('admin/products')->with('message', 'محصول با موفقیت ویرایش شد');

    }

    public function gallery($id)
    {
        $product = Product::where('id', $id)->select(['id', 'title'])->firstOrFail();
        $gallery_images = ProductGallery::where('product_id', $product->id)->orderBy('position')->get();
        return view('product.gallery', compact('product', 'gallery_images'));
    }

    public function uploadGallery(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $count = ProductGallery::where('product_id', $product->id)->count() + 1;
        $image_url = upload_file($request, 'file', 'gallery', $product->id . rand(1, 100));
        if ($image_url != null) {
            $gallery = ProductGallery::create([
                'product_id' => $product->id,
                'position' => $count,
                'image_url' => $image_url,
            ]);
            $gallery->save();
            $count++;
            return 1;
        } else {
            return 0;
        }
    }

    public function removeImage($id)
    {
        $image = ProductGallery::findOrFail($id);
        if ($image) {
            remove_file('files/gallery/' . $image->image_url);
            $image->forceDelete();
        }
        return redirect()->back()->with(['message' => 'تصویر مورد نظر با موفقیت حذف شد']);
    }

    public function changeImagePosition(Request $request, $id)
    {
        $params = explode(',', $request->params);
        $pos = 1;
        foreach ($params as $param) {
            ProductGallery::where('id', $param)->update(['position' => $pos]);
            $pos++;
        }
        return 1;
    }

    public function specificationValue(Request $request)
    {
        $product = Product::findOrFail($request->id);
        $specifications = Specification::getProductSpecification($product);
        return view('product/specification', compact('product', 'specifications'));
    }

    public function CreateProductSpecificationValue(Request $request)
    {
        $items = $request->items;
        SpecificationValue::where('product_id', $request->id)->delete();
        foreach ($items as $key => $value) {
            if (!empty($value)) {
                SpecificationValue::create([
                    'specification_id' => $key,
                    'product_id' => $request->id,
                    'value' => $value
                ])->save();
            }

        }
        return redirect()->back()->with(['message' => 'مشخصات محصول با موفقیت ثبت شد']);
    }

    public function productFilters(Request $request)
    {
        $product = Product::findOrFail($request->id);
        $filters = Filter::getProductFilter($product);
        return view('product/filter', compact('product', 'filters'));
    }

    public function createProductFilters(Request $request)
    {
        $items = $request->items;
        ProductFilter::where('product_id', $request->id)->delete();
        foreach ($items as $key => $value) {
            foreach ($value as $subItem) {
                if (!empty($subItem)) {
                    ProductFilter::create([
                        'filter_id' => $key,
                        'product_id' => $request->id,
                        'value' => $subItem
                    ])->save();
                }
            }
        }
        return redirect()->back()->with(['message' => 'مقدار فیلتر های محصول با موفقیت ثبت شد']);
    }

    public function productSaleReport(Request $request, $product_id)
    {
        return view('product.product-sale-report', compact('product_id'));
    }

    public function getProductSaleReport(Request $request)
    {
        $jdf = new Jdf();
        $now = $jdf->tr_num($jdf->jdate('Y'));
        $selectedYear = !empty($request->get('selected_year')) ? $request->get('selected_year') : $now;
        $whereClause = ['year' => $selectedYear, 'product_id' => $request->get('product_id', 0)];
        return get_sale_report('product_sale_statistics', $request, $selectedYear, $whereClause, $now);
    }

}
