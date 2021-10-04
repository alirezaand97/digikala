<div class="product_review_container">
    <div class="product_detail_header">
        <h2>نقد و بررسی اجمالی</h2>
        <div>{{$product->ename}}</div>
    </div>

    <div class="product_review_content">
        @foreach($reviews as $review)
            @if(empty($review->title))
                <div class="special_review_box">
                    <div class="special_review_content ">
                        {!! $review->description !!}
                    </div>
                    <span class="close_special_review ">بستن</span>
                </div>
            @else
                <div class="review_box">
                    <button class="review_btn"><span class="fa fa-plus"></span></button>
                    <h3 class="review_title">{{$review->title}}</h3>
                    <div class="review_desc">
                        {!! $review->description !!}
                    </div>
                </div>
            @endif
        @endforeach
    </div>
</div>
