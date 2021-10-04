<?php

use Morilog\Jalali\Jalalian;

$jdate = Jalalian::forge('today')->format('%A, %d %B %y');
?>
<nav aria-label="breadcrumb" class="breadcrumb_container">
    <div class="d-flex align-items-center">
    <span>
        <span data-feather="menu" id="show-sidebar"></span>

    </span>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('admin')}}">داشبورد</a></li>
            @foreach($data as $item)
                <li class="breadcrumb-item"><a href="{{$item['url']}}">{{$item['title']}}</a></li>
            @endforeach
            @if(isset($current))
                <li class="breadcrumb-item active" aria-current="page">{{$current['title']}}</li>
            @endif
            @if(isset($_GET['trashed']) && $_GET['trashed']=='true')
                <li class="breadcrumb-item active" aria-current="page">سطل زباله</li>
            @endif
        </ol>
    </div>
    <div class="breadcrumb-item active calender" aria-current="page"><span data-feather="calendar"></span>{{$jdate}}
    </div>
</nav>
