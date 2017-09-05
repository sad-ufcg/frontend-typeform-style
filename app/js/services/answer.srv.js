'user strict';
(function() {
    var app = angular.module('sadApp');

    app.factory("AnswerService", function ($http, baseUrl) {

        var _getQuiz = function(id, name) {
            return $http.get(baseUrl + '/question').then(
                function(response){
                    return response.data;
                });
        };

        var _submitAnswers = function(token, text, radio){
            var answers = [];
            for (var v in text) {
                answers.push({'question': {'id': v}, 'answerText': text[v]});
            }
            for (var v in radio) {
                answers.push({'question': {'id': v}, 'choiceNumber': radio[v]});
            }
            var answer = {'token': {'id': token}, 'answers': answers, 'invalid': false};
            return $http.post(baseUrl + "/questionnaireanswers", JSON.stringify(answer),
                {headers: {'Accept': "text/plain"}});
        };

        var _submitNoAnswers = function(token){
            var answer = {'token': {'id': token}, 'answers': [], 'invalid': true};
            return $http.post(baseUrl + "/questionnaireanswers", JSON.stringify(answer),
                {headers: {'Accept': "text/plain"}});
        };

        return {
            getQuiz : _getQuiz,
            submitAnswers: _submitAnswers,
            submitNoAnswers: _submitNoAnswers
        }
    })

})();