$(document).ready(function() {
    $.validator.addMethod("CheckSdtNhaCC", function(value, element) {
        return /^[00-90-9 0-90-90-9 0-90-90-90-9]+$/.test(value);
    }, "Số điện thoại phải có 10 số và đúng theo quy định");

    $('#frmLogin').validate({
        rules: {
            txtUsername: {
                required: true,
            },
            txtPassword: {
                required: true,
                minlength: 10,
                //CheckSdtNhaCC: true
            }
        },
        messages: {
            txtUsername: {
                required: "Nhập tài khoản"
            },
            txtPassword: {
                required: "Nhập mật khẩu",
                minlength: "mật khẩu phải hơn 10 kí tự",
                //number: "Số điện thoại chưa đủ số theo quy định"
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

    $('#btnLogin').on('click', function() {
        if (!$("#frmLogin").valid()) {
            return;
        } else {
            var text = 'KHÁCH HÀNG';
            successInsert(text);
        };
    });
});