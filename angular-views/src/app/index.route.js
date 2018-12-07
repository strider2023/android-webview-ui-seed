(function() {
  'use strict';

  angular
    .module('esfApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('form', {
      url: '/',
      templateUrl: 'app/modules/form/form.html',
      controller: 'FormController'
    })

    $urlRouterProvider.otherwise('/');
  }

})();
