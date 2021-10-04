@extends('layouts.shop')
@section('content')
    <div class="comp_container">
        <div class="comp_gallery_container">
            @foreach($products as $product)
                <div class="comp_gallery_box">
                    <div>
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                @foreach($product->gallery as $gallery)
                                    <div class="swiper-slide">
                                        <img src="{{asset('files/gallery/'.$gallery->image_url)}}"
                                             class="comp_slider_image"/>
                                    </div>
                                @endforeach
                            </div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                    </div>
                    <div class="comp_product_title">{{$product->title}}</div>
                    <div class="comp_product_price">{{number_format($product->price)}} تومان</div>
                    <a href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}" class="comp_product_link">مشاهده
                        و خرید محصول</a>
                    <span data-feather="x" data-id="/dgk-{{$product->id}}" class="remove_compare_item"></span>
                </div>
            @endforeach
            @if(sizeof($products)<4)
                <div class="comp_gallery_box">
                    <div class="add_comp_box" data-toggle="modal" data-target=".compare_products_modal">
                        <span class="com_plus">+</span>
                        <span>برای افزودن کالا به لیست مقایسه کلیک کنید</span>
                    </div>
                    <span class="comp_product_link add_comp_btn" data-toggle="modal" data-target=".compare_products_modal">افزودن کالا به مقایسه</span>
                </div>
            @endif
        </div>
        <div class="comp_speci_container">
            @foreach($specification as $spec)
                <div class="comp_spec_title">{{$spec->title}}</div>
                <ul class="comp_spec_list">
                    @foreach($spec->getChild as $subSpec)
                        <li class="comp_spec_item_title">{{$subSpec->title}}</li>
                        <li class="comp_spec_values">
                            <div>{{get_product_spec($products,0,$subSpec->id)}}</div>
                            <div>{{get_product_spec($products,1,$subSpec->id)}}</div>
                            <div>{{get_product_spec($products,2,$subSpec->id)}}</div>
                            <div>{{get_product_spec($products,3,$subSpec->id)}}</div>
                        </li>
                    @endforeach
                </ul>

            @endforeach
        </div>

        <compare-products-modal :category="{{$products[0]->cat_id}}"></compare-products-modal>

    </div>
@endsection
<script>

</script>

@section('styles')
    <link href="{{asset('css/swiper-bundle.css')}}" rel="stylesheet" type="text/css"/>
@endsection

@section('scripts')
    <script src="{{asset('js/swiper-bundle.js')}}" type="text/javascript"></script>
    <script>
        const swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    </script>
@endsection
<script>
    import CompareProductsModal from "../../js/components/CompareProductsModal";
    export default {
        components: {CompareProductsModal}
    }
</script>
