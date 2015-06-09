/*
**             Anakusis JS v1.0               
**
**	    Open source under the BSD License.
**	          (c) 2015 WisdomSky
**           http://iwisdomsky.com
**
**/


$.fn.viewportenter = function(callback){
	if(callback!=undefined){
		this.on("viewportenter",callback);	
	} else {
		this.trigger("viewportenter");
	}	
	return this;
};
$.event.special.viewportenter = {
 	delegateType: "viewportenter",
	bindType	: "viewportenter",
	add: function(handlerObj){
		var $this = $(this);
		$this[0].ankss_viewportenter_interval = null;
		$this[0].ankss_viewportenter_timeout = null;
		$this[0].ankss_viewportenter_flag = false;
		$this[0].ankss_viewportenter_callback = $.proxy(function(){

			var detector = $.proxy(function(){
				var offset = this.offset();
				var win = $(window);
				var win_h = win.height();
				var win_w = win.width();
				var scrolltop = win.scrollTop()+win_h;
				var scrollleft = win.scrollLeft()+win_w;
				if(	this.is(":visible")
				&&	parseInt(this.css("opacity"))>0
				&&	this.css("visibility")=="visible"
				&&	scrolltop >= offset.top && scrolltop <= offset.top+win_h+this.height()
				&&  scrollleft >= offset.left && scrollleft <= offset.left+win_w+this.width()
					){

					if(!this.ankss_viewportenter_flag){
						handlerObj.handler.apply(this,[handlerObj]);
					}
					this.ankss_viewportenter_flag = true;
				} else {
					this.ankss_viewportenter_flag = false;
				}
			},this);

			clearTimeout(this[0].ankss_viewportenter_timeout);
			clearInterval(this[0].ankss_viewportenter_interval);
			this[0].ankss_viewportenter_timeout = setTimeout($.proxy(function(){
				clearInterval(this[0].ankss_viewportenter_interval);
				this[0].ankss_viewportenter_interval = setInterval($.proxy(function(){
					detector();
				},this),250);
			},this),1000);
			detector();
		},$this);

		

		$(window).on("scroll",$this[0].ankss_viewportenter_callback);
		return $this;
	},
	remove: function(){
		var $this = $(this);
		$this[0].ankss_viewportenter_interval = null;
		$this[0].ankss_viewportenter_timeout = null;
		$this[0].ankss_viewportenter_flag = false;
		$this[0].ankss_viewportenter_callback = null;
		$(window).off("scroll",$this[0].ankss_viewportenter_callback);
		clearTimeout($this[0].ankss_viewportenter_timeout);
		clearInterval($this[0].ankss_viewportenter_interval);
		return $this;
	}
};


$.fn.viewportleave = function(callback){
	if(callback!=undefined){
		this.on("viewportleave",callback);	
	} else {
		this.trigger("viewportleave");
	}
	return this;
};
$.event.special.viewportleave = {
 	delegateType: "viewportleave",
	bindType	: "viewportleave",
	add: function(handlerObj){
		var $this = $(this);
		$this[0].ankss_viewportleave_interval = null;
		$this[0].ankss_viewportleave_timeout = null;
		$this[0].ankss_viewportleave_flag = false;
		$this[0].ankss_viewportleave_callback = $.proxy(function(){
			

			var detector = $.proxy(function(){
				var offset = this.offset();
				var win = $(window);
				var win_h = win.height();
				var win_w = win.width();
				var scrolltop = win.scrollTop()+win_h;
				var scrollleft = win.scrollLeft()+win_w;
				if( !this.is(":visible")
				||	parseInt(this.css("opacity"))==0
				||	this.css("visibility")=="invisible"
				||	scrolltop < offset.top 
				||	scrolltop > offset.top+win_h+this.height()
				||  scrollleft < offset.left 
				||	scrollleft > offset.left+win_w+this.width()
				){
					if(!this.ankss_viewportleave_flag){
						handlerObj.handler.apply(this,[handlerObj]);
					}
					this.ankss_viewportleave_flag = true;
				} else {
					this.ankss_viewportleave_flag = false;
				}
			},this);

			clearTimeout(this[0].ankss_viewportleave_timeout);
			clearInterval(this[0].ankss_viewportleave_interval);
			this[0].ankss_viewportleave_timeout = setTimeout($.proxy(function(){
				clearInterval(this[0].ankss_viewportleave_interval);
				this[0].ankss_viewportleave_interval = setInterval($.proxy(function(){
					detector();
				},this),250);
			},this),1000);
			detector();


		},$this);
		$(window).on("scroll",$this[0].ankss_viewportleave_callback);
		return $this;
	},
	remove: function(){
		var $this = $(this);
		$this[0].ankss_viewportleave_interval = null;
		$this[0].ankss_viewportleave_timeout = null;
		$this[0].ankss_viewportleave_flag = false;
		$this[0].ankss_viewportleave_callback = null;
		$(window).off("scroll",$this[0].ankss_viewportleave_callback);
		clearTimeout($this[0].ankss_viewportleave_timeout);
		clearInterval($this[0].ankss_viewportleave_interval);
		return $this;
	}
};
