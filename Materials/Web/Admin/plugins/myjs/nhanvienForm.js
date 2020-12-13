//Angular functions
app.controller("nhanvienForm", function($scope, $routeParams) {
    $scope.titlepage = "Nhân viên";
    $scope.secondtitlepage = "Danh sách nhân viên";
    angular.element(function() {
        activenhanvien1();
        readypage();
        validateform();
        datatables();
        LoadCboReadyPage();
        getDataNhanVien();
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
    $scope.tablesclick = function() {
        tablesclickForm();
    }
});

function activenhanvien1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activenhanvien").addClass("nav-link active");
    $("#activenhanvien1").addClass("nav-link active ml-2");
};


//Function ClearAlls
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
function LoadCboReadyPage() {
    //Initialize Select2 Elements
    loadDatacboChucVuNV();
    $('#cboChucVuNV').val(null).trigger('change');
};


//function get data
function getDataNhanVien() {
    $.ajax({
        type: 'get',
        url: 'asd', //Danh bỏ URL vào
        data: {
            //Bỏ vào các element
        },
        contentType: 'application/json',
        success: function(data) {

            overlayBangNV();
        },
        error: function() {
            var text = 'NHÂN VIÊN';
            errorLoadData(text);
        }
    });
};

//btn functions
function btnThemNV() {
    if (!$("#frmNhanVien").valid()) {
        errorForm();
        return;
    } else {
        var objdataNhanVienForm = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objdataNhanVienForm),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangNV();
                overlayThemNV();
                clearAllNhanVienForm();
                var text = 'NHÂN VIÊN';
                successInsert(text);
            },
            error: function() {
                var text = 'NHÂN VIÊN';
                errorInsert(text);
            }
        });
    };
};

function btnSuaNV() {
    if (!$("#frmNhanVien").valid()) {
        errorForm();
        return;
    } else {
        var objdataNhanVienForm = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objdataNhanVienForm),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangNV();
                overlayThemNV();
                clearAllNhanVienForm();
                var text = 'NHÂN VIÊN';
                successInsert(text);
            },
            error: function() {
                var text = 'NHÂN VIÊN';
                errorEdit(text);
            }
        });
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