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

function errorInsert(text) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'THÊM ' + text + ' KHÔNG THÀNH CÔNG',
        showConfirmButton: false,
        timer: 2000,
    });
};

function errorForm() {
    toastr["warning"]("VUI LÒNG NHẬP ĐÚNG VÀ ĐẦY ĐỦ DỮ LIỆU", "DỮ LIỆU NHẬP TRỐNG");
};

function successEdit(text) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'SỬA ' + text + ' THÀNH CÔNG ',
        showConfirmButton: false,
        timer: 2000,
    });
};

function errorEdit(text) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'SỬA ' + text + ' KHÔNG THÀNH CÔNG ',
        showConfirmButton: false,
        timer: 2000,
    });
};

function errorLoadData(text) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'CÓ LỖI KHI TẢI DỮ LIỆU ' + text,
        showConfirmButton: false,
        timer: 2000,
    });
};

function clearAllMessage() {
    toastr["success"]("", "NHẬP LẠI!");
};

function resetTables() {
    toastr["success"]("", "LÀM MỚI!");
};

function readypage() {
    $("#txtEmailNhaCC").inputmask("email");
    $("#txtEmailKH").inputmask("email");
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

function datatables() {
    //NhanVien
    $("#tblDanhSachNhanVien").DataTable({
        "responsive": true,
        "autoWidth": false,
        "scrollY": "400px",
        "scrollCollapse": true,
    });
    //NhaCungCap
    $("#tblDanhSachNhaCungCap").DataTable({
        "responsive": true,
        "autoWidth": false,
        "scrollY": "400px",
        "scrollCollapse": true,
    });
    //KhachHang
    $("#tblDanhSachKhachHang").DataTable({
        "responsive": true,
        "autoWidth": false,
        "scrollY": "400px",
        "scrollCollapse": true,
    });
    //SanPham
    $("#tblDanhSachSanPham").DataTable({
        "responsive": true,
        "autoWidth": false,
        "scrollY": "400px",
        "scrollCollapse": true,
    });
    //PhieuNhapKho
    $("#tblPhieuNhapKho").DataTable({
        "responsive": true,
        "autoWidth": false,
        "scrollY": "400px",
        "scrollCollapse": true,
    });
};

//Validate Forms
function validateform() {
    //NhaCungCap
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

    //NhanVien
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

    //KhachHang
    $.validator.addMethod("CheckSdtKH", function(value, element) {
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
                CheckSdtKH: true
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
                required: "Nhập ngày đăng kí khách hàng",
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

    //SanPham
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

    //PhieuNhapKho
    $('#frmPhieuNhapKho').validate({
        rules: {
            cboLoaiSPNhapKho: {
                required: true,
            },
            cboTenSPNhapKho: {
                required: true,
            },
            txtSoLuongSPNhapKho: {
                required: true,
                number: true
            },
            txtGiaSPNhapKho: {
                required: true,
                number: true
            },
            txtGiaSPXuatKho: {
                required: true,
                number: true
            },
            cboTinhTrangSPPhieuNhapKho: {
                required: true
            }
        },
        messages: {
            cboLoaiSPNhapKho: {
                required: "Chọn loại sản phẩm nhập kho"
            },
            cboTenSPNhapKho: {
                required: "Chọn tên sản phẩm nhập kho",
            },
            txtSoLuongSPNhapKho: {
                required: "Nhập số lượng nhập kho sản phẩm",
                number: "Chỉ được nhập số"
            },
            txtGiaSPNhapKho: {
                required: "Nhập giá nhập kho sản phẩm",
                number: "Chỉ được nhập số"
            },
            txtGiaSPXuatKho: {
                required: "Nhập giá xuất kho sản phẩm",
                number: "Chỉ được nhập số"
            },
            cboTinhTrangSPPhieuNhapKho: {
                required: "Chọn tình trạng của sản phẩm"
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
};

//click table functions
function tablesclickForm() {
    //NhanVien
    $(document).on("dblclick", "#tblDanhSachNhanVien >tbody > tr", function() {
        var table = $('#tblDanhSachNhanVien').DataTable();
        var _data = table.row($(this)).data();
        console.log(_data[1]);
    });

    //NhaCungCap
    $(document).on("dblclick", "#tblDanhSachNhaCungCap >tbody > tr", function() {
        var table = $('#tblDanhSachNhaCungCap').DataTable();
        var _data = table.row($(this)).data();
        console.log(_data[1]);
    });

    //KhachHang
    $(document).on("dblclick", "#tblDanhSachKhachHang >tbody > tr", function() {
        var table = $('#tblDanhSachKhachHang').DataTable();
        var _data = table.row($(this)).data();
        console.log(_data[1]);
    });

    //SanPham
    $(document).on("dblclick", "#tblDanhSachSanPham >tbody > tr", function() {
        var table = $('#tblDanhSachSanPham').DataTable();
        var _data = table.row($(this)).data();
        console.log(_data[1]);
    });

    //PhieuNhapKho
    $(document).on("dblclick", "#tblDanhSachPhieuNhapKho >tbody > tr", function() {
        var table = $('#tblDanhSachPhieuNhapKho').DataTable();
        var _data = table.row($(this)).data();
        console.log(_data[1]);
    });
};