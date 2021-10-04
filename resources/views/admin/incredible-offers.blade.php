@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'پیشنهادات شگفت انگیز']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت پیشنهادات شگفت انگیز</h3>
        <div>
            <incredible-offers></incredible-offers>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{asset('js/js-persian-cal.min.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        const pcal1 = new AMIB.persianCalendar( 'pcal1' );
        const pcal2 = new AMIB.persianCalendar( 'pcal2' );
    </script>
@endsection
@section('styles')
    <link href="{{asset('css/js-persian-cal.css')}}" rel="stylesheet" type="text/css" />
@endsection
