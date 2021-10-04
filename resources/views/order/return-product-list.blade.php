@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت محصولات مرجوعی']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت محصولات مرجوعی</h3>
        <div class="admin-header">
            <form action="{{url('admin/orders/return-product')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$request->get('search','')}}" placeholder="جستجوی عنوان محصول">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>عکس محصول</th>
                        <th>مشخصات</th>
                        <th>قیمت</th>
                        <th>عملیات</th>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($orderProducts as $orderProduct)
                        <tr>
                            <td>{{$orderProduct->id}}</td>
                            <td class="item_image_container">
                                @if($orderProduct->getProduct->image_url)
                                    <img src="{{url('files/thumbnails/'.$orderProduct->getProduct->image_url)}}"
                                         class="table_item_image"/>
                                @endif
                            </td>
                            <td class="return_list_item">
                                <div><span>{{$orderProduct->getProduct->title}}</span></div>
                                <div>
                                    فروشنده:
                                    <span>{{$orderProduct->getSeller->brand_name?$orderProduct->getSeller->brand_name:'دیجی کالا'}}</span>
                                </div>
                                <div>
                                    گارانتی : <span>{{$orderProduct->getWarranty->name}}</span>
                                </div>
                                <div>
                                    رنگ : <span>{{$orderProduct->getColor->name}}</span>
                                </div>
                                <div>
                                    تعداد : <span>{{$orderProduct->product_count}}</span>
                                </div>
                                <div>
                                    اضافه شده به انبار: <span>{{$orderProduct->getStockroom->name}}</span>
                                </div>
                                <div>
                                    توضیحات مرجوعی: <span>{{$orderProduct->description}}</span>
                                </div>
                            </td>
                            <td>
                                <span>{{number_format($orderProduct->product_price2*$orderProduct->product_count)}} تومان</span>
                            </td>
                            <td>
                                <div class="table_action">
                                    <a href="{{url('admin/orders/'.$orderProduct->order_id.'/show')}}"> <span
                                            data-feather="eye" class="feather" data-toggle="tooltip"
                                            data-placement="top"
                                            title="مشاهده سفارش"></span></a>

                                    <a class="cursor_pointer" data-toggle="modal"
                                       data-target="#return_product_modal_confirm"
                                       onclick="return_product_confirm('{{$orderProduct->getProduct->title}}',{{$orderProduct->id}})"
                                    ><span
                                            data-feather="x" class="feather" data-toggle="tooltip"
                                            data-placement="top"
                                            title="تغییر وضعیت به تحویل مشتری "></span></a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($orderProducts)==0)
                        <tr>
                            <td colspan="7" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$orderProducts->links()}}
    </div>

    <div class="modal fade" id="return_product_modal_confirm" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title gallery_modal_title" id="exampleModalLabel">تغییر وضعیت محصول به تحویل به
                        مشتری</h6>
                    <button type="button" class="close m-0 p-0" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="return_product_confirm_message"></p>
                    <form method="post" action="{{url('admin/orders/return-product/remove')}}">
                        @csrf
                        <input type="hidden" id="order_product_id" name="id">
                        <input type="hidden" id="type" name="type" value="output">
                        <label for="description">توضیحات</label>
                        <textarea class="form-control admin_textarea" id="description" name="description"></textarea>
                        <button type="submit" class="btn digi_btn mt-2">تغییر وضعیت</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script type="text/javascript">
        return_product_confirm = function (title, product_id) {
            let text = 'آیا مطمین هستید که می خواهید وضعیت محصول ' + title + ' را به تحویل به مشتری تغییر دهید؟';
            $("#return_product_confirm_message").text(text);
            document.getElementById('order_product_id').value = product_id;
        }
    </script>
@endsection
