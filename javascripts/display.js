var Display = {
	SMALL_SCREEN_THRESHOLD  : 320,
	
	/** threshold height value; anything smaller than this and it's considered that the widget is in home screen mode */
	MINI_VIEW_THRESHOLD : 150,
	
	/** resolution types for Nokia phones; with orientation */
	RESOLUTION_UNDEFINED : 0,
	RESOLUTION_QVGA_LANDSCAPE : 1,  // 320x240
	RESOLUTION_QVGA_PORTRAIT : 2,   // 240x320
	RESOLUTION_NHD_LANDSCAPE : 3,   // 640x360
	RESOLUTION_NHD_PORTRAIT : 4,    // 360x640
	RESOLUTION_HOME_SCREEN : 5,     // less than 75 % of the resolutions above
	
	/** the width of the physical screen in the current orientation */
	width : null,
	
	/** the width of the physical screen in the current orientation */
	height : null,
	
	/** triggered when the phone enters landscape mode */
	onEnterLandscape : null,
	
	/** triggered when the phone enters portrait mode */
	onEnterPortrait : null,
	
	/** triggered when the phone enters home screen mode */
	onEnterHomeView : null,
	
	/** triggered when the phone enters normal (exits home screen) mode */
	onEnterNormalView : null,
	
	init : function(){
		window.onresize = Display.onResize;
		
		var dims = this.detectDisplayDimensions();
		this.width = dims.width;
		this.height = dims.height;
		
		Display.onResize();
	},
	
	/** detect the size of the physical display */
	detectDisplayDimensions : function(){
		var w, h;
					
		w = screen.width;
		h = screen.height;
			
		// obviously the widget is running on a computer
		if(w > 700 && h > 700){			
			w = window.innerWidth;
			h = window.innerHeight;
		}	
		
		return {width: w, height: h};
	},
	
	/** triggered every time the user enters/exits home view, rotates screens etc. */
	onResize : function(){		
		
		var newDims = Display.detectDisplayDimensions();
		var newWidgetSize = Display.getWidgetSize();
		
		if(Display.isTouch()){
			window.menu.hideSoftkeys(); // TODO maknuti na bolje mjesto, ovdje je da ne prijavljuje krivu velicinu
			Utility.setCssBodyFontSize(16);
		}else{
			if(Device.getBrowserVersion() == 413){
				Utility.setCssBodyFontSize(9)	;
			}else{
				Utility.setCssBodyFontSize(12);
			}
		}
		
		if (newDims.height == Display.width && newDims.width == Display.height){
			Display.orientationChanged();
		}else{
			//$('#log').append("new dimensions " + newDims.width + "x" + newDims.height)
			//$('#log').append("new wdget " + newWidgetSize.width + "x" + newWidgetSize.height)
			//Utility.log(newWidgetSize.height);
			if ( newWidgetSize.height < Display.MINI_VIEW_THRESHOLD ) {
				$('body').addClass('home_screen');
				$('body').removeClass('normal_screen');
				Display.onEnterHomeView();
			} else {
				$('body').addClass('normal_screen');
				$('body').removeClass('home_screen');
				Display.onEnterNormalView();
			}
		}
		
		Display.width = newDims.width;
		Display.height = newDims.height;		
		
		window.scrollTo(0, 0);				
	},
	
	/** called when the screen orientation has changed */
	orientationChanged : function(){
		if(Display.w < Display.h){
			if(this.onEnterPortrait){
				this.onEnterPortrait();
			}					
		}else{
			if(this.onEnterLandscape){
				this.onEnterLandscape();
			}		
		}
	},
	
	/** get the size of the widget (not the screen) */	
	getWidgetSize: function() {
		var height;
		var width;
		
		if(window.widget){
		    width = window.innerWidth;
		    height = window.innerHeight;			
		}else{
			width = screen.width;
			height = screen.height;
		}		

		return {
			width: width,
			height: height
		};
	},
	
	/** is the phone currently in landscape mode */
	isLandscape: function() {
		return ( Display.width > Display.height );	
	},
	
	/** get resolution type based on current screen orientation */
	getType : function(){
		var resolution;	    
	    
		var width = Display.detectDisplayDimensions().width;
		var height = Display.detectDisplayDimensions().height;		
		
		if(height < 100){
	        resolution = this.RESOLUTION_HOME_SCREEN;
	    } else if (width == 240 && height == 320) {
	        resolution = this.RESOLUTION_QVGA_PORTRAIT;
	    } else if (width == 320 && height == 240) {
	        resolution = this.RESOLUTION_QVGA_LANDSCAPE;
	    } else if (width > 300 && height > 570) {
	        resolution = this.RESOLUTION_NHD_PORTRAIT;
	    } else if (width > 570 && height > 300) {
	        resolution = this.RESOLUTION_NHD_LANDSCAPE;
	    } else {
	        resolution = this.RESOLUTION_UNDEFINED;
	    }
		
		return resolution;
	},
	
	/** returns true if this is a touch based phone (based on screen size) */
	isTouch : function(){
		var screenType = this.getType();
		return screenType == this.RESOLUTION_NHD_LANDSCAPE || screenType == this.RESOLUTION_NHD_PORTRAIT;
	}
};