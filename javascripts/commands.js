function Commands(){
	this.tabs = []		
}

Commands.prototype.add = function(symbol, title, options){
	if(options == undefined){
		options = {}
	}

	if(options.in_tabs == undefined){
		options.in_tabs = true
	}
	
	this.tabs.push({
		symbol: symbol, 
		title: title, 
		in_tabs: options.in_tabs,
		onclick : options.onclick
	})
}

Commands.prototype.draw = function(callback){
	var that = this;

	var typeName = Display.isTouch() ? 'touch' : 'keypad'

	load_template('layout_' + typeName, function(data){
		$('#layout')[0].innerHTML = data
		
		if(Display.isTouch()){
			$('body').addClass('touch')
			that.drawTouch()
		}else{
			$('body').addClass('keypad')
			that.drawKeypad()
			that.click(that.tabs[0])
		}		
		
		callback()
		
	})
}

Commands.prototype.drawTouch = function(){
	var that = this;

	var newTabs = $.grep(that.tabs, function(command){
		return command.in_tabs;
	});
					
	render_collection($('#tab_row'), 'tabs', newTabs, function(){
		for(var i in newTabs){
			var link = $('.' + newTabs[i].symbol)
			link[0].action = newTabs[i].symbol			
			
			link.bind('click', function(){
				that.clickTab(this)
			})
		}		
		
		that.clickTab($('.tabs a')[0])
	})
	
	if (window.widget) {
        window.menu.hideSoftkeys();
    }	
}

Commands.prototype.drawKeypad = function(){
	var that = this;
	
	if (window.widget) {
        widget.setNavigationEnabled(false)
        
        window.menu.setRightSoftkeyLabel("", null);
        window.menu.showSoftkeys();
		menu.clear();
		for(var i in that.tabs){				
			var command = new MenuItem(that.tabs[i].title, parseInt(i));
			command.onSelect = function(id){
				// workaround for stupid X6 phone that doesn't get UTF				
				Dialog.showLoading(i18n.loading)
				that.click(that.tabs[id]);					
			}
			menu.append(command)
		}
    }		
}

Commands.prototype.clickTab = function(link){
	Dialog.showLoading(i18n.loading)	
	
	var item = this.getItemByAction(link.action)
	this.click(item)
	
	$('.tabs .current').removeClass('current')		
	$(link).addClass('current')
	$(link).blur()		
}

Commands.prototype.click = function(item){	
	if(item.in_tabs){
		this.setTitle(item.title)		
		
		$('#content').html('')
		
		// setira content koji mu vrati funkcija
		item.onclick(function(data){
			$('#content').html(data)
			Dialog.hide()
		});		
	}else{
		item.onclick()
	}	
}

Commands.prototype.getItemByAction = function(action){
	var item;
	for(var i in this.tabs){
		if(this.tabs[i].symbol == action){
			item = this.tabs[i]
		}
	}		
	return item;
}

Commands.prototype.setTitle = function(title){
	$('#header_text')[0].innerHTML = title;	
}

Commands.prototype.clear = function(){
	this.tabs = null
	this.onClick = null	
}