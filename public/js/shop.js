const baseUrl = 'http://digikala.test/';

//nav bar
$(document).ready(function () {
    // $('#show_mega_menu').mouseover(function () {
    //     $('.mega_menu').show();
    // });
    //
    // $('.main_category li').mouseover(function () {
    //     const cat_id = $(this).attr('id');
    //     const id = cat_id.split('-')[1];
    //     $('.sub_category').hide();
    //     $('#sub-' + id + '').show();
    //
    // });
    //
    // $('.mega_menu').mouseleave(function () {
    //     $('.sub_category').hide();
    //     $('.sub_category:first-child').show();
    //     $('.mega_menu').hide();
    // });

    $('.payment_product_header').click(function () {
        let el = $(this).parent().find('.payment_product_content');
        let display = el.css('display');
        if (display == 'block') {
            el.slideUp();
            $('.payment_arrow_icon').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            el.slideDown();
            $('.payment_arrow_icon').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
    });

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

    $(".remove_compare_item").click(function () {
        //کلید مربوط به محصول موجود در url را حذف می کنیم و ری لود می کنیم صفحه رو
        let key = $(this).attr('data-id');
        let url = window.location.href;
        url = url.replace(key, '');
        window.location = url; //url جدید را بارگذاری می کنیم
    })

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

    $("#logout_link").click(function () {
        $("#logout_form").submit();
    });

    compare_page();

    $(".review_btn").click(function () {
        let box = $(this).parent().find('.review_desc');
        let icon = $(this).parent().find('.review_btn span');
        console.log(icon);
        if (box.css('display') == 'block') {
            box.hide();
            icon.removeClass('fa-plus').addClass('fa-minus');
        } else {
            box.show();
            icon.removeClass('fa-minus').addClass('fa-plus');
        }
    })

    $(".close_special_review").click(function () {
        let content = $(".special_review_content");
        if (content.hasClass('special_review_opened')) {
            content.removeClass('special_review_opened');
            $(this).removeClass('close_special_active');
            $(this).text('ادامه مطلب');
        } else {
            content.addClass('special_review_opened');
            $(this).addClass('close_special_active');
            $(this).text('بستن');

        }
    })


    $(".c_comment_inp").keyup(function () {
        const val = $(this).val().trim().length;
        let add_icon = $(this).parent().find('.c_add_points');
        if (val >= 3) {
            add_icon.show();
        } else {
            add_icon.hide();
        }
    })

    $(".c_add_points").click(function () {
        let point_inp = $(this).parent().find('.c_comment_inp');
        let name = point_inp.attr('id');
        let point_val = point_inp.val();

        const html = '<div><span>' + point_val + '</span>' +
            ' <span class="fa fa-close c_remove_point "></span>' +
            '<input type="hidden" name="' + name + '[]" value="' + point_val + '">' +
            '</div>';

        $("." + name + "_list").append(html);
        point_inp.val('');
        $(this).hide();
    })

    $(document).on('click', '.c_remove_point', function () {
        $(this).parent().remove();
    })

    $('#c_comment_form').submit(function (e) {
        let c_content = $('#c_comment_content').val();
        let validate = validate_text(c_content);
        if (!validate) {
            $("#c_comment_content").addClass('border_red');
            e.preventDefault();
        } else {
            $("#c_comment_content").removeClass('border_red');
        }
    })

    let random_offer = $(".random_offers_item");
    const random_offers_count = random_offer.length;
    if (random_offers_count > 0) {
        start_random_offer_slider(random_offers_count);
    }

    $(".to_top_icon").click(function () {
        $("html, body").animate(
            {scrollTop: "0"}, 1000);
    })

    $(".profile_legal_link").click(function () {
        $(".profile_legal_tab").hide();
        $(".profile_legal_form_box").show();
    })

    $("#legal_province_id").change(function () {
        let province_id = $(this).val();
        if (parseInt(province_id) > 0) {
            $.ajax({
                url: baseUrl + 'api/get-cities?province_id=' + province_id,
                type: 'GET',
                success: function (response) {
                    let html = '';
                    for (let i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].id + '">' + response[i].name + '</option>';
                    }
                    if (html.trim() === '') {
                        html = '<option value="0">انتخاب شهر</option>';
                    }
                    $("#legal_city").html(html).selectpicker('refresh');
                }
            });
        }

    })
});


let slider_count = 0;
let current_slide = 0;

function load_slider(count) {
    slider_count = count;
    setInterval(next, 5000);
}

//slider next
function next() {
    if (current_slide == (slider_count - 1)) {
        current_slide = -1; //باید یک بعدی جمع میشه و میشه صفر
    }
    current_slide = current_slide + 1;
    $('.slide_div').hide();
    document.getElementById('slide_' + current_slide).style.display = 'block';
    $('.slider_bullet').removeClass('active');
    $('#bullet_' + current_slide).addClass('active');
}


//slider prev

function prev() {

    current_slide = current_slide - 1;
    if (current_slide == -1) {
        current_slide = slider_count - 1;
    }
    $('.slide_div').hide();
    document.getElementById('slide_' + current_slide).style.display = 'block';
    $('.slider_bullet').removeClass('active');
    $('#bullet_' + current_slide).addClass('active');
}

function go_to_slide(i) {
    current_slide = i - 1;
    next();
}


//incredible offer sidebar

let offers_count = 0;
let current_offer = 0;


$(document).ready(function () {
    $('.offer_side_cat_btn').click(function () {
        $('.offer_side_cat_btn').removeClass('active');
        $(this).addClass('active');
        const id = $(this).data('offer');
        $('.offer_item').hide();
        $('#offer_' + id).show();
        current_offer = id;
    });

});

//load incredible offers

function load_Incredible_offers(increidible_count) {

    offers_count = increidible_count;
    setInterval(next_offer, 5000);
}

//show next offer incredible offers

function next_offer() {
    if (current_offer == (offers_count - 1)) {
        current_offer = -1;
    }
    current_offer = current_offer + 1;
    $('.offer_item').hide();
    $('#offer_' + current_offer).show();
    $('.offer_side_cat_btn').removeClass('active');
    $('#offer_button_' + current_offer).addClass('active');
}

//tooltip
$('li').tooltip();

//show more specification
$(document).on('click', '#show_more_spec', function () {
    if ($('.toggle_spec_item').css('display') == 'none') {
        $('.toggle_spec_item').show(200);
        $('#show_more_spec').text('- بستن');

    } else {
        $('#show_more_spec').text(' + موارد بیشتر');
        $('.toggle_spec_item').hide(200);
    }

});

//active product color
$('.choose_color .color_li').click(function () {
    $('.choose_color .color_li').removeClass('active');
    $(this).addClass('active');
});

//change product color

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

//add to cart
//به دلیل استفاده از ایجکس در این قسمت از view باید از event به شکل زیر استفاده کنیم
$(document).on('click', '#add_to_cart', function () {
    $('#add_to_cart_form').submit();
})

function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


compare_page = function () {
    let isComparePage = document.getElementsByClassName('comp_gallery_container');
    if (isComparePage.length > 0) {
        $(window).scroll(function (e) {
            if ($(document).scrollTop() > 400) {
                $('.comp_product_link').hide();
                $('.comp_gallery_box').css('height', '215px');
                $('.comp_gallery_box .swiper-container').css('height', '100px');
                $('.com_plus').css('font-size', '2rem');
            } else {
                $('.comp_product_link').show();
                $('.comp_gallery_box').css('height', '450px');
                $('.comp_gallery_box .swiper-container').css('height', '200px');
                $('.com_plus').css('font-size', '5rem');
            }
        })
    }
}

validate_text = function (text) {
    if (text.trim().length > 3) {
        $("#c_content_error").hide();
        return true;
    } else {
        $("#c_content_error").show().text('متن وارد نشده است');
        return false;

    }
}


let random_slider_index = 0;
start_random_offer_slider = function (count) {
    $(".random_offers_header").addClass('random_offers_header_fill');
    setInterval(function () {

        random_slider_index++;

        if (random_slider_index > (count - 1)) {
            random_slider_index = 0;
        }
        $(".random_offers_item").removeClass('active');
        $(".random_offers_item[data-random-offer='" + random_slider_index + "']").addClass('active');
    }, 7000)
}
