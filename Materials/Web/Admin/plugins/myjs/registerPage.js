$(document).ready(function() {
    $("#txtEmail").inputmask("email");

    $.validator.addMethod("CheckEmail", function(value, element) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Nhập đúng định dạng email");

    $('#frmRegister').validate({
        rules: {
            txtHoTen: {
                required: true,
            },
            txtUsername: {
                required: true,
            },
            txtPassword: {
                required: true,
            },
            txtRePassword: {
                required: true,
                equalTo: "#txtPassword"
            }
        },
        messages: {
            txtHoTen: {
                required: "Nhập họ tên"
            },
            txtUsername: {
                required: "Nhập tài khoản"
            },
            txtPassword: {
                required: "Nhập mật khẩu"
            },
            txtRePassword: {
                required: "Nhập lại mật khẩu",
                equalTo: "Mật khẩu không khớp ở trên!"
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

    $('#btnDangKy').on('click', function() {
        console.log('concac')
        if (!$("#frmRegister").valid()) {
            return;
        } else {
            var text = 'KHÁCH HÀNG';
            successInsert(text);
        };
    });
});