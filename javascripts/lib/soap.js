/*****************************************************************************\

 Javascript "SOAP Client" library
 
 @version: 2.4 - 2007.12.21
 @author: Matteo Casati - http://www.guru4.net/
 
\*****************************************************************************/

///////////////////////////////////////////////////////////////////////////////
// Ajax utility calss to create XmlHttpRequest object
function Ajax() 
{
	//	xmlHttpRequest object	
	var request = null;

    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
    	try 
		{
			request = new XMLHttpRequest();
			try
			{
				//	attach the Bypass code, if the browser is firefox
				if(netscape.security.PrivilegeManager.enablePrivilege)
				{
					//	duplicate the function
					request._open = request.open;
					
					//	redefine the function definition
					request.open = function(method, url, flag)
					{
						try
						{
							// Enable Universal Browser Read
							netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");

							//	call the native XmlHttpRequest.open method
							this._open(method, url, flag);
						}catch(e)
						{
							//	call the native XmlHttpRequest.open method
							this._open(method, url, flag);
						}
					}
				}
			}
			catch(e)
			{
				//	eatup all exceptions
			}
		} 
		catch(e) {
			request = null;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
       	try {
        	request = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		request = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		alert('Failed to create XmlHttprequest');
				return null;
        	}
		}
    }
	
	return (request);
}

function SOAPClientParameters()
{
	var _pl = new Array();
	this.add = function(name, value) 
	{
		_pl[name] = value; 
		return this; 
	}
	this.toXml = function()
	{
		var xml = "";
		for(var p in _pl)
		{
			switch(typeof(_pl[p])) 
			{
                case "string":
                case "number":
                case "boolean":
                case "object":
                    xml += "<" + p + ">" + SOAPClientParameters._serialize(_pl[p]) + "</" + p + ">";
                    break;
                default:
                    break;
            }
		}
		return xml;	
	}
}
SOAPClientParameters._serialize = function(o)
{
    var s = "";
    switch(typeof(o))
    {
        case "string":
            s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
        case "number":
        case "boolean":
            s += o.toString(); break;
        case "object":
            // Date
            if(o.constructor.toString().indexOf("function Date()") > -1)
            {
        
                var year = o.getFullYear().toString();
                var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
                var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
                var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
                var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
                var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
                var milliseconds = o.getMilliseconds().toString();
                var tzminutes = Math.abs(o.getTimezoneOffset());
                var tzhours = 0;
                while(tzminutes >= 60)
                {
                    tzhours++;
                    tzminutes -= 60;
                }
                tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
                var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
            }
            // Array
            else if(o.constructor.toString().indexOf("function Array()") > -1)
            {
                for(var p in o)
                {
                    if(!isNaN(p))   // linear array
                    {
                        (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
                        var type = RegExp.$1;
                        switch(type)
                        {
                            case "":
                                type = typeof(o[p]);
                            case "String":
                                type = "string"; break;
                            case "Number":
                                type = "int"; break;
                            case "Boolean":
                                type = "bool"; break;
                            case "Date":
                                type = "DateTime"; break;
                        }
                        s += "<" + type + ">" + SOAPClientParameters._serialize(o[p]) + "</" + type + ">"
                    }
                    else    // associative array
                        s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">"
                }
            }
            // Object or custom function
            else
                for(var p in o)
                    s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
            break;
        default:
            break; // throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
    }
    return s;
}

function SOAPClient() {}

SOAPClient.username = null;
SOAPClient.password = null;

SOAPClient.invoke = function(url, method, parameters, async, callback)
{
	if(async)
		SOAPClient._loadWsdl(url, method, parameters, async, callback);
	else
		return SOAPClient._loadWsdl(url, method, parameters, async, callback);
}

// private: invoke async
SOAPClient._loadWsdl = function(url, method, parameters, async, callback){	
	var xmlHttp = new Ajax();    
  xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){			
			SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp)		  
		}else{

		}
	}
	var newUrl = url + "?wsdl&t=" + Math.random()

  xmlHttp.open("GET", newUrl, true);
//	xmlHttp.setRequestHeader("SOAPAction", soapaction);
//  xmlHttp.setRequestHeader("User-Agent", )
	//xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");	
  xmlHttp.send(null);  
  
	/*Ext.Ajax.request({
		url : url + "?wsdl", 
		method: 'get',
		success : function(data){
			SOAPClient._onLoadWsdl(url, method, parameters, async, callback, data)
		},
		
    failure: function(response, opts) {
      alert('server-side failure with status code ' + response.status);
      alert(response.responseText)
    }
	})*/
}

SOAPClient._onLoadWsdl = function(wsdlUrl, method, parameters, async, callback, req){
	var wsdl
	
	if (window.DOMParser) {
		var parser = new DOMParser()
		
		var text = req.responseText		
		wsdl = parser.parseFromString(text, "text/xml")
	}

	return SOAPClient._sendSoapRequest(wsdlUrl, method, parameters, async, callback, wsdl);
}

SOAPClient._sendSoapRequest = function(serviceUrl, method, parameters, async, callback, wsdl){
	var ns
	
	if(wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined"){
		alert("Probably error with soap request")
		ns = wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue
	}else{
		ns = wsdl.documentElement.attributes["targetNamespace"].value
	}
	
	// build SOAP request
	var sr = 
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<soap:Envelope " +
				"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
				"<soap:Body>" +
				"<" + method + " xmlns=\"" + ns + "\">" +
				parameters.toXml() +
				"</" + method + "></soap:Body></soap:Envelope>";
	
	// send request
	//var xmlHttp = SOAPClient._getXmlHttp();
	/*if (SOAPClient.userName && SOAPClient.password){
		xmlHttp.open("POST", url, async, SOAPClient.userName, SOAPClient.password);
		// Some WS implementations (i.e. BEA WebLogic Server 10.0 JAX-WS) don't support Challenge/Response HTTP BASIC, so we send authorization headers in the first request
		xmlHttp.setRequestHeader("Authorization", "Basic " + SOAPClient._toBase64(SOAPClient.userName + ":" + SOAPClient.password));
	}
	else
		xmlHttp.open("POST", url, async);

	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	if(async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			console.log(xmlHttp);
			if(xmlHttp.readyState == 4)
				SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
		}
	}
	xmlHttp.send(sr);
	if (!async)
		return SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);*/
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;		
    

	var xmlHttp = new Ajax();    
    xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){				
			SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp.responseXML)
		}
	}
    
    xmlHttp.open("POST", serviceUrl, true);
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");	
    xmlHttp.send(sr);			
	    
    // the same but in jquery just doesn't work
    /*$.ajax({
    	beforeSend : function(xmlHttp){
			xmlHttp.setRequestHeader("SOAPAction", soapaction)
			xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
		},
    	type : "POST",
    	url : serviceUrl,
    	data : sr,
    	complete : function(data){
    		SOAPClient._onSendSoapRequest(method, async, callback, wsdl, data.responseXML)
    	}
    })*/
}

SOAPClient._onSendSoapRequest = function(method, async, callback, wsdl, xml) 
{
	var o = null;
	var nd = SOAPClient._getElementsByTagName(xml, method + "Result");
	if(nd.length == 0)
		nd = SOAPClient._getElementsByTagName(xml, "return");	// PHP web Service?
	if(nd.length == 0)
	{
		if(xml.getElementsByTagName("faultcode").length > 0)
		{
		    if(async || callback)
		        o = new Error(500, xml.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
			else
			    throw new Error(500, xml.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);			
		}
	}
	else
		o = SOAPClient._soapresult2object(nd[0], wsdl);
	
	if(callback){
		callback(o, xml);
	}
	if(!async)
		return o;
}

SOAPClient._soapresult2object = function(node, wsdl){
    var wsdlTypes = SOAPClient._getTypesFromWsdl(wsdl);
    return SOAPClient._node2object(node, wsdlTypes);
}

SOAPClient._node2object = function(node, wsdlTypes){
	// null node
	if(node == null)
		return null;
	// text node
	if(node.nodeType == 3 || node.nodeType == 4)
		return SOAPClient._extractValue(node, wsdlTypes);
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2object(node.childNodes[0], wsdlTypes);
	var isarray = SOAPClient._getTypeFromWsdl(node.nodeName, wsdlTypes).toLowerCase().indexOf("arrayof") != -1;
	// object node
	if(!isarray)
	{
		var obj = null;
		if(node.hasChildNodes())
			obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++)
		{
			var p = SOAPClient._node2object(node.childNodes[i], wsdlTypes);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}else{
		// create node ref
		var l = new Array();
		for(var i = 0; i < node.childNodes.length; i++)
			l[l.length] = SOAPClient._node2object(node.childNodes[i], wsdlTypes);
		return l;
	}
	return null;
}
SOAPClient._extractValue = function(node, wsdlTypes)
{
	var value = node.nodeValue;
	switch(SOAPClient._getTypeFromWsdl(node.parentNode.nodeName, wsdlTypes).toLowerCase())
	{
		default:
		case "s:string":			
			return (value != null) ? value + "" : "";
		case "s:boolean":
			return value + "" == "true";
		case "s:int":
		case "s:long":
			return (value != null) ? parseInt(value + "", 10) : 0;
		case "s:double":
			return (value != null) ? parseFloat(value + "") : 0;
		case "s:datetime":
			if(value == null)
				return null;
			else
			{
				value = value + "";
				value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
				value = value.replace(/T/gi," ");
				value = value.replace(/-/gi,"/");
				var d = new Date();
				d.setTime(Date.parse(value));										
				return d;				
			}
	}
}
SOAPClient._getTypesFromWsdl = function(wsdl)
{
	var wsdlTypes = new Array();
	// IE
	var ell = wsdl.getElementsByTagName("s:element");	
	var useNamedItem = true;
	// MOZ
	if(ell.length == 0)
	{
		ell = wsdl.getElementsByTagName("element");	     
		useNamedItem = false;
	}
	for(var i = 0; i < ell.length; i++)
	{
		if(useNamedItem)
		{
			if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) 
				wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
		}	
		else
		{
			if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null)
				wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
		}
	}
	return wsdlTypes;
}
SOAPClient._getTypeFromWsdl = function(elementname, wsdlTypes)
{
    var type = wsdlTypes[elementname] + "";
    return (type == "undefined") ? "" : type;
}
// private: utils
SOAPClient._getElementsByTagName = function(document, tagName)
{
	try
	{
		// trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
		return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
	}
	catch (ex) {}
	// old XML parser support
	return document.getElementsByTagName(tagName);
}

SOAPClient._getXmlHttpProgID = function()
{
	if(SOAPClient._getXmlHttpProgID.progid)
		return SOAPClient._getXmlHttpProgID.progid;
	var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	var o;
	for(var i = 0; i < progids.length; i++)
	{
		try
		{
			o = new ActiveXObject(progids[i]);
			return SOAPClient._getXmlHttpProgID.progid = progids[i];
		}
		catch (ex) {};
	}
	throw new Error("Could not find an installed XML parser");
}

SOAPClient._toBase64 = function(input)
{
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
		keyStr.charAt(enc3) + keyStr.charAt(enc4);
	} while (i < input.length);

	return output;
}
