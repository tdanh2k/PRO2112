app.config(function($routeProvider) {
    $routeProvider
        .when("/index", {
            templateUrl: "quizs/ADAV.html"
        })
        .when("/dangnhap", {
            templateUrl: "pages/dangnhap.html"
        })
        .when("/dangky", {
            templateUrl: "pages/dangky.html"
        })
        .when("/hoidap", {
            templateUrl: "hoidap.html"
        })
        .when("/gioithieu", {
            templateUrl: "gioithieu.html"
        })
        .when("/laylaimatkhau", {
            templateUrl: "pages/quenmatkhau.html"
        })
        .when("/doimatkhau/:taikhoan", {
            templateUrl: "pages/doimatkhau.html",
            controller: "mkCtrl"
        })
        .when("/capnhathoso/:taikhoan", {
            templateUrl: "pages/hoso.html",
            controller: "hsCtrl"
        })
        .when("/ADAV", {
            templateUrl: "quizs/ADAV.html"
        })
        .when("/ADBS", {
            templateUrl: "quizs/ADBS.html"
        })
        .when("/ADTE", {
            templateUrl: "quizs/ADTE.html"
        })
        .when("/ADUI", {
            templateUrl: "quizs/ADUI.html"
        })
        .when("/ASNE", {
            templateUrl: "quizs/ASNE.html"
        })
        .when("/CLCO", {
            templateUrl: "quizs/CLCO.html"
        })
        .when("/DBAV", {
            templateUrl: "quizs/DBAV.html"
        })
        .when("/DBBS", {
            templateUrl: "quizs/DBBS.html"
        })
        .when("/GAME", {
            templateUrl: "quizs/GAME.html"
        })
        .when("/HTCS", {
            templateUrl: "quizs/HTCS.html"
        })
        .when("/INMA", {
            templateUrl: "quizs/INMA.html"
        })
        .when("/JAAV", {
            templateUrl: "quizs/JAAV.html"
        })
        .when("/JABS", {
            templateUrl: "quizs/JABS.html"
        })
        .when("/JSPR", {
            templateUrl: "quizs/JSPR.html"
        })
        .when("/LAYO", {
            templateUrl: "quizs/LAYO.html"
        })
        .when("/MOWE", {
            templateUrl: "quizs/MOWE.html"
        })
        .when("/PHPP", {
            templateUrl: "quizs/PHPP.html"
        })
        .when("/PMAG", {
            templateUrl: "quizs/PMAG.html"
        })
        .when("/Template", {
            templateUrl: "quizs/Template.html"
        })
        .when("/VBPR", {
            templateUrl: "quizs/VBPR.html"
        })
        .when("/WEBU", {
            templateUrl: "quizs/WEBU.html"
        })
        .otherwise({
            templateUrl: "pages/products.html"
        })
});

app.controller("mkCtrl", function($scope, $routeParams) {
    $scope.check.username = $routeParams.taikhoan;
});

app.controller("hsCtrl", function($scope, $routeParams) {
    $scope.name = $routeParams.taikhoan;
    $scope.student.username = $scope.name;
});