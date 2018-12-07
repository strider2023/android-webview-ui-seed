(function() {
  'use strict';

  var app = angular.module('esfApp');
  app.service('CommonUIServices', CommonUIServices);

  function CommonUIServices($mdBottomSheet, $mdToast, $mdDialog, $window, $rootScope) {

    this.navBarLogFlag = 0;
    this.showBottomSheet = function(dialogObject, onCancel, onSuccess) {
      $mdBottomSheet.show({
        locals: {
          bundle: dialogObject.bundle,
          onCancel: onCancel,
          onSuccess: onSuccess
        },
        controller: dialogObject.controller,
        templateUrl: dialogObject.view,
        clickOutsideToClose: dialogObject.clickOutsideToClose,
        escapeToClose: dialogObject.escapeToClose
      });
    }

    this.showDialog = function(dialogObject, onCancel, onSuccess) {
      $mdDialog.show({
        locals: {
          bundle: dialogObject.bundle,
          onCancel: onCancel,
          onSuccess: onSuccess
        },
        controller: dialogObject.controller,
        templateUrl: dialogObject.view,
        parent: angular.element(document.body),
        clickOutsideToClose: dialogObject.clickOutsideToClose,
        escapeToClose: dialogObject.escapeToClose
      });
    }


    this.showSimpleToast = function(toastObject) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(toastObject.message)
        .position('bottom left')
        // .positionClass: 'toast-top-right',
        .hideDelay(toastObject.timeout)
        .theme('error-toast')
        .action('X')
        //.hideDelay(180000)
      );
    };

    this.closeDialogOnbackNavigation = function() {
      $rootScope.$on('$locationChangeStart', function(event) {
        // Check if there is a dialog active
        // event.preventDefault();
        if (angular.element(document).find('md-dialog').length > 0) {
          $mdDialog.cancel();
        }
      })
    }
  }
})();
