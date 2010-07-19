var i18n

function i18nLoad(lang, callback){
	$.ajax({
		url: 'strings/' + lang + '.txt',
		success: function(data){
			eval(data)
			callback()
		}
	})
}