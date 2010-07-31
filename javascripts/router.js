/**
 * The Router is used for generating URLs for API calls. You create a new Router pointed at a server 
 * and then you register routes for it. Routes can contain parameters that are prefixed by a semicolon (:)
 */
var Router = function(options){
	this.server = options.server
	this.routes = {}
}

// register a new route for a URL.
Router.prototype.register = function(routeName, url, options){
	if(this.routes[routeName]){
		throw "Duplicate route " + routeName
	}	
	options = options || {}
	
	// looks for all symbols in the url
	options.parameters = url.match(/:([\w]*?)(\/|$|[.])/g)
		
	if(options.parameters){
		// if any symbols found, replace the endings (\ or .) with blank characters
		for(var match in options.parameters){
			options.parameters[match] = options.parameters[match].replace(/(\/|.){1}$/g, '')
		}
	}	
	
	this.routes[routeName] = {
		url: url,
		options: options
	}
}

// get a route for a specific route name and interpolate all params
Router.prototype.get = function(routeName, params){
	var route = this.routes[routeName]
    if(!route){
    	throw "Route '" + routeName + "' doesn't exist"
    }
	                        
	var url = route.url
	                        
	for(var i in route.options.parameters){
		var param = route.options.parameters[i]
		url = url.replace(param, params[param.replace(/^:{1}/g, '')])
	}
	
	var cacheBuster = url.indexOf('?')==-1 ? '?' : '&'
	cacheBuster += 'cachebuster=' + (new Date()).getTime()
	 // TODO implement
	 //+ cacheBuster
	return this.server + url;
}