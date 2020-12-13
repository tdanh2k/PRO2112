app.controller("nhanvienProfile", function($scope, $routeParams) {
    $scope.titlepage = "Hồ sơ";
    $scope.secondtitlepage = "Profile";
    angular.element(function() {
        overlaynhanvienProfile();
    });
});

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

//loadingoverlay functions
function overlaynhanvienProfile() {
    $("#nhanvienProfile").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#nhanvienProfile").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#nhanvienProfile").LoadingOverlay("progress", count);
    }, 300);
};


//Ready function (JQuerry Script Here!!)
$(document).ready(function() {
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


    $('#frmNhaCungCap').validate({
        rules: {
            txtTenNhaCC: {
                required: true,
            },
            txtSdtNhaCC: {
                required: true,
                minlength: 10,
                CheckSdtNhaCC: true
            },
            txtEmailNhaCC: {
                required: true
            },
            txtNgayKiHopDongNhaCC: {
                required: true,
            },
            txtNgayKetThucHopDongNhaCC: {
                required: true
            },
            txtDiaChiNhaCC: {
                required: true
            }
        },
        messages: {
            txtTenNhaCC: {
                required: "Nhập tên nhà cung cấp"
            },
            txtSdtNhaCC: {
                required: "Nhập số điện thoại nhà cung cấp",
                minlength: "Số điện thoại phải 10 số",
                number: "Số điện thoại chưa đủ số theo quy định"
            },
            txtEmailNhaCC: {
                required: "Nhập Email nhà cung cấp",
            },
            txtNgayKiHopDongNhaCC: {
                required: "Nhập ngày kí hợp đồng nhà cung cấp",
            },
            txtNgayKetThucHopDongNhaCC: {
                required: "Nhập ngày kết thúc hợp đồng nhà cung cấp"
            },
            txtDiaChiNhaCC: {
                required: "Nhập địa chỉ nhà cung cấp"
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
    $(document).on("dblclick", "#tblDanhSachNhaCungCapa >tbody > tr", function() {
        console.log('click vào tables rồi');
    });


    //btn Function Groups
    $('#btnThemNhaCungCap').on('click', function() {
        if (!$("#frmNhaCungCap").valid()) {
            errorForm();
            return;
        } else {
            var text = 'NHÀ CUNG CẤP';
            successInsert(text);
        };
    });
    $('#btnSuaNhaCungCap').on('click', function() {
        if (!$("#frmNhaCungCap").valid()) {
            errorForm();
            return;
        } else {
            var text = 'NHÀ CUNG CẤP';
            successEdit(text);
        };
    });
    $('#btnNhapLaiNhaCungCap').on('click', function() {

        clearAllNhaCungCapForm();
    });

    $('#btnLamMoiTblNhaCungCap').on('click', function() {
        resetTables();
    });

    $(window).on("load", function() {
        overlaynhanvienProfile();
    });
});