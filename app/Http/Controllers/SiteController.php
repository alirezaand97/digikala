<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Cart;
use App\CatBrand;
use App\Category;
use App\Color;
use App\Comment;
use App\Favorite;
use App\Lib\Mobile_Detect;
use App\Like;
use App\Mail\SendAnswerToQuestionNotif;
use App\Mail\SharePorductEmail;
use App\Mail\ShareProductEmail;
use App\Page;
use App\Product;
use App\ProductColor;
use App\ProductWarranty;
use App\Question;
use App\Review;
use App\SearchProduct;
use App\Slider;
use App\Specification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class SiteController extends Controller
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

    public function index()
    {
        $sliders = Slider::orderBy('id')->take(5)->get();
        $slidersSide = Slider::orderBy('id')->skip(5)->take(2)->get();
        $incredible_offers = ProductWarranty::where('is_offer', 1)
            ->with(['getProduct.getCategory'])
            ->with(['getProductSpecificationValues' => function ($query) {
                $query->whereHas('getImportantSpecification')->with('getImportantSpecification');
            }])
            ->limit(9)->get();

        $newest_products = Product::where('status', 1)->orderBy('id', 'DESC')->limit(10)->get();
        $best_selling_products = Product::where('status', 1)->orderBy('order_number', 'DESC')->limit(10)->get();
        $randomOffers = Product::where('status', 1)
            ->inRandomOrder()
            ->limit(10)
            ->select(['id', 'title', 'image_url', 'product_url', 'price', 'discount_price'])
            ->get();

        return view($this->view . 'shop.index', compact(
            'sliders',
            'slidersSide',
            'incredible_offers',
            'newest_products',
            'best_selling_products',
            'randomOffers'
        ));
    }

    public function showProduct($product_id, $product_url = null)
    {
        $id = str_replace('dgk-', '', $product_id);
        $where = ['id' => $id];
        if ($product_url) {
            $where = ['id' => $id, 'product_url' => $product_url];
        }
        $product = Product::with(['getProductColor.getColor', 'getBrand', 'getCategory', 'gallery', 'getProductWarranty.getWarranty'])->where($where)->firstOrFail();
        $product_specs = Specification::getProductSpecification($product);
        $reviews = Review::where('product_id', $product->id)->get();
        $related_products = Product::where(['cat_id' => $product->cat_id, 'brand_id' => $product->brand_id])->where('id', '!=', $product->id)->limit(10)->get();
        $favorite = null;
        if (Auth::check()) {
            $favorite = Favorite::where(['product_id' => $id, 'user_id' => Auth::id()])->first();
        }
        $comments = [];
        if ($this->view === 'mobile.') {
            $comments = Comment::where(['product_id' => $id, 'status' => 1])->with(['getUserInfo'])->take(2)->get();
        }

        $questions = [];
        if ($this->view === 'mobile.') {
            $questions = Question::where(['product_id' => $id, 'status' => 1, 'question_id' => 0])->with(['getUser'])->take(2)->get();
        }

        return view($this->view . 'shop.show-product', compact('product', 'product_specs', 'related_products', 'reviews', 'comments', 'favorite', 'questions'));

    }

    public function changeProductColor(Request $request)
    {
        $product_id = $request->product_id;
        $color_id = $request->color_id;
        $product = Product::with(['getProductColor.getColor', 'getBrand', 'getCategory', 'getProductWarranty.getWarranty'])
            ->where('id', $product_id)
            ->first();
        $product_specs = Specification::getProductSpecification($product);
        $reviews = Review::where('product_id', $product->id)->get();
        $related_products = Product::where(['cat_id' => $product->cat_id, 'brand_id' => $product->brand_id])->where('id', '!=', $product->id)->limit(10)->get();
        return view($this->view . 'includes.product-show-detail', compact('product', 'color_id', 'product_specs', 'reviews', 'related_products'));
    }

    public function showCatProductsPage(Request $request)
    {
        $catUrl = $request->cat_url;
        $category = Category::with(['parent.parent'])
            ->with(['children' => function ($query) {
                $query->whereNull('search_url');
            }])
            ->where('url', $catUrl)
            ->first();
        $filters = Category::getCatFilters($category);
        $brands = CatBrand::with(['getBrand'])->where(['cat_id' => $category->id])->get();
        $colors = [];
        $hasColor = ProductColor::where('cat_id', $category->id)->first();
        if ($hasColor) {
            $colors = Color::get();
        }

        return \view($this->view . 'shop.category-products', compact('filters', 'brands', 'colors', 'category'));
    }

    public function getCatProducts(Request $request)
    {
        $category = Category::with(['children'])
            ->where('url', $request->cat_url)
            ->whereNull('search_url')
            ->firstOrFail();
        $searchProduct = new SearchProduct($request);
        $searchProduct->setCategories($category);
        $searchProduct->brands = $request->brand;
        $products = $searchProduct->getCatProducts();

        return $products;
    }

    public function showBrandProductsPage(Request $request)
    {
        $brand = Brand::where(['ename' => $request->brand])->with(['getCatBrand'])->firstOrFail();
        return \view($this->view . 'shop.brand-products', compact('brand'));
    }

    public function getBrandProducts(Request $request)
    {
        $brand = Brand::with(['getCatBrand.getCat'])->where(['ename' => $request->brand])->firstOrFail();
        $searchProduct = new SearchProduct($request);
        $searchProduct->brands = $brand->id;
        $searchProduct->setBrandCategories($request->category);
        $products = $searchProduct->getCatProducts();
        return $products;
    }

    public function compareProducts($product_id1, $product_id2 = null, $product_id3 = null, $product_id4 = null)
    {
        $productsId = get_compare_products_id(array($product_id1, $product_id2, $product_id3, $product_id4));
        $products = Product::with(['gallery', 'specificationValue'])
            ->whereIn('id', $productsId)
            ->select(['id', 'title', 'cat_id', 'brand_id', 'product_url', 'price', 'discount_price', 'image_url'])
            ->get();
        $specification = Specification::getCategorySpecification($products[0]->cat_id);
        return \view('shop.compare', compact('products', 'specification'));
    }

    public function getCompareProducts(Request $request)
    {
        $catId = $request->get('cat_id', 0);
        $brandId = $request->get('brand_id', 0);
        $search = $request->get('search', 0);
        $products = Product::where('cat_id', $catId)->select(['id', 'title', 'price', 'image_url']);
        if ($brandId > 0) {
            $products = $products->where('brand_id', $brandId);
        }
        if ($search) {
            $products = $products->where('title', 'like', '%' . $search . '%');
        }
        $products = $products->orderBy('order_number', 'DESC')->paginate(12);
        return $products;

    }

    public function getCatBrands(Request $request)
    {
        $catId = $request->get('cat_id', 0);
        return CatBrand::with(['getBrand'])->where('cat_id', $catId)->get();
    }

    public function commentForm($product_id)
    {
        $product = Product::where('id', $product_id)->first();
        return \view('shop.comment-form', compact('product'));
    }

    public function addComment($product_id, Request $request)
    {
        $product = Product::where('id', $product_id)->firstOrFail();
        $status = Comment::addComment($product, $request);
        return redirect('product/dgk-' . $product_id . '/' . $product->product_url)->with(['status' => $status]);
    }

    public function getCartData()
    {
        $cartData = Cart::showCart();
        return $cartData;
    }

    public function addQuestion(Request $request)
    {
        $sendEmail = $request->get('send_email') == 'true' ? Question::SEND_EMAIL : Question::NO_SEND_EMAIL;
        $question = new Question($request->all());
        $question->send_email = $sendEmail;
        $question->user_id = Auth::id();
        $question->time = time();
        $questionId = $request->get('question_id');
        $question->save();
        if ($questionId > 0) { //اگر پاسخ باشد به تعداد پاسخ های سوال مرتبط یکی اضافه می کنیم
            $parentQuestion = Question::where('id', $questionId)->first();
            $parentQuestion->answer_count = $parentQuestion->answer_count + 1;
            $parentQuestion->update();

            $questionParent = Question::with(['getUserInfo'])->where(['send_email' => 'yes', 'id' => $questionId])->first();
            if ($questionParent && $questionParent->getUserInfo) {
                Mail::to($questionParent->getUserInfo->email)->send(new SendAnswerToQuestionNotif($questionParent, $question));
            }

        }

    }

    public function getQuestions(Request $request, $product_id)
    {
        $user = Auth::user();
        $sortBy = $request->get('sortBy', 1);
        $questions = Question::with(['getUser', 'getAnswer.getUser'])
            ->where(['product_id' => $product_id, 'question_id' => 0, 'status' => Question::QUESTION_PUBLISHED]);
        if ($sortBy == 1) {
            $questions->orderBy('id', 'DESC');
        } elseif ($sortBy == 2) {
            $questions->orderBy('answer_count', 'DESC');
        } else if ($sortBy == 3 && $user) {
            $questions->orderByRaw(DB::raw("FIELD(user_id," . $user->id . ") DESC"));
        }
        $questions = $questions->paginate(1);

        return $questions;
    }

    public function likeItem(Request $request)
    {
        return Like::likeItem($request, 'like');
    }

    public function dislikeItem(Request $request)
    {
        return Like::likeItem($request, 'dislike');
    }

    public function addFavoriteProduct(Request $request)
    {
        if ($request->ajax()) {
            $productId = $request->get('product_id');
            $userId = Auth::id();
            $favorite = Favorite::where(['user_id' => $userId, 'product_id' => $productId])->first();
            if ($favorite) {
                $favorite->delete();
            } else {
                Favorite::create([
                    'product_id' => $productId,
                    'user_id' => $userId
                ])->save();
            }
            return 'success';
        } else {
            return redirect('/');
        }
    }

    public function shareProductInEmail(Request $request)
    {
        $product = Product::where('id', 3)->first();
        if ($product) {
            Mail::to($request->email)->send(new ShareProductEmail($product));
            return 'success';
        } else {
            abort(404);
        }
    }

    public function showPage($page)
    {
        $showPage = Page::where('url', $page)->firstOrFail();
        return view('additional-page.index',compact('showPage'));
    }

}
