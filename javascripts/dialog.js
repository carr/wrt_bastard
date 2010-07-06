var Dialog = {
	selector : '#dialog',
	
	show : function(text){
		// TODO refactor
		$('#dialog_content').innerHTML = text
		Utility.show($('#dialog')[0])
	},

	hide : function(){
		$(this.selector).hide()
	},
	
	showLoading : function(text){
		this.show('<span><img src="images/spinner4.gif" /> ' + text + '</span>')
	}	
}