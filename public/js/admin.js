const baseUrl = 'http://digikala.test/';

$(document).ready(function () {
    let Toggled = false;
    let delete_url;
    let token;
    let _method = 'DELETE';
    let send_group_item_form = false;

    select_file = function () {
        $('#cat_image').click();
    };

//نمایش تصویر اپلود شده
    load_image = function (event) {
        const render = new FileReader();
        render.onload = function () {
            const imageEl = document.getElementById('categroy_image_upload');
            imageEl.src = render.result;
            $('#categroy_image_upload').css({'display': 'block'})
        };
        render.readAsDataURL(event.target.files[0]);
    };

    second_select_file = function () {
        $('#second_image').click();
    };

//نمایش تصویر اپلود شده
    second_load_image = function (event) {
        const render = new FileReader();
        render.onload = function () {
            const imageEl = document.getElementById('second_image_upload');
            imageEl.src = render.result;
            $('#second_image_upload').css({'display': 'block'})
        };
        render.readAsDataURL(event.target.files[0]);
    };

    del_confirm = function (url, t, message) {
        token = t;
        delete_url = url;
        $('#confirm_delete_modal').modal('show');
        $('.delete_modal_content').text(message);
    };

    del_item = function () {
        //اگر شرط صادق بود فرم دارای چک باکس و در غیر اینصورت فرم خود ساخته ارسال شود
        if (send_group_item_form) {
            $('#data_form_group_select').submit();
        } else {
            //یک فرم برای ارسال حذف ایتم ایجاد و ارسال می کنیم
            let form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', delete_url);

            let methodImput = document.createElement('input');
            methodImput.setAttribute('name', '_method');
            methodImput.setAttribute('value', _method);
            form.appendChild(methodImput);

            let tokenInput = document.createElement('input');
            tokenInput.setAttribute('name', '_token');
            tokenInput.setAttribute('value', token);
            form.appendChild(tokenInput);

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            close_del_item();
        }

    };

    close_del_item = function () {
        delete_url = '';
        token = '';
    };

    $(document).ready(function () {
        $(".data_checkbox").click(function () {
            const checkboxes = $('table tr td input[type="checkbox"]');
            const count = checkboxes.filter(':checked').length;
            if (count > 0) { //اگر چک باکس انتخاب نشده باشد دکمه غیرفعال شود
                $('.action_item').removeClass('off');
            } else {
                $('.action_item').addClass('off');
            }
        });
    })

    $(document).ready(function () {
        $(".data_checkbox").click(function () {
            const checkboxes = $('.c_comment_container input[type="checkbox"]');
            const count = checkboxes.filter(':checked').length;
            if (count > 0) { //اگر چک باکس انتخاب نشده باشد دکمه غیرفعال شود
                $('.action_item').removeClass('off');
            } else {
                $('.action_item').addClass('off');
            }
        });
    })

    $('.action_item').click(function () {
        send_group_item_form = true;
        const checkboxes = $('table tr td input[type="checkbox"]');
        const count = checkboxes.filter(':checked').length;
        if (count > 0) { //در صورت انتخاب یک چک باکس
            const href = window.location.href.split('?');
            action = href[0] + '/' + this.id;
            if (href[1]) {
                action = action + '?' + href[1];
            }
            $('#data_form_group_select').attr('action', action); //مشخص کردن url فرم
            $('#confirm_delete_modal').modal('show'); //باز شدن مدال تایید
            $('.delete_modal_content').text($(this).attr('msg')); //دریافت مسیج از تگ
        }
    });

    $('.action_item').click(function () {
        send_group_item_form = true;
        const checkboxes = $('.c_comment_container input[type="checkbox"]');
        const count = checkboxes.filter(':checked').length;
        if (count > 0) { //در صورت انتخاب یک چک باکس
            const href = window.location.href.split('?');
            action = href[0] + '/' + this.id;
            if (href[1]) {
                action = action + '?' + href[1];
            }
            $('#data_form_group_select').attr('action', action); //مشخص کردن url فرم
            $('#confirm_delete_modal').modal('show'); //باز شدن مدال تایید
            $('.delete_modal_content').text($(this).attr('msg')); //دریافت مسیج از تگ
        }
    });

    $('svg').tooltip();

    $('span').tooltip();

    restore_item = function (url, t, message) {
        _method = 'post';
        token = t;
        delete_url = url;
        $('#confirm_delete_modal').modal('show');
        $('.delete_modal_content').text(message);
    };

    add_new_specification = function () {
        const id = document.getElementsByClassName('specs').length + 1;
        const html =
            '<div class="row specs mt-3" id="item_-' + id + '">' +
            '<div class="col-sm-12">' +
            '<input class="form-control" placeholder="ویژگی اصلی" name="item[-' + id + ']" >' +
            '<span class="btn btn-link  mt-1"  onclick="add_new_sub_specification(' + id + ')">افزودن زیر ویژگی</span>' +
            '</div>' +
            '</div>';
        $("#specifications").append(html);
    };

    add_new_sub_specification = function (id) {
        const sub_id = document.getElementsByClassName('sub_specs').length + 1;
        const html =
            '<div class="col-sm-6 mt-2 d-flex align-items-center sub_specs">' +
            '<input type="checkbox"  name="checkbox[-' + id + '][-' + sub_id + ']">' +
            '<input class="form-control mr-1" name="subitem[-' + id + '][-' + sub_id + ']" placeholder="ویژگی زیرین" >' +
            '</div>';

        $("#item_-" + id).append(html);

    };

//برای فیلتر ها و دیگر موارد این چنینی
//تفوات با بالایی در داشتن چک باکس
    add_new_item = function () {
        const id = document.getElementsByClassName('item').length + 1;
        const html =
            '<div class="row item mt-3" id="item_-' + id + '">' +
            '<div class="col-sm-12">' +
            '<input class="form-control" placeholder="فیلتر اصلی" name="item[-' + id + ']" >' +
            '<span class="btn btn-link  mt-1"  onclick="add_new_sub_specification(' + id + ')">افزودن زیر فیلتر</span>' +
            '</div>' +
            '</div>';
        $("#items_container").append(html);
    };

    add_new_sub_item = function (id) {
        const sub_id = document.getElementsByClassName('sub_item').length + 1;
        const html =
            '<div class="col-sm-6 mt-2 d-flex align-items-center sub_item">' +
            '<input class="form-control mr-1" name="subitem[-' + id + '][-' + sub_id + ']" placeholder="فیلتر زیرین" >' +
            '</div>';

        $("#item_-" + id).append(html);

    };

    jQuery(function ($) {
        $(".sidebar-dropdown > a").click(function () {
            $(".sidebar-submenu").slideUp(200);
            if (
                $(this)
                    .parent()
                    .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(200);
                $(this)
                    .parent()
                    .addClass("active");
            }
        });

        $("#close-sidebar").click(function () {
            $(".page-wrapper").removeClass("toggled");
            $("#show-sidebar").addClass('d-inline-block').removeClass('d-none');

        });
        $("#show-sidebar").click(function () {
            $(".page-wrapper").addClass("toggled");
            $("#show-sidebar").addClass('d-none').removeClass('d-inline-block');
        });

        $(document).ready(function () {
            $("#show-sidebar").addClass('d-none').removeClass('d-inline-block');
        })
    });

    $(".comment_status").click(function () {
        let status = $(this).attr('data-status');
        let comment_id = $(this).attr('data-comment-id');
        const el = $(this);
        $("#loading_box").show();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: baseUrl + 'admin/product/comments/status/change',
            type: 'POST',
            data: 'comment_id=' + comment_id,
            success: function (response) {
                if (response === 'success') {
                    if (status == 0) {
                        el.text('تایید شده');
                        el.removeClass('comment_pending').addClass('comment_accepted');
                        el.attr('data-status', 1);
                    } else {
                        el.text('در انتظار تایید');
                        el.removeClass('comment_accepted').addClass('comment_pending');
                        el.attr('data-status', 0);
                    }
                } else {
                    $(".notif_container").show();
                    setInterval(function () {
                        $(".notif_container").hide();

                    }, 5000);
                }
                $("#loading_box").hide();
            }
        });
    })

    $(".question_status").click(function () {
        let status = $(this).attr('data-status');
        let question_id = $(this).attr('data-question-id');
        const el = $(this);
        $("#loading_box").show();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: baseUrl + 'admin/product/question/status/change',
            type: 'POST',
            data: 'question_id=' + question_id,
            success: function (response) {
                if (response === 'success') {
                    if (status == 0) {
                        el.text('تایید شده');
                        el.removeClass('question_pending').addClass('comment_accepted');
                        el.attr('data-status', 1);
                    } else {
                        el.text('در انتظار تایید');
                        el.removeClass('comment_accepted').addClass('question_pending');
                        el.attr('data-status', 0);
                    }
                } else {
                    $(".notif_container").show();
                    setInterval(function () {
                        $(".notif_container").hide();

                    }, 5000);
                }
                $("#loading_box").hide();
            }
        });
    })

});

const monthNames = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];
getMonthName = function (key) {
    return monthNames[key];
}

number_format=function (number) {
    return new Intl.NumberFormat('fa').format(number)
}
