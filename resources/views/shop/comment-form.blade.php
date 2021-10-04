@extends('layouts.shop')
@section('content')
    <div class="c_container">
        <form method="post" action="{{url('product/comment/'.$product->id)}}" id="c_comment_form">
            @csrf
            <div class="c_comment_row">
                <div class="c_image_box">
                    <a href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                        <img src="{{asset('files/products/'.$product->image_url)}}">
                    </a>
                </div>
                <div class="c_score_slider_container">
                    <div class="c_product_title">
                        <h3 class="c_Product_name">
                            {{$product->title}}
                            <span class="c_Product_ename">{{$product->ename}}</span>
                        </h3>
                    </div>
                    <div class="c_score_box">
                        <?php
                        $score_array1 = ['کیفیت ساخت', 'نوآوری', 'سهولت استفاده'];
                        $score_array2 = ['ارزش خرید نسبت به قیمت', 'امکانات و قابلیت ها', 'طراحی و ظاهر'];
                        ?>
                        <div class="c_score_col">
                            @foreach($score_array1 as $score)
                                <div class="score_item">
                                    <label>{{$score}}</label>
                                    <div class="range_slider">
                                        <span class="range_step range_step_two" data-rate-title="خیلی بد"></span>
                                        <span class="range_step range_step_there" data-rate-title="بد"></span>
                                        <span class="range_step range_step_four" data-rate-title="معمولی"></span>
                                        <span class="range_step range_step_five" data-rate-title="خوب"></span>
                                        <span class="range_step range_step_six" data-rate-title="خیلی خوب"></span>
                                    </div>
                                    <input type="range" name="score_item[]" min="0" max="4" value="2"
                                           class="c_score_input">
                                </div>
                            @endforeach
                        </div>
                        <div class="c_score_col">
                            @foreach($score_array2 as $score)
                                <div class="score_item">
                                    <label>{{$score}}</label>
                                    <div class="range_slider">
                                        <span class="range_step range_step_two" data-rate-title="خیلی بد"></span>
                                        <span class="range_step range_step_there" data-rate-title="بد"></span>
                                        <span class="range_step range_step_four" data-rate-title="معمولی"></span>
                                        <span class="range_step range_step_five" data-rate-title="خوب"></span>
                                        <span class="range_step range_step_six" data-rate-title="خیلی خوب"></span>
                                    </div>
                                    <input type="range" name="score_item[]" min="0" max="4" value="2"
                                           class="c_score_input">
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
            <div class="c_comment_row">
                <div class="c_comment_info_fields">
                    <div class="dg_input_div">
                        <label class="digi_label">عنوان نظر شما</label>
                        <input type="text" name="title" class="digi_input">
                    </div>
                    <div class="dg_input_ mt-3">
                        <label class="digi_label c_positive_label">نقاط قوت</label>
                        <div class="c_inp_icon">
                            <input type="text" class="digi_input c_comment_inp" id="positive_points">
                            <span class="c_add_points" data-feather="plus-square"></span>
                        </div>
                        <div class="positive_points_list">
                        </div>
                    </div>

                    <div class="dg_input_div mt-3">
                        <label class="digi_label c_negative_label">نقاط ضعف</label>
                        <div class="c_inp_icon">
                            <input type="text" class="digi_input c_comment_inp" id="negative_points">
                            <span class="c_add_points" data-feather="plus-square"></span>
                        </div>
                        <div class="negative_points_list">
                        </div>
                    </div>

                    <div class="dg_input_div mt-3">
                        <label class="digi_label">متن نظر شما(اجباری)</label>
                        <div class="position-relative">
                            <textarea name="content" id="c_comment_content" class="digi_input"></textarea>
                            <span class="dg_error_pop" id="c_content_error"></span>
                        </div>

                    </div>

                    <div>
                        <button class="c_submit_btn">ثبت نظر</button>
                    </div>
                </div>
                <div class="c_guide">
                    <h3 class="c_guide_header">دیگران را با نوشتن نظرات خود، برای انتخاب این محصول راهنمایی کنید.</h3>
                    <p class="c_guide_title">لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:</p>
                    <ul>
                        <li>لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن تند، تمسخرو
                            توهین باشد.
                        </li>
                        <li>از ارسال لینک‌های سایت‌های دیگر و ارایه‌ی اطلاعات شخصی خودتان مثل شماره تماس، ایمیل و آی‌دی
                            شبکه‌های اجتماعی پرهیز کنید.
                        </li>
                        <li>در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی کالا ارائه‌ی اطلاعات مشخص و دقیق برای
                            راهنمایی سایر کاربران در فرآیند خرید یک محصول توسط ایشان است.
                        </li>
                    </ul>

                    <p class="c_guide_title">پیشنهاد می‌شود قوانین کامل ثبت نظر را در این صفحه مطالعه کنید.</p>
                    <ul>
                        <li>هرگونه نقد و نظر در خصوص سایت دیجی‌کالا، مشکلات دریافت خدمات و درخواست کالا و نیز گزارش تخلف فروش (نظیر گزارش کالای غیراصل یا مغایر) را با ایمیل  info@digikala.com  یا با شماره‌ی  ۶۱۹۳۰۰۰۰ - ۰۲۱  در میان بگذارید و از نوشتن آن‌ها در بخش نظرات خودداری کنید.

                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
@endsection
