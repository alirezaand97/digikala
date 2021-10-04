<?php


namespace App;


class SearchProduct
{
    protected $request;
    protected $maxPrice = 0;
    protected $minPrice = 0;
    protected $attributes = array();
    public $brands = array();
    protected $colors = null;
    protected $searchString = null;
    protected $hasProduct = 0;
    protected $readyToShipment = 0;
    protected $ready = 0;
    protected $sortBy = ['view', 'DESC'];
    protected $categories = array();

    const SORT_ARRAY = [
        21 => ['view', 'DESC'],
        22 => ['order_number', 'DESC'],
        23 => ['id', 'DESC'],
        24 => ['price', 'ASC'],
        25 => ['price', 'DESC'],
    ];

    public function __construct($request)
    {
        $this->request = $request;
        $this->setPriceRange($request);
        if ($request->has('color')) {
            $this->colors = $request->color;
        }
        $this->searchString = $request->get('string', null);

        if ($request->sortBy && array_key_exists($request->sortBy, self::SORT_ARRAY)) {
            $this->sortBy = self::SORT_ARRAY[$request->sortBy];
        }
        $this->hasProduct = $request->get('has_product', 0);
        $this->readyToShipment = $request->get('is_ready_to_shipment', 0);
    }


    public function setCategories($category)
    {
        $this->categories[$category->id] = $category->id;
        foreach ($category->children as $catChild) {
            $this->categories[$catChild->id] = $catChild->id;
            foreach ($catChild->children as $value) {
                $this->categories[$value->id] = $value->id;
            }
        }
    }

    public function getCatProducts()
    {
        $productMaxPrice = Product::orderBy('price', 'DESC');
        $products = Product::select(['id', 'title', 'product_url', 'image_url', 'status', 'price', 'discount_price','score','score_count']);

        if (is_array($this->categories) && sizeof($this->categories)>0) {
            $products = $products->whereIn('cat_id', $this->categories);
            $productMaxPrice = $productMaxPrice->whereIn('cat_id', $this->categories);
        }


        if (is_array($this->request->attribute)) {
            $productsId = $this->setAttributes($this->request);
            $products = $products->whereIn('id', $productsId);
        }

        if ($this->brands !== null) {
            if (is_array($this->brands)){
                $products = $products->whereIn('brand_id', $this->brands);
                $productMaxPrice = $productMaxPrice->whereIn('brand_id', $this->brands);
            }else{
                $products = $products->where('brand_id', $this->brands);
                $productMaxPrice = $productMaxPrice->where('brand_id', $this->brands);
            }

        }

        if ($this->hasProduct==1) {
            $products = $products->where('status', 1);
        }
        if ($this->readyToShipment) {
            $products = $products->where('ready_to_shipment', 0);
        }

        if ($this->colors !== null) {
            define('colors', $this->colors);
            $products = $products->whereHas('getProductColor', function ($query) {
                $query->whereIn('color_id', colors);
            });
        }

        if ($this->searchString !== null) {
            $products = $products->where('title', 'like', '%' . $this->searchString . '%');
        }

        if ($this->maxPrice > 0) {
            $products = $products->where('price', '<=', $this->maxPrice);
        }
        if ($this->minPrice > 0) {
            $products = $products->where('price', '>=', $this->minPrice);
        }

        $products->orderBy($this->sortBy[0], $this->sortBy[1]);
        $maxPrice = $productMaxPrice->first();

        $count = $products->count();
        $products = $products->with(['getProductColor.getColor', 'getFirstProductPrice'])->paginate(3);
        return [
            'products' => $products,
            'maxPrice' => $maxPrice,
            'count' => $count
        ];
    }

    private function setPriceRange($request)
    {
        $data = $request->all();
        if (array_key_exists('price', $data)) {
            if (array_key_exists('min', $data['price'])) {
                $this->minPrice = $data['price']['min'];
            }
            if (array_key_exists('max', $data['price'])) {
                $this->maxPrice = $data['price']['max'];
            }
        }
    }

    private function setAttributes($request)
    {
        $array = array();
        foreach ($request->attribute as $filterId => $filterValues) {
            //آیدی محصولاتی که با فیلتر ها هم خوانی دارند را پیدا می کنیم
            $array[$filterId] = ProductFilter::whereIn('value', $filterValues)->pluck('product_id', 'id')->toArray();
        }

        if (sizeof($array) > 1) {
            //در صورت وجود چند فیلتر بین ای دی محصولاتی که در هر فیلتر وجود دارد اشتراک می گیریم
            $productsId = call_user_func_array('array_intersect', $array);
        } else {
            $productsId = collect($array)->values()->all()[0];
        }
        return $productsId;
    }

    public function setBrandCategories($category)
    {
        if(is_array($category) && sizeof($category)>0){
            $i=0;
            foreach ($category as $item){
                $this->categories[$i]=$item;
                $i++;
            }

            $cats=Category::whereIn('parent_id',$category)->get();
            foreach ($cats as $item){
                $this->categories[$i]=$item;
                $i++;
            }
        }

    }
}
