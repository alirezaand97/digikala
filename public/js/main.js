$(document).ready(function () {
    $("#add_favorite").click(function () {
        var product_id = $(this).attr('product_id');
        $(".dg_loading_container").show();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: baseUrl + 'product/favorite',
            type: 'POST',
            data: "product_id=" + product_id,
            success: function (response) {
                if (response === 'success') {
                    const el = $('.favorite svg');
                    if (el.hasClass('favorite_checked')) {
                        el.removeClass('favorite_checked');
                    } else {
                        el.addClass('favorite_checked');
                    }
                    $(".dg_loading_container").hide();
                }
            },
            error: function (xhr, textStatus, error) {
                if (xhr.status === 401) {
                    window.location = baseUrl + 'login';
                    $(".dg_loading_container").hide();
                }
            }
        });

    })

    $(".share_link").click(function () {
        const link = $(this).attr('data-link');
        let input = document.createElement('input');
        input.setAttribute('value', link);
        input.setAttribute('id', "url_input");
        $(".share_link").append(input);
        input.select();
        document.execCommand('copy');
        $("#url_input").remove();
        $(this).text('کپی شد');
        let el = "<span>"
            + "<span class='fa fa-copy'></span>" +
            "<span>کپی لینک</span>" +
            "</span>";

        setTimeout(function () {
            $('.share_link').html(el);
        }, 2000);

    })

    $(".share_mail").click(function () {
        $(".share_email_container").show();
    })

    $("#share_email_submit").click(function () {
        const share_email = $("#share_email").val();
        const share_email_product_id = $("#share_email_product_id").val();

        if (ValidateEmail(share_email)) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: baseUrl + 'share-product',
                type: 'POST',
                data: "product_id=" + share_email_product_id + "&email=" + share_email,
                success: function (response) {
                    if (response === 'success') {
                        $(".share_email_message").text('محصول با موفقیت به اشتراک گذاشته شد')
                            .addClass('digi_color_blue')
                            .removeClass('digi_color_red');
                        const share_email = $("#share_email").val('');
                    }
                },
                error: function (xhr, textStatus, error) {
                    $(".share_email_message").text('خطایی در ارسال ایمیل رخ داده است. مجددا تلاش کنید')
                        .removeClass('digi_color_blue')
                        .addClass('digi_color_red');
                }
            });
        } else {
            $(".share_email_message").text('لطفا یک ایمیل معتبر وارد کنید')
                .removeClass('digi_color_blue')
                .addClass('digi_color_red');
        }

    })


    /**
     * @return {boolean}
     */
    ValidateEmail = function (mail) {
        let result = false;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            result = true;
        }
        return result;
    }
})
