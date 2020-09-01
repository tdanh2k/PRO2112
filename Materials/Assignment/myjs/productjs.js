var app = angular.module("myapp2", ["ngRoute"]);
app.controller("myctrl", function($scope, $http, $interval) {

    $scope.gio = new Date();
    $interval(function() { $scope.gio = new Date(); }, 1000);

    var stop;
    $scope.counter = 1;
    $scope.count = function() {
        $scope.counter = 1200;
        stop = $interval(function() { console.log($scope.counter--) }, 1000);
        if ($scope.counter == 0) {
            $interval.cancel(stop);
            stop = undefined;
        }
    }


    if ($scope.counter == 0) {
        $interval.cancel(stop);
        stop = undefined;
    }

    $scope.stopcount = function() {
        $interval.cancel(stop);
        stop = undefined;
    }

    $scope.products = [];
    $http.get("db/Subjects.js").then(function(response) {
        $scope.products = response.data;
    });

    $scope.ADAV = [];
    $http.get("db/Quizs/ADAV.js").then(function(response) {
        $scope.ADAV = response.data;
    });

    $scope.ADBS = [];
    $http.get("db/Quizs/ADBS.js").then(function(response) {
        $scope.ADBS = response.data;
    });

    $scope.ADTE = [];
    $http.get("db/Quizs/ADTE.js").then(function(response) {
        $scope.ADTE = response.data;
    });

    $scope.ADUI = [];
    $http.get("db/Quizs/ADUI.js").then(function(response) {
        $scope.ADUI = response.data;
    });

    $scope.ASNE = [];
    $http.get("db/Quizs/ASNE.js").then(function(response) {
        $scope.ASNE = response.data;
    });

    $scope.CLCO = [];
    $http.get("db/Quizs/CLCO.js").then(function(response) {
        $scope.CLCO = response.data;
    });

    $scope.DBAV = [];
    $http.get("db/Quizs/DBAV.js").then(function(response) {
        $scope.DBAV = response.data;
    });

    $scope.DBBS = [];
    $http.get("db/Quizs/DBBS.js").then(function(response) {
        $scope.DBBS = response.data;
    });

    $scope.GAME = [];
    $http.get("db/Quizs/GAME.js").then(function(response) {
        $scope.GAME = response.data;
    });

    $scope.HTCS = [];
    $http.get("db/Quizs/HTCS.js").then(function(response) {
        $scope.HTCS = response.data;
    });

    $scope.INMA = [];
    $http.get("db/Quizs/INMA.js").then(function(response) {
        $scope.INMA = response.data;
    });

    $scope.JAAV = [];
    $http.get("db/Quizs/JAAV.js").then(function(response) {
        $scope.JAAV = response.data;
    });

    $scope.JABS = [];
    $http.get("db/Quizs/JABS.js").then(function(response) {
        $scope.JABS = response.data;
    });

    $scope.JSPR = [];
    $http.get("db/Quizs/JSPR.js").then(function(response) {
        $scope.JSPR = response.data;
    });

    $scope.LAYO = [];
    $http.get("db/Quizs/LAYO.js").then(function(response) {
        $scope.LAYO = response.data;
    });

    $scope.MOWE = [];
    $http.get("db/Quizs/MOWE.js").then(function(response) {
        $scope.MOWE = response.data;
    });

    $scope.PHPP = [];
    $http.get("db/Quizs/PHPP.js").then(function(response) {
        $scope.PHPP = response.data;
    });

    $scope.PMAG = [];
    $http.get("db/Quizs/PMAG.js").then(function(response) {
        $scope.PMAG = response.data;
    });

    $scope.Template = [];
    $http.get("db/Quizs/Template.js").then(function(response) {
        $scope.Template = response.data;
    });

    $scope.VBPR = [];
    $http.get("db/Quizs/VBPR.js").then(function(response) {
        $scope.VBPR = response.data;
    });

    $scope.WEBU = [];
    $http.get("db/Quizs/WEBU.js").then(function(response) {
        $scope.WEBU = response.data;
    });

    $scope.Subjects = [];
    $http.get("db/Subjects.js").then(function(response) {
        $scope.Subjects = response.data;
    });

    $scope.prop = "+Id";

    $scope.begin = 0;
    $scope.pageCount = Math.ceil($scope.products.length / 6);

    $scope.first = function() {
        $scope.begin = 0;
    }

    $scope.prev = function() {
        if ($scope.begin - 6 < 0) {
            $scope.begin = 0;
        } else {
            $scope.begin = $scope.begin - 6;
        }
    }

    $scope.next = function() {
        if ($scope.begin + 6 > $scope.products.length) {

        } else {
            $scope.begin = $scope.begin + 6;
        }
    }

    $scope.last = function() {
        $scope.begin = $scope.products.length - 2;
    }



    $scope.spbegin = 0;
    $scope.pageCount = Math.ceil($scope.ADAV.length / 6);

    $scope.back = function() {
        $scope.spbegin = 0;
    }

    $scope.spfirst = function() {
        $scope.spbegin = 0;
    }

    $scope.spprev = function() {
        if ($scope.spbegin - 1 < 0) {
            $scope.spbegin = 0;
        } else {
            $scope.spbegin = $scope.spbegin - 1;
        }
    }

    $scope.adavnext = function() {
        if ($scope.spbegin + 2 > $scope.ADAV.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.adbsnext = function() {
        if ($scope.spbegin + 2 > $scope.ADBS.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.adavlast = function() {
        adav = $scope.ADAV.length - 1;
        $scope.spbegin = adav;
    }

    $scope.adbslast = function() {
        adbs = $scope.ADBS.length - 1;
        $scope.spbegin = adbs;
    }

    $scope.aduinext = function() {
        if ($scope.spbegin + 2 > $scope.ADUI.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.aduilast = function() {
        adav = $scope.ADUI.length - 1;
        $scope.spbegin = adav;
    }

    $scope.adtenext = function() {
        if ($scope.spbegin + 2 > $scope.ADTE.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.adtelast = function() {
        adav = $scope.ADTE.length - 1;
        $scope.spbegin = adav;
    }

    $scope.asnenext = function() {
        if ($scope.spbegin + 2 > $scope.ASNE.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.asnelast = function() {
        adav = $scope.ASNE.length - 1;
        $scope.spbegin = adav;
    }

    $scope.clconext = function() {
        if ($scope.spbegin + 2 > $scope.CLCO.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.clcolast = function() {
        adav = $scope.CLCO.length - 1;
        $scope.spbegin = adav;
    }

    $scope.dbavnext = function() {
        if ($scope.spbegin + 2 > $scope.DBAV.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.dbavlast = function() {
        adav = $scope.DBAV.length - 1;
        $scope.spbegin = adav;
    }

    $scope.dbbsnext = function() {
        if ($scope.spbegin + 2 > $scope.DBBS.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.dbbslast = function() {
        adav = $scope.DBBS.length - 1;
        $scope.spbegin = adav;
    }

    $scope.gamenext = function() {
        if ($scope.spbegin + 2 > $scope.GAME.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.gamelast = function() {
        adav = $scope.GAME.length - 1;
        $scope.spbegin = adav;
    }

    $scope.htcsnext = function() {
        if ($scope.spbegin + 2 > $scope.HTCS.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.htcslast = function() {
        adav = $scope.HTCS.length - 1;
        $scope.spbegin = adav;
    }

    $scope.inmanext = function() {
        if ($scope.spbegin + 2 > $scope.INMA.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.inmalast = function() {
        adav = $scope.INMA.length - 1;
        $scope.spbegin = adav;
    }

    $scope.jaavnext = function() {
        if ($scope.spbegin + 2 > $scope.JAAV.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.jaavlast = function() {
        adav = $scope.JAAV.length - 1;
        $scope.spbegin = adav;
    }

    $scope.jabsnext = function() {
        if ($scope.spbegin + 2 > $scope.JABS.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.jabslast = function() {
        adav = $scope.JABS.length - 1;
        $scope.spbegin = adav;
    }

    $scope.jsprnext = function() {
        if ($scope.spbegin + 2 > $scope.JSPR.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.jsprlast = function() {
        adav = $scope.JSBR.length - 1;
        $scope.spbegin = adav;
    }

    $scope.layonext = function() {
        if ($scope.spbegin + 2 > $scope.LAYO.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.layolast = function() {
        adav = $scope.LAYO.length - 1;
        $scope.spbegin = adav;
    }

    $scope.mowenext = function() {
        if ($scope.spbegin + 2 > $scope.MOWE.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.mowelast = function() {
        adav = $scope.MOWE.length - 1;
        $scope.spbegin = adav;
    }

    $scope.phppnext = function() {
        if ($scope.spbegin + 2 > $scope.PHPP.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.phpplast = function() {
        adav = $scope.PHPP.length - 1;
        $scope.spbegin = adav;
    }

    $scope.pmagnext = function() {
        if ($scope.spbegin + 2 > $scope.PMAG.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.pmaglast = function() {
        adav = $scope.PMAG.length - 1;
        $scope.spbegin = adav;
    }

    $scope.vbprnext = function() {
        if ($scope.spbegin + 2 > $scope.VBPR.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.vbprlast = function() {
        adav = $scope.VBPR.length - 1;
        $scope.spbegin = adav;
    }

    $scope.webunext = function() {
        if ($scope.spbegin + 2 > $scope.WEBU.length) {

        } else {
            $scope.spbegin = $scope.spbegin + 1;
        }
    }

    $scope.webulast = function() {
        adav = $scope.WEBU.length - 1;
        $scope.spbegin = adav;
    }


    $scope.students = [];
    $http.get("db/Students.js").then(function(response) {
        $scope.students = response.data;
    });

    $scope.name = "Tài khoản";


    $scope.check = function() {
        $scope.status = "Bạn nhập sai tài khoản hoặc mật khẩu, vui lòng kiểm tra lại nhé!"
        $scope.status1 = "";
        $scope.status2 = "";
        for (var i = 0; i <= $scope.students.length; i++) {
            if ($scope.check.taikhoan == $scope.students[i].username && $scope.check.matkhau == $scope.students[i].password) {
                $scope.name = $scope.check.taikhoan;
                $scope.status = "Bạn đã đăng nhập thành công"
            }
        }
    }

    $scope.checkmatkhau = function() {
        $scope.status = "Bạn nhập sai tài khoản hoặc email đăng ký rồi, vui lòng kiểm tra lại nhé!"
        $scope.status1 = "";
        $scope.status2 = "";
        for (var i = 0; i <= $scope.students.length; i++) {
            if ($scope.check.taikhoan == $scope.students[i].username && $scope.check.email == $scope.students[i].email) {
                $scope.status1 = "Password của bạn là: ";
                $scope.status2 = ", hãy nhớ kĩ nó nhé";
                $scope.status = $scope.students[i].password
            }
        }
    }

    $scope.dangxuat = function() {
        $scope.name = "Tài khoản";
    }

    $scope.student = {};

    $scope.doimatkhau = function() {
        $scope.status = "Bạn đã nhập sai mật khẩu cũ, vui lòng kiểm tra lại!"
        $scope.status1 = "";
        $scope.status2 = "";
        for (var i = 0; i <= $scope.students.length; i++) {
            if ($scope.check.username == $scope.students[i].username && $scope.check.password == $scope.students[i].password) {
                $scope.students[i].password = $scope.student.password;
                $scope.status = "Bạn nhập đổi mật khẩu thành công!"
            }
        }
    }

    $scope.abc = "concac";

    $scope.hoso = function() {
        for (var i = 0; i <= $scope.students.length; i++) {
            if ($scope.name == $scope.students[i].username) {
                $scope.student.fullname = $scope.students[i].fullname;
                $scope.student.password = $scope.students[i].password;
                $scope.student.email = $scope.students[i].email;
                $scope.student.gender = $scope.students[i].gender;
                $scope.student.birthday = $scope.students[i].birthday;
                $scope.student.schoolfee = $scope.students[i].schoolfee;
                $scope.student.marks = $scope.students[i].marks;
            }
        }
    }

    $scope.clear = function() {
        $scope.student.fullname = "";
        $scope.student.password = "";
        $scope.student.email = "";
        $scope.student.gender = "";
        $scope.student.birthday = "";
        $scope.student.schoolfee = "";
        $scope.student.marks = "";
    }

    $scope.capnhathoso = function() {
        $scope.status1 = "";
        $scope.status2 = "";
        for (var i = 0; i <= $scope.students.length; i++) {
            if ($scope.student.username == $scope.students[i].username) {
                $scope.students[i].fullname = $scope.student.fullname;
                $scope.students[i].email = $scope.student.email;
                $scope.students[i].birthday = $scope.student.birthday;
                $scope.students[i].gender = $scope.student.gender;
                $scope.status = "Bạn đã cập nhật thành công!";
            }
        }
    }

    $scope.dangky = function() {
        $scope.students.push(angular.copy($scope.student));
        $scope.status = "Bạn đã đăng ký thành công"
        $scope.status1 = "";
        $scope.status2 = "";
    }

    $scope.diem = 0;
    $scope.quizstatus = 1;

    $scope.checkquizadav = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.ADAV.length; i++) {
            if ($scope.check.quiz == $scope.ADAV[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }


    $scope.checkquizadbs = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.ADBS.length; i++) {
            if ($scope.check.quiz == $scope.ADBS[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizadte = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.ADTE.length; i++) {
            if ($scope.check.quiz == $scope.ADTE[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizadui = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.ADUI.length; i++) {
            if ($scope.check.quiz == $scope.ADUI[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizasne = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.ASNE.length; i++) {
            if ($scope.check.quiz == $scope.ASNE[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizclco = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.CLCO.length; i++) {
            if ($scope.check.quiz == $scope.CLCO[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizdbav = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.DBAV.length; i++) {
            if ($scope.check.quiz == $scope.DBAV[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizdbbs = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.CLCO.length; i++) {
            if ($scope.check.quiz == $scope.DBBS[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizgame = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.GAME.length; i++) {
            if ($scope.check.quiz == $scope.GAME[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizhtcs = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.HTCS.length; i++) {
            if ($scope.check.quiz == $scope.HTCS[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizinma = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.INMA.length; i++) {
            if ($scope.check.quiz == $scope.INMA[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizjaav = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.JAAV.length; i++) {
            if ($scope.check.quiz == $scope.JAAV[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizjabs = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.JABS.length; i++) {
            if ($scope.check.quiz == $scope.JABS[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizjspr = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.JSPR.length; i++) {
            if ($scope.check.quiz == $scope.JSPR[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizlayo = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.LAYO.length; i++) {
            if ($scope.check.quiz == $scope.LAYO[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizmowe = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.MOWE.length; i++) {
            if ($scope.check.quiz == $scope.MOWE[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizphpp = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.CLCO.length; i++) {
            if ($scope.check.quiz == $scope.PHPP[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizpmag = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.PMAG.length; i++) {
            if ($scope.check.quiz == $scope.PMAG[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizclco = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.CLCO.length; i++) {
            if ($scope.check.quiz == $scope.CLCO[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizvbpr = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.VBPR.length; i++) {
            if ($scope.check.quiz == $scope.VBPR[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.checkquizwebu = function() {
        $scope.sta = "Bạn đã chọn sai, cố gắng lên nhé";
        $scope.quizstatus = 0;
        for (var i = 0; i <= $scope.WEBU.length; i++) {
            if ($scope.check.quiz == $scope.WEBU[i].AnswerId) {
                $scope.diem = $scope.diem + 1;
                $scope.quizstatus = 0;
                $scope.sta = "Bạn đã chọn đúng, chúc mừng bạn!";
            }
        }
    }

    $scope.uncheck = function() {
        $scope.quizstatus = 1;
    }

    $scope.uncheck2 = function() {
        $scope.quizstatus = 0;
    }

    $scope.clearquiz = function() {
        $scope.diem = 0;
        $scope.quizstatus = 1;
    }

    $scope.nhanxem = 0;

    $scope.nhan = function() {
        $scope.nhanxem = 1;
    }

    $scope.nhan1 = function() {
        $scope.nhanxem = 0;
    }
});

app.filter('counter', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])