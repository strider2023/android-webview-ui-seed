(function() {
  'use strict';

  angular.module('esfApp', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ui.router',
    'ngMaterial',
    'toastr',
    'angular-nicescroll',
    'homeModule'
  ]);

  // Helps to maintain modularity in big projects. Create modules based on components.
  angular.module('homeModule', [])

})();
