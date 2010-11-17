var DialogBox = {
  type : null,

  init : function() {
    DialogBox.type = Display.isTouch() ? 'touch' : 'keypad'
  },

  show : function(params) {
    var dialogText
    var positiveText
    var negativeText
    var positiveCallback
    var negativeCallback

    if (typeof (params) == 'undefined' || typeof (params.dialogText) == 'undefined') {
      dialogText = i18n.dialogText
    } else {
      dialogText = params.dialogText
    }

    if (typeof (params) == 'undefined' || typeof (params.positiveText) == 'undefined') {
      positiveText = i18n.positiveText
    } else {
      positiveText = params.positiveText
    }

    if (typeof (params) == 'undefined' || typeof (params.negativeText) == 'undefined') {
      negativeText = i18n.negativeText
    } else {
      negativeText = params.negativeText
    }

    if (typeof (params) == 'undefined' || typeof (params.positiveCallback) == 'undefined') {
      positiveCallback = DialogBox.positiveCallback
    } else {
      positiveCallback = params.positiveCallback
    }

    if (typeof (params) == 'undefined' || typeof (params.negativeCallback) == 'undefined') {
      negativeCallback = DialogBox.negativeCallback
    } else {
      negativeCallback = params.negativeCallback
    }

    $('#dialog_box_text').html(dialogText)

    if (DialogBox.type == 'touch') {
      $('#dialog_box_positive').html(positiveText)
      $('#dialog_box_positive').bindClick(positiveCallback)

      $('#dialog_box_negative').html(negativeText)
      $('#dialog_box_negative').bindClick(negativeCallback)
    } else {
      window.menu.setLeftSoftkeyLabel(positiveText, positiveCallback)
      window.menu.setRightSoftkeyLabel(negativeText, negativeCallback)
    }

    $('#dialog_box').show()
  },

  positiveCallback : function(element) {
    DialogBox.clear()
  },

  negativeCallback : function(element) {
    DialogBox.clear()
  },

  clear : function() {
    $('#dialog_box').hide()
    if (DialogBox.type == 'touch') {
      $('#dialog_box_positive').html('')
      $('#dialog_box_positive').unbind()

      $('#dialog_box_negative').html('')
      $('#dialog_box_negative').unbind()
    } else {
      uiManager.getCurrent().setKeypadMenu()
    }
  }
}
