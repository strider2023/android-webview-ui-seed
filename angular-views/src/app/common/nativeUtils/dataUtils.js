function nativeDataSubmit(id, data) {
  if (ESFApp) {
    //Android code block
    ESFApp.submitPressed(id, JSON.stringify(data));
  } else {
    //iOS Code Block
  }
}

function nativeViewInitCallback(data) {
  var scope = angular.element(document.getElementById('main_container')).scope();
  if(scope) {
    scope.$apply(function() {
      scope.onViewInit(data);
    });
  } else {
    console.error('Scope id missing. Unable to push callback data.');
  }
}
