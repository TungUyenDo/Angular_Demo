(function () {
    'use strict';
    
    angular
        .module("ungdungdautien")
        .controller("ViduController", ViduController)
        
    function ViduController($scope, ViduServices, $localStorage, $window) {
        console.log('controller 1');
        $scope.xinchao = {};
        $scope.xinchao.tieude = "AngularJS";
        $scope.user = '';

        //login action
        $scope.login = function(){
            $scope.user = {
                email : $scope.emailInput,
                password : $scope.passwordInput
            }
            ViduServices.userLogin($scope.user ,function (data) {
                $scope.result = data.data
                $localStorage.user = data.data.token;
                $window.location.reload()
            })
        }

        //logout action
        $scope.logout = function(){
            ViduServices.userLogout($localStorage.user,function () {
                $localStorage.$reset(); //reset localStorage
                $window.location.reload()
            })
        }


       console.log('Token',$localStorage.user);

    }

        
})();