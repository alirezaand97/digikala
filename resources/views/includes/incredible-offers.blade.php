@if(sizeof($incredible_offers)>0)
<div class="row incredible_offers pt-3 pb-3 pr-0 pl-0">
    <div class="col-2 incredible_side">
        <a>
            <img src="{{asset('images/incridible-offers.png')}}"/>
        </a>
    </div>
    <div class="col-10">
        <div class="incredible_slider_container">
            <div class="row">
                <div class="col-sm-9 h-100">
                    @foreach($incredible_offers as $key=>$offer)
                        <div class="offer_item" id="offer_{{$key}}" @if($key==0) style="display: block" @endif>
                            <div class="row">
                                <div class="col-5 offer_image">
                                    <div class="offer_image_top"
                                         style='background: url("{{asset("images/specialoffer.png")}}") #fb3449'>
                                    </div>
                                    <img src="{{asset('files/thumbnails/'.$offer->getProduct->image_url)}}"/>
                                </div>
                                <?php $discount = 100 - round(($offer->price2 / $offer->price1) * 100)?>
                                <div class="col-7 offer_product">
                                    <div class="old_price">
                                        <del>{{$offer->price1}}</del>
                                        <span class="discount">{{$discount}}٪</span>
                                    </div>
                                    <div class="price">
                                        <h3>{{number_format($offer->price2)}}</h3>
                                        <span>تومان</span>
                                    </div>
                                    <h5 class="product_name">{{$offer->getProduct->title}}</h5>
                                    <div>
                                        <ul class="list-unstyled p-0 mt-4">
                                            @foreach($offer->getProductSpecificationValues as $key=>$spec)
                                                @if($key<2)
                                                    <li><span>{{$spec->getImportantSpecification->title}}</span> :
                                                        <span>{{$spec->value}}</span></li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </div>
                                    <Timer seconds="<?= $offer->offers_end_time-time() ?>"></Timer>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="col-sm-3">
                    <ul class="offer_side_list list-unstyled h-100 p-0 position-relative" id="offer_side_list">
                        @foreach($incredible_offers as $key=>$offer)
                            <li data-offer="{{$key}}" id="offer_button_{{$key}}"
                                class="offer_side_cat_btn @if($key==0) active @endif">{{$offer->getProduct->getCategory->name}}</li>
                        @endforeach
                        <li class="more_offers">
                            <span><span data-feather="arrow-left"></span></span>
                            <span>مشاهده همه پیشنهاد ها</span>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</div>
@endif
