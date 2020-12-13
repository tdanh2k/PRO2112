var app = angular.module("myapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "../../pages/mypages/nhanvienProfile.html",
            controller: 'nhanvienProfile'
        })
        .when("/nhanvien", {
            templateUrl: "../../pages/mypages/nhanvienForm.html",
            controller: 'nhanvienForm'
        })
        .when("/sanpham", {
            templateUrl: "../../pages/mypages/sanphamForm.html",
            controller: 'sanphamForm'
        })
        .when("/khachhang", {
            templateUrl: "../../pages/mypages/khachhangForm.html",
            controller: 'khachhangForm'
        })
        .when("/nhacungcap", {
            templateUrl: "../../pages/mypages/nhacungcapForm.html",
            controller: 'nhacungcapForm'
        })
        .when("/phieunhapkho", {
            templateUrl: "../../pages/mypages/phieunhapkhoForm.html",
            controller: 'phieunhapkhoForm'
        })
        .otherwise({
            redirectTo: "/home"
        })
});

app.controller("myCtrl", function($scope, $routeParams) {
    angular.element(function() {});
});