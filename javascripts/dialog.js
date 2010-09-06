var Dialog = {
  selector : 'dialog',

  show : function(text) {
    Ext.get('dialog_content').setHTML(text)
    Ext.get(Dialog.selector).show()
  },

  hide : function() {
    Ext.get(Dialog.selector).hide()
  },

  showLoading : function(text) {
    if (text == undefined) {
      text = "TODO: ovdje ubaciti neku verziju i18n.loading"
    }
    Dialog.show('<span><img src="images/spinner4.gif" /> ' + text + '</span>')
  }
}
