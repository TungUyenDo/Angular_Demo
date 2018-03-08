(function () {
    'use strict';
    
    angular
        .module("ungdungdautien")
        .controller("ViduController", ViduController)
        
    function ViduController($scope, ViduServices) {
        console.log('controller');
        $scope.xinchao = {};
        $scope.xinchao.tieude = "AngularJS";
    }

        
})();