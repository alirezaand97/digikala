<div class="c_wrapper">
    <div class="c_box_container">
        <div class="c_box_title">
            <span>پرسش های کاربران</span>
            <a class="blue_outline_btn" id="add_new_question">
                افزودن پرسش
                <span data-feather="plus"></span>
            </a>
        </div>
        <div class="comments_container_box">
            @foreach($questions as $question)
                <div class="comment_item_box">
                    <div class="comment_title">
                        <div
                            class="comment_user">{{$question->getUser['name']?$question->getUser['name'] : 'کاربر دیجی کالا'}}</div>
                        <div>
                            <?php
                            $jdf = new \App\Jdf();
                            $date = $jdf->jdate('d F Y', $question->time)
                            ?>
                            {{$date}}
                        </div>
                    </div>
                    <div class="comment_content">{{$question->content}}</div>
                </div>
            @endforeach
            <div id="more_questions_open" class="show_more_questions">
                 پرسش های دیگر
                <span class="fa fa-angle-left mr-1"></span>
            </div>
        </div>
    </div>
</div>
