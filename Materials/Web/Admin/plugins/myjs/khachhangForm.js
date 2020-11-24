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
function clearAllKhachHangForm() {
    clearAllMessage();
    var validator = $("#frmKhachHang").validate();
    validator.resetForm();
    $('#txtTenKH').val('');
    $('#txtSdtKH').val('');
    $('#txtEmailKH').val('');
    $('#txtNgayDangKiKH').val('');
    $('#txtNgayKetThucKH').val('');
    $('#txtDiaChiKH').val('');
    $('#txtGhiChuKH').val('');
};

//loadingoverlay functions
function overlayThemKH() {
    $("#ThemKH").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#ThemKH").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#ThemKH").LoadingOverlay("progress", count);
    }, 300);
};

function overlayBangKH() {
    $("#BangKH").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#BangKH").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#BangKH").LoadingOverlay("progress", count);
    }, 300);
};

//Ready function (JQuerry Script Here!!)
$(document).ready(function() {
    //Ready functions
    $("#txtEmailKH").inputmask("email");

    //Initialize Select2 Elements
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })
    $("#txtDiaChiNhaCC").inputmask("");

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

    //Datatables functions
    $("#tblDanhSachKhachHang").DataTable({
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

    $.validator.addMethod("CheckSdtNhaCC", function(value, element) {
        return /^[00-90-9 0-90-90-9 0-90-90-90-9]+$/.test(value);
    }, "Số điện thoại phải có 10 số và đúng theo quy định");


    $('#frmKhachHang').validate({
        rules: {
            txtTenKH: {
                required: true,
            },
            txtSdtKH: {
                required: true,
                minlength: 10,
                CheckSdtNhaCC: true
            },
            txtEmailKH: {
                required: true
            },
            txtNgayDangKiKH: {
                required: true,
            },
            txtNgayKetThucKH: {
                required: true
            },
            txtDiaChiKH: {
                required: true
            }
        },
        messages: {
            txtTenKH: {
                required: "Nhập tên khách hàng"
            },
            txtSdtKH: {
                required: "Nhập số điện thoại khách hàng",
                minlength: "Số điện thoại phải 10 số",
                number: "Số điện thoại chưa đủ số theo quy định"
            },
            txtEmailKH: {
                required: "Nhập Email khách hàng",
            },
            txtNgayDangKiKH: {
                required: "Nhập đăng kí khách hàng",
            },
            txtNgayKetThucKH: {
                required: "Nhập ngày kết thúc khách hàng"
            },
            txtDiaChiKH: {
                required: "Nhập địa chỉ khách hàng"
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

    //dblclick Tables function
    $(document).on("dblclick", "#tblDanhSachKhachHang >tbody > tr", function() {
        console.log('click vào tables rồi');
    });


    //btn Function Groups
    $('#btnThemKhachHang').on('click', function() {
        if (!$("#frmKhachHang").valid()) {
            errorForm();
            return;
        } else {
            var text = 'KHÁCH HÀNG';
            successInsert(text);
        };
    });
    $('#btnSuaKhachHang').on('click', function() {
        if (!$("#frmKhachHang").valid()) {
            errorForm();
            return;
        } else {
            var text = 'KHÁCH HÀNG';
            successEdit(text);
        };
    });
    $('#btnNhapLaiKhachHang').on('click', function() {
        overlayNhaCC();
        clearAllKhachHangForm();
    });

    $('#btnLamMoiTblKhachHang').on('click', function() {
        resetTables();
    });

    $(window).on("load", function() {
        overlayBangKH();
        overlayThemKH();
    });
});