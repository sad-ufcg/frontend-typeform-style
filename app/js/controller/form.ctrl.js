'user strict';
(function() {
    var app = angular.module('sadApp');

    app.controller("FormController", function FormController($scope,$state, $http,AnswerService) {

        var self = this;

        self.quiz =  AnswerService.getQuiz($state.params.id).then(
            function success(response){
                console.log(response)
                return response.value;
            }
        );

        console.log(self.quiz);
        self.radio_question = {};
        self.text_question = {};
        self.token = $state.params.token;
        self.curso =$state.params.curso;
        console.log(self.curso); 
        console.log(self.token)
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

     

    });
})();