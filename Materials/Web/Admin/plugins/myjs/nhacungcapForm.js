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

function overlayThemNhaCC() {
    $("#ThemNhaCC").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#ThemNhaCC").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#ThemNhaCC").LoadingOverlay("progress", count);
    }, 300);
};

function overlayBangNhaCC() {
    $("#BangNhaCC").LoadingOverlay("show", {

    });
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 100) {
            clearInterval(interval);
            $("#BangNhaCC").LoadingOverlay("hide");
            return;
        }
        count += 10;
        $("#BangNhaCC").LoadingOverlay("progress", count);
    }, 300);
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

            overlayBangNV();
        },
        error: function() {
            var text = 'NHÀ CUNG CẤP';
            errorLoadData(text);
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

                overlayBangNhaCC();
                overlayThemNhaCC();
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

                overlayBangNhaCC();
                overlayThemNhaCC();
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
    resetTables();
};