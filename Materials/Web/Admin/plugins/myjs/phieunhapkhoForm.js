//Angular functions
app.controller("phieunhapkhoForm", function($scope, $routeParams) {
    $scope.titlepage = "Phiếu nhập kho";
    $scope.secondtitlepage = "Danh sách phiếu nhập kho";
    angular.element(function() {
        overlayBangPhieuNhapKho();
        overlayThemPhieuNhapKho();
        activekho1();
        readypage();
        validateform();
    });
    $scope.btnThemPhieuNhapKho = function() {
        btnThemPhieuNhapKho();
    };
    $scope.btnSuaPhieuNhapKho = function() {
        btnSuaPhieuNhapKho();
    };
    $scope.btnNhapLaiPhieuNhapKho = function() {
        btnNhapLaiPhieuNhapKho();
    };
    $scope.btnLamMoitblPhieuNhapKho = function() {
        btnLamMoitblPhieuNhapKho();
    };
});

function activekho1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activekho").addClass("nav-link active");
    $("#activekho1").addClass("nav-link active ml-2");
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
function clearAllPhieuNhapKhoForm() {
    clearAllMessage();
    var validator = $("#frmPhieuNhapKho").validate();
    validator.resetForm();
    $('#txtSoLuongSPNhapKho').val('');
    $('#txtGiaSPNhapKho').val('');
    $('#txtGiaSPXuatKho').val('');
    $('#cboLoaiSPNhapKho').val(null).trigger('change');
    $('#cboTenSPNhapKho').val(null).trigger('change');
    $('#cboTinhTrangSPPhieuNhapKho').val(null).trigger('change');
};

function overlayThemPhieuNhapKho() {
    $("#ThemPhieuNhapKho").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#ThemPhieuNhapKho").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#ThemPhieuNhapKho").LoadingOverlay("progress", count);
    }, 300);
};

function overlayBangPhieuNhapKho() {
    $("#BangPhieuNhapKho").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#BangPhieuNhapKho").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#BangPhieuNhapKho").LoadingOverlay("progress", count);
    }, 300);
};

//functions select2
function loadDatacboTinhTrangSPPhieuNhapKho() {
    let dataTinhTrang = [{
            id: "CH",
            text: "Còn hàng"
        },
        {
            id: "HH",
            text: "Hết hàng"
        }
    ];

    $('#cboTinhTrangSPPhieuNhapKho').select2({
        language: "vi",
        selectOnClose: true,
        placeholder: "Tình trạng sản phẩm",
        allowClear: true,
        data: dataTinhTrang
    });
};

function loadDatacboLoaiSPNhapKho() {
    let dataLoaiSPNhapKho = [{
        id: "1",
        text: "Rau"
    }, {
        id: "2",
        text: "Củ"
    }, {
        id: "3",
        text: "Quả"
    }];

    $('#cboLoaiSPNhapKho').select2({
        language: "vi",
        selectOnClose: true,
        placeholder: "Loại sản phẩm",
        allowClear: true,
        data: dataLoaiSPNhapKho
    });
};

function loadDatacboTenSPNhapKho() {
    let dataTenSPNhapKho = [{
        id: "1",
        text: "Táo"
    }, {
        id: "2",
        text: "Dưa"
    }, {
        id: "3",
        text: "Cam"
    }];

    $('#cboTenSPNhapKho').select2({
        language: "vi",
        selectOnClose: true,
        placeholder: "Loại sản phẩm",
        allowClear: true,
        data: dataTenSPNhapKho
    });
};

//function ready
function readypage() {
    //Ready functions

    //datas select2
    loadDatacboTinhTrangSPPhieuNhapKho();
    $('#cboTinhTrangSPPhieuNhapKho').val(null).trigger('change');

    loadDatacboLoaiSPNhapKho();
    $('#cboLoaiSPNhapKho').val(null).trigger('change');

    loadDatacboTenSPNhapKho();
    $('#cboTenSPNhapKho').val(null).trigger('change');

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

    $("#tblPhieuNhapKho").DataTable({
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
function btnThemPhieuNhapKho() {
    if (!$("#frmPhieuNhapKho").valid()) {
        errorForm();
        return;
    } else {
        var text = 'NHÂN VIÊN';
        successInsert(text);
    };
};

function btnSuaPhieuNhapKho() {
    if (!$("#frmPhieuNhapKho").valid()) {
        errorForm();
        return;
    } else {
        var text = 'NHÂN VIÊN';
        successEdit(text);
    };
};

function btnNhapLaiPhieuNhapKho() {
    clearAllPhieuNhapKhoForm();
};

function btnLamMoitblPhieuNhapKho() {
    resetTables();
};