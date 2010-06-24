var Dialog = {
	selector : '#dialog',
	
	show : function(text){
		// TODO refactor
		$('#dialog_content').html(text)
		$('#dialog').show()	
	},

	hide : function(){
		$(this.selector).hide()
	},
	
	showLoading : function(text){
		this.show('<span><img src="images/spinner4.gif" /> ' + text + '</span>')
	}	
}