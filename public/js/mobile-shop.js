// const baseUrl = 'http://digikala.test/';
const baseUrl = 'http://digikala.test/';

$(document).ready(function () {
    $('.a_cat_parent_item').click(function () {
        if ($('.fa', this).hasClass('fa-angle-down')) {
            $('.fa', this).removeClass('fa-angle-down').addClass('fa-angle-up').addClass('active');
            $(this).parent().find('.a_cat_parent_list').show();
            $(this).addClass('active');
        } else {
            $('.fa', this).removeClass('fa-angle-up').addClass('fa-angle-down').removeClass('active');
            $(this).parent().find('.a_cat_parent_list').hide();
            $(this).removeClass('active');
        }
    });

    $('.a_cat_child_item').click(function () {
        if ($('.fa', this).hasClass('fa-angle-down')) {
            $('.fa', this).removeClass('fa-angle-down').addClass('fa-angle-up').addClass('active');
            $(this).parent().find('.a_cat_child_list').show();
            $(this).addClass('active');
        } else {
            $('.fa', this).removeClass('fa-angle-up').addClass('fa-angle-down').removeClass('active');
            $(this).parent().find('.a_cat_child_list').hide();
            $(this).removeClass('active');
        }
    })

    $("#open_menu").click(function () {
        $(".a_cat_container").show();
        $(".a_cat_box").css('right', '0px');
    })

    $(".a_cat_container").click(function (event) {
        let clientX = event.clientX;
        let width = $(window).width();
        if (width - clientX > 285) {
            $(".a_cat_box").css('right', '-285px');
            setTimeout(function () {
                $('.a_cat_container').hide();
            }, 700)
        }
    })

    $(document).on('click', '.c_dropup_overlay', function () {
        $(".c_dropup_container").css('bottom', '-100%');
        $(this).hide();

    })

    $(document).on('click', '.c_product_color_choose', function () {
        $(".c_dropup_container").css('bottom', '0');
        $(".c_dropup_overlay").show();

    })

    $(document).on('click', '.c_open_review', function () {
        $("#c_review_modal").show();
        $("body").css('overflow', 'hidden');
    });

    $(document).on('click', '.c_close_review', function () {
            $("#c_review_modal").hide();
        $("body").css('overflow', 'scroll');
    });


    $(document).on('click', '.c_open_specification', function () {
        $("#c_specification_modal").show();
        $("body").css('overflow', 'hidden');
    });

    $(document).on('click', '.c_close_specification', function () {
            $("#c_specification_modal").hide();
        $("body").css('overflow', 'scroll');
    });

    $(document).on('click', '.c_other_seller', function () {
        $("#c_more_price_modal").show();
        $("body").css('overflow', 'hidden');
    });

    $(document).on('click', '.c_close_other_price', function () {
            $("#c_more_price_modal").hide();
        $("body").css('overflow', 'scroll');
    });

    $(document).on('click', '.c_more_comment_open', function () {
        $("#c_more_comments").show();
        $("body").css('overflow', 'hidden');
    });

    $(document).on('click', '.c_close_comments', function () {
            $("#c_more_comments").hide();
        $("body").css('overflow', 'scroll');
    });

    $(document).on('click', '.advanced_search_btn', function () {
        $("#c_advanced_filter_box").show();
        $("body").css('overflow', 'hidden');
    });

    $(document).on('click', '.c_close_advanced_search', function () {
        $("#c_advanced_filter_box").hide();
        $("body").css('overflow', 'scroll');
    });

    $(document).on('click', '.review_btn', function () {
        let box = $(this).parent().find('.review_desc');
        let icon = $(this).parent().find('.review_btn span');
        console.log(icon);
        if (box.css('display') === 'block') {
            box.hide();
            icon.removeClass('fa-plus').addClass('fa-minus');
        } else {
            box.show();
            icon.removeClass('fa-minus').addClass('fa-plus');
        }
    });


    $(document).on('click', '#add_to_cart', function () {
        $('#add_to_cart_form').submit();
    });

    $(document).on('click', '.choose_color .color_li', function () {
        $('.choose_color .color_li').removeClass('active');
        $(this).addClass('active');
    })


    $(".cp_filter_header").click(function () {
        let el = $(this).parent().find('.cp_filter_sub_content');
        if (el.css('display') == 'none') {
            el.slideDown();
            $('.fa-angle-down', this).removeClass('fa-angle-down').addClass('fa-angle-up');
            $(this).css('border-bottom', '1px solid #f2f2f2');

        } else {
            el.slideUp();
            $('.fa-angle-up', this).removeClass('fa-angle-up').addClass('fa-angle-down');
            $(this).css('border-bottom', 'none');

        }
    });

    let params = new window.URLSearchParams(window.location.search);

    if (params.get('is_ready_to_shipment') != null) {
        if (params.get('is_ready_to_shipment') == 1) {
            $('#send_status').toggles({
                type: 'Light',
                text: {'on': '', 'off': ''},
                width: 45,
                direction: 'rtl',
                on: true
            });

            $("#cp_filter_box").show();
            const html = '<div class="cp_checked_filter cp_ready_to_shipment_filter"' +
                '<span class="cp_checked_filter_text"> فقط کالاهای آماده ارسال</span>' +
                '<span class="fa fa-close mr-1"></span>' +
                '</div>';
            $("#cp_checked_filter_box").append(html);
        }
    }

    if (params.get('has_product') != null) {
        if (params.get('has_product') == 1) {
            $('#product_status').toggles({
                type: 'Light',
                text: {'on': '', 'off': ''},
                width: 45,
                direction: 'rtl',
                on: true
            });

            $("#cp_filter_box").show();
            const html = '<div class="cp_checked_filter cp_has_product_filter"' +
                '<span class="cp_checked_filter_text"> فقط کالاهای موجود</span>' +
                '<span class="fa fa-close mr-1"></span>' +
                '</div>';
            $("#cp_checked_filter_box").append(html);
        }
    }

    $(".filter_input").keyup(function () {
        let value = $(this).val().toLowerCase();
        if (value.length > 0) {
            $(this).parent().find('.digi_input_clear').show();
        }
        let li = $(this).parent().parent().find('.cp_filter_sub_list li');
        for (let i = 0; i < li.length; i++) {
            let filter_item = li[i].innerText.toLowerCase();
            if (filter_item.indexOf(value) > -1) {
                li[i].style.display = 'flex';
            } else {
                li[i].style.display = 'none';
            }
        }
    });

    $('.digi_input_clear').click(function () {
        $(this).parent().find('.filter_input').val('');
        $(this).parent().parent().find('.cp_filter_sub_list li').show();
        $(this).hide();
    })


});


function showDetails(product_id, color_id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: baseUrl + 'ajax/change-product-color',
        type: 'POST',
        data: "product_id=" + product_id + "&" + "color_id=" + color_id,
        success: function (response) {
            $("#product_details").html(response);
        }
    });
}
