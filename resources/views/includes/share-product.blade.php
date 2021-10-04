<div class="modal  fade" id="share_product_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">اشتراک گذاری محصول</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="share_desc">
                    با استفاده از روش‌های زیر می‌توانید این صفحه را با دوستان خود به اشتراک بگذارید.
                </p>
                <div class="share_actions">
                    <div class="share_social">
                        <a class="share_social_btn share_twitter"
                           href="https://twitter.com/intent/tweet?url={{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                            <span data-feather="twitter"></span>
                        </a>
                        <a class="share_social_btn share_facebook"
                           href="https://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]={{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                            <span data-feather="facebook"></span>
                        </a>
                        <a class="share_social_btn share_whatsapp"
                           href="https://wa.me?text={{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                            <span class="fa fa-whatsapp"></span>
                        </a>
                        <a class="share_social_btn share_mail">
                            <span data-feather="mail"></span>
                        </a>
                    </div>
                    <div class="share_link c_btn_outlined_gray" id="share_link"
                         data-link="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                        <span class="fa fa-copy"></span>
                        کپی لینک
                    </div>
                </div>
                <div class="share_email_container">
                    <div class="share_email_box">
                        <input type="email" class="digi_input" id="share_email" placeholder="آدرس ایمیل را وارد نمایید">
                        <input type="hidden" id="share_email_product_id" value="{{$product->id}}">
                        <span class=" c_btn c_btn_red" id="share_email_submit">ارسال</span>
                    </div>
                </div>
                <div class="share_email_result">
                    <span class="share_email_message"></span>
                </div>

            </div>
        </div>
    </div>
</div>
