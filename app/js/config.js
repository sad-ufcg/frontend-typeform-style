'use strict';

const app = angular.module('sadApp', ['ngMaterial', 'ui.router']);

app.constant('baseUrl', 'http://localhost:8080');

app.config(function ($qProvider, $stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

    $qProvider.errorOnUnhandledRejections(false);


    $stateProvider
        .state("sad", {
            abstract: true,
            views: {
                main: {
                    templateUrl: "view/main-content.html",
                    controller: "MainController as mainCtrl"
                }
            }
        })
        .state("sad.home", {
            url: "/home",
            views: {
                content: {
                    templateUrl: 'view/home.html',
                    controller: 'HomeController as homeCtrl'
                }
            }
        })
        .state("sad.form", {
            url: "/form/:id/:curso/:token",
            views: {
                content: {
                    templateUrl: 'view/form.html',
                    controller: 'FormController as formCtrl'
                }
            },
            resolve: {
                quiz: function (AnswerService) {
                    return AnswerService.getQuiz();
                }
            }
        });

    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,OPTIONS";
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Authorization, Content-Length, X-Requested-With";
 

    app.run(['$rootScope', '$state', function ($rootScope, $state) {

        $state.defaultErrorHandler(function (error) {
            console.log(error);
        })
    }]);

});