'user strict';
(function() {
    var app = angular.module('sadApp');

    app.controller("FormController", function FormController($scope, $http, $route, ngToast, AnswerService, quiz) {

        var self = this;

        self.quiz = quiz;
        self.radio_question = {};
        self.text_question = {};
        self.token = $route.current.params.token;
        self.curso = $route.current.params.curso;
        self.visible = {};

        self.toggle = function(q, id) {
            q[id] = !q[id];
        };

        self.sendAnswer = function(token) {
            AnswerService.submitAnswers(token,
                self.text_question, self.radio_question)
                .then(function successCallback(response) {
                    ngToast.create(response.data);
                }, function errorCallback(response) {
                    ngToast.create({
                        className: 'warning',
                        content: response.status + " (" + response.statusText + "): " + response.data
                    });
                });
        };

        self.sendNegar = function(token) {
            AnswerService.submitNoAnswers(token).then(function successCallback(response) {
                ngToast.create(response.data);
            }, function errorCallback(response) {
                ngToast.create({
                    className: 'warning',
                    content: response.status + " (" + response.statusText + "): " + response.data
                });
            });
        };

        self.selectAll = function(value) {
            for ( var id in self.radio_question) {
                self.radio_question[id] = value;
            }
        };

        $('.collapse').collapse('hide');

    });
})();