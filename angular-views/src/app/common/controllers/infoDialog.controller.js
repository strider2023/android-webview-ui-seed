  /** @ngInject */
function InfoDialogController($scope, $mdDialog, bundle) {
  $scope.info = bundle;

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}
