var Logman = {}

Logman.init = function(host, app_id, callback){
  Logman.host = host
  Logman.app_id = app_id
  Logman.position = 0
  
  Logman.req('/apps/' + app_id + '/log_sessions.json', null, function(data){
    Logman.log_session_id = data.log_session.id
    callback()
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
		req.open("POST", Logman.host + "/api" + url, true)		
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")		
		req.send(payload)
	}  
}

Logman.log = function(contents){
  var url = '/apps/' + Logman.app_id + '/log_sessions/' + Logman.log_session_id + '/messages.json'
  var payload = 'message[contents]=' + contents
  payload += '&message[position]=' + (Logman.position++)
  Logman.req(url, payload)
}

var log = Logman.log
