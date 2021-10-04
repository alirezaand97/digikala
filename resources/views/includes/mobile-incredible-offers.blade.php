@if(sizeof($incredible_offers)>0)
    <div class="incredible_offers_list">
        <div class="swiper-container" dir="rtl">
            <div class="swiper-wrapper">
                <div class="incredible_side swiper-slide" id="incredible_icon_box">
                    <img src="{{asset('images/incridible-offers.png')}}"/>
                </div>
                @foreach($incredible_offers as $offer)
                    <div class="swiper-slide product_item">
                        <div class="product_thumb">
                            <a href="{{url('product/dgk-'.$offer->getProduct->id.'/'.$offer->getProduct->product_url)}}">
                                <img src="{{asset('files/thumbnails/'.$offer->getProduct->image_url)}}"/>
                            </a>
                        </div>
                        <a href="{{url('product/dgk-'.$offer->getProduct->id.'/'.$offer->getProduct->product_url)}}">
                            <h5 class="product_item_name">{{$offer->getProduct->title}}</h5>
                        </a>
                        <div class="product_price_box">
                            @if($offer->getProduct->discount_price>0)
                                <div class="old_price">
                                    <del>{{number_format($offer->getProduct->price+$offer->getProduct->discount_price)}}</del>
                                    <span class="discount">{{get_product_discount_price($offer->getProduct->price,$offer->getProduct->discount_price)}}٪</span>
                                </div>
                            @endif
                            <div class="price">
                                <span class="product_main_price">{{number_format($offer->getProduct->price)}}</span>
                                <span class="product_currency">تومان</span>
                            </div>
                        </div>
                        <incredible-timer seconds="<?= $offer->offers_end_time-time() ?>"></incredible-timer>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endif
