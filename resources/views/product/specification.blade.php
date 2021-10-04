@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت محصولات','url'=>url('admin/products')]],
   'current'=>['title'=>'افزودن مقادیر مشخصات']
   ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title"> مشخصات {{$product->title}}</h3>
        <form method="post" action="{{url('admin/products/'.$product->id.'/specification')}}">
            @csrf
            <div>
                @foreach($specifications as $spec)
                    <h5 class="mt-4 mb-4 digi_color_blue">{{$spec->title}}
                    </h5>
                    <div class="row">
                        @foreach($spec->getChild as $subSpec)

                            <div class="col-md-6 mt-2">
                                <label>{{$subSpec->title}}</label>
                                <input class="form-control" name="items[{{$subSpec->id}}]"
                                @if($subSpec->getValue) value="{{$subSpec->getValue['value']}}" @endif
                                >
                            </div>
                        @endforeach
                    </div>
                @endforeach
            </div>
            <div>
                <button class="btn digi_btn mt-5 pt-2 pl-4 pr-4">ثبت مشخصات</button>
            </div>
        </form>
    </div>
@endsection

