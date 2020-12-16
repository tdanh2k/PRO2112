//Angular functions
app.controller("phieunhapkhoForm", function($scope, $routeParams) {
    $scope.titlepage = "Phiếu nhập kho";
    $scope.secondtitlepage = "Danh sách phiếu nhập kho";
    angular.element(function() {
        activekho1();
        readypage();
        validateform();
        datatables();
        LoadCboReadyPage();
        getDataPhieuNhapKho();
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
    $scope.tablesclick = function() {
        tablesclickForm();
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
    setTimeout(function() {
        $("#ThemPhieuNhapKho").LoadingOverlay("hide");
        if (status == true) {
            $("#ThemPhieuNhapKho").LoadingOverlay("hide");
        };
    }, 3000);
};

function overlayBangPhieuNhapKho() {
    $("#BangPhieuNhapKho").LoadingOverlay("show", {

    });
    setTimeout(function() {
        $("#BangPhieuNhapKho").LoadingOverlay("hide");
        if (status == true) {
            $("#BangPhieuNhapKho").LoadingOverlay("hide");
        } else {
            var text = 'PHIẾU NHẬP KHO';
            errorLoadData(text);
        };
    }, 3000);
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
function LoadCboReadyPage() {
    loadDatacboTinhTrangSPPhieuNhapKho();
    $('#cboTinhTrangSPPhieuNhapKho').val(null).trigger('change');

    loadDatacboLoaiSPNhapKho();
    $('#cboLoaiSPNhapKho').val(null).trigger('change');

    loadDatacboTenSPNhapKho();
    $('#cboTenSPNhapKho').val(null).trigger('change');
}

function getDataPhieuNhapKho() {
    $.ajax({
        type: 'get',
        url: 'asd', //Danh bỏ URL vào
        data: {
            //Bỏ vào các element
        },
        contentType: 'application/json',
        success: function(data) {

            overlayBangPhieuNhapKho(true);
        },
        error: function() {
            overlayBangPhieuNhapKho(false);
        }
    });
};

//btn functions
function btnThemPhieuNhapKho() {
    if (!$("#frmPhieuNhapKho").valid()) {
        errorForm();
        return;
    } else {
        var objDataSanPham = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objDataSanPham),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangPhieuNhapKho(true);
                overlayThemPhieuNhapKho(true);
                clearAllPhieuNhapKhoForm();
                var text = 'PHIẾU NHẬP KHO';
                successInsert(text);
            },
            error: function() {
                var text = 'PHIẾU NHẬP KHO';
                errorInsert(text);
            }
        });
    };
};

function btnSuaPhieuNhapKho() {
    if (!$("#frmPhieuNhapKho").valid()) {
        errorForm();
        return;
    } else {
        var objDataSanPham = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objDataSanPham),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangPhieuNhapKho(true);
                overlayThemPhieuNhapKho(true);
                clearAllPhieuNhapKhoForm();
                var text = 'PHIẾU NHẬP KHO';
                successInsert(text);
            },
            error: function() {
                var text = 'PHIẾU NHẬP KHO';
                errorInsert(text);
            }
        });
    };
};

function btnNhapLaiPhieuNhapKho() {
    clearAllPhieuNhapKhoForm();
};

function btnLamMoitblPhieuNhapKho() {
    getDataPhieuNhapKho();
    resetTables();
};