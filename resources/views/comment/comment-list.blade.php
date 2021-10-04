<div class="c_comment_container">
    <form method="post" id="data_form_group_select">
        @csrf
        @foreach($comments as $comment)
            <div class="c_comment_wrapper">
                <div class="c_comment_header">
                    <div class="c_comment_status">
                        <input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                               value='{{$comment->id}}'/>
                        @if($comment->status==1)
                            <span class="comment_accepted comment_status" data-status="1" data-comment-id="{{$comment->id}}"> تایید شده</span>
                        @else
                            <span class="comment_pending comment_status" data-status="0" data-comment-id="{{$comment->id}}">در انتظار تایید</span>
                        @endif
                    </div>
                    <div>
                        <span class="faq_label"> ثبت شده توسط</span>
                        @if($comment->getUserInfo)
                            <span>{{$comment->getUserInfo->first_name.' '.$comment->getUserInfo->first_name}}</span>
                        @else
                            <span>ناشناس</span>
                        @endif

                        <?php
                        $jdf = new \App\Jdf();
                        $date = $jdf->jdate('d F Y', $comment->time)
                        ?>
                        <span class="faq_label"> در تاریخ</span>
                        <span>{{$date}}</span>

                        @if( $comment->order_id>0)
                            <span class="comment_customer">خریدار</span>
                        @endif
                    </div>
                    <div>
                                <span data-feather="trash" class="feather digi_color_red" data-toggle="tooltip"
                                      data-placement="top"
                                      title="حذف رنگ"
                                      onclick="del_confirm('{{url('admin/comments/'.$comment->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این دیدگاه مطمئن هستید؟' )"
                                ></span>
                        @if($comment->trashed())
                            <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                  data-placement="top"
                                  title="بازنشانی دیدگاه"
                                  onclick="restore_item('{{url('admin/comments/restore/'.$comment->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این دیدگاه مطمئن هستید؟' )"
                            ></span>
                        @endif
                    </div>
                </div>
                <div class="row c_comment_info">
                    <div class="col-6">
                        <h3 class="c_comment_product_title">{{$comment->getProduct->title}}</h3>
                        <div class="c_comment_scores">
                            @foreach(get_scores_info($comment->getScore) as $item)
                                <div class="c_comment_score_item">
                                    <span class="c_score_label">{{$item['label']}}</span>
                                    <div class="score_bar_outer">
                                        <div class="score_bar_inner"
                                             style="width:{{ $item['value'] * 25}}%"></div>
                                    </div>
                                    <span class="score_type">{{$item['type']}}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            @if(sizeof($comment->advantage)>1)
                                <div class="col-6">
                                    <div>نقاط قوت</div>
                                    <ul class="points_list advantage_points_list">
                                        @foreach($comment->advantage as $advantage)
                                            @if(!empty($advantage))
                                                <li>{{$advantage}}</li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            @if(sizeof($comment->disadvantage)>1)
                                <div class="col-6">
                                    <div>نقاط ضعف</div>
                                    <ul class="points_list disadvantage_points_list">
                                        @foreach($comment->disadvantage as $disadvantage)
                                            @if(!empty($disadvantage))
                                                <li>{{$disadvantage}}</li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                        </div>
                        <div class="c_comment_title"><span
                                class="weight_500">عنوان دیدگاه: </span> {{$comment->title}}</div>
                        <div class="c_comment_content"><span
                                class="weight_500">متن دیدگاه: </span> {{$comment->content}}</div>
                    </div>
                </div>
            </div>
        @endforeach

        {{$comments->links()}}

    </form>
</div>
