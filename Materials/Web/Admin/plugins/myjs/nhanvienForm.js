//Angular functions
app.controller("nhanvienForm", function($scope, $routeParams) {
    $scope.titlepage = "Nhân viên";
    $scope.secondtitlepage = "Danh sách nhân viên";
    angular.element(function() {
        overlayBangNV();
        overlayThemNV();
        activenhanvien1();
        readypage();
        validateform();
        loadDatacboChucVuNV();
    });
    $scope.btnThemNV = function() {
        btnThemNV();
    };
    $scope.btnSuaNV = function() {
        btnSuaNV();
    };
    $scope.btnNhapLaiNV = function() {
        btnNhapLaiNV();
    };
    $scope.btnLamMoiHinhNV = function() {
        btnLamMoiHinhNV();
    };
    $scope.btnLamMoiTblNV = function() {
        btnLamMoiTblNV();
    };
});

function activenhanvien1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activenhanvien").addClass("nav-link active");
    $("#activenhanvien1").addClass("nav-link active ml-2");
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
function clearAllNhanVienForm() {
    clearAllMessage();
    var validator = $("#frmNhanVien").validate();
    validator.resetForm();
    $('#txtTenNV').val('');
    $('#txtTaiKhoanNV').val('');
    $('#txtNgaySinhNV').val('');
    $('#txtMatKhauNV').val('');
    $('#cboChucVuNV').val(null).trigger('change');
    $("#rdoNVNam").prop("checked", true);
    $("#chkSuThatNV").prop("checked", false);
};

function overlayThemNV() {
    $("#ThemNV").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#ThemNV").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#ThemNV").LoadingOverlay("progress", count);
    }, 300);
};

function overlayBangNV() {
    $("#BangNV").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#BangNV").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#BangNV").LoadingOverlay("progress", count);
    }, 300);
};

//functions select2
function loadDatacboChucVuNV() {
    let dataChucVuNhanVien = [{
        "text": "Ban quản lý",
        "children": [{
            id: "GD",
            text: "Giám đốc"
        }, {
            id: "PGD",
            text: "Phó giám đốc"
        }, {
            id: "TK",
            text: "Thư ký"
        }],
        "element": HTMLOptGroupElement
    }, {
        "text": "Nhân viên",
        "children": [{
            id: "TN",
            text: "Thu ngân"
        }, {
            id: "NVTV",
            text: "Nhân viên tư vấn"
        }, {
            id: "NVK",
            text: "Nhân viên kho"
        }],
        "element": HTMLOptGroupElement
    }, {
        "text": "Khác",
        "children": [{
            id: "LC",
            text: "Lao công"
        }, {
            id: "BV",
            text: "Bảo vệ"
        }],
        "element": HTMLOptGroupElement
    }];

    $('#cboChucVuNV').select2({
        language: "vi",
        selectOnClose: true,
        placeholder: "Chức vụ nhân viên",
        allowClear: true,
        data: dataChucVuNhanVien
    });
};

//functions ready
function readypage() {
    //Initialize Select2 Elements
    loadDatacboChucVuNV();
    $('#cboChucVuNV').val(null).trigger('change');

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

//Ready function (JQuerry Script Here!!)
$(document).ready(function() {
    //dblclick Tables function
    $(document).on("dblclick", "#tblDanhSachNhanVien >tbody > tr", function() {
        console.log('click vào tables rồi');
    });
});

//btn functions
function btnThemNV() {
    if (!$("#frmNhanVien").valid()) {
        errorForm();
        return;
    } else {
        var text = 'NHÂN VIÊN';
        successInsert(text);
    };
};

function btnSuaNV() {
    if (!$("#frmNhanVien").valid()) {
        errorForm();
        return;
    } else {
        var text = 'NHÂN VIÊN';
        successEdit(text);
    };
};

function btnNhapLaiNV() {
    clearAllNhanVienForm();
};

function btnLamMoiHinhNV() {
    resetTables();
};

function btnLamMoiTblNV() {
    resetTables();
};