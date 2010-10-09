/**
 * Copyright (c) 2009-2010 Symbian Foundation and/or its subsidiary(-ies).
 * All rights reserved.
 * This component and the accompanying materials are made available
 * under the terms of the License "Eclipse Public License v1.0"
 * which accompanies this distribution, and is available
 * at the URL "http://www.eclipse.org/legal/epl-v10.html".
 *
 * Initial Contributors:
 * Nokia Corporation - initial contribution.
 * 
 * Contributors:
 * 
 * Description:
 * 
 */

/*
 * Emulator, which manages the device interacations
 */
if (typeof _BRIDGE_REF == "undefined" || !_BRIDGE_REF) {

	var _BRIDGE_REF = {
		parent: window.parent || false,
		nokia: window.parent.NOKIA || false,
		sysInfoObject : null
	};

	_BRIDGE_REF.namespace = function(name){
		var parts = name.split('.');
		var current = _BRIDGE_REF;
		for (var key in parts) {
			if (!current[parts[key]]) {
				current[parts[key]] = {};
			}
			current = current[parts[key]];
		}
	};
	
	/*
	 * _BRIDGE_REF.helper functions
	 */
	_BRIDGE_REF.namespace('helper.loadScript');
	_BRIDGE_REF.helper = {
		path: document.location.pathname,
		loadScript: function(path){
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			
			script.type = "text/javascript";
			script.src = path;
			head.appendChild(script);
		},
		
		addEvent: function(obj, type, fn){
			if (obj.addEventListener) {
				obj.addEventListener(type, fn, false);
			}
			else 
				if (obj.attachEvent) {
					obj["e" + type + fn] = fn;
					obj[type + fn] = function(){
						obj["e" + type + fn](window.event);
					}
					obj.attachEvent("on" + type, obj[type + fn]);
				}
		},
		
		getElementsLengthInObject : function(items){
			var count = 0;
			for (var i in items) 
				count++;
			
			return count;
		},
		
		getBatteryStrength : function(){
			
		},
		
		console : function(){
			if (!typeof window.console) {
				_BRIDGE_REF.helper.loadScript("preview/script/lib/console.js");
			}			
		}
		
	};
	
	
	/*
	 Load Scripts
	 */
	_BRIDGE_REF.helper.loadScript("preview/script/lib/widget.js");
	_BRIDGE_REF.helper.loadScript("preview/script/lib/systeminfo.js");
	_BRIDGE_REF.helper.loadScript("preview/script/lib/menu.js");
	_BRIDGE_REF.helper.loadScript("preview/script/lib/menuItem.js");
	_BRIDGE_REF.helper.loadScript("preview/script/lib/console.js");

	//	Inject SAPI scripts	
	if (_BRIDGE_REF.nokia) {
		var wrtVersion = _BRIDGE_REF.nokia.helper.readCookie('_WRT_VERSION');
		if ((typeof wrtVersion == 'undefined') || (wrtVersion == 'WRT 1.1')) {
			_BRIDGE_REF.nokia.version = 'WRT 1.1';
			_BRIDGE_REF.nokia.helper.createCookie('_WRT_VERSION', 'WRT 1.1');
			_BRIDGE_REF.helper.loadScript("preview/script/lib/device.js");
		}
		else {
			_BRIDGE_REF.nokia.version = 'WRT 1.0';
		}
	}
	else {
		_BRIDGE_REF.helper.loadScript("preview/script/lib/device.js");
	}

	/*
	 window native functions over-riding
	 */
	if ( (typeof window.frameElement != 'undefined') && (typeof _BRIDGE_REF.nokia  != 'undefined') && window !== window.parent) {
		//	alert
		window.alert = function(msg){
			return window.parent.alert(msg);
		};
		
		//	confirm
		window.confirm = function(msg){
			return window.parent.confirm(msg);
		};
		
		//	prompt
		window.prompt = function(msg, str){
			return window.parent.prompt(msg, str)
		};
	}

	//	make TRUE loader.js script loaded
	window.parent.NOKIA.scriptsLoaded.loader = true;

}