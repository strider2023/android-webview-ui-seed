(function() {
  'use strict';

  var app = angular.module('esfApp');
  app.service('NTStorageService', ntStorageService);

  function ntStorageService($window) {

    this.setLastAccessedTab = function(position) {
      sessionStorage.setItem('lastAccessedTab', position);
    }

    this.getLastAccessedTab = function() {
      return Number(sessionStorage.getItem('lastAccessedTab'));
    }

    this.clearSessionData = function() {
      sessionStorage.removeItem('lastAccessedTab');
    }

    this.setToolVisitedFlag =  function(tool){
      $window.localStorage.setItem(tool, 'visited');
    }

    this.isToolVisited = function(tool){
      return $window.localStorage.getItem(tool) === 'visited';
    }
  }
})();
