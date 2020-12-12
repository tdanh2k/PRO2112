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