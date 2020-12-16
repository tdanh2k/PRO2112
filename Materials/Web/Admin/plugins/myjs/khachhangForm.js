//Angular functions
app.controller("khachhangForm", function($scope, $routeParams) {
    $scope.titlepage = "Khách hàng";
    $scope.secondtitlepage = "Danh sách khách hàng";
    angular.element(function() {
        activekhachhang1();
        readypage();
        validateform();
        datatables();
        getDataKhachHang();
    });

    $scope.btnThemKhachHang = function() {
        btnThemKhachHang();
    };
    $scope.btnSuaKhachHang = function() {
        btnSuaKhachHang();
    };
    $scope.btnNhapLaiKhachHang = function() {
        btnNhapLaiKhachHang();
    };
    $scope.btnLamMoiTblKhachHang = function() {
        btnLamMoiTblKhachHang();
    };
    $scope.tablesclick = function() {
        tablesclickForm();
    };
});


function activekhachhang1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activekhachhang").addClass("nav-link active");
    $("#activekhachhang1").addClass("nav-link active ml-2");
};

//function ClearAlls
function clearAllKhachHangForm() {
    clearAllMessage();
    var validator = $("#frmKhachHang").validate();
    validator.resetForm();
    $('#txtTenKH').val('');
    $('#txtSdtKH').val('');
    $('#txtEmailKH').val('');
    $('#txtNgayDangKiKH').val('');
    $('#txtNgayKetThucKH').val('');
    $('#txtDiaChiKH').val('');
    $('#txtGhiChuKH').val('');
};

//loadingoverlay functions
function overlayThemKH(status) {
    $("#ThemKH").LoadingOverlay("show", {

    });
    setTimeout(function() {
        $("#ThemKH").LoadingOverlay("hide");
        if (status == true) {
            $("#ThemKH").LoadingOverlay("hide");
        };
    }, 3000);
};

function overlayBangKH(status) {
    $("#BangKH").LoadingOverlay("show", {

    });
    setTimeout(function() {
        $("#BangKH").LoadingOverlay("hide");
        if (status == true) {
            $("#BangKH").LoadingOverlay("hide");
        } else {
            var text = 'KHÁCH HÀNG';
            errorLoadData(text);
        };
    }, 3000);
};

//function get data
function getDataKhachHang() {
    $.ajax({
        type: 'get',
        url: 'asd', //Danh bỏ URL vào
        data: {
            //Bỏ vào các element
        },
        contentType: 'application/json',
        success: function(data) {

            overlayBangKH(true);
        },
        error: function() {
            overlayBangKH(false);
        }
    });
};

//btn functions
function btnThemKhachHang() {
    if (!$("#frmKhachHang").valid()) {
        errorForm();
        return;
    } else {
        var objdataKhachHangForm = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objdataKhachHangForm),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangKH(true);
                overlayThemKH(true);
                clearAllKhachHangForm();
                var text = 'KHÁCH HÀNG';
                successInsert(text);
            },
            error: function() {
                var text = 'KHÁCH HÀNG';
                errorInsert(text);
            }
        });
    };
};

function btnSuaKhachHang() {
    if (!$("#frmKhachHang").valid()) {
        errorForm();
        return;
    } else {
        var objdataKhachHangForm = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objdataKhachHangForm),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangKH(true);
                overlayThemKH(true);
                clearAllKhachHangForm();
                var text = 'KHÁCH HÀNG';
                successInsert(text);
            },
            error: function() {
                var text = 'KHÁCH HÀNG';
                errorInsert(text);
            }
        });
    };
};

function btnNhapLaiKhachHang() {
    clearAllKhachHangForm();
};

function btnLamMoiTblKhachHang() {
    getDataKhachHang();
    resetTables();
};