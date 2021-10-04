@if(sizeof($product->gallery)>0)
    <div class="product_more_images">
        @foreach($product->gallery as $key=>$item)
            @if($key<4)
                <div class="gallery_item">
                    <img src="{{asset('/files/gallery/'.$item->image_url)}}"/>
                </div>
            @endif
        @endforeach
        <div class="gallery_item show_gallery_modal" data-toggle="modal" data-target="#product_gallery_modal">
            <span class="fa fa-ellipsis-h"></span>
        </div>
    </div>


    <div class="modal fade" id="product_gallery_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title gallery_modal_title" id="exampleModalLabel">تصاویر رسمی</span>
                    <button type="button" class="close m-0 p-0" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="gallery_modal_content">
                        <div class="gallery_modal_main_box">
                            @foreach($product->gallery as $key=>$item)
                                @if($key==0)
                                    <div class="gallery_modal_main_image">
                                        <img id="main_gallery_image" src="{{asset('/files/gallery/'.$item->image_url)}}" data-zoom-image="{{asset('/files/gallery/'.$item->image_url)}}"/>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                        <div class="gallery_modal_side">
                            @foreach($product->gallery as $key=>$item)
                                    <div class="gallery_item">
                                        <img src="{{asset('/files/gallery/'.$item->image_url)}}"/>
                                    </div>
                            @endforeach
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endif
