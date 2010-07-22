var T = {
	cache : {},
	cachedTemplates : {},

	// loads a template file from templates/<name>.html and returns the contents with callback(data)
	loadTemplate : function(name, callback){
		var that = this
		
		if(that.cachedTemplates[name] == null){
		    $.ajax({
		        url : "templates/" + name + ".html",
		        context : document.body,
		        success : function(data) {
		          that.cachedTemplates[name] = data
		          callback(data)
		        }
		    })	
		}else{
			callback(that.cachedTemplates[name])
		}
	},

	// render the 'str' template with the data from the object literal 'data'
	renderString : function(str, data){
	    // Figure out if we're getting a template, or if we need to
	    // load the template - and be sure to cache the result.
	    var fn = !/\W/.test(str) ? cache[str] = cache[str] || render(document.getElementById(str).innerHTML) :

	    // Generate a reusable function that will serve as a template
	        // generator (and which will be cached).
	        new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +

	        // Introduce the data as local variables using with(){}
	            "with(obj){p.push('" +

	            // Convert the template into pure JavaScript
	            str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(
	                /\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join(
	                "\\'") + "');}return p.join('');")

	    // Provide some basic currying to the user
	    return data ? fn(data) : fn	
	},

	// render a template with the specific name, load the template if necessary, return rendered contents via callback method
	renderTemplate : function(name, data, callback){
		var that = this
		if(that.cachedTemplates[name] == null) {
			that.loadTemplate(name, function() {
				callback(that.renderCachedTemplate(name, data))
			})
	    }else{
	    	callback(that.renderCachedTemplate(name, data))
	    }	
	},

	// render a template with the specific name from cached templates, return the rendered data
	renderCachedTemplate : function(name, data){
		return this.renderString(this.cachedTemplates[name], data)	
	},

	// render a collection of objects using a template 'name', load the template if necessary, return rendered contents via callback method
	renderCollection : function(name, collection, callback) {
		var that = this
		if(that.cachedTemplates[name] == null) {
			that.loadTemplate(name, function() {
				callback(that.renderCachedCollection(name, collection))
			})
	    }else{
	    	callback(that.renderCachedCollection(name, collection))
	    }
	},

	// render a template and collection from cached templates, return the rendered data
	renderCachedCollection : function(name, collection){
		var result = '';
		for ( var i in collection) {
			result += this.renderString(this.cachedTemplates[name], collection[i])        	
		}	
		return result;
	},

	// render template in a specific DOM element ('holder') 
	renderIn : function(holder, name, data, callback){
		var that = this
		this.renderTemplate(name, data, function(rendered){
			holder.html(that.renderCachedTemplate(name, data))
			callback()
		})	    
	},
	
	// render a cached template in a specific DOM element ('holder')
	renderCachedIn : function(holder, name, data){
		holder.html(this.renderCachedTemplate(name, data))
	},

	// render a collection in a specific DOM element ('holder')
	renderCollectionIn : function(holder, name, collection, callback){
	    this.renderCollection(name, collection, function(data){
	    	holder.html(data)
	    	callback()
	    })
	},
	
	// render a collection in a cached template and add to specific DOM element ('holder')
	renderCachedCollectionIn : function(holder, name, collection){
	    holder.html(this.renderCachedCollection(name, collection))
	}
}