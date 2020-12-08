$(document).ready(function() {
    $("#txtEmail").inputmask("email");

    $.validator.addMethod("CheckEmail", function(value, element) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Nhập đúng định dạng email");

    $('#frmForgotPassword').validate({
        rules: {
            txtEmail: {
                required: true,
                CheckEmail: true
            }
        },
        messages: {
            txtEmail: {
                required: "Nhập Email đã đăng kí"
            }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

    $('#btnForgotPassword').on('click', function() {
        if (!$("#frmForgotPassword").valid()) {
            return;
        } else {
            var text = 'KHÁCH HÀNG';
            successInsert(text);
        };
    });
});