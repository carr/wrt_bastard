var Dialog = {
	selector : '#dialog',
	
	show : function(text){
		// TODO refactor
		$('#dialog_content')[0].innerHTML = text
		Utility.show($('#dialog')[0])
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