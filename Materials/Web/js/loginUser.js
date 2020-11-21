$().ready(function() {
    $("#frmLoginCheck").validate({
        rules: {
            txtusername: "required",
            txtpassword: "required",
        },
        messages: {
            txtusername: "Nhập username đã đăng ký",
            txtpassword: "Nhập password đã đăng ký",
        },
        submitHandler: function(form) { // for demo
            return false; // for demo
        }
    });

    $('#btnLogin').on('click', function(e) {
        if (!$("#frmLoginCheck").valid()) {
            return false;
        } else {
            console.log('lon');
        }
    })
});