function nativeImagePicker(id) {
  if (ESFApp) {
    //Android code block
    ESFApp.showImagePicker(id);
  } else {
    //iOS code Block
  }
}

function nativeOpenCamera(id) {
  if (ESFApp) {
    //Android code block
    ESFApp.showCamera(id);
  } else {
    //iOS code Block
  }
}

function nativeImagePickerCallback(imageId, data) {
  if (imageId) {
    var scope = angular.element(document.getElementById(imageId)).scope();
    scope.$apply(function() {
      scope.updateImage(imageId, data);
    });
  } else {
    console.error('Scope id missing. Unable to push callback data.');
  }
}
