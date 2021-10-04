@if(sizeof($sliders)>0)
<div class="row sliders">
    <div class="col-lg-8">
        <div class="slider_container">
            <div class="slider_box">
                @foreach($sliders as $key=>$slider)
                <div class="slide_div" id="slide_{{$key}}">
                    <a
                        href="{{url($slider->url)}}"
                        class="slider_item"
                        style='background: url("{{asset('files/slider/'.$slider->image_url)}}")'>
                    </a>
                </div>
                @endforeach
            </div>
            <div class="slider_arrow slider_prev" onclick="prev()"><span data-feather="chevron-left"></span>
            </div>
            <div class="slider_arrow slider_next" onclick="next()"><span data-feather="chevron-right"></span>
            </div>
            <div class="slider_bullet_box">
                @for($i=0;$i<sizeof($sliders);$i++)
                <span class="slider_bullet @if($i==0) active @endif" id="bullet_{{$i}}"
                      onclick="go_to_slide('<?= $i ?>')"></span>
                @endfor
            </div>
        </div>
    </div>
    <div class="col-lg-4 siders_side_container">
        @foreach($slidersSide as $sliderSide)
        <div class="slider_side">
            <a href="{{asset($sliderSide->url)}}"
               style='background: url("{{asset('files/slider/'.$sliderSide->image_url)}}")'></a>
        </div>
        @endforeach
    </div>
</div>
@endif
