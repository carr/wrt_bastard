var Input = {
  KEY_LEFT : null,
  KEY_UP : null,
  KEY_RIGHT : null,
  KEY_DOWN : null,
  KEY_FIRE : null,

  setKeys : function() {
    if (navigator.userAgent.indexOf("Firefox") == -1) {
      this.KEY_LEFT = 63495;
      this.KEY_UP = 63497;
      this.KEY_RIGHT = 63496;
      this.KEY_DOWN = 63498;
      this.KEY_FIRE = 63557;
    } else {
      this.KEY_LEFT = 37;
      this.KEY_UP = 38;
      this.KEY_RIGHT = 39;
      this.KEY_DOWN = 40;
      this.KEY_FIRE = 13;
    }
  }
};
