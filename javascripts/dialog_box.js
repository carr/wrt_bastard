var DialogBox = {
  type : null,

  init : function() {
    DialogBox.type = Display.isTouch() ? 'touch' : 'keypad'
  },

  show : function(params) {
    var dialogText = params.dialogText
    var positiveText = params.positiveText
    var negativeText = params.negativeText
    var positiveCallback = params.positiveCallback
    var negativeCallback = params.negativeCallback

    if (typeof (dialogText) == 'undefined') {
      dialogText = i18n.dialogText
    }

    if (typeof (positiveText) == 'undefined') {
      positiveText = i18n.positiveText
    }

    if (typeof (negativeText) == 'undefined') {
      negativeText = i18n.negativeText
    }

    if (typeof (positiveCallback) == 'undefined') {
      positiveCallback = DialogBox.positiveCallback
    }

    if (typeof (negativeCallback) == 'undefined') {
      negativeCallback = DialogBox.negativeCallback
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