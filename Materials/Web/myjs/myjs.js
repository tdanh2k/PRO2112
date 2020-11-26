var app = angular.module("myapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "ViewPages.html"
        })
        .when("/blog", {
            templateUrl: "blog.html"
        })
        .when("/blogdetails", {
            templateUrl: "blog-details.html"
        })
        .when("/contact", {
            templateUrl: "contact.html"
        })
        .when("/shop", {
            templateUrl: "shop-grid.html"
        })
        .otherwise({
            redirectTo: "/home"
        })
});

$(document).ready(function() {
    $("#disablediv").children().prop('disabled', true);
});