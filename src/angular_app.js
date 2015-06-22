'use strict';

/* App Module */

var adhocApp = angular.module('adhocApp', [
  'ngRoute',
  'adhocControllers',
  'adhocServices',
  'adhocDirectives'
]);

adhocApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/issue', {
        templateUrl: 'views/issue-list.html',
        controller: 'IssueListController'
      }).
      when('/new', {
        templateUrl: 'views/new-issue.html',
        controller: 'AlgorithmController'
      }).
      when('/issue/:id', {
        templateUrl: 'views/result.html',
        controller: 'ResultController'
      }).
      otherwise({
        redirectTo: '/issue'
      });
  }
]);