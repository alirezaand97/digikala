@if(\Illuminate\Support\Facades\Session::has('warning'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>توجه!</strong> {{\Illuminate\Support\Facades\Session::get('warning')}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif
