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
        .otherwise({
            redirectTo: "/home"
        })
});