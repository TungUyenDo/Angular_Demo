(function () {
    'use strict';
    
    angular
        .module("ungdungdautien")
        .controller("ViduController", ViduController)
        
    function ViduController($http,$scope, ViduServices, $localStorage, $window) {
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

       $scope.enterValidation = function(){
            return true;
        };

        $scope.exitValidation = function(){
            return true;
        };
        //example using context object
        $scope.exitValidation = function(context){
            return context.firstName === "Jacob";
        }
        //example using promises
        $scope.exitValidation = function(){
            var d = $q.defer()
            $timeout(function(){
                return d.resolve(true);
            }, 2000);
            return d.promise;
        }

// ==================load languages by $http angular=======================================================================
        $scope.load_lang_success = '';
        
        //xac dinh ngon ngu nao dang load truoc
        var value_selected = $('.select_languages').find(':selected').attr('value');
        console.log(value_selected);

        //function load vi
        function load_lang_vi() {
            $http.get('./languages/vi.json')
                .success(function (data) {
                    console.log(data);
                    $scope.load_lang_success = data;
                })
                .error(function (data) {
                    console.log("Error getting data from " + './languages/en.json');
                });
        }

        //function load en
        function load_lang_en() {
            $http.get('./languages/en.json')
                .success(function (data) {
                    console.log(data);
                    $scope.load_lang_success = data;
                })
                .error(function (data) {
                    console.log("Error getting data from " + './languages/en.json');
                });
        }

        //load languages vi first
        load_lang_vi();

        //click button to select languages
        $('.select_languages').change(function () {
            var value_lang_selected = $(this).children('option:selected').attr('value')
            console.log(value_lang_selected);

            if (value_lang_selected  == 'vi'){
                load_lang_vi();
            }
            else{
                load_lang_en();
            }
        })
// ================== End load languages by $http angular =======================================================================

        $('.select_languages_custom').click(function(){
            $(this).find('ul').toggleClass('active')
        })
        $('.select_languages_custom li').click(function(){

            var text_selected = $(this).attr('text');
            $(this).closest('.select_languages_custom').find('a').replaceWith('<a>' + text_selected + '</a>')

            var value_selected_v2 = $(this).attr('lang');
            console.log(value_selected_v2);

            if (value_selected_v2 == 'vi') {
                load_lang_vi();
            }
            else {
                load_lang_en();
            }
        })




    }
    //end function   
})();