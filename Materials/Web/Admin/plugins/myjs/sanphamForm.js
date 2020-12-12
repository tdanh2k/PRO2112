//Angular functions
app.controller("sanphamForm", function($scope, $routeParams) {
    $scope.titlepage = "Sản phẩm";
    $scope.secondtitlepage = "Danh sách sản phẩm";
    angular.element(function() {
        overlayBangSP();
        overlayThemSP();
        activesanpham1();
        readypage();
        validateform();
    });
    $scope.btnThemSanPham = function() {
        btnThemSanPham();
    };
    $scope.btnSuaSanPham = function() {
        btnSuaSanPham();
    };
    $scope.btnNhapLaiSanPham = function() {
        btnNhapLaiSanPham();
    };
    $scope.btnLamMoiTblSanPham = function() {
        btnLamMoiTblSanPham();
    };
});

function activesanpham1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activesanpham").addClass("nav-link active");
    $("#activesanpham1").addClass("nav-link active ml-2");
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
function clearAllSanPhamForm() {
    clearAllMessage();
    var validator = $("#frmSanPham").validate();
    validator.resetForm();
    $('#txtTenSP').val('');
    $('#cboNhaCungCapSP').val(null).trigger('change');
    $('#cboLoaiSP').val(null).trigger('change');
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

//functions select2
function loadDatacboLoaiSP() {
    let dataLoaiSP = [{
        id: "1",
        text: "Rau"
    }, {
        id: "2",
        text: "Củ"
    }, {
        id: "3",
        text: "Quả"
    }];

    $('#cboLoaiSP').select2({
        language: "vi",
        selectOnClose: true,
        placeholder: "Loại sản phẩm",
        allowClear: true,
        data: dataLoaiSP
    });
};

function loadDatacboNhaCungCapSP() {
    let dataLoaiSP = [{
        id: "1",
        text: "Vinamilk"
    }, {
        id: "2",
        text: "2"
    }, {
        id: "3",
        text: "3"
    }];

    $('#cboNhaCungCapSP').select2({
        language: "vi",
        selectOnClose: true,
        placeholder: "Nhà cung cấp",
        allowClear: true,
        data: dataLoaiSP
    });
};
//function ready
function readypage() {
    //Ready functions
    $("#txtEmailNhaCC").inputmask("email");

    //Initialize Select2 Elements
    loadDatacboLoaiSP();
    $('#cboLoaiSP').val(null).trigger('change');

    loadDatacboNhaCungCapSP();
    $('#cboNhaCungCapSP').val(null).trigger('change');

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
    });;
}
//Ready function (JQuerry Script Here!!)
$(document).ready(function() {
    //Icons Selects
    $(document).on("dblclick", "#tblDanhSachSanPham >tbody > tr", function() {
        console.log('click vào tables rồi');
    });
});

//btn functions
function btnThemSanPham() {
    if (!$("#frmSanPham").valid()) {
        errorForm();
        return;
    } else {
        var text = 'SẢN PHẨM';
        successInsert(text);
    };
};

function btnSuaSanPham() {
    if (!$("#frmSanPham").valid()) {
        errorForm();
        return;
    } else {
        var text = 'SẢN PHẨM';
        successEdit(text);
    };
};

function btnNhapLaiSanPham() {
    clearAllSanPhamForm();
};

function btnLamMoiTblSanPham() {
    resetTables();
};