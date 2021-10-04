<div class="row product_slider">
    <div class="col-12">
        <div class="products_box">
            <div class="products_box_title">
                <span>{{$list_title}}</span>
            </div>
            <div class="product_list" dir="rtl">
                @foreach($products_list as $product)
                    <a href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                        <div class="product_item">
                            <div class="product_thumb">
                                <img src="{{asset('files/thumbnails/'.$product->image_url)}}"/>
                            </div>
                            <h5 class="product_item_name">{{$product->title}}</h5>
                            @if($product->discount_price>0)
                                <div class="old_price">
                                    <del>{{number_format($product->price+$product->discount_price)}}</del>
                                    <span class="discount">
                                {{get_product_discount_price($product->price,$product->discount_price)}}٪
                            </span>
                                </div>
                            @endif

                            <div class="price">
                                <h3>{{number_format($product->price)}}</h3>
                                <span>تومان</span>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</div>
