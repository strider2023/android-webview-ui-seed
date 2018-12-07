function DialogObject(view, controller) {
  this.view = view;
  this.controller = controller;
  this.bundle;
  this.clickOutsideToClose = true;
  this.escapeToClose = false;
}
