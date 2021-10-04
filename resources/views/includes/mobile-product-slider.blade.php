<div class="products_slider">
    <div class="products_box_title">
        <span>{{$list_title}}</span>
    </div>
    <div class="products_list" >
        <div class="swiper-container" dir="rtl">
            <div class="swiper-wrapper">
                @foreach($products_list as $product)
                    <div class="swiper-slide product_item">
                        <div class="product_thumb">
                            <a href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                                <img src="{{asset('files/thumbnails/'.$product->image_url)}}"/>
                            </a>
                        </div>
                        <a href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                            <h5 class="product_item_name">{{$product->title}}</h5>
                        </a>
                        <div class="product_price_box">
                            @if($product->discount_price>0)
                                <div class="old_price">
                                    <del>{{number_format($product->price+$product->discount_price)}}</del>
                                    <span class="discount">{{get_product_discount_price($product->price,$product->discount_price)}}٪</span>
                                </div>
                            @endif
                            <div class="price">
                                <span class="product_main_price">{{number_format($product->price)}}</span>
                                <span class="product_currency">تومان</span>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>


