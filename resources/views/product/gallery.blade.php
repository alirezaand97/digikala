@extends('layouts/admin')
@section('styles')
    <link href="{{asset('css/dropzone.css')}}" rel="stylesheet" type="text/css"/>
@endsection
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت محصولات','url'=>url('admin/products')]],
   'current'=>['title'=>' گالری محصول']
   ])
    @include('includes.message-alert')

    <div class="pannel">
        <h3 class="admin_pages_title">
            گالری تصویر برای {{$product->title}}
        </h3>
        <form action="{{url('admin/products/gallery_upload/'.$product->id)}}"
              class="dropzone"
              method="post"
              id="upload_file">
            {{csrf_field()}}
            <input type="file" name="file" multiple class="display_none"/>
            <div class="dz-message" data-dz-message><span>عکس های محصول را اینجا بکشید یا انتخاب کنید</span></div>
        </form>
        @if(count($gallery_images)!=0)
            <div class="table-responsive-md table-responsive-lg table-responsive-sm mt-5">
                <table class="table table-bordered  table-hover" id="gallery_table">
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>عکس محصول</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php $i = 1 ?>
                    @foreach($gallery_images as $image)
                        <tr id="{{$image->id}}">
                            <td>{{$i}}</td>
                            <td class="text-center"><img src="{{url('files/gallery/'.$image->image_url)}}"
                                                         class="product_gallery_image"/></td>
                            <td class="text-center">
                             <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                   data-placement="top"
                                   title="حذف تصویر"
                                   onclick="del_confirm('{{url('admin/products/gallery/'.$image->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این تصویر مطمئن هستید؟' )"
                             ></span>
                            </td>
                        </tr>
                        <?php $i++ ?>
                    @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
@endsection

@section('scripts')
    <script src="{{asset('js/dropzone.js')}}" type="application/javascript"></script>
    <script>
        //آپلود تصاویر از طریق کتابخانه Dropzone
        Dropzone.options.uploadFile = {
            acceptedFiles: '.png,.jpg,.jpeg',
            addRemoveLinks: true,
            init: function () {
                this.options.dictRemoveFile = 'حذف';
                this.options.dictInvalidFileType = 'امکان آپلود این فایل وجود ندارد';
                this.on('success', function (file, response) {
                    if (response == 1) {
                        file.previewElement.classList.add('dz-success');
                    } else {
                        file.previewElement.classList.add('dz-error');
                        $(file.previewElement).find('.dz-error-message').text('خطا در آپلود فایل');
                    }
                });
                this.on('error', function (file, response) {
                    file.previewElement.classList.add('dz-error');
                    $(file.previewElement).find('.dz-error-message').text('خطا در آپلود فایل');
                })
            }
        }

        //مرتب کردن ترتیب نمایش عکس ها از طریق jquery-ui/sortable
        const gallery = $("#gallery_table > tbody");
        gallery.sortable({
            //با هر درگ اند دراپ یک بار تابع زیر اجرا می شود
            stop: function (event, ui) {
                $('#loading_box').show();
                const parameters = gallery.sortable("toArray");

                /**
                 *
                 برای ارسال داده به صورت ایجکس به csrf token نیاز داریم.
                 CSRF Protection مطالعه شود
                 */

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: '{{url('admin/products/change_image_position/'.$product->id)}}',
                    type: 'POST',
                    data: 'params=' + parameters,
                    success: function (data) {
                        $('#loading_box').hide();
                    }
                })
            }
        });


    </script>
@endsection
