var app = angular.module("myapp", ["ngRoute"]);
// app.controller("myctrl", function($scope, $http, $interval) {
//     $scope.clicktitle = function(titlemain, titlesecondary) {
//         $scope.titlemain = titlemain;
//         $scope.titlesecondary = titlesecondary;
//     }
// });
// // app.config(function($routeProvider) {
// //     $routeProvider
// //         .when("/home", {
// //             templateUrl: "pages/mypages/profile.html",
// //             controller: "homeController"
// //         })
// //         .when("/dsnhanvien", {
// //             templateUrl: "pages/mypages/nhanvienForm.html",
// //             controller: "nhanvienController"
// //         })
// //         .when("/blogdetails", {
// //             templateUrl: "blog-details.html"
// //         })
// //         .when("/contact", {
// //             templateUrl: "contact.html"
// //         })
// //         .when("/shop", {
// //             templateUrl: "shop-grid.html"
// //         })
// //         .otherwise({
// //             templateUrl: "pages/mypages/profile.html",
// //             controller: "homeController"
// //         })
// // });
// app.controller("homeController", function($scope, $routeParams) {
//     $scope.titlemain = "Hồ sơ";
//     $scope.titlesecondary = "Hồ sơ cá nhân";
//     $scope.clicktitle($scope.titlemain, $scope.titlesecondary);
// });

// app.controller("nhanvienController", function($scope, $routeParams, $route) {
//     $scope.titlemain = "Nhân viên";
//     $scope.titlesecondary = "Danh sách nhân viên";
//     $scope.clicktitle($scope.titlemain, $scope.titlesecondary);
// });
//Function Groups
function successInsert(text) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'THÊM ' + text + ' THÀNH CÔNG',
        showConfirmButton: false,
        timer: 2000,
    });
};

function errorForm() {
    toastr["warning"]("VUI LÒNG NHẬP ĐÚNG VÀ ĐẦY ĐỦ DỮ LIỆU", "DỮ LIỆU NHẬP TRỐNG");
}

function successEdit(text) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'SỬA ' + text + ' THÀNH CÔNG ',
        showConfirmButton: false,
        timer: 2000,
    });
}

function clearAllMessage() {
    toastr["success"]("", "NHẬP LẠI!");
};

function resetTables() {
    toastr["success"]("", "LÀM MỚI!");
}

//function ClearAlls
function clearAllNhanVienForm() {
    clearAllMessage();
    var validator = $("#frmNhanVien").validate();
    validator.resetForm();
    $('#txtTenNV').val('');
    $('#txtTaiKhoanNV').val('');
    $('#txtNgaySinhNV').val('');
    $('#txtMatKhauNV').val('');
    $("#cboChucVuNV").val('').prop('selected', true);
    $("#rdoNVNam").prop("checked", true);
    $("#chkSuThatNV").prop("checked", false);
};



//Ready function (JQuerry Script Here!!)
$(document).ready(function() {
    //Ready functions
    //Initialize Select2 Elements
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', {
            'placeholder': 'dd/mm/yyyy'
        })
        //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', {
            'placeholder': 'mm/dd/yyyy'
        })
        //Money Euro
    $('[data-mask]').inputmask()

    //Date range picker
    $('#reservationdate').datetimepicker({
        format: 'L'
    });
    //Date range picker
    $('#reservation').daterangepicker()
        //Date range picker with time picker
    $('#reservationtime').daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            locale: {
                format: 'MM/DD/YYYY hh:mm A'
            }
        })
        //Date range as a button
    $('#daterange-btn').daterangepicker({
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        },
        function(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
        }
    )

    //Timepicker
    $('#timepicker').datetimepicker({
        format: 'LT'
    })

    //Bootstrap Duallistbox
    $('.duallistbox').bootstrapDualListbox()

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
        //color picker with addon
    $('.my-colorpicker2').colorpicker()

    $('.my-colorpicker2').on('colorpickerChange', function(event) {
        $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    });

    $("input[data-bootstrap-switch]").each(function() {
        $(this).bootstrapSwitch('state', $(this).prop('checked'));
    });

    //Some function

    $("#tblDanhSachNhanVien").DataTable({
        "responsive": true,
        "autoWidth": false,
    });

    //Toasts
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000
    });
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    //Script Validation
    $.validator.setDefaults({
        submitHandler: function() {

        }
    });

    $.validator.addMethod("validUsername", function(value, element) {
        return /^[a-zA-Z0-9_.-]+$/.test(value);
    }, "Tài khoản không được có khoảng cách");

    $('#frmNhanVien').validate({
        rules: {
            txtTenNV: {
                required: true,
            },
            txtTaiKhoanNV: {
                required: true,
                validUsername: true
            },
            txtNgaySinhNV: {
                required: true
            },
            txtMatKhauNV: {
                required: true,
                minlength: 5
            },
            cboChucVuNV: {
                required: true
            }
        },
        messages: {
            txtTenNV: {
                required: "Nhập tên nhân viên"
            },
            txtTaiKhoanNV: {
                required: "Nhập tài khoản nhân viên",
            },
            txtNgaySinhNV: {
                required: "Nhập ngày sinh nhân viên",
            },
            txtMatKhauNV: {
                required: "Nhập mật khẩu nhân viên",
                minlength: "Mật khẩu phải ít nhất 5 kí tự"
            },
            chkSuThatNV: "Làm ơn tích vào điều kiện",
            cboChucVuNV: "Chọn chức vụ nhân viên"
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

    //dblclick Tables function
    $(document).on("dblclick", "#tblDanhSachNhanVien >tbody > tr", function() {
        console.log('click vào tables rồi');
    });


    //btn Function Groups
    $('#btnThemNV').on('click', function() {
        if (!$("#frmNhanVien").valid()) {
            errorForm();
            return;
        } else {
            var text = 'NHÂN VIÊN';
            successInsert(text);
        };
    });
    $('#btnSuaNV').on('click', function() {
        if (!$("#frmNhanVien").valid()) {
            errorForm();
            return;
        } else {
            var text = 'NHÂN VIÊN';
            successEdit(text);
        };
    });
    $('#btnNhapLaiNV').on('click', function() {
        clearAllNhanVienForm();
    });

    $('#btnLamMoiTblNV').on('click', function() {
        resetTables();
    });

    $('#btnLamMoiHinhNV').on('click', function() {
        resetTables();
    });
});