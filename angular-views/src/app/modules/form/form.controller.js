(function() {
  'use strict';
  var app = angular.module('homeModule');
  app.controller('FormController', FormController);

  /** @ngInject */
  function FormController($scope, $log, $timeout, $mdDialog, CommonUIServices) {

    $scope.isMainVisible = false;
    $scope.settings = [{
        name: 'Own a two wheeler?',
        icon: 'motorcycle',
        enabled: true
      },
      {
        name: 'Own a pet?',
        icon: 'pets',
        enabled: false
      },
    ];

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) {
      return {
        abbrev: state
      };
    });

    $scope.user = {
      image: 'assets/images/bg.png',
      fname: '',
      lname: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      twoWheeler: '',
      petOwned: ''
    };

    $scope.showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#formWrap')))
        .clickOutsideToClose(true)
        .title('Info')
        .textContent('This UI was created using Angular Material framework.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
      );
    };

    $scope.onViewInit = function(data) {
      console.log('on create');
      $scope.isMainVisible = true;
    }

    $scope.clickImage = function(id) {
      $timeout(function() {
        nativeOpenCamera(id);
      });
    };

    $scope.uploadImage = function(id) {
      $timeout(function() {
        nativeImagePicker(id);
      });
    };

    $scope.submit = function() {
      if ($scope.user.fname == '')
        CommonUIServices.showSimpleToast(new ToastObject('Please enter first name.', LENGTH_SHORT));
      else {
        nativeDataSubmit('test', $scope.user);
      }
    };

    $scope.updateImage = function(id, path) {
      $scope.user.image = path;
      console.log(id, $scope.user.image);
    };
  }
})();
