const baseUrl = 'http://digikala.test/';

function validate_password(password, filed, error_field) {
    let pass = password.toString().trim();
    if (pass == "") {
        $("#" + error_field).show().text('لطفا گذرواژه را وارد کنید.');
        $("#" + filed).addClass('invalid_input');
        return false;
    } else if (pass.length < 6) {
        $("#" + error_field).show().text('گذرواژه باید 6 کاراکتر یا بیشتر باشد.');
        $("#" + filed).addClass('invalid_input');
        return false
    } else {
        $("#" + error_field).hide();
        $("#" + filed).removeClass('invalid_input');
        return true
    }
}

function validate_mobile(mobile, field, error_field) {
    let mobileReg = new RegExp(/^(\+?98|0098|98|0)9\d{9}$/);
    let isValid = mobileReg.test(mobile);
    if (isValid) {
        $("#" + error_field).hide();
        $("#" + field).removeClass('invalid_input');
        return true;
    } else {
        $("#" + field).addClass('invalid_input');
        $("#" + error_field).show().text('لطفا شماره موبایل معتبر وارد کنید');
        return false;
    }
}

$("#register_submit").click(function () {
    let mobile = $('#register_mobile').val();
    let password = $('#register_password').val();
    let isValidPass = validate_password(password, 'register_password', 'register_password_error');
    let isValidMobile = validate_mobile(mobile, 'register_mobile', 'register_mobile_error');
    if (isValidMobile && isValidPass) {
        $("#register_form").submit();
    }
})

$('#confirm_code').click(function () {
    let code = $('#register_code').val();
    if (code.toString().trim().length != 6) {
        $("#register_code_error").show().text('کد وارد شده باید 6 رقم باشد');
    } else {
        $("#register_code_error").hide();
        $("#verify_user").submit();
    }
})

let t = 180;
let times;
startTimer = function () {
    times = setInterval(function () {
        t--;
        let m = Math.floor(t / 60);
        if (m.toString().length == 1) {
            m = '0' + m;
        }
        let s = t - m * 60;
        if (s.toString().length == 1) {
            s = '0' + s;
        }
        let text = m + ':' + s;
        if (t == 0) {
            $("#register_code").attr('disabled', 'disabled');
            $("#resend_code").addClass('digi_dashed_link');
            clearInterval(times);
        } else {
            $("#timer").text(text);
        }
    }, 1000);
};

$('#resend_code').click(function () {
    if (t == 0) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: baseUrl + 'ajax/resend-verify-code',
            type: 'POST',
            data: "mobile=" + $("#confirm_mobile").val(),
            success: function (response) {
                t = 180;
                startTimer();
                $("#register_code").attr('disabled', false);
                $("#resend_code").removeClass('digi_dashed_link');

            }
        });
    }
})


$("#login_submit").click(function () {
    let mobile = $('#login_mobile').val();
    let password = $('#login_password').val();
    let isValidPass = validate_password(password, 'login_password', 'login_password_error');
    let isValidMobile = validate_mobile(mobile, 'login_mobile', 'login_mobile_error');
    if (isValidMobile && isValidPass) {
        $("#login_form").submit();
    }
})


$("#forget_password_submit").click(function () {
    let mobile = $("#forget_pass_mobile").val();
    let isValidMobile = validate_mobile(mobile, 'forget_pass_mobile', 'forget_pass_error');
    if (isValidMobile) {
        $("#forget_password_form").submit();
    }

})
