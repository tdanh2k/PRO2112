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
function clearAllSanPhamForm() {
    clearAllMessage();
    var validator = $("#frmSanPham").validate();
    validator.resetForm();
    $('#txtTenSP').val('');
    $("#cboLoaiSP").val('').prop('selected', true);
    $("#cboNhaCungCapSP").val('').prop('selected', true);
    $('#txtQRCodeSP').val('');
    $('#txtBarCodeSP').val('');
};

//loadingoverlay functions
function overlayThemSP() {
    $("#ThemSP").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#ThemSP").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#ThemSP").LoadingOverlay("progress", count);
    }, 300);
};

function overlayBangSP() {
    $("#BangSP").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#BangSP").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#BangSP").LoadingOverlay("progress", count);
    }, 300);
};

//Ready function (JQuerry Script Here!!)
$(document).ready(function() {
    //Icons Selects


    //Ready functions
    $("#txtEmailNhaCC").inputmask("email");

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
    $("#tblDanhSachSanPham").DataTable({
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


    $('#frmSanPham').validate({
        rules: {
            txtTenSP: {
                required: true,
            },
            cboLoaiSP: {
                required: true
            },
            cboNhaCungCapSP: {
                required: true,
            },
            txtQRCodeSP: {
                required: true
            },
            txtBarCodeSP: {
                required: true
            }
        },
        messages: {
            txtTenSP: {
                required: "Nhập tên sản phẩm"
            },
            cboLoaiSP: {
                required: "Chọn loại sản phẩm",
            },
            cboNhaCungCapSP: {
                required: "Chọn nhà cung cấp của sản phẩm",
            },
            txtQRCodeSP: {
                required: "Chưa có mã QR Code của sản phẩm"
            },
            txtBarCodeSP: {
                required: "Chưa có mã Bar Code của sản phẩm"
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
    $(document).on("dblclick", "#tblDanhSachSanPham >tbody > tr", function() {
        console.log('click vào tables rồi');
    });


    //btn Function Groups
    $('#btnThemSanPham').on('click', function() {
        if (!$("#frmSanPham").valid()) {
            errorForm();
            return;
        } else {
            var text = 'SẢN PHẨM';
            successInsert(text);
        };
    });
    $('#btnSuaSanPham').on('click', function() {
        if (!$("#frmSanPham").valid()) {
            errorForm();
            return;
        } else {
            var text = 'SẢN PHẨM';
            successEdit(text);
        };
    });
    $('#btnNhapLaiSanPham').on('click', function() {
        clearAllSanPhamForm();
    });

    $('#btnLamMoiTblSanPham').on('click', function() {
        resetTables();
    });

    $(window).on("load", function() {
        overlayThemSP();
        overlayBangSP();
    });
});