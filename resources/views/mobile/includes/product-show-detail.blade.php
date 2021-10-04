<form action="{{route('add-cart')}}" method="post" id="add_to_cart_form">
    @csrf
    <div class="c_wrapper">
        <h5 class="c_product_title">
            {{$product->title}}
        </h5>
        <div class="c_product_ename"> {{$product->ename}}</div>
        <div class="c_product_actions">
            <div class="c_action_list">
                <span id="add_favorite" class="favorite" product_id="{{$product->id}}" ><span data-feather="heart" class="c_action_icon @if($favorite) favorite_checked @endif"></span></span>
                <span data-feather="share-2" class="c_action_icon"></span>
                <span data-feather="bell" class="c_action_icon"></span>
            </div>
            <div class="c_rate_box">
                @if($product->score_count>0)
                    <?php $rate = floor($product->score / ($product->score_count * 6)); ?>
                    ({{$product->score_count}}) <span class="c_rate_number">{{$rate}}</span>
                    <span class="fa fa-star c_action_icon c_rate"></span>
                @endif
            </div>
        </div>
        <div class="c_product_gallery_box">
            @if(sizeof($product->gallery)>0)
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        @foreach($product->gallery as $key=>$image)
                            <div class="swiper-slide">
                                <div class="c_gallery_image_box">
                                    <img class="c_product_gallery_image"
                                         src="{{asset('files/gallery/'.$image->image_url)}}">
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            @else
                <img class="c_product_gallery_image" src="{{asset('files/products/'.$product->image_url)}}"/>
            @endif
        </div>
        <div>
            <ul class="product_brand">
                <li>برند:<a href="{{url('brand/'.$product->getBrand->ename)}}">{{$product->getBrand->name}}</a></li>
                <li>دسته بندی: <a
                        href="{{url('search/'.$product->getCategory->url)}}">{{$product->getCategory->name}}</a></li>
            </ul>
        </div>
    </div>

    <div class="c_wrapper">
        <div class="product_summary">
            <?php
            $warranty_id = 0;
            $send_time = 0;
            $price = 0;
            $oldPrice = 0;
            ?>
            @foreach($product->getProductWarranty as $key=>$productWarranty)

                @if($color_id>0)
                    @if( $productWarranty->color_id==$color_id && $warranty_id==0)
                        <?php
                        $warranty_id = $productWarranty->warranty_id;
                        $send_time = $productWarranty->send_time;
                        $warranty_name = $productWarranty->getWarranty->name;
                        $price = $productWarranty->price2;
                        $oldPrice = $productWarranty->price1;
                        ?>
                    @endif
                @else
                    @if($key==0)
                        <?php
                        $warranty_id = $productWarranty->warranty_id;
                        $send_time = $productWarranty->send_time;
                        $warranty_name = $productWarranty->getWarranty->name;
                        $price = $productWarranty->price2;
                        $oldPrice = $productWarranty->price1;
                        ?>
                    @endif
                @endif
            @endforeach
            <div class="product_summary_box">
                <div class="summary_item">
                    <img src="{{asset('images/home.svg')}}">
                    <span>فروشنده:</span>
                    <span class="seller">دیجی کالا</span>
                </div>
                <div class="summary_item">
                    <img src="{{asset('images/shield.svg')}}">
                    <span>{{$warranty_name}}</span>
                </div>
                <div class="summary_item">
                    <img src="{{asset('images/archive.svg')}}">
                    @if($send_time>0)
                        <span>ارسال توسط دیجی‌کالا از {{$send_time}} روز کاری دیگر</span>
                    @else
                        <span>آماده ارسال</span>
                    @endif
                </div>
                <div class="product_price">
                    @if($price!=$oldPrice)
                        <div class="old_price">
                            <del>{{number_format($oldPrice)}}</del>
                            <span class="discount">{{get_product_dis_with_prices($price,$oldPrice)}}٪</span>
                        </div>
                    @endif
                    <div class="price">
                        <h3>{{number_format($price)}}</h3>
                        <span>تومان</span>
                    </div>
                </div>
                <div class="c_other_seller">
                    <span> فروشندگان دیگر این کالا</span>
                    <span class="fa fa-angle-left"></span>
                </div>
            </div>
        </div>
    </div>

    <div class="c_checkout_submit">
        <span class="add_to_cart" id="add_to_cart">افزودن به سبد خرید</span>
    </div>

    <div class="c_wrapper">
        <div class="c_product_color_choose">
            <?php $firstColor = get_first_color($product->getProductColor, $product->getProductWarranty[0]->color_id);?>
            <div class="d-flex align-items-center">
                رنگ: <span class="product_selected_color" style="background:{{$firstColor->getColor->code}}"></span>
                <span>{{$firstColor->getColor->name}}</span>
            </div>
            <div class="c_product_more_color">({{sizeof($product->getProductColor)}}رنگ)
                <span class="fa fa-angle-down angle_down"></span>
            </div>
        </div>
    </div>

    @if(sizeof($related_products)>0)
        @include('includes/mobile-product-slider',['products_list'=>$related_products,'list_title'=>'محصولات مشابه'])
    @endif

    @if(sizeof($reviews)>0 || sizeof($product_specs)>0)
        <div class="c_wrapper">
            @if(sizeof($reviews)>0)
                <div class="c_box_container">
                    <div class="c_box_title c_open_review">
                        <span>نقد و بررسی تخصصی</span>
                        <div class="dg_blue">
                            <span>ادامه</span>
                            <span class="fa fa-angle-down angle_down"></span>
                        </div>
                    </div>
                    <div class="c_box_content">
                        {!! $reviews[0]->description !!}
                    </div>
                </div>
            @endif

            @if(sizeof($product_specs)>0)
                <div class="c_box_container mt-3">
                    <div class="c_box_title c_open_specification">
                        <span>مشخصات محصول</span>
                        <div class="dg_blue">
                            <span>ادامه</span>
                            <span class="fa fa-angle-down angle_down"></span>
                        </div>
                    </div>
                    <div class="c_box_content">
                        @if(sizeof($product_specs)>0)
                            <ul class="product_specification">
                                <?php $i = 0 ?>
                                @foreach($product_specs as $spec)
                                    @foreach($spec->getChild as $key=>$value)
                                        @if($value->getValue['value']&&$value->show_item==1)
                                            @if($i<7)
                                                <li>
                                                    {{$value->title}} : {{$value->getValue['value']}}
                                                </li>
                                            @endif
                                        @endif
                                        <?php $i++ ?>
                                    @endforeach
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </div>
            @endif
        </div>
    @endif

    @if(sizeof($comments)>0)
        @include('mobile.includes.product-comments')
    @endif

    @if(sizeof($questions)>0)
        @include('mobile.includes.product-questions')
    @endif



    <div class="c_dropup_container">
        <div class="c_dropup_wrapper">
            <ul class="choose_color">
                <li>انتخاب رنگ:</li>
                @foreach($product->getProductColor as $productColor)
                    @if(is_color_in_product_warranty($product->getProductWarranty,$productColor->getColor->id))
                        <?php if (!$color_id && first_color($product->getProductWarranty, $productColor->getColor->id)) {
                            $color_id = $productColor->getColor->id;
                        } ?>
                        <li class="color_li @if($color_id==$productColor->getColor->id) active @endif"
                            @if(first_color($product->getProductWarranty,$productColor->getColor->id)) @endif
                            onClick="showDetails('<?=$product->id ?>','<?= $productColor->getColor->id ?>');"
                            data-id="{{$productColor->getColor->id}}"
                        >
                            <span class="color_name">{{$productColor->getColor->name}}</span>
                            <span class="color_circle" style="background: {{$productColor->getColor->code}}"></span>
                        </li>
                    @endif

                @endforeach
            </ul>
            <div class="c_dropup_overlay"></div>
        </div>
    </div>

    <div class="c_modal_container" id="c_review_modal">
        <div class="c_modal_title c_close_review">
            <span class="ml-3" data-feather="arrow-right"></span>نقد و بررسی تخصصی
        </div>
        <div class="c_modal_content">
            @foreach($reviews as $review)
                @if(empty($review->title))
                    <div class="special_review_box">
                        <div class="special_review_content ">
                            {!! $review->description !!}
                        </div>
                    </div>
                @else
                    <div class="review_box">
                        <span class="review_btn"><span class="fa fa-plus"></span></span>
                        <h3 class="review_title">{{$review->title}}</h3>
                        <div class="review_desc">
                            {!! $review->description !!}
                        </div>
                    </div>
                @endif
            @endforeach
        </div>
    </div>

    <div class="c_modal_container" id="c_specification_modal">
        <div class="c_modal_title c_close_specification">
            <span class="ml-3" data-feather="arrow-right"></span>مشخصات محصول
        </div>
        <div class="c_modal_content specification_container">
            <table>
                @foreach($product_specs as $spec)
                    @if(sizeof($spec->getChild)>0)
                        <tr>
                            <td colspan="2" class="head_title">{{$spec->title}}</td>
                        </tr>
                        @foreach($spec->getChild as $value)
                            @if($value->getValue)
                                <tr>
                                    <td class="spec_title"><p>{{$value->title}}</p></td>
                                </tr>
                                <tr>
                                    <td class="spec_value"><p>{{$value->getValue['value']}}</p></td>
                                </tr>
                            @endif
                        @endforeach
                    @endif
                @endforeach
            </table>
        </div>
    </div>

    <mobile-more-product-price :product_id="<?= $product->id ?>"></mobile-more-product-price>

    <mobile-comment  product_id="<?= $product->id ?>" product_title="<?= $product->title ?>"></mobile-comment>

    <mobile-question  product_id="<?= $product->id ?>" product_title="<?= $product->title ?>"></mobile-question>

    <input type="hidden" name="warranty_id" id="warranty_id" value="{{$warranty_id}}">
    <input type="hidden" name="product_id" value="{{$product->id}}">
    <input type="hidden" name="color_id" id="color_id" value="{{$color_id}}">
</form>

