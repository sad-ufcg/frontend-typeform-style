'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("FormController", function FormController($scope, $state, $http, AnswerService, quiz) {

        //TODO: treat unexpected situations with toastr
        //      the functions (send, select and sendNegar) haven't been tested yet

        var formCtrl = this;

        formCtrl.quiz = quiz.data;
        formCtrl.radio_question = {};
        formCtrl.text_question = {};
        formCtrl.token = $state.params.token;
        formCtrl.curso = $state.params.curso;
        formCtrl.visible = {};
        formCtrl.count = 0;
        formCtrl.actual_question = formCtrl.quiz[formCtrl.count];
        formCtrl.determinateValue = 0;
        formCtrl.numberQuestion = 1;
        formCtrl.numberOfQuestions = formCtrl.quiz.length / 2;
        formCtrl.inHome = true;

        var PAGE_UP = 33;
        var PAGE_DOWN = 34;

        formCtrl.next = function () {

            var LAST_QUESTION = formCtrl.quiz.length - 2;
            if (formCtrl.count < LAST_QUESTION) {
                formCtrl.count += 2;
                formCtrl.actual_question = formCtrl.quiz[formCtrl.count];
                formCtrl.calcPercentage(formCtrl.count);
                formCtrl.upDateNumberQuestion(1);
            }
        };

        formCtrl.previous = function () {

            var FIRST_QUESTION = 0;
            if (formCtrl.count > FIRST_QUESTION) {
                formCtrl.count -= 2;
                formCtrl.actual_question = formCtrl.quiz[formCtrl.count];
                formCtrl.calcPercentage(formCtrl.count);
                formCtrl.upDateNumberQuestion(-1);
            }
        };

        formCtrl.upDateNumberQuestion = function (value) {
          formCtrl.numberQuestion = formCtrl.numberQuestion + value;
        };

        formCtrl.calcPercentage = function (count) {
            formCtrl.determinateValue = count / (formCtrl.quiz.length - 2)*100;
        };

        formCtrl.toggle = function (q, id) {
            q[id] = !q[id];
        };

        formCtrl.start = function () {
            console.log("start");
            formCtrl.inHome = false;
        };

        formCtrl.sendAnswer = function (token) {
            AnswerService.submitAnswers(token,
                formCtrl.text_question, formCtrl.radio_question)
                .then(function successCallback(response) {
                    ngToast.create(response.data);
                }, function errorCallback(response) {
                    ngToast.create({
                        className: 'warning',
                        content: response.status + " (" + response.statusText + "): " + response.data
                    });
                });
        };

        formCtrl.sendNegar = function (token) {
            AnswerService.submitNoAnswers(token).then(function successCallback(response) {
                ngToast.create(response.data);
            }, function errorCallback(response) {
                ngToast.create({
                    className: 'warning',
                    content: response.status + " (" + response.statusText + "): " + response.data
                });
            });
        };

        formCtrl.selectAll = function (value) {
            formCtrl.radio_question = formCtrl.radio_question.map(() => {
                return value;
            });
        };

        /***
         * Watch for keyboard pageDown and pageUp buttons pressed
         */
        $('body').keydown(function (e) {
            $scope.$apply(function () {

                var ANSWERED = formCtrl.radio_question[formCtrl.actual_question.id];

                if (e.keyCode == PAGE_DOWN && ANSWERED) {
                    formCtrl.next();
                } else if (e.keyCode == PAGE_UP) {
                    formCtrl.previous();
                }
            })
        });

    });
})();