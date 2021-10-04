<div class="c_comment_container">
    <form method="post" id="data_form_group_select">
        @csrf
        @foreach($questions as $question)
            <div class="c_comment_wrapper">
                <div class="c_comment_header">
                    <div class="c_comment_status">
                        <input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                               value='{{$question->id}}'/>
                        @if($question->status==1)
                            <span class="question_accepted question_status" data-status="1"
                                  data-question-id="{{$question->id}}"> تایید شده</span>
                        @else
                            <span class="question_pending question_status" data-status="0"
                                  data-question-id="{{$question->id}}">در انتظار تایید</span>
                        @endif
                    </div>
                    <div>
                        <span class="faq_label"> ثبت شده توسط</span>
                        @if($question->getUserInfo)
                            <span>{{$question->getUserInfo->first_name.' '.$question->getUserInfo->last_name}}</span>
                        @else
                            <span>ناشناس</span>
                        @endif

                        <?php
                        $jdf = new \App\Jdf();
                        $date = $jdf->jdate('d F Y', $question->time)
                        ?>
                        <span class="faq_label"> در تاریخ</span>
                        <span>{{$date}}</span>

                        @if( $question->order_id>0)
                            <span class="comment_customer">خریدار</span>
                        @endif
                    </div>
                    <div>
                                <span data-feather="trash" class="feather digi_color_red" data-toggle="tooltip"
                                      data-placement="top"
                                      title="حذف رنگ"
                                      onclick="del_confirm('{{url('admin/questions/'.$question->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این پرسش ها مطمئن هستید؟' )"
                                ></span>
                        @if($question->trashed())
                            <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                  data-placement="top"
                                  title="بازنشانی پرسش ها"
                                  onclick="restore_item('{{url('admin/questions/restore/'.$question->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این پرسش ها مطمئن هستید؟' )"
                            ></span>
                        @endif
                    </div>
                </div>

                <div class="faq_content">
                    {{$question->content}}

                    @if($question->question_id>0)
                        <div class="question_parent">
                            <div class="faq_main_question">سوال اصلی:</div>
                            <div> {{$question->getParent->content}}</div>
                        </div>
                    @endif
                </div>

                <a target="_blank" href="{{url("product/dgk-".$question->getProduct->id.'/'.$question->getProduct->product_url)}}" class="digi_dashed_link faq_link">
                    {{$question->getProduct->title}}
                </a>
            </div>
        @endforeach

        {{$questions->links()}}

    </form>
</div>
