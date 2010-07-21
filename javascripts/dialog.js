var Dialog = {
	selector : '#dialog',
	
	show : function(text){
		$('#dialog_content').html(text)
		$('#dialog').show()
	},

	hide : function(){
		$(this.selector).hide()
	},
	
	showLoading : function(text){
	  if (text == undefined) {
	    text = i18n.loading
	  }
		this.show('<span><img src="images/spinner4.gif" /> ' + text + '</span>')
	}	
}