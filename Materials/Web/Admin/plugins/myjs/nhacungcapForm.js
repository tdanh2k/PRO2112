//Angular functions
app.controller("nhacungcapForm", function($scope, $routeParams) {
    $scope.titlepage = "Nhà cung cấp";
    $scope.secondtitlepage = "Danh sách nhà cung cấp";
    angular.element(function() {
        overlayThemNhaCC();
        overlayBangNhaCC();
        activenhacungcap1();
        readypage();
        validateform();
    });
    $scope.btnThemNhaCungCap = function() {
        btnThemNhaCungCap();
    };
    $scope.btnSuaNhaCungCap = function() {
        btnSuaNhaCungCap();
    };
    $scope.btnNhapLaiNhaCungCap = function() {
        btnNhapLaiNhaCungCap();
    };
    $scope.btnLamMoiTblNhaCungCap = function() {
        btnLamMoiTblNhaCungCap();
    };
});

function activenhacungcap1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activenhacungcap").addClass("nav-link active");
    $("#activenhacungcap1").addClass("nav-link active ml-2");
};

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
function clearAllNhaCungCapForm() {
    clearAllMessage();
    var validator = $("#frmNhaCungCap").validate();
    validator.resetForm();
    $('#txtTenNhaCC').val('');
    $('#txtSdtNhaCC').val('');
    $('#txtEmailNhaCC').val('');
    $('#txtNgayKiHopDongNhaCC').val('');
    $('#txtNgayKetThucHopDongNhaCC').val('');
    $('#txtDiaChiNhaCC').val('');
    $('#txtGhiChuNhaCC').val('');
};

function overlayThemNhaCC() {
    $("#ThemNhaCC").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#ThemNhaCC").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#ThemNhaCC").LoadingOverlay("progress", count);
    }, 300);
};

function overlayBangNhaCC() {
    $("#BangNhaCC").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#BangNhaCC").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#BangNhaCC").LoadingOverlay("progress", count);
    }, 300);
};

//Ready function (JQuerry Script Here!!)
function readypage() {
    $('body').trigger('click');
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
    $("#tblDanhSachNhaCungCap").DataTable({
        "responsive": true,
        "autoWidth": false,
        "scrollY": "400px",
        "scrollCollapse": true,
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
};
$(document).ready(function() {
    //dblclick Tables function
    $(document).on("dblclick", "#tblDanhSachNhanVien >tbody > tr", function() {
        console.log('click vào tables rồi');
    });
});

// btn functions
function btnThemNhaCungCap() {
    if (!$("#frmNhaCungCap").valid()) {
        errorForm();
        return;
    } else {
        var text = 'NHÀ CUNG CẤP';
        successInsert(text);
    };
};

function btnSuaNhaCungCap() {
    if (!$("#frmNhaCungCap").valid()) {
        errorForm();
        return;
    } else {
        var text = 'NHÀ CUNG CẤP';
        successEdit(text);
    };
};

function btnNhapLaiNhaCungCap() {
    clearAllNhaCungCapForm();
};

function btnLamMoiTblNhaCungCap() {
    resetTables();
};