var Dialog = {
	selector : '#dialog',
	
	show : function(text){
		$('#dialog_content').html(text)
		$(Dialog.selector).show()
	},

	hide : function(){
		$(Dialog.selector).hide()
	},
	
	showLoading : function(text){
	  if (text == undefined) {
	    text = i18n.loading
	  }
		Dialog.show('<span><img src="images/spinner4.gif" /> ' + text + '</span>')
	}	
}