(function () {
    'use strict';
    angular
        .module("ungdungdautien")
        .factory("ViduServices", ViduServices)

    function ViduServices($http) {
        var factory = {
            userLogin: function(data, callback) {
                console.log(data);
                $http({
                    url: "http://edj.acc-svrs.com/cms/api/members/postLogin",
                    method: "POST",
                    data: {
                        "email": data.email,
                        "password": data.password
                    }

                }).then(function successCallback(res) {
                    callback(res.data);
                    console.log(res)
                }, function errorCallback(error) {
                    $log.log(error);
                });
            },
            userLogout: function(data, callback) {
                $http({
                    url: "http://edj.acc-svrs.com/cms/api/members/getLogout",
                    method: "GET"

                }).then(function successCallback(res) {
                    callback(res.data);
                    console.log(res)
                }, function errorCallback(error) {
                    $log.log(error);
                });
            },
        };
        return factory;
    }

})();