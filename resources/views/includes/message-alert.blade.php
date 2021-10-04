@if(\Illuminate\Support\Facades\Session::has('message'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>موفق</strong> {{\Illuminate\Support\Facades\Session::get('message')}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif
