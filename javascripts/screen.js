// uiManager manages screens.
function uiManager() {
  this.screenStack = [];
}

uiManager.prototype.screenStack = null;
uiManager.currentScreen = null;
uiManager.prototype.setCurrent = function(screen, keepPrevious) {
  if (keepPrevious) {
    this.screenStack.push(this.currentScreen);
  }
  this.currentScreen = screen;
};
uiManager.prototype.back = function() {
  if (this.screenStack.length > 0) {
    this.currentScreen = this.screenStack.pop();
  } else {
    Utility.log('Back called, but no screen on stack!');
  }
};

// Screen is a superclass for various screens. 
function Screen() {
  this.showHeader = true;
  this.default_template = 'screen';
};
Screen.prototype.show = function(callback) {
  load_template(this.default_template, callback);
};