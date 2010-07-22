/**
 * The SingleChoice is a list of elements where only one can be current at a given time, something like a list of 
 * radio buttons
 */
function SingleChoice(options){
	var that = this
	
	this.element = options.element
	this.items = this.element.find('a')
	this.current = $(this.items[0])
	this.clickCallback = options.onClick
	
	this.items.bindClick(function(element){
		that.items.removeClass('current')
		$(element).addClass('current')
		if(that.clickCallback){
			that.clickCallback($(element))
		}
	})
	
    this.current.addClass('current')
}

SingleChoice.prototype.setCurrent = function(item){
	// TODO
}
