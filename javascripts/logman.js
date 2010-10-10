var Logman = {}

Logman.init = function(host, app_id, options){
  Logman.host = host
  Logman.app_id = app_id
  Logman.options = options
  
  Logman.req('/apps/1/log_sessions.json', null, function(data){
    Logman.log_session_id = data.log_session.id
  })
}

Logman.req = function(url, payload, callback){
	var req
	if(!payload) payload=null
	
  if(window.XMLHttpRequest) {
	  req = new XMLHttpRequest();
	}
	
	if(req) {
		req.onreadystatechange = function(){
      if (req.readyState == 4) {
        if(req.status == 200 || req.status == 201){
    		  if(callback){
    		    var data = JSON.parse(req.responseText)
    		    callback(data)    		    
    		  }
        } else {
          throw "Shit!"
        }
      }		  
		}
		req.open("POST", Logman.host + "/api" + url, false)		
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")		
		req.send(payload)
	}  
}

Logman.log = function(contents){
  var url = '/apps/' + Logman.app_id + '/log_sessions/' + Logman.log_session_id + '/messages.json'
  var payload = 'message[contents]=' + contents
  Logman.req(url, payload)
}

var log = Logman.log