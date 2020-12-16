//Angular functions
app.controller("sanphamForm", function($scope, $routeParams) {
    $scope.titlepage = "Sản phẩm";
    $scope.secondtitlepage = "Danh sách sản phẩm";
    angular.element(function() {
        activesanpham1();
        readypage();
        validateform();
        datatables();
        LoadCboReadyPage();
        getDataSanPham();
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
    $scope.tablesclick = function() {
        tablesclickForm();
    };
});

function activesanpham1() {
    $("#nav-header div").removeClass("nav-link active").addClass('nav-link');
    $("#nav-header a").removeClass("nav-link active").addClass('nav-link');
    $("#activesanpham").addClass("nav-link active");
    $("#activesanpham1").addClass("nav-link active ml-2");
};

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
    setTimeout(function() {
        $("#ThemSP").LoadingOverlay("hide");
        if (status == true) {
            $("#ThemSP").LoadingOverlay("hide");
        };
    }, 3000);
};

function overlayBangSP() {
    $("#BangSP").LoadingOverlay("show", {

    });
    setTimeout(function() {
        $("#BangSP").LoadingOverlay("hide");
        if (status == true) {
            $("#BangSP").LoadingOverlay("hide");
        } else {
            var text = 'SẢN PHẨM';
            errorLoadData(text);
        };
    }, 3000);
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
function LoadCboReadyPage() {
    loadDatacboLoaiSP();
    $('#cboLoaiSP').val(null).trigger('change');

    loadDatacboNhaCungCapSP();
    $('#cboNhaCungCapSP').val(null).trigger('change');
};

function getDataSanPham() {
    $.ajax({
        type: 'get',
        url: 'asd', //Danh bỏ URL vào
        data: {
            //Bỏ vào các element
        },
        contentType: 'application/json',
        success: function(data) {

            overlayBangSP(true);
        },
        error: function() {
            overlayBangSP(false);
        }
    });
};

//btn functions
function btnThemSanPham() {
    if (!$("#frmSanPham").valid()) {
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

                overlayBangSP(true);
                overlayThemSP(true);
                clearAllSanPhamForm();
                var text = 'SẢN PHẨM';
                successInsert(text);
            },
            error: function() {
                var text = 'SẢN PHẨM';
                errorInsert(text);
            }
        });
    };
};

function btnSuaSanPham() {
    if (!$("#frmSanPham").valid()) {
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

                overlayBangSP(true);
                overlayThemSP(true);
                clearAllSanPhamForm();
                var text = 'SẢN PHẨM';
                successInsert(text);
            },
            error: function() {
                var text = 'SẢN PHẨM';
                errorInsert(text);
            }
        });
    };
};

function btnNhapLaiSanPham() {
    clearAllSanPhamForm();
};

function btnLamMoiTblSanPham() {
    getDataSanPham();
    resetTables();
};