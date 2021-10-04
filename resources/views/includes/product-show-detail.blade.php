<form action="{{route('add-cart')}}" method="post" id="add_to_cart_form">
    @csrf
    <div class="product_details">
        <h5 class="product_title">
            {{$product->title}}
        </h5>
        <div class="product_ename"> {{$product->ename}}</div>
        <div class="product_detail_flex">
            <div class="product_config">
                <div>
                    <ul class="product_brand">
                        <li>برند:<a href="{{url('brand/'.$product->getBrand->ename)}}">{{$product->getBrand->name}}</a>
                        </li>
                        <li>دسته بندی: <a
                                href="{{url('search/'.$product->getCategory->url)}}">{{$product->getCategory->name}}</a>
                        </li>
                    </ul>
                </div>
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
                @if(sizeof($product_specs)>0)
                    @if(sizeof($product_specs)>0)
                        <ul class="product_specification">
                            <?php $i = 0 ?>
                            @foreach($product_specs as $spec)
                                @foreach($spec->getChild as $key=>$value)
                                    @if($value->getValue['value']&&$value->show_item==1)
                                        <li @if($i>3) class="toggle_spec_item" @endif>
                                            {{$value->title}} : {{$value->getValue['value']}}
                                        </li>
                                    @endif
                                    <?php $i++ ?>
                                @endforeach
                            @endforeach
                            <span class="show_more digi_dashed_link" id="show_more_spec">+موارد بیشتر</span>
                        </ul>
                    @endif
                @endif
            </div>

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
                    <span class="add_to_cart" id="add_to_cart">افزودن به سبد خرید</span>
                </div>
            </div>
        </div>
    </div>


    <input type="hidden" name="warranty_id" id="warranty_id" value="{{$warranty_id}}">
    <input type="hidden" name="product_id" value="{{$product->id}}">
    <input type="hidden" name="color_id" id="color_id" value="{{$color_id}}">
</form>
