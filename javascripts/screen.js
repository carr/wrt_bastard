var Screen = {
	SMALL_SCREEN_TRESHOLD  : 320,
	MINI_VIEW_TRESHOLD : 150,
	
	RESOLUTION_UNDEFINED : 0,
	RESOLUTION_QVGA_LANDSCAPE : 1,  // 320x240
	RESOLUTION_QVGA_PORTRAIT : 2,   // 240x320
	RESOLUTION_NHD_LANDSCAPE : 3,   // 640x360
	RESOLUTION_NHD_PORTRAIT : 4,    // 360x640
	RESOLUTION_HOME_SCREEN : 5,     // less than 75 % of the resolutions above
	
	KEY_LEFT : 37,
	KEY_UP : 38,
	KEY_RIGHT : 39,
	KEY_DOWN : 40,
	KEY_FIRE : 13,
	
	// TODO ovo bi se trebalo triggerati svaki put kada se promijeni velicina ekrana
	onSizeChanged : null,
	
	// TODO ovo bi se trebalo triggerati svaki put kada se promijeni orijentacija ekrana
	onOrientationChange : null,
	
	// TODO ovo bi se trebalo triggerati svaki put kada udje u home screen view
	onEnterHomeView : function(){
		Utility.hide($('#layout')[0])
		Utility.show($('#home_screen')[0])
	},
	
	// TODO ovo bi se trebalo triggerati svaki put kada udje u normal screen view
	onEnterNormalView : function(){
		Utility.show($('#layout')[0])
		Utility.hide($('#home_screen')[0])	
	},
	
	init : function(){
		Screen.onResize();
		Screen.setKeys();
	},
	
	onResize : function(){
		var size = Screen.getSize()

		if ( window.innerHeight < 100 ) {
			Screen.onEnterHomeView()
		} else {
			Screen.onEnterNormalView()
		}	
		
		window.scrollTo(0, 0);
	},
	
	getSize: function() {
		var height = window.innerHeight;
		var width = window.innerWidth;
			
		return {
			width: width,
			height: height
		}
	},
	
	isLandscape: function() {
		var size = Screen.getSize();
		return ( size.width > size.height );	
	},

	isLargeScreen: function() {
		var size = Screen.getSize();
		return ( size.height > this.SMALL_SCREEN_TRESHOLD );
	},
	
	getType : function(){
		var resolution;
		
	    var screenWidth = screen.width;
	    var screenHeight = screen.height;
		
	    var windowWidth = window.innerWidth;
	    var windowHeight = window.innerHeight;	
	    
	    
		if(windowHeight < 100){
	        resolution = this.RESOLUTION_HOME_SCREEN;
	    } else if (windowWidth == 240 && windowHeight == 320) {
	        resolution = this.RESOLUTION_QVGA_PORTRAIT;
	    } else if (windowWidth == 320 && windowHeight == 240) {
	        resolution = this.RESOLUTION_QVGA_LANDSCAPE;
	    } else if (windowWidth > 300 && windowHeight > 570) {
	        resolution = this.RESOLUTION_NHD_PORTRAIT;
	    } else if (windowWidth > 570 && windowHeight > 300) {
	        resolution = this.RESOLUTION_NHD_LANDSCAPE;
	    } else {
	        resolution = this.RESOLUTION_UNDEFINED;
	    }
		
		return resolution;
	},
	
	isMiniViewMode: function() {
		var size = Screen.getSize();
		return ( size.height < this.MINI_VIEW_TRESHOLD );
	},
	
	isTouch : function(){
		var screenType = this.getType()
		return screenType == this.RESOLUTION_NHD_LANDSCAPE || screenType == this.RESOLUTION_NHD_PORTRAIT;
	},

	setKeys : function() {
		if (navigator.userAgent.indexOf("Firefox") == -1) {
			this.KEY_LEFT = 63495;
			this.KEY_UP = 63497;
			this.KEY_RIGHT = 63496;
			this.KEY_DOWN = 63498;
			this.KEY_FIRE = 63557;
		}
	}
}