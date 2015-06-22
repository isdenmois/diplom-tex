'use strict';

/* Controllers */

angular
  .module('adhocControllers', [])
  .controller('IssueListController', ['$scope', 'flash', 'Results', IssueListController])
  .controller('AlgorithmController', ['$scope', '$location', 'flash', 'Algorythm', 'Result', AlgorithmController])
  .controller('ResultController', ['$scope', '$routeParams', 'Result', ResultController])
;

function IssueListController($scope, flash,  Results) {
  Results.query()
    .$promise.then(function (result) {
      angular.forEach(result, function(index) {
        var name = index.algorithm + '. ';
        name += index.area + ', ';
        name += '' + index.size + ', ' + index.step;
        index.name = name;
      });
      $scope.issues = result;
    });
  
  $scope.message = flash.getMessage();
}

function AlgorithmController($scope, $location, flash, Algorythm, Result) {
  Algorythm.get({issueId:'algorithms'})
    .$promise.then(function (data) {
      $scope.algorithms = data;
      $scope.algorithm = data[0];
    }
  );

  $scope.addRequest = function () {
    var params = {
      name: $scope.algorithm.name,
      params: $scope.algorithm.options
    };
    Result.addRequest(params);
    flash.setMessage('Запрос успешно оставлен');
    $location.path("/");
  }
}

function ResultController($scope, $routeParams, Result) {
  var id = ($routeParams.id || false);
  if (id) {
    Result.get({issueId: id})
      .$promise.then(function (result) {
        $scope.params = result.params;
        var data = {
          title: {
            text: result.algorithm
          },
          series: []
        };

        angular.forEach(result.series, function(seria) {
          data.series.push({
            name: seria.name,
            data: seria.data
          });
        });

        $scope.dataChart = data;
    });
  }
}