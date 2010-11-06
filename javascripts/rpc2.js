Ext.Ajax.rpcRequest = function(options){
  Ext.apply(options, {
    method: 'post',
    jsonData: { jsonrpc: "2.0", method: options.rpcMethod, params: options.rpcParams, "id": 1 }	            
  });
  
  Ext.Ajax.request(options)  
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
            //request = writer.write(this.buildRequest(operation, callback, scope));
        request = this.buildRequest(operation, callback, scope);
        
        if (operation.allowWrite()) {
          request = writer.write(request);
        }
        
        // maybe merge this.params (this.baseParams??) with operation.params
        Ext.apply(request, {
          scope   : this,
          callback: this.createRequestCallback(request, operation, callback, scope),
    	    method: 'post',
          timeout : this.timeout,
          headers : this.headers,          
    	    jsonData: { jsonrpc: "2.0", method: this.rpcMethod, params: operation.params, "id": 1 }	            
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
                App.hideLoading()
            } else {
                //this.fireEvent('exception', this, response, operation);
                App.hideLoading()
                new Ext.MessageBox({}).showMessage("Problemi s Internet konekcijom.")                
                
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