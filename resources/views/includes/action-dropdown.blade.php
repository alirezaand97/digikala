<div class="dropdown">
    <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
        گزینه ها
    </button>
    <?php
    if (isset($queryString)) {
        $query_string = $queryString;
    } else {
        $query_string = '';
    }
    ?>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="{{url($url.'/create?'.$query_string)}}"><span data-feather="edit-2"
                                                                                     class="feather"></span>
            افزودن {{$title}}
            جدید</a>
        @if(isset($count))
        <a class="dropdown-item" href="{{url($url.'?trashed=true&'.$query_string)}}"><span data-feather="trash-2"
                                                                                           class="feather"></span> سطل
            زباله
            ({{isset($count)?$count:''}})</a>
        @endif
        <a class="dropdown-item action_item off" id="remove_items"
           msg="آیا می خواهید گزینه های انتخابی از {{$title}} را حذف کنید"><span
                data-feather="x" class="feather"></span>حذف {{$title}} ها </a>
        @if(isset($_GET['trashed']) && $_GET['trashed']=='true')
            <a class="dropdown-item action_item off" id="restore_items"
               msg="آیا می خواهید گزینه های انتخابی از {{$title}} را بازیابی کنید"><span data-feather="refresh-cw"
                                                                                         class="feather"></span>بازیابی {{$title}}
                ها </a>
        @endif
    </div>
</div>
