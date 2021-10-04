<?php

namespace App\Http\Controllers\Admin;

use App\Product;
use App\Review;
use App\Http\Controllers\Admin\AdminBaseController;
use Illuminate\Http\Request;

class ReviewController extends AdminBaseController
{
    protected $model = '\App\Review';
    protected $routeName = 'reviews';
    protected $modelName = ' نقد و بررسی';
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
        $reviews = Review::getData($request);
        $trashed_count = Review::onlyTrashed()->count();
        return view('review.index', [
            'reviews' => $reviews,
            'trashed_count' => $trashed_count,
            'search' => $request->get('search'),
            'queryString' => $this->query_string,
            'product' => $this->product
        ]);
    }


    public function create()
    {
        $product = Product::findOrFail($this->product->id);
        return view('review.create', compact('product'));
    }


    public function store(Request $request)
    {
        $this->validate($request, ['description' => 'required'], [], ['description' => 'توضیحات نقد و بررسی']);
        if (empty($request->title)) {
            Review::whereNull('title')->where('product_id', $this->product->id)->delete();
        }
        $review = new Review($request->all());
        $review->save();
        return redirect('admin/reviews?product_id=' . $request->product_id)->with('message', 'نقد و بررسی جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $review = Review::findOrFail($id);
        return view('review.edit', ['review' => $review, 'product' => $this->product]);
    }


    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        if (empty($request->title)) {
            Review::whereNull('title')->where('product_id', $this->product->id)->delete();
        }
        $review->update($request->all());
        return redirect('admin/reviews?product_id=' . $request->product_id)->with('message', 'نقد و بررسی با موفقیت به روز رسانی شد');
    }
}
