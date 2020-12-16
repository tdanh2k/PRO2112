//Angular functions
app.controller("nhacungcapForm", function($scope, $routeParams) {
    $scope.titlepage = "Nhà cung cấp";
    $scope.secondtitlepage = "Danh sách nhà cung cấp";
    angular.element(function() {
        activenhacungcap1();
        readypage();
        validateform();
        datatables();
        getDataNhaCungCap();
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
    $scope.tablesclick = function() {
        tablesclickForm();
    };
});

function activenhacungcap1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activenhacungcap").addClass("nav-link active");
    $("#activenhacungcap1").addClass("nav-link active ml-2");
};

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

function overlayThemNhaCC(status) {
    $("#ThemNhaCC").LoadingOverlay("show", {

    });
    setTimeout(function() {
        $("#ThemNhaCC").LoadingOverlay("hide");
        if (status == true) {
            $("#ThemNhaCC").LoadingOverlay("hide");
        };
    }, 3000);
};

function overlayBangNhaCC(status) {
    $("#BangNhaCC").LoadingOverlay("show", {

    });
    setTimeout(function() {
        $("#BangNhaCC").LoadingOverlay("hide");
        if (status == true) {
            $("#BangNhaCC").LoadingOverlay("hide");
        } else {
            var text = 'NHÀ CUNG CẤP';
            errorLoadData(text);
        };
    }, 3000);
};


//function get data
function getDataNhaCungCap() {
    $.ajax({
        type: 'get',
        url: 'asd', //Danh bỏ URL vào
        data: {
            //Bỏ vào các element
        },
        contentType: 'application/json',
        success: function(data) {

            overlayBangNhaCC(true);
        },
        error: function() {
            overlayBangNhaCC(false);
        }
    });
};

// btn functions
function btnThemNhaCungCap() {
    if (!$("#frmNhaCungCap").valid()) {
        errorForm();
        return;
    } else {
        var objdataNhaCungCapForm = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objdataNhaCungCapForm),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangNhaCC(true);
                overlayThemNhaCC(true);
                clearAllNhaCungCapForm();
                var text = 'NHÀ CUNG CẤP';
                successInsert(text);
            },
            error: function() {
                var text = 'NHÀ CUNG CẤP';
                errorInsert(text);
            }
        });
    };
};

function btnSuaNhaCungCap() {
    if (!$("#frmNhaCungCap").valid()) {
        errorForm();
        return;
    } else {
        var objdataNhaCungCapForm = {
            //Cần datatabase để thêm các cột
        };
        $.ajax({
            type: 'post',
            url: '', //Danh bỏ URL vào
            data: JSON.stringify(objdataNhaCungCapForm),
            contentType: 'application/json',
            success: function(data) {
                //Thêm request vào đây

                overlayBangNhaCC(true);
                overlayThemNhaCC(true);
                clearAllNhaCungCapForm();
                var text = 'NHÀ CUNG CẤP';
                successInsert(text);
            },
            error: function() {
                var text = 'NHÀ CUNG CẤP';
                errorInsert(text);
            }
        });
    };
};

function btnNhapLaiNhaCungCap() {
    clearAllNhaCungCapForm();
};

function btnLamMoiTblNhaCungCap() {
    getDataNhaCungCap();
    resetTables();
};