Wrt.rpc = function(url, config){
  this.url = url
}

Wrt.rpc.prototype.call = function(method, config){
  config.method = method
  Ext.Ajax.request({
    url: this.url,
    method: 'post',
    jsonData: { jsonrpc: "2.0", method: method, params: config.params, "id": 2 },
    success: function(msg){
      config.success(JSON.parse(msg.responseText).result)
    }
  })
}

/**
 * Proxy for RPC requests. Config accepts "rpcMethod" parameter for the rpc method to call. Also accepts params for rpc params
 */
Ext.data.RpcProxy = Ext.extend(Ext.data.ServerProxy, {
    
    actionMethods: {
        create : 'POST',
        read   : 'POST',
        update : 'POST',
        destroy: 'POST'
    },
    
    
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = writer.write(this.buildRequest(operation, callback, scope));
        
        var method = 'getEpgData'
        Ext.apply(request, {
            scope   : this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            //method  : this.getMethod(request),
    	    method: 'post',
    	    jsonData: { jsonrpc: "2.0", method: this.rpcMethod, params: this.params, "id": 2 }	            
        });
        	    	
        Ext.Ajax.request(request)	    	
        
        return request;
    },
    
    
    getMethod: function(request) {
        return this.actionMethods[request.action];
    },
    
    
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        
        return function(options, success, response) {
            if (success === true) {
                var reader = me.getReader(),
                    result = reader.read(response);

                
                Ext.apply(operation, {
                    response : response,
                    resultSet: result
                });

                operation.markCompleted();
            } else {
                this.fireEvent('exception', this, 'response', operation);
                
                
                operation.markException();                
            }
            
            
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    }
});  
Ext.data.ProxyMgr.registerType('rpc', Ext.data.RpcProxy);