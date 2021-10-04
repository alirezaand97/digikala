<div class="c_wrapper">
    <div class="c_box_container">
        <div class="c_box_title">
            <span>دیدگاه های کاربران</span>
            <a class="blue_outline_btn" href="{{url("product/comment/".$product->id)}}">
                افزودن نظر جدید
                <span data-feather="plus"></span>
            </a>
        </div>
        <div class="comments_container_box">
            @foreach($comments as $comment)
                <div class="comment_item_box">
                    <div class="comment_title">
                        <div
                            class="comment_user">{{$comment->getUserInfo['first_name']?$comment->getUserInfo['first_name'] . $comment->getUserInfo['last_name'] : 'کاربر دیجی کالا'}}</div>
                        <div>
                            <?php
                            $jdf = new \App\Jdf();
                            $date = $jdf->jdate('d F Y', $comment->time)
                            ?>
                            {{$date}}
                        </div>
                    </div>
                    <div class="comment_content">{{$comment->content}}</div>
                </div>
            @endforeach
            <div class="c_more_comment_open">
                دیدگاه های دیگر
                <span class="fa fa-angle-left mr-1"></span>
            </div>
        </div>
    </div>
</div>
