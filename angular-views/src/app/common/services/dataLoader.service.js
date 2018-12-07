(function() {
  'use strict';

  var app = angular.module('esfApp');
  app.service('DataLoaderService', DataLoaderService);

  function DataLoaderService($http, $q) {

    this.loadLocalFile = function(location, onSuccess, onFaliure) {
      $http.get(location)
        .then(function(response) {
          if (typeof response.data === 'object') {
            onSuccess(response.data);
          } else {
            onFaliure(response.data);
          }
        }, function(error) {
          onFaliure(error);
        });
    }
  }
})();
