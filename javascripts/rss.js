var Rss = {
	get : function(url, callback){	
		$.ajax({
			url: url,
			success: function(data){				
				var items = Rss.parse(data);
				callback(items);
				
				//Utility.log(data);
				//$('#content').html(data.documentURI);	
		  	}
		});	
	},		
		
	parse : function(req){
	    var items = [];	 
		var itemElements = req.getElementsByTagName("item");
		
		for (var i = 0; i < itemElements.length; i++) {
			var item = {};
            
            node = itemElements[i].firstChild;
            while (node != null) {
                if (node.nodeType == Node.ELEMENT_NODE) {
                    if (node.nodeName == "title") {
                        item.title = this.getTextOfNode(node);
                    } else if (node.nodeName == "pubDate" || node.nodeName == "dc:date") {
                        item.date = this.getTextOfNode(node);
                    } else if (node.nodeName == "description") {
                        item.description = this.getTextOfNode(node);
                    } else if (node.nodeName == "link") {
                        item.link = this.getTextOfNode(node);
                    }
                }
                node = node.nextSibling;
            }
            
            items.push(item);
        }
		return items;
	},
	
	getTextOfNode : function(node) {
	    var buf = "";
	    
	    // iterate through all child elements and collect all text to the buffer
	    var child = node.firstChild;
	    while (child != null) {
	        if (child.nodeType == Node.TEXT_NODE || child.nodeType == Node.CDATA_SECTION_NODE) {
	            // append text to buffer
	            if (buf != "") {
	                buf += " ";
	            }
	            buf += child.nodeValue;
	        }
	        child = child.nextSibling;
	    }
	    
	    // strip all tags from the buffer
	    var strippedBuf = "";
	    var textStartPos = -1;
	    var tagBalance = 0;
	    
	    // iterate through the text and append all text to the stripped buffer
	    // that is at a tag balance of 0
	    for (pos = 0; pos < buf.length; pos++) {
	        var c = buf.charAt(pos);
	        if (c == '<') {
	            // entering a tag
	            if (tagBalance == 0 && textStartPos != -1) {
	                // everything up to here was valid text
	                strippedBuf += buf.substring(textStartPos, pos);
	                textStartPos = -1;
	            }
	            tagBalance++;
	        } else if (c == '>') {
	            // leaving a tag
	            tagBalance--;
	            textStartPos = -1;
	        } else if (tagBalance == 0 && textStartPos == -1) {
	            // first char of text
	            textStartPos = pos;
	        }
	    }
	    
	    // add remaining text - if any
	    if (tagBalance == 0 && textStartPos != -1) {
	        strippedBuf += buf.substring(textStartPos, pos);
	    }
	    
	    return strippedBuf;
	}
};