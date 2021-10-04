@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت محصولات','url'=>url('admin/products')]],
   'current'=>['title'=>'افزودن مقادیر فیلتر']
   ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title"> فیلترهای {{$product->title}}</h3>
        <form method="post" action="{{url('admin/products/'.$product->id.'/filters')}}">
            @csrf
            <div class="row">
                @foreach($filters as $filter)
                    <div class="col-md-6">
                        <label class="mt-4">{{$filter->title}}</label>
                        <select name="items[{{$filter->id}}][]" class="js-filters" multiple="multiple">
                            @foreach($filter->getChild as $subFilter)
                                <option
                                    value="{{$subFilter->id}}"
                                @if(is_option_selected($filter->getValue,'value',$subFilter->id)) selected="selected" @endif
                                >{{$subFilter->title}}</option>
                            @endforeach
                        </select>
                    </div>
                @endforeach
            </div>
            <div>
                <button class="btn digi_btn mt-5 pt-2 pl-4 pr-4">ثبت مشخصات</button>
            </div>
        </form>
    </div>
@endsection


@section('scripts')
    <script>
        $(".js-filters").select2({
            tags: true,
            tokenSeparators: [',', ' '],
            placeholder: 'مقدار یا مقادیر فیلتر را انتخاب کنید',
        });
    </script>

@endsection
