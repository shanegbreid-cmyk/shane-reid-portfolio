/*
File Name: main.js
Version: 1.0.0
Author: pixelonetry
Author URI: https://pixelonetry.com/
License: MIT
License URI: https://opensource.org/licenses/MIT
Description: Free version of JS for WordPress.org theme/plugin.
*/

 /* ==============================================
  Main Elements Boot
  =============================================== */
/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval */
var pixelonetry = window.pixelonetry || {
	classes: {},
	targets: {}
};

 /* ==============================================
   Pixelonetry Utils browser
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,Image */
	
	// jquery 1.9.x fix start 
	var browser,matched;
	
	function uaMatch(ua) {
		ua = ua.toLowerCase();

		var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
		  ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		  [];

		return {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
		};
	}
	

	if ( !jQuery.browser ) {
		matched = uaMatch( navigator.userAgent );
		browser = {};

		if ( matched.browser ) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
		}

		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
			browser.webkit = true;
		} else if ( browser.webkit ) {
			browser.safari = true;
		}

		jQuery.browser = browser;
	}
	// fix end
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	var ua = navigator.userAgent.toLowerCase();
	var iDev = ua.match(/(iphone|ipod|ipad)/) !== null;
	var android = !iDev && ua.match(/android ([^;]+)/);
	var webkit = ua.match("webkit") !== null;
	if (android) {
		android = android[1].split(/\./);
		android = parseFloat(android.shift() + "." + android.join(""));
	} else {
		android = false;
	}
	var mobile = (iDev || android || ua.match(/(android|blackberry|webOS|opera mobi)/) !== null);

	
	$.pixelonetry.browser = {
		iDev: iDev,
		android: android,
		mobile: mobile,
		webkit: webkit
	};
	
	
}(jQuery));

/* ==============================================
   Pixelonetry MENU
  =============================================== */
		
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelonetry,window */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	$.pixelonetry.peMenu = {	
		conf: {
			api: false
		} 
	};

	var m = document.createElement( 'modernizr' ),
		m_style = m.style;

	function getVendorPrefix() {
		var property = {
			transformProperty : '',
			MozTransform : '-moz-',
			WebkitTransform : '-webkit-',
			OTransform : '-o-',
			msTransform : '-ms-'
		};
		for (var p in property) {
			if (typeof m_style[p] != 'undefined') {
				return property[p];
			}
		}
		return null;
	}
	
	var jwin = $(window);
	var scroller = $("html,body");
	var mobile = $.pixelonetry.browser.mobile;
	var mlayout = false;
	var wasmlayout = false;
	var vendor_prefix = getVendorPrefix();
	
	
	function PeMenu(target, conf) {
		
		var w,h,toggle,menu,dropdowns,mega;
		var main;
		var active = [];
		var pos = 0;

		
		
		function menuAlign(idx) {
			var item = menu.eq(idx);
			var sitem,submenu = item.find("ul.sub-menu").removeClass("rightAlign");
			var i,endPos = item.width()+item.parent().offset().left;
			if (endPos >= w) {
				item.addClass("rightAlign");
			} else {
				for (i=0;i<submenu.length;i++) {
					sitem = submenu.eq(i);
					if (endPos+sitem.width() > w) {
						sitem.addClass("rightAlign");
					}
				}
			}
		}
		
		function mobileNavigation() {

			var li = dropdowns.filter(this).parent();
			
			if (!mlayout) {
				if (li.hasClass("dropdown-on")) {
					li.removeClass("dropdown-on").find(".dropdown-on").removeClass("dropdown-on");
				} else {
					li.addClass("dropdown-on");
				}
				li.siblings(".dropdown-on").removeClass("dropdown-on").find(".dropdown-on").removeClass("dropdown-on");
			}
			
			if (mlayout) {
				pos++;

				console.log( main );

				if (active[pos]) {
					active[pos].removeClass("pe-menu-mobile-on");
				}
				active[pos] = li.find("> ul").show();
				active[pos].addClass("pe-menu-mobile-on");

				main.css("left",-pos+"00%");
				
				scroller.stop().animate({scrollTop:target.offset().top},300);
			}
			
			return false;
		}
		
		function resize() {
			var nw = jwin.width();
			h = window.innerHeight ? window.innerHeight: jwin.height();
			
			if (nw === w) {
				// viewport width not changed, do nothing.
				return;
			}
			
			w = nw;
			
			main.removeAttr("style");
			pos = 0;
			target.find(".pe-menu:first").removeClass("pe-menu-mobile-active");
			dropdowns.parent().removeClass("dropdown-on");
			
			mlayout = w < 1024;
			
			//var left = target.offset().left;
			var pw = $(".pe-menu-sticky").width();
			
			var left = Math.round(Math.max(0,(pw - 940)/2));
			
			mega.each(function (idx) {
				mega.eq(idx).find(" > li.new-row").css("margin-left",left);
			});
			
			//target.find(".pe-menu-mega .dropdown-menu > li:first").css("margin-left",left);
			menu.removeClass("rightAlign").each(menuAlign);
			
			
			if (wasmlayout && !mlayout) {
				wasmlayout = false;
				resize();
				
			}
			wasmlayout = mlayout;
		}
		
		
		function toggleMobileMenu(e) {
			var first = target.find(".pe-menu:first");
			
			var visible = first.hasClass("pe-menu-mobile-active");
			
			if (visible) {
				first.removeClass("pe-menu-mobile-active");
			} else {
				if (mlayout) {
					main.css("opacity",0);
					setTimeout(function () {
						main.css("opacity",1);
					},50);
				}
				first.addClass("pe-menu-mobile-active");
				
			}
			
			if (e) {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		}
		
		function back(e) {
			if (mlayout) {
				pos--;
				if (pos > 0) {
					main.css("left",-pos+"00%");
				} else {
					main.removeAttr("style");
				}
			}
			e.preventDefault();
			e.stopImmediatePropagation();
		}
		
		function hideMenu(e) {
			if (mlayout) {
				toggleMobileMenu();
			}
		}

		// init function
		function start() {
			main = target.find("> ul");
			toggle = $('<a href="#" class="menu-toggle"><b class="icon-menu"></b></a>');
			target.prepend(toggle);
			menu = target.find("ul.pe-menu > li:not(.pe-menu-mega) > ul");
			mega = target.find(".pe-menu-mega > .dropdown-menu");
			dropdowns = target.find("li.dropdown > a");
			var items = target.find("> ul a").not('li.dropdown > a');
			
			var subs = target.find(".dropdown-menu");
			var text = target.attr("data-mobile-back") || "BACK";

			subs.each(function (idx) {
				var ul = subs.eq(idx);
				ul.prepend('<li><a href="" class="pe-menu-back">'+text+'</a></li>');
			});
			
			if (mobile) {
				dropdowns.on("tap click",mobileNavigation);
				//dropdowns.on("click",mobileNavigation);
				items.on("click",hideMenu);
			} else {
				dropdowns.on("click",mobileNavigation);
				items.on("click",hideMenu);
			}
			
			resize();
			jwin.on("debouncedresize",resize);
			toggle.on("tap click",toggleMobileMenu);
			toggle.one("tap click",toggleMobileMenu);
			target.on("tap click",".pe-menu-back",back);
			
			// idiotic ios fix: portrait -> mega menu open -> landscape -> mega menu won't show unless i do this ....
			jwin.on('orientationchange',function () {
				main.removeAttr("style");
				main.find(".pe-menu-mega").css("-webkit-transform","translateZ(0px)");
				setTimeout(function () {
					main.find(".pe-menu-mega").removeAttr("style");
				},100);
			});
		}
		
		$.extend(this, {
			// plublic API
			destroy: function() {
				target.data("peMenu", null);
				target = undefined;
			}
		});
		
		// initialize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.peMenu = function(conf) {
		
		// return existing instance	
		var api = this.data("peMenu");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peMenu.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeMenu(el, conf);
			el.data("peMenu", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));

/* ==============================================
   Pixelonetry LAZY LOAD
  =============================================== */
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelonetry */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	$.pixelonetry.peLazyLoading = {	
		conf: {
			api: false
		} 
	};
	
	var jwin = $(window);
	var scroller = false;
	var hires = window.devicePixelRatio >= 1.5;
	
	$(function () {
		scroller = $(".scroller > .scroll-content");
		scroller = scroller.length === 0 ? false : scroller;
	});
	
	function PeLazyLoading(target, conf) {
		
		var top, bottom, refresh = true,counter = 0;
		
		function checkIfLoaded(idx,el) {
			if (el.peLoading || el._peLoaded) {
				return;
			}
			
			el = target.eq(el.peIDX);
			
			if (!el.hasClass("pe-lazyloading-forceload")) {
				var y = (refresh || !el.data("pe-lazyload-top")) ?  (el.data("pe-lazyload-forced-top") ? el.data("pe-lazyload-forced-top") : el.offset().top) : el.data("pe-lazyload-top");
				el.data("pe-lazyload-top",y);
			
				var h = (refresh || !el.data("pe-lazyload-height")) ? el.height() : el.data("pe-lazyload-height");
				el.data("pe-lazyload-height",h);
									
				if ((y+h) < top || y > bottom) {
					return;
				}
			}
			
			el.triggerHandler("pe-lazyload-load");
		}
		
		function loaded() {
			var el = target.eq(this.idx);
			el.attr("src",this.src);
			el.addClass("pe-lazyload-loaded").triggerHandler("pe-lazyload-loaded");
			el.fadeTo($.pixelonetry.browser.mobile ? 0 : 200,1);
			//el.fadeTo(200,1);
			el[0].peLoaded = true;
			this.src = "";
			counter--;
			//el.addClass("animated fadeIn");
		}

		
		function load() {
			var idx = this.peIDX;
			var el = target.eq(idx);
			this.peLoading = true;
			var img = $("<img />");
			img[0].idx = this.peIDX;
			var src = hires ? el.attr("data-original-hires") : el.attr("data-original");
			// fallback if no hires image is defined
			src = src || el.attr("data-original");
			img.one("load",loaded).attr("src",src);
		}
		
		function init(idx) {
			this.peLoading = false;
			this.peLoaded = false;
			this.peIDX = idx;
			counter++;
			target.eq(idx).css("opacity",0).addClass("pe-lazyload-inited");
		}

		
		function update() {
			if (counter === 0) {
				destroy();
				return true;
			} 
			top = scroller ? scroller.scrollTop() : 0;
			top += jwin.scrollTop();
			bottom = top + (window.innerHeight ? window.innerHeight : jwin.height());
			refresh = true;
			target.each(checkIfLoaded);
			return true;
		}
		
		function destroy() {
			jwin.off("scroll pe-lazyloading-refresh", update);
			if (scroller) {
				scroller.off("scroll",update);
			}
			
			if (target) {
				target.off("pe-lazyload-load");
				target.data("peLazyLoading", null);
				target = undefined;
			}
		}

		
		// init function
		function start() {
			target.each(init);
			target.on("pe-lazyload-load",load);
			$(update);
			jwin.on("scroll pe-lazyloading-refresh", update);
			if (scroller) {
				scroller.on("scroll",update);
			}
		}
		
		$.extend(this, {
			// plublic API
			destroy: destroy
		});
		
		// initialize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.peLazyLoading = function(conf) {
		
		// return existing instance	
		var api = this.data("peLazyLoading");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peLazyLoading.conf, conf);
		
		//this.each(function() {
			var el = $(this);
			api = new PeLazyLoading(el, conf);
			el.data("peLazyLoading", api); 
		//});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));

/* ==============================================
   Pixelonetry Theme Utils
  =============================================== */
  /*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelonetry,ajaxurl */

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('%'+i, 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
  /* ==============================================
   Pixelonetry Utils geom
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout */

	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};

	$.pixelonetry.Geom = {
		getScaler: function (scaleMode,halign,valign,w,h,tw,th) {
			
			var info = {};
			
			var rw = w/tw;
			var rh = h/th;
			var r;
			
			// get scale ratio
			if (typeof scaleMode  == 'string') {
				switch (scaleMode) {
					case "fill":
					case "fillmax":
						r = rw > rh ? rw : rh;
						if (scaleMode == "fill") {r = Math.min(1,r);}
					break;
					case "fit":
					case "fitmax":
						r = rw < rh ? rw : rh;
						if (scaleMode == "fit") {r = Math.min(1,r);}
					break;
					case "none":
						r = 1;
					break;
				}
			} else {
				r = scaleMode;
			}
			
			// scale ration
			info.ratio = r;
			
			info.diff = {};
			info.offset = {};
			info.align = {w:halign,h:valign};
			
			// now compute offset with requested alignment
			//with (info) {
			
			var diff = info.diff;
			var offset = info.offset;
			
			diff.w = offset.w = Math.round((w-tw*r)*10000)/10000;
			diff.h = offset.h = Math.round((h-th*r)*10000)/10000;
			
			switch (halign) {
				case "center":
				offset.w = diff.w / 2;
				break;
				case "left":
					offset.w = 0;
				break;
			}
		
			switch (valign) {
				case "center":
					offset.h = diff.h / 2;
				break;
				case "top":
					offset.h = 0;
				break;
			}
				
			//}
			
			
			// return the scaler object
			return info;
		},
		
		// split a string in object
		splitProps : function(comma,numeric) {
			var token = comma.split(/,/);
			
			return numeric ? { h:parseFloat(token[0]), w:parseFloat(token[1])} : { h:token[0], w:token[1]};
		}
	};
		
}(jQuery));

  /* ==============================================
   Pixelonetry Utils Preloader
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout */

	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	if ($.pixelonetry.preloader) {
		return;
	}
	
	function loaded(e) {
		var image = $(e.currentTarget);
		//var loaderInfo = image.data("peUtilsLoader");
		var loaderInfo;
		
		while (image.data("peUtilsLoader") && (loaderInfo = image.data("peUtilsLoader").shift())) {
			if (--loaderInfo.total <= 0) {
				var cb = loaderInfo.callback;
				var target = loaderInfo.target;
				image.unbind("load error",loaded);
				if (typeof cb === "function") {
					cb(target);					
				}
			}
		}
	}
	
	var preloader = $.pixelonetry.preloader = {
			load: function (el,callback,noreplace) {
				el = (el instanceof jQuery) ? el : $(el);
				var images = (el[0].tagName.toLowerCase() == "img") ? [el[0]] : el.find("img").get();
			
				var image;
				var list = [];
				var complete;
			
				while ((image = images.shift())) {
					complete = image.complete;
					try {
						if (!(image.src && complete && !(image.src.match(/blank.png$/i) !== null && image.getAttribute("data-src")))) {
							list.push(image);
						}
					} catch (x) {
					}					
				}
				
				if (list.length > 0) {
					var loaderInfo = {
							target: el,
							callback: callback,
							total: list.length
						};
					
					while ((image = list.shift())) {
					
						image = $(image);
					
						if (!noreplace && $.browser.msie && image[0].src.match(/blank.png$/i) !== null) {
							image.removeAttr("src");
							image.replaceWith(image.clone());
							if (!image.attr("data-src")) {
								// nothing to be loaded here
								loaderInfo.total--;
								//continue;
							}
						}
				
						if (image.data("peUtilsLoader")) {
							image.data("peUtilsLoader").push(loaderInfo);
						} else {
							image.data("peUtilsLoader",[loaderInfo]);
						}
						
						image
							.one("load error",loaded);
						 
						if (image.attr("data-src")) {
							image.attr("src",image.attr("data-src"));
							image.removeAttr("data-src");
						} else if ($.browser.msie) {
							image.attr("src",image.attr("src"));
						}
						
						image = undefined;
						
					}
				} else {
					callback(el);
				}		
			},
			clear: function(el,callback) {
				el = (el instanceof jQuery) ? el : $(el);
				var images = (el[0].tagName.toLowerCase() == "img") ? [el[0]] : el.find("img").get();
				var image,loaderInfo,cb;
				while ((image = images.shift())) {
					image = $(image);
					while (image.data("peUtilsLoader") && (loaderInfo = image.data("peUtilsLoader").shift())) {
						cb = loaderInfo.callback;
						if (cb === callback) {
							loaderInfo.callback = false;
							break;
						}
					}
				}

			}
		};
		
}(jQuery));
		
  /* ==============================================
   Pixelonetry Utils Transition
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,Image */
	
	
	var a = (new Image()).style,b = 'ransition',c,e,d='nimation',t; 

	t = $.support.csstransitions = 
		(c = 't' + b) in a && c ||
		(c = 'webkitT' + b) in a && c || 
		(c = 'MozT' + b) in a && c || 
		(c = 'OT' + b) in a && c ||
		(c = 'MST' + b) in a && c || 
		false;
	
	$.support.cssanimation = 
		(e = 'a' + d) in a && e ||
		(e = 'webkitA' + d) in a && e || 
		(e = 'MozA' + d) in a && e || 
		(e = 'OA' + d) in a && e ||
		(e = 'MSA' + d) in a && e || 
		false;
	
	$.support.csstransitionsEnd = (t == "MozTransition" && "transitionend") || (t == "OTransition" && (parseInt(jQuery.browser.version,10) >= 12 ? "otransitionend" : "oTransitionEnd")) || (t == "transition" && "transitionend") || (t && t+"End");
	$.support.csstransitionsPrefix = {
		"MozTransition" : "-moz-",
		"webkitTransition" : "-webkit-",
		"OTransition" : "-o-",
		"MSTransition" : "-ms-"
	}[t] || "";
	var an = $.support.cssanimation;
	$.support.cssanimationEnd = an ? (an === "animation" ? "animationend" : an+'End') : false;
		
	//(t == "MozTransition" && "-moz-") || (t == "OTransition" && "-o-") || (t && t+"End");
		
	
}(jQuery));

  /* ==============================================
   Pixelonetry Transform
  =============================================== */

  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout,WebKitCSSMatrix */

	var origin = "0px 0px";
	// nearest
	var scalingMode = "bilinear";

	/*
		very stripped down version of 
		https://github.com/heygrady/transform/blob/master/README.md
	*/
	
	var rmatrix = /progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/;
	
	// Steal some code from Modernizr
	var m = document.createElement( 'modernizr' ),
		m_style = m.style;
		
	/**
	 * Find the prefix that this browser uses
	 */	
	function getVendorPrefix() {
		var property = {
			transformProperty : '',
			MozTransform : '-moz-',
			WebkitTransform : '-webkit-',
			OTransform : '-o-',
			msTransform : '-ms-'
		};
		for (var p in property) {
			if (typeof m_style[p] != 'undefined') {
				return property[p];
			}
		}
		return null;
	}
	
	function supportCssTransforms() {
		var props = [ 'transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ];
		for ( var i in props ) {
			if ( m_style[ props[i] ] !== undefined  ) {
				return true;
			}
		}
		return false;
	}
		
	// Capture some basic properties
	var vendorPrefix			= getVendorPrefix(),
		transformProperty		= vendorPrefix !== null ? vendorPrefix + 'transform' : false,
		transformOriginProperty	= vendorPrefix !== null ? vendorPrefix + 'transform-origin' : false;
	
	// store support in the jQuery Support object
	$.support.csstransforms = supportCssTransforms();
	
	$.support.hw3dTransform = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());

	// IE9 public preview 6 requires the DOM names
	if (vendorPrefix == '-ms-') {
		transformProperty = 'msTransform';
		transformOriginProperty = 'msTransformOrigin';
	}

	function transform(el,ratio,dx,dy,w,h,noFilter,forceCompat) {
		if ($.support.csstransforms && !forceCompat) {
			var offs;
			var unit="px";
			
			if (typeof dx === "string" && dx.indexOf("%") > 0) {
				unit = "%";
			} else if (w && h && (parseInt(dx,10) != dx || parseInt(dy,10) != dy)) {
				dx=100*dx/w;
				dy=100*dy/h;
				
				dx=parseInt(dx*1000,10)/1000;
				dy=parseInt(dy*1000,10)/1000;
				
				unit="%";
			} else {
				dx = parseInt(dx,10);
				dy = parseInt(dy,10);
			}
			
			if ($.support.hw3dTransform) {
				offs = (dx !== undefined ) ? "translate3d("+dx+unit+","+dy+unit+",0) " : "translateZ(0) ";
			} else {
				offs = (dx !== undefined ) ? "translate("+dx+unit+","+dy+unit+") " : "";
			}
			
			$(el).css(transformOriginProperty,origin).css(transformProperty,offs+"scale("+ratio+")");
			
		} else if (!noFilter && !forceCompat && $.browser.msie) {
			var style = el.style;
			var matrixFilter = 'progid:DXImageTransform.Microsoft.Matrix(FilterType="'+scalingMode+'",M11='+ratio+',M12=0,M21=0,M22='+ratio+',Dx='+dx+',Dy='+dy+')';
			var filter = style.filter || $.curCSS( el, "filter" ) || "";
			style.filter = rmatrix.test(filter) ? filter.replace(rmatrix, matrixFilter) : filter ? filter + ' ' + matrixFilter : matrixFilter;
		} else {
			$(el)
				.width(w*ratio)
				.height(h*ratio)
				.css({
					"margin-left": dx+"px",
					"margin-top": dy+"px"
				});
		}
	}

	$.fn.transform = function(ratio,dx,dy,w,h,noFilter,forceCompat) {
		
		this.each(function() {
			transform(this,ratio,dx,dy,w,h,noFilter,forceCompat);
		});
		
		return this;		 
	};	
		
}(jQuery));

		
  /* ==============================================
   Pixelonetry Video
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval */

	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	function SimplePlayer(target,w,h,sources,poster) {
		
		var video;
		
		
		function play() {
			video[0].play();
		}
		
		video = $('<video autoplay controls="controls" preload="none" autobuffer height="'+h+'" width="'+w+'" poster="'+(poster ? poster : "")+'"></video>');
		for (var i in sources) {
			if (typeof i === "string") {
				video.append('<source src="'+sources[i].src+'" type="'+sources[i].type+'">');
			}
		}
		video.bind("click",play);
		
		target.append(video);
		setTimeout(ready,100);
		
		function ready() {
			video.triggerHandler("ready");
			video.triggerHandler("buffer");
		}

		
		function destroy() {
			video
				.unbind("click",play)
				.detach()
				.empty();
			video = undefined;
		}
		
		function addListener(type,listener) {
			video.bind(type,listener);
		}
		
		function removeListener(type,listener) {
			video.unbind(type,listener);
		}
		
		$.extend(this, {
			destroy: destroy,
			addListener: addListener,
			removeListener: removeListener
		});
		
	}

	
	$.pixelonetry.video = {	
		conf: { 
			disableFade: false,
			useVideoTag: false
		},
		getType: function(src) {
			return 'video/'+src.match(/(\w+)$/)[1].replace("ogv","ogg");
		},
		fallbackPlayer: "js/template/video/jarisplayer.swf",
		SimplePlayer: SimplePlayer
	};
	
	var iDev = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);
	var instances = 0;
	
	function PeVideo(t, conf) {
		var jthis = $(this);
		var target = t;
		var player;
		var checkTimer;
		var ready = false;
		
		function start() {
			switch (conf.type) {
				case "youtube":
					$.pixelonetry.youtube(youtubePlayerReady);
				break;
				case "vimeo":
					$.pixelonetry.vimeo(vimeoPlayerReady);
				break;
				case "vidly":
					localVideo([
						"http://vid.ly/"+conf.videoId+"?content=video&format=mp4",
						"http://vid.ly/"+conf.videoId+"?content=video&format=webm",
						"http://vid.ly/"+conf.videoId+"?content=video&format=ogv"
					],conf.poster);
				break;
				case "local":
					localVideo(conf.videoId,conf.poster);
				break;
			}
		} 
		
		function localVideo(srcs,poster) {
			
			var video = {};
			
			for (var i=0;i<srcs.length;i++) {
				video[i] = {
					src: srcs[i],
					type: $.pixelonetry.video.getType(srcs[i])
				};
			}
			
			if (conf.useVideoTag) {
				player = new $.pixelonetry.video.SimplePlayer(target,conf.width,conf.height,video,poster);
			} else {
				
				instances++;
				var id = 'pe_local_player_'+(instances);
				var vid = $('<div id="'+(id)+'"/>').css({
						"background-color": "black",
						"width": conf.width,
						"height": conf.height
					});
				target.html(vid[0]);	

				player = new projekktor("#"+id, {
					disableFade: conf.disableFade,
					controls: true,
					volume: 0.9,
					_width: conf.width,
					_height: conf.height,
					_autoplay: true,
					enableFullscreen: false,
					imageScaling: "fill",
					videoScaling: "aspectratio",
					//_plugins: ['Display', 'Controlbar'],
					poster: poster,
					playerFlashMP4: $.pixelonetry.video.fallbackPlayer,
					playerFlashMP3: $.pixelonetry.video.fallbackPlayer,
					playlist: [video]
				});
				
	
			}
			
			player.addListener(iDev ? 'ready' : 'buffer',localVideoBuffer);
			
		}
		
		function localVideoBuffer(value) {
			if (iDev) {
				setTimeout(fireReadyEvent,100);
				player.removeListener('ready',localVideoBuffer);
			} else if (value == "FULL" || conf.useVideoTag) {
				player.removeListener('buffer',localVideoBuffer);
				fireReadyEvent();
			}
		}
		
		function youtubePlayerReady(ytplayer) {
			var div=$("<div/>");
            target.append(div);
			player = new ytplayer(div[0], {
				height: conf.height,
				width: conf.width,
				videoId: conf.videoId,
				playerVars: {
					theme: "dark",
					wmode: "opaque",
					autohide: 1,
					enablejsapi: 1,
					origin: location.href.match(/:\/\/(.[^\/]+)/)[1],
					loop: conf.loop ? 1 : 0,
					hd: conf.hd ? 1 : 0,
					autoplay: conf.autoPlay ? 1 : 0,
					showinfo:0,
					iv_load_policy:3,
					modestbranding:1,
					showsearch:0,
					fs:0
				},
				events: {
				  'onStateChange': ytStateChange,
				  'onReady': fireReadyEvent
				}
			});
			player.peUseHD = conf.hd;
			checkTimer = setInterval(ytStateChange,250);
			if ($.browser.msie && $.browser.version < 8) {
				setTimeout(fireReadyEvent,1000);
			}
		}
		
		function fireReadyEvent() {
			if (!ready) {
				jthis.trigger("video_ready.pixelonetry");
				ready = true;
			}
		}
		
		function vimeoPlayerReady(vimeoplayer) {
			player = new vimeoplayer(target[0], {
				height: conf.height,
				width: conf.width,
				videoId: conf.videoId,
				playerVars: {
					autohide: 0,
					origin: location.href.match(/:\/\/(.[^\/]+)/)[1],
					loop: conf.loop ? 1 : 0,
					autoplay: conf.autoPlay ? 1 : 0
				}
			});
			$(player)
				.one("video_ready.pixelonetry",fireReadyEvent)
				.one("video_ended.pixelonetry",vimeoVideoEnded);
		}
		
		function vimeoVideoEnded() {
			jthis.trigger("video_ended.pixelonetry");
		}
		
		function ytStateChange() {
			if (!player) {return;}
			if (player.getPlayerState) {
				if (player.peUseHD && player.getPlaybackQuality) {
					if (player.getPlaybackQuality() != "hd720") {
						player.setPlaybackQuality("hd720");					
					}
				}				
				switch (player.getPlayerState()) {
				case YT.PlayerState.ENDED:
					jthis.trigger("video_ended.pixelonetry");
					break;
				case YT.PlayerState.PLAYING:
					if ((player.getDuration()-player.getCurrentTime()) < 0.4) {
						jthis.trigger("video_ended.pixelonetry");
					}
					break;
				}
			}
		}
		
		function resize(w,h) {
			if (player && player.setSize) {
				player.setSize({width:w, height: h});
			}
		}

		
		$.extend(this, {
			resize: resize,
			bind: function(ev,handler) {
				jthis.bind(ev,handler);
			},
			unbind: function(ev,handler) {
				jthis.unbind(ev,handler);
			},
			one: function(ev,handler) {
				jthis.one(ev,handler);
			},
			destroy: function() {
				clearInterval(checkTimer);
				if (jthis) {
					jthis.remove();
				}
				jthis = undefined;
				if (player) {
					$(player).unbind("video_ended.pixelonetry");
					
					switch (conf.type) {
						case "vidly":
						case "local":
						if (player.removeListener) {
							player.removeListener(iDev ? 'ready' : 'buffer',localVideoBuffer);
						}
						if (conf.useVideoTag) {
							if (player.destroy) {
								player.destroy();
							}	
						} else {
							if (player.selfDestruct) {
								player.selfDestruct();
							}	
						}
						break;
						default:
							if (player.destroy) {
								player.destroy();
							}
					}
				}
				player = undefined;
				target.data("peVideo", null);
				target = undefined;
				
			}
		});
		
		start();
		
		
	}
	
	// jQuery plugin implementation
	$.fn.peVideo = function(conf) {
		// return existing instance
		var api = this.data("peVideo");
		
		if (api) { 
			return api; 
		}

		conf = $.extend(true, {}, $.pixelonetry.video.conf, conf);
		
		// install kb for each entry in jQuery object
		this.each(function() {
			api = new PeVideo($(this), conf);
			$(this).data("peVideo", api); 
		});
		
		return conf.api ? api: this;		 
	};
		
}(jQuery));

   /* ==============================================
   Pixelonetry videoPlayer
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval */

	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	function getInfo(url,formats,poster,size) {
		var result, type, id, i,w = false,h = false;
		
		url = url ? url : "";
		
		for (var filter in types) {
			if (typeof filter === "string" ) {
				result = url.match(types[filter]);
				if (result && result.length > 0) {
					type = filter;
					id = result[2];
					if (!poster) {
						poster = posters[type] ? posters[type].replace("$ID",id) : "";						
					}
					break;
				}	
				
			}
		}
		
		// no know source found, see if local video
		if (!id) {
			var src = url.match(local);
			if (src) {
				type = "local";
				id = [src[0]];
				if (formats) {
					formats = formats.split(",");
					for (i=0;i<formats.length;i++) {
						id.push(src[1]+formats[i]);
					}
				}
			} else {
				id = false;
			}
		}
		
		if (size) {
			var token = size.split(/x| |,/);
			w = parseInt(token[0],10) || 0;
			h = parseInt(token[1],10) || 0;
		}
		
		return {
			video: id,
			videoType: type,
			videoPoster: poster,
			videoW : w,
			videoH : h
			
		};
	}

	
	$.pixelonetry.videoplayer = {	
		conf: { 
			autoPlay: false,
			responsive: false,
			api: false
		},
		getInfo: getInfo
	};
	
	var instances = [];
	
	var types = {
			vidly: /https?:\/\/(vid.ly)\/([\w|\-]+)/i,
			youtube: /https?:\/\/(www.youtube.com\/watch\?v=|youtube.com\/watch\?v=|youtu.be\/)([\w|\-]+)/i,
			vimeo: /https?:\/\/(vimeo\.com|www\.vimeo\.com)\/([\w|\-]+)/i
		};
	
	var posters = {
			vidly: "http://cf.cdn.vid.ly/$ID/poster.jpg",
			youtube: "http://img.youtube.com/vi/$ID/0.jpg",
			vimeo: "http://vimeo.com/api/v2/video/$ID.json?callback=?"
		};
	
	var local = /(.+[^w])(mp4|webm|ogv)$/i;
	
	function PeVideoPlayer(target, conf) {
		var preview,w,h,type,id,poster;
		var container;
		var player = false;
		var instanceID;
		
		
		
		function start() {
			var info = getInfo(target[0].href,target.attr("data-formats"),target.attr("data-poster"),target.attr("data-size"));
			
			if (info.video) {
				id = info.video;
				type = info.videoType;
				poster = info.videoPoster;
			} else {
				return;
			}
			
			if (info.videoW !== false) {
				target.css({
					width: info.videoW,
					height: info.videoH
				});
			}
			
			/*
			for (var filter in types) {
				if (typeof filter === "string" ) {
					result = url.match(types[filter]);
					if (result && result.length > 0) {
						type = filter;
						id = result[2];
						poster = posters[type] ? posters[type].replace("$ID",id) : "";
						break;
					}	
					
				}
			}
			
			// no know source found, see if local video
			if (!id) {
				var src = url.match(local);
				if (src) {
					type = "local";
					id = [src[0]];
					var formats = target.attr("data-formats");
					if (formats) {
						formats = formats.split(",");
						for (i=0;i<formats.length;i++) {
							id.push(src[1]+formats[i]);
						}
					}
				} else {
					return;
				}
			}
			
			if (target.attr("data-size")) {
				var token = target.attr("data-size").split(/x| |,/);
				w = parseInt(token[0],10) || 0;
				h = parseInt(token[1],10) || 0;
				target.css({
					width: w,
					height: h
				});
			}*/
			
			
			w = info.videoW || target.width();
			h = info.videoH || target.height();
			
			var icon = $('<span class="largePlay"></span>');
			
			if (conf.responsive) {
				
				container = $("<div/>").fadeTo(0,0);
				
				target
					.append(icon)
					.removeAttr("href")
					.append(container)
					.wrap('<div class="videoWrapper sixteenBYnine '+info.videoType+'"></div>');
				
				if (target.attr("data-target") != "flare") {
					target
						.addClass("peActiveWidget")
						.bind("enable.pixelonetry ",enable)
						.bind("disable.pixelonetry ",disable)
						.bind("click",play);
				}
				
			} else {
				target
					.append(icon)
					.wrap('<div style="position: relative; overflow: hidden"></div>')
					.addClass("peActiveWidget")
					.bind("enable.pixelonetry ",enable)
					.bind("disable.pixelonetry ",disable)
					.bind("click",play);
				
				icon.css({
					left: (w-icon.width()) >> 1,
					top: (h-icon.height()) >> 1
				});
				
				container = $("<div/>").css({
					"position": "absolute",
					"z-index": 2,
					"display": "none",
					"width": w+"px",
					"height": h+"px"
				});
				
				target.parent().prepend(container);
				
			}
			
			
			
			var img = target.children("img:eq(0)");
			
			if (img.length > 0) {
				preview = img;
				poster = img.attr("src");
				posterLoaded();
			} else if (target.attr("data-poster")) {
				poster = target.attr("data-poster");
				if (conf.responsive) {
					target.parent().addClass("customCover");
				}
				getPoster();
			} else if (poster) {
				if (type == "vimeo") {
					$.getJSON(poster,vimeoPosterUrlLoaded);
				} else {
					getPoster();
				}
			} 
			
			if (($.pixelonetry.browser.mobile && target.attr("data-autoplay") != "disabled") || conf.autoPlay) {
				enable();
			}
			
		} 
		
		function vimeoPosterUrlLoaded(data) {
			poster = (data && data[0] && data[0].thumbnail_large) || false;
			if (poster) {
				getPoster();
			}
		}
		
		function getPoster() {
			preview = $("<img/>");
			preview.fadeTo(0,0).css("opacity",0).attr("data-src",poster);
			target.append(preview);
			$.pixelonetry.preloader.load(preview,posterLoaded);
		}
		
		function posterLoaded() {
			
			if (conf.responsive) {
				//preview.width("100%").height("100%").fadeTo(300,1);
				preview.width("100%").fadeTo(300,1);
				/*
				if (preview.closest("bw-images")) {
					preview.peBlackAndWhite();
				}
				*/
				return;
			}
			
			var iw = preview[0].width || preview.width();
			var ih = preview[0].height || preview.height();
		
			var scaler = $.pixelonetry.Geom.getScaler(
				"fillmax",
				"center",
				"center",
				w,
				h,
				iw,
				ih
				
			);
			
			preview.transform(scaler.ratio,scaler.offset.w,scaler.offset.h,w,h,true);
			preview.fadeTo(300,1);
		}
		
		function play(e) {
			if (player) {
				return false;
			}
			
			if (!$.pixelonetry.browser.mobile) {
				for (var i=0;i<instances.length;i++) {
					if (i != instanceID) {
						instances[i].disable();
					}
				}
			}
			
			container.show().fadeTo(0,0);
			player = container.peVideo({
				api: true,
				useVideoTag: conf.responsive && $.pixelonetry.browser.mobile,
				//useVideoTag: true,
				width: conf.responsive ? "100%" : w,
				height: conf.responsive ? "100%" : h,
				type    : type,
				videoId : id,
				poster:poster,
				hd: true,
				autoPlay:true,
				loop:true
			});
			player.one("video_ready.pixelonetry",show);
			
			target.trigger("play");
			// for testing
			//setTimeout(disable,3000);
			
			return false;
		}
		
		function show() {
			container.fadeTo(500,1);
		}
		
		function stop() {
		}
		
		function enable() {
			if (!player && ($.pixelonetry.browser.mobile || conf.autoPlay)) {
				play();
			}
		}
		
		function disable() {
			if (player) {
				if (player.destroy) {
					player.destroy();
				}
				player = false;
				container.empty().fadeTo(0,0).hide();
			}
		}
		
		
		$.extend(this, {
			enable: enable,
			disable: disable,
			destroy: function() {
				if (player && player.destroy) {
					player.destroy();
				}
				player = undefined;
				instances.splice(instanceID,1);
				target.data("peVideoPlayer", null);
				target = undefined;
				
			}
		});
		
		instanceID = instances.length;
		instances.push(this);
				
		start();
		
		
	}
	
	// jQuery plugin implementation
	$.fn.peVideoPlayer = function(conf) {
		// return existing instance
		
		var api = this.data("peVideoPlayer");
		
		if (api) { 
			return api; 
		}

		conf = $.extend(true, {}, $.pixelonetry.videoplayer.conf, conf);
		
		// install kb for each entry in jQuery object
		this.each(function() {
			api = new PeVideoPlayer($(this), conf);
			$(this).data("peVideoPlayer", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
		
}(jQuery));

  /* ==============================================
   Pixelonetry Utils Ticker
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout,setInterval,clearInterval */

	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	if ($.pixelonetry.ticker) {
		return;
	}

	var queue = [];
	var active = 0;
	
	function now() {
		return (new Date()).getTime();
	}
		
	var tim1,tim2,tim3;
	
	var loop = window.requestAnimationFrame || 
		 window.webkitRequestAnimationFrame || 
		 window.mozRequestAnimationFrame || 
		 window.oRequestAnimationFrame || 
		 window.msRequestAnimationFrame ||
		 false;
	
	
	function tick() {
		
		var n,entry;
		if (active > 0) {
			n= now();
		
			for (var i in queue) {
				entry = queue[i];
				if (entry.paused) {
					continue;
				}
				if (n-entry.last >= entry.each) {
					entry.callback(entry.last,n);
					entry.last = n;
				}
			}
			
			if (loop) {
				loop(tick);
			}
			
		}
	}
		
	var ticker = $.pixelonetry.ticker = {
			register: function (callback,fps) {
				active++;
				
				fps = (typeof fps == "undefined") ? 33 : fps;
			
				if (fps > 0) {
					fps = parseInt(1000/fps,10);
				} else if ($.browser.mozilla) {
					fps = parseInt(1000/50,10);
				}
			
			
				//alert(fps);
			
				queue.push({"callback":callback,"last":now(),"each": fps,"delay":0});
				if (active == 1) {
					if (loop) {
						loop(tick);
					} else {
						tim1 = setInterval(tick, 16);
						tim2 = setInterval(tick, 20);
						tim3 = setInterval(tick, 30);
					}
				}
			},
			pause: function(callback) {
				for (var i in queue) {
					if (queue[i].callback == callback) {
						queue[i].paused = true;
					}
				}
			},
			resume: function(callback) {
				for (var i in queue) {
					if (queue[i].callback == callback) {
						queue[i].paused = false;
					}
				}
			},
			unregister: function (callback) {
				for (var i in queue) {
					if (queue[i].callback == callback) {
						delete queue[i];
						active--;
					}
				}
				if (active <= 0) {
					clearInterval(tim1);
					clearInterval(tim2);
					clearInterval(tim3);
				}
			}
		};
		
}(jQuery));


 /* ==============================================
   Pixelonetry flare-common (Lightbox)
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelonetry,Spinner */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	$.pixelonetry.peFlareLightbox = {	
		conf: {
			api: false,
			captions: true,
			delay: 0,
			preloadFont: true,
			videoWidth: 0,
			titleAttr: "title",
			descriptionAttr: "data-description",
			descriptionElement: "p.peFlareDescription"
		} 
	};

	$.pixelonetry.video.fallbackPlayer = "js/pe.flare/video/jarisplayer.swf";
	
	var ua = navigator.userAgent.toLowerCase();
	var vimeoCover =  /http:\/\/(vimeo\.com|www\.vimeo\.com)\//i;
	
	var offset = {
			none: {
				from: 0,
				to: 0
			},
			prev: {
				from: -100,
				to: 0
			},
			next: {
				from: 100,
				to: 0
			}
		};
	
	function Lightbox() {
		
		var conf;
		var inited = false;
		var built = false;
		var jwin;
		var w,h;
		var overlay;
		var active = false;
		var overlayActive = false;
		var rendered = false;
		var useTransitions = $.support.csstransitions;
		var useTransitionEnd = $.support.csstransitionsEnd;
		var spinner,content;
		var modules = [];
		var rendererList = [];
		var renderers = {};
		var targets = [];
		var items = [];
		var galleries = {};
		var loadQueue = [];
		var displayList = [];
		var loaded = 0;
		var hiddenBuffer;
		var currentGallery = false;
		var currentGalleryPos = 0;
		var currentID = -1;
		var needDisplayListClear = false;
		var rendererID = 1;
		var direction = "none";
		var touchX,touchAmountX,touchScrollX;
		var spinnerTimeout = 0;
		var locked = 0;
		var thumbs;
		var thumbsInnerContainer;
		var thumbsActive = false;
		var thumbsAutoHide;
		var thumbsStart = 0;
		var thumbsScrollAmount = 0;
		var videoResource = false;
		var videoIcon, videoOverlay, captionsOverlay;
		var player;
		var showVideoTimer = 0;
		var isAbsolute = false;
		var oldCaptions = false;
		var slideshowTimer = 0;
	
		function resize() {
			w = jwin.width();
			h = window.innerHeight ? window.innerHeight: jwin.height();
			if (overlay) {
				overlay.width(w).height(h);
				if (isAbsolute) {
					overlay.css("top",jwin.scrollTop());
				}
			}
			if ($.pixelonetry.browser.mobile && thumbs && thumbs.data("count") > 0) {
				scrollThumbs(thumbsStart,true);
			}
			var i = displayList.length;
			while (i--) {
				displayList[i].resize(w,h);
			}
			
			resizeCaptions();
			resizeVideo();
		}
		
		function register(module,name) {
			modules[name] = module;
		}
	
		function thumbsHandler(e) {
			clearTimeout(thumbsAutoHide);
			var over = items[currentID].thumbover;
			switch (e.type) {
			case "mouseenter":
				if (over) {
					showHideThumbs(true);
				}
				break;
			case "mouseleave":
				if (over) {
					showHideThumbs(false);
				}
				break;
			case "click":
				var id = e.currentTarget.id;
				if (!locked && id) {
					id = parseInt(id,10);
					if (currentID >= 0) {
						direction = id > currentID ? "next" : "prev";
					}
					process(id);
				}
				e.stopPropagation();
				e.stopImmediatePropagation();
				return false;
			}
		}

		
		function mousemoveHandler(e) {
			clearTimeout(thumbsAutoHide);
			var pos = e ? e.pageX : 0;
			var total = thumbs.data("width");
			var delta = total-w;
			if (delta >= 0) {
				pos = -delta*pos/w;
				thumbsInnerContainer.css("margin-left",pos);				
			} else {
				thumbsInnerContainer.css("margin-left","auto");
			}
		}
		
		function scrollThumbs(pos,absolute) {
			var size = thumbs.data("size");
			var page = Math.floor(w/size);
			var after;
			var offset = 0;
			if (thumbs.data("width") > w) {
				if (absolute) {
					thumbsStart = pos;
				} else {
					thumbsStart = Math.max(0,thumbsStart+pos*page);
				}				
				if ((after = thumbs.data("count")-thumbsStart) < page) {
					thumbsStart -= (page-after+1);
					offset = w-page*size-size-8;
				}
			} else {
				thumbsStart = 0;
			}
			thumbsScrollAmount = -thumbsStart*size+offset;
			thumbsInnerContainer.transform(1,thumbsScrollAmount === 0 ? 0 : thumbsScrollAmount-2,0);
		}
		
		
		function touchHandler(e) {
			if (!active || player) {
				return true;
			}
			
			var type = e.type;
			var te = e.originalEvent;
			
			
			switch (type) {
			case "touchstart":
				if(te.touches.length > 1 || te.scale && te.scale !== 1) {
					return true;
				}
				touchX = te.touches[0].pageX;
				touchAmountX = 0;
				break;
			case "touchmove":
				if(te.touches.length > 1 || te.scale && te.scale !== 1) {
					return true;
				}
				//stopTimer();
				touchAmountX = (te.touches[0].pageX - touchX);
				
				e.preventDefault();
				e.stopPropagation();
				if (thumbsActive) {
					thumbsInnerContainer.addClass("touchMove").transform(1,thumbsScrollAmount + touchAmountX,0);
				}
				break;
			case "touchend":
				
				if (thumbsActive) {
					thumbsInnerContainer.removeClass("touchMove");
				}
				
				if (touchAmountX === 0) {
					return false;
				}
				
				var jumped = false;
				
				if (touchAmountX > 10 /*&& current > 0*/) {
					jumped = true;
					if (!thumbsActive) {
						prev();						
					} else {
						scrollThumbs(-1);
					}
				}
				
				if (touchAmountX < -10 /*&& current < (max-conf.count)*/) {
					jumped = true;
					if (!thumbsActive) {
						next();						
					} else {
						scrollThumbs(+1);
					}
				} 
				
				/*
				if (!jumped) {
					jumpTo(current);
				}
				*/
				
				touchAmountX = 0;
				
				break;
			}
			
			return true;
		}
		
		function disableBodyScroll(e) {
			if (!active) {
				return true;
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		
		function next() {
			if (locked || !currentGallery) {
				return;
			}
			direction = "next";
			process(currentGallery[(currentGalleryPos + 1) % currentGallery.length]);
		}
		
		function prev() {
			if (locked || !currentGallery) {
				return;
			}
			direction = "prev";
			process(currentGallery[currentGalleryPos === 0 ? currentGallery.length-1 : currentGalleryPos-1]);
		}
		
		function showHideCaptions(status) {
			// find tallest caption
			var maxH = captionsOverlay.find("> div:last").outerHeight() || 500;
			
			status = currentGallery ? status : false;
			
			if (useTransitionEnd) {
				captionsOverlay.css({"top" : (status ? maxH : 0)});
			} else {
				captionsOverlay.stop().animate({"top" : (status ? maxH : 0)},500);
			}
			
		}

		
		function showHideThumbs(status) {
			var  tp = thumbs.parent();
			thumbsActive = status === true ? true : (status === false ? false : (thumbsActive ? false : true));
			showHideCaptions(thumbsActive);
			if (useTransitionEnd) {
				tp[thumbsActive ? "addClass" : "removeClass"]("peFlareLightboxActive");
			} else {
				tp.stop().animate({"margin-top" : (thumbsActive ? -84 : 0)},500);
			}
		}
		
		function resizeCaption() {
			var c = captionsOverlay.find(this);
			c.css("top",h-c.outerHeight());
			//c.css("top",0);
			//c.css("top",(h-c.outerHeight())/2);
		}

		
		function resizeCaptions() {
			captionsOverlay.find("> div").each(resizeCaption);
		}
		
		function resizeVideo() {
			if (videoOverlay.hasClass("peFlareLightboxActive")) {
				if (true || $.pixelonetry.browser.mobile || videoResource.videoType == "youtube" || videoResource.videoType == "vimeo") {
					var mtop = $.pixelonetry.browser.iDev ? 35 : 0;
					var vh = $.pixelonetry.browser.android ? w*9/16 : h;
					vh = Math.min(vh,h);
					
					var vtarget = videoOverlay.find("iframe, video");
					var maxW = items[currentID].videoWidth;
					
					if (maxW) {
						vh = Math.min(vh,Math.min(w,maxW)*9/16);						
					}
					
					if (maxW && maxW < w) {
						vtarget.width(maxW).css("margin-left",(w-maxW)/2);
					} else {
						vtarget.width("100%").css("margin-left",0);
					}
					vtarget.css("margin-top",(h-vh)/2+mtop).height(vh-mtop);
					
					
					//videoOverlay.find("iframe, video").css("margin-top",(h-vh)/2+offset).height(vh-offset).width("100%");	
					//videoOverlay.find("iframe, video").css("max-width",500);	

				} else {
					player.resize(w,h);
				}
			}
		}
		
		
		function showVideo() {
			clearTimeout(showVideoTimer);
			player.unbind("video_ready.pixelonetry",showVideo);
			spinner.hide();
			videoOverlay.addClass("peFlareLightboxActive");
			resizeVideo();
			if (($.pixelonetry.browser.webkit || $.pixelonetry.browser.iDev) && (videoResource.videoType == "vimeo" || videoResource.videoType == "youtube")) {
				isAbsolute = true;
				overlay.css({
					"position": "absolute",
					"top": jwin.scrollTop()
				});
			}
		}
		
		function stopVideo() {
			clearTimeout(showVideoTimer);
			if (player) {
				if (player.destroy) {
					player.destroy();
				}
				player = false;
				videoOverlay.removeClass("peFlareLightboxActive").empty();
				videoIcon.addClass("peFlareLightboxActive");
			}
			if (isAbsolute) {
				isAbsolute = false;
				overlay.css({
					"position": "fixed",
					"top": 0
				});
			}
		}

		function closeButton() {
			if (player) {
				stopVideo();
				videoIcon.addClass("peFlareLightboxActive");
				if (!currentGallery) {
					close();
				}
			} else {
				close();					
			}		
		}
		
		function createVideo() {
			spinner.show();
			videoIcon.removeClass("peFlareLightboxActive");
			player = videoOverlay.peVideo({
				api: true,
				//useVideoTag: $.pixelonetry.browser.mobile,
				useVideoTag: true,
				disableFade: true,
				width: w,
				height: h,
				type    : videoResource.videoType,
				videoId : videoResource.video,
				poster: $.pixelonetry.browser.mobile && videoResource.videoPoster,
				hd: true,
				autoPlay:true,
				loop:false
			});
			player.one("video_ready.pixelonetry",showVideo);
			showVideoTimer = setTimeout(showVideo,5000);
			//player.one("video_ended.pixelonetry",stopVideo);
		}

		
		function controlsHandler(e) {
			if (!active || !overlayActive) {
				return true;
			}
			switch(e.currentTarget.id) {
			case "peFlareLightboxControlClose":
				closeButton();
				break;
			case "peFlareLightboxControlNext":
				next();
				break;
			case "peFlareLightboxControlPrev":
				prev();
				break;
			case "peFlareLightboxControlThumbs":
				showHideThumbs();
				break;
			case "peFlareLightboxControlVideo":
				createVideo();
				break;
			}
			e.stopPropagation();
			e.stopImmediatePropagation();
			return false;
		}
		
		function navHandler(e,delta) {
			if (!active || !overlayActive) {
				return true;
			}
			if (e.type == "keydown") {
				switch (e.keyCode) {
				case 27:
					// ESC
					closeButton();
					break;
				case 39:
					// right arrow
					next();
					break;
				case 37:
					// left arrow
					prev();
					break;
				}
			} else {
				// mousewheel
				if (!player) {
					if (delta < 0) {
						next();
					} else {
						prev();
					}					
				}
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		}

		
		function init(c) {
			if (inited) {
				return true;
			}
			inited = true;
			conf = c;
			
			if (conf.preloadFont) {
				var p = $('<p class="peFlareLightboxFontPreload">.</p>');
				$("body").append(p);
				setTimeout(function () {
					p.detach().empty();
				},100);
			}
			
			return true;
		}
		
		function scroll(e) {
			if (!active) {
				return;
			}
			if (isAbsolute) {
				overlay.css("top",jwin.scrollTop());
			}
		}

		
		function build() {
			if (built) {
				return true;
			}
			built = true;
			jwin = $(window).resize(resize);
			jwin.scroll(scroll);
			overlay = $('<div class="peFlareLightbox"><div class="peFlareLightboxHidden"></div><div class="peFlareLightboxControls"><div><a href="#" class="sprite" id="peFlareLightboxControlClose"/><a href="#" class="sprite" id="peFlareLightboxControlNext"/><a href="#" class="sprite" id="peFlareLightboxControlPrev"/><a href="#" class="sprite" id="peFlareLightboxControlThumbs"/></div></div><div class="peFlareLightboxOverlay"></div><div class="peFlareLightboxContent"></div><div class="peFlareLightboxCaptions"></div><div class="peFlareLightboxThumbs"><span></span></div><a id="peFlareLightboxControlVideo" class="peFlareLightboxVideoIcon"><span></span></a><div class="peFlareLightboxVideo"></div><div class="peFlareLightboxSpinner"><span/></div></div>');
			if (!useTransitions) {
				overlay.addClass("no-transitions");
			}
			
			if ($.browser.msie) {
				overlay.addClass("msie");
			}
			
			$("body").append(overlay).bind("touchmove",disableBodyScroll);
			
			spinner = overlay.find(".peFlareLightboxSpinner").hide();
			content = overlay.find(".peFlareLightboxContent");
			videoIcon = overlay.find(".peFlareLightboxVideoIcon");
			videoOverlay = overlay.find(".peFlareLightboxVideo");
			captionsOverlay = overlay.find(".peFlareLightboxCaptions");
			
			thumbs = $("<div/>");
			if ($.pixelonetry.browser.mobile) {
				overlay.addClass("mobile");
				overlay.find(".peFlareLightboxThumbs").append(thumbs);				
			} else {
				overlay.addClass("desktop");
				overlay.find(".peFlareLightboxThumbs").bind("mouseenter mouseleave",thumbsHandler).append(thumbs);
			}
			hiddenBuffer = overlay.find(".peFlareLightboxHidden");
			
			overlay
				.bind("touchstart touchmove touchend",touchHandler)
				.bind("mousewheel",navHandler)
				.delegate(".peFlareLightboxControls a","click touchstart",controlsHandler)
				.delegate(".peFlareLightboxThumbs span","click",thumbsHandler);
			
			videoIcon.click(controlsHandler);
			
			if (!$.pixelonetry.browser.mobile) {
				thumbs.bind("mousemove",mousemoveHandler);
			} else {
				overlay.click(showHideThumbs);
			}
			
			$(document).bind("keydown",navHandler);

		}

		
		function overlayReady() {
			overlayActive = true;
			overlay.css("filter","none");
			if (thumbs.data("created")) {
				showHideThumbs(true);
				thumbsAutoHide = setTimeout(showHideThumbs,2000);
			}
			if (loadQueue.length === loaded) {
				render();
			}
		}

		
		function fadeIn() {
			overlay.addClass("peFlareLightboxActive");
			if (useTransitions) {
				//overlay.one(useTransitionEnd,overlayReady);
				setTimeout(overlayReady,600);
			} else {
				overlay.stop().css("opacity",0).fadeTo(500,1,overlayReady);				
			}
		}
		
		function open() {
			$.pixelonetry.peFlareLightbox.active = active = true;
			locked = 0;
			build();
			resize();
			jwin.scrollLeft(0);
			overlay.show();
			setTimeout(fadeIn,10);
			// stop all videos
			$(".peVideo.peActiveWidget").trigger("disable.pixelonetry");
		}
		
		function clean() {
			$.pixelonetry.peFlareLightbox.active = active = false;
			currentGallery = false;
			locked = false;
			loadQueue = [];
			currentID = -1;
			stopVideo();
			overlay.hide();
			content.empty();
			captionsOverlay.empty();
			var rID,renderer;
			// remove all renderers in display list
			while ((renderer = displayList.shift())) {
				renderer.destroy();
			}
			// remove any renderer left
			while ((rID = rendererList.shift())) {
				renderers[rID].destroy();
			}
			thumbs.data("created",false).empty();
			overlay.removeClass("peFlareLightboxActive");
			videoIcon.removeClass("peFlareLightboxActive");
			direction = "none";
		}

		
		function close(e) {
			overlayActive = false;
			if (useTransitions) {
				// too risky with event name changes ... let's stick with good ol' setTimeout
				if (false && useTransitionEnd) {
					overlay.one(useTransitionEnd,clean);
				} else {
					setTimeout(clean,600);
				}	
				overlay.removeClass("peFlareLightboxActive");				
			} else {
				//overlay.removeClass("peFlareLightboxActive");
				overlay.stop().css("opacity",1).fadeTo(500,0,clean);
			}
		}
		
		function delayedSpinnerShow() {
			spinner.show();
		}

		
		function showSpinner() {
			spinnerTimeout = setTimeout(delayedSpinnerShow,500);
		}
		
		function hideSpinner() {
			clearTimeout(spinnerTimeout);
			spinner.hide();
		}
		
		function createThumbs() {
			if (!currentGallery || thumbs.data("created") === true) {
				return;
			}
			var thumb,id;
			thumbsInnerContainer = $("<div/>");
			thumbs.empty().append(thumbsInnerContainer);
			var count = 0;
			for (var i=0;i<currentGallery.length;i++) {
				id = currentGallery[i];
				
				if ((thumb = items[id].thumb)) {
					thumb = $("<span/>").attr("data-src",thumb).attr("id",id);
					thumbsInnerContainer.append(thumb);
					thumb.peSimpleThumb();
					count++;
				}
			}
			var tiw = count*(104)+10;
			thumbsInnerContainer.width(tiw);
			thumbs.data("count",count);
			thumbs.data("size",104); 
			if (count > 0) {
				thumbs.data("created",true);				
				thumbs.data("width",tiw);				
			} else {
				overlay.find("#peFlareLightboxControlThumbs").hide();
			}
		}
		
		
		function vimeoPosterUrlLoaded(data) {
			hideSpinner();
			var id = currentID;
			items[id].resource = (data && data[0] && data[0].thumbnail_large) || false;
			currentID = -1;
			process(id);
		}
		
		function filter(gallery) {
			if (typeof gallery !== "object") return gallery;
			var i = 0, n = gallery.length,id,target;
			var filtered = [];
			
			for(;i<n;i++) {
			
				id = gallery[i];
				target = items[id].target;
				
				if (target.hasClass("flare-hidden") || target.closest(".peIsotopeItem.isotope-hidden").length > 0) {
					// skip targets inside hidden isotope elements
					continue;
				}
				
				filtered.push(id);
				
			}
			return filtered;
		}
		
		function process(id) {
			var item = items[id];
			
			overlay.find(".peFlareLightboxThumbs > span")[item.thumbover ? "show" : "hide"]();
			
			// check if damn vimeo cover (json)
			if (item.resource.match(vimeoCover)) {
				currentID = id;
				showSpinner();
				$.getJSON(item.resource,vimeoPosterUrlLoaded);
				return false;
			}
			
			if (id === currentID) {
				rendered = true;
				loaded = 0;
				return false;
			}
			currentID = id;
			
			stopVideo();
			
			currentGallery = item.gallery ? filter(galleries[item.gallery]) : false;
			currentGallery = currentGallery.length > 1 ? currentGallery : false; 
			
			overlay.find("#peFlareLightboxControlPrev,#peFlareLightboxControlNext,#peFlareLightboxControlThumbs")[currentGallery && currentGallery.length > 1 ? "show" : "hide"]();
			
			if (currentGallery) {
				currentGalleryPos = $.inArray(id,currentGallery);
				createThumbs();
			}
			
			rendered = false;
			loaded = 0;

			var rID;
			var renderer,Module;
			
			// we have a gallery render here
			if (rendererList.length > 0 && (renderer = renderers[rendererList[0]]).isGallery) {
				rID = rendererList[0];
				needDisplayListClear = false;
			} else {			
				rID = rendererID++;
				Module  = modules[item.plugin] || modules["default"];
				renderer = new Module(rID,w,h);
				renderers[rID] = renderer;
				rendererList.push(rID);
				needDisplayListClear = true;
			}
			
			videoResource = item.video ? item : false;
			if (!videoResource) {
				videoIcon.removeClass("peFlareLightboxActive");				
			}
			loadQueue.push(rID);
						
			showSpinner();
			renderer.load(item);
		}

		
		function click(e) {
			var el = e.currentTarget;
			var linkID = parseInt(el.getAttribute("data-pe-flare-id" || 0),10);
			var linkGallery = el.getAttribute("data-pe-flare-gallery");
			var tID;
			if (linkGallery && linkID >= 0) {
				if (!galleries[linkGallery]) {
					return false;
				}
				tID = galleries[linkGallery][linkID];
			} else {
				tID = parseInt(el.getAttribute("data-pe-target-id"),10);
			}
			if (tID >= 0) {
				open();
				process(tID);
			}
			return false;
		}
		
		function removeRenderer(id) {
			var found = $.inArray(id,rendererList);
			if (found !== false) {
				rendererList.splice(found,1); 
			}
			renderers[id] = undefined;
			delete renderers[id];
		}

		
		function signal(type,id) {
			switch (type) {
			case "loaded":
				loaded++;
				if (loadQueue.length === loaded && overlayActive) {
					render();
				}
				break;
			case "destroy":
				removeRenderer(id);
				break;
			case "locked":
				locked++;
				break;
			case "unlocked":
				locked--;
				break;
			}
		}

		
		function show(id) {
			var renderer = renderers[id];
			var output = renderer.resize(w,h).render();
						
			if (renderer.isGallery) {
				content.append(output);				
			} else {
				output.css("left",offset[direction].from);
				content.append(output);
				if (useTransitions) {
					output.fadeTo(0,1).css("left",offset[direction].to);					
				} else {
					output.css("opacity",0).animate({"left":offset[direction].to,"opacity":1},1000);
				}
			}
			
			if ($.inArray(renderer,displayList) < 0) {
				displayList.push(renderer);				
			}
			
			if (videoResource && !currentGallery) {
				videoIcon.removeClass("peFlareLightboxActive");
				createVideo();
			} else {
				videoIcon[videoResource ? "addClass":"removeClass"]("peFlareLightboxActive");				
			}
			
			if (conf.captions) {
				addCaption(items[currentID].title,items[currentID].description);
			}
			
			
			if (currentGallery && conf.delay > 0) {
				clearTimeout(slideshowTimer);
				slideshowTimer = setTimeout(slideshowNext,conf.delay*1000);
			}
			
		}
		
		function slideshowNext() {
			clearTimeout(slideshowTimer);
			if (locked || videoOverlay.hasClass("peFlareLightboxActive")) {
				slideshowTimer = setTimeout(slideshowNext,500);
			} else {
				next();
			}
		}
		
		function addCaption(title,description) {
			oldCaptions = captionsOverlay.find("> div");
			
			if (useTransitionEnd) {
				oldCaptions.removeClass("peFlareLightboxActive");
			} else {
				oldCaptions.fadeTo(300,0);
			}
			
			if (title || description) {
				title = title ? "<h3>%0</h3>".format(title) : "";
				description = description ? "<p>%0</p>".format(description) : "";				
				captionsOverlay.append('<div><div>%0%1</div></div>'.format(title,description));

			}
			resizeCaptions();
			setTimeout(fadeInCaption,500);

		}
		
		function fadeInCaption() {
			if (oldCaptions) {
				oldCaptions.detach();
				oldCaptions = false;
			}
			
			if (useTransitionEnd) {
				captionsOverlay.find("> div").addClass("peFlareLightboxActive");
			} else {
				captionsOverlay.find("> div").stop().fadeTo(0,0).fadeTo(500,1);
			}
		}

		
		function clearDisplayList() {
			if (!needDisplayListClear) {
				return;
			}
			needDisplayListClear = false;
			var r,el;
			while ((r = displayList.shift())) {
				if (useTransitionEnd) {
					r.render().fadeTo(0,0).css("left",-offset[direction].from).one(useTransitionEnd,r.destroy);					
				} else {
					r.render().css("opacity",1).animate({"left":-offset[direction].from,"opacity":0},1000,null,r.destroy);
				}
				//r.destroy();
			}
			
		}

		
		function render() {
			hideSpinner();
						
			if (rendered) {
				return;
			}
			rendered = true;
			
			var id;
			
			clearDisplayList();
			while ((id = loadQueue.shift()) !== undefined) {
				show(id);
			}
		}
		
		function addItem(item) {
			var gallery = item.gallery || false;
			var id = item.id !== undefined ? item.id : items.length;
			if (gallery) {
				if (galleries[gallery]) {
					galleries[gallery].push(id);
				} else {
					galleries[gallery]= [id];
				}
			}
			items.push(item);
			
		}

		
		function add(target) {
			var id,link = target.attr("href");
			if (link.charAt(0) == "#") {
				link = link.substring(1);
				var gallery = link.substring(0,link.lastIndexOf("-"));
				if (gallery) {
					id  = link.substring(link.lastIndexOf("-")+1);	
				} else {
					gallery = link;
					id = 0;
				}
				if (gallery) {
					target
						.attr("data-pe-flare-id",id)
						.attr("data-pe-flare-gallery",gallery)
						.bind("click",click);
				}
				return;
			}
			id = targets.length;
			var resource = target.attr("href");
			var plugin = target.attr("data-flare-plugin") || "default";
			
			target.attr("data-pe-target-id",targets.length).bind("click",click);
			
			
			var videoInfo;
			videoInfo = $.pixelonetry.videoplayer.getInfo(resource,target.attr("data-flare-videoformats"),target.attr("data-flare-videoposter"));
			
			if (videoInfo.video) {
				resource = videoInfo.videoPoster;
			} else {
				videoInfo = $.pixelonetry.videoplayer.getInfo(target.attr("data-flare-video"),target.attr("data-flare-videoformats"));				
			}			
			
			var title = target.attr(conf.titleAttr) || "";
			var description = target.attr(conf.descriptionAttr);
			
			
			if (!description) {
				var el = target.find(conf.descriptionElement);
				if (el.length > 0) {
					description = el.html();
					el.empty().detach();
				} else {
					description = "";
				}
			}
						
			var item = {
					id: id,
					plugin: plugin,
					resource: resource || "",
					gallery: target.attr("data-flare-gallery") || false,
					bw: target.attr("data-flare-bw"),
					thumb: target.attr("data-flare-thumb"),
					thumbover: target.attr("data-flare-thumb-over") != "disabled",
					scale: target.attr("data-flare-scale") || "fit",
					title: title,
					description: description,
					target: target
				};
			
			if((title+description).match(/<a/)) {
				item.thumbover = false;
			}

			
			if (videoInfo.video) {
				$.extend(item,videoInfo);
				item.videoWidth = parseInt(target.attr("data-flare-videowidth"),10) || conf.videoWidth;
			}
			
			targets.push(target);
			addItem(item);
		}
		
		function addToBuffer(el) {
			hiddenBuffer.append(el);
		}
		
		$.extend(this, {
			init:init,
			add:add,
			show:show,
			signal:signal,
			register:register,
			addToBuffer:addToBuffer
			// plublic API
			}
		);
		
		
	}
	
	var lb = $.pixelonetry.lightbox = new Lightbox();
	
	
	function PeFlareLightbox(target, conf) {
		
		// init function
		function start() {
			lb.init(conf);
			lb.add(target);
		}
		
		$.extend(this, {
			// plublic API
			destroy: function() {
				target.data("peFlareLightbox", null);
				target = undefined;
			}
		});
		
		// initialize
		start();
	}
		
	// jQuery plugin implementation
	$.fn.peFlareLightbox = function(conf) {
		// return existing instance	
		var api = this.data("peFlareLightbox");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peFlareLightbox.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeFlareLightbox(el, conf);
			el.data("peFlareLightbox", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));

  /* ==============================================
   Pixelonetry flare-simplethumb 
  =============================================== */

  /* ==============================================
   Pixelonetry flare-gallery (Lightbox Render gallery)
  =============================================== */

  /* ==============================================
   Pixelonetry flare (Lightbox Render Image)
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelonetry,Spinner */
	
	var lb;
	
	if (!$.pixelonetry || !(lb = $.pixelonetry.lightbox)) {
		return;
	}
	
	function Render(id,w,h) {
		
		var img;
		var iw,ih;
		var loading = false;
		var output = false;
		var conf;
		
		function load(el) {
			conf = el;
			lb.signal("locked",id);
			preload(el);
			return this;
		}
		
		function unlock() {
			lb.signal("unlocked",id);
		}

		function resize(nw,nh) {
			w = nw;
			h = nh;
			if (img) {
				var offset = 0;
				if (conf.scale == "fit") {
					offset = 40;
				}
				
				var scaler = $.pixelonetry.Geom.getScaler(conf.scale,"center","center",w-offset,h-offset,iw,ih);
				img.transform(
					scaler.ratio,
                    parseInt(scaler.offset.w,10)+offset/2,
					parseInt(scaler.offset.h,10)+offset/2,
					iw,
                    ih,
                    true,
					$.pixelonetry.browser.android && $.pixelonetry.browser.android < 3 
				);
				
			}
			return this;
		}
		
		function loaded() {
			iw = img[0].naturalWidth || img[0].width || img.width();
			ih = img[0].naturalHeight || img[0].height || img.height();
			lb.signal("loaded",id);
			setTimeout(unlock,500);

		}
		
		function render() {
			if (!output) {
				output = $('<div class="peFlareLightboxRenderImage" />').append(img.addClass(conf.scale));
				img.wrap("<div/>");				
			}
			return output;
		}

		
		function preload(el) {
			loading = true;
			img = $('<img class="singleImage" src="%0"/>'.format(el.resource));
			lb.addToBuffer(img);
			$.pixelonetry.preloader.load(img,loaded);
		}
		
		function destroy() {
			img = undefined;
			if (output) {
				output.detach();
				output = undefined;				
			}
			lb.signal("destroy",id);
		}


		$.extend(this, {
			// plublic API
			load: load,
			preload: preload,
			resize: resize,
			render: render,
			isGallery: false,
			destroy: destroy
		});
	}
	
	lb.register(Render,"default");
	
}(jQuery));
   /* ==============================================
   Pixelonetry volo
  =============================================== */
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */
	/*global jQuery,setTimeout,setInterval,clearInterval,clearTimeout,WebKitCSSMatrix,pixelonetry */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	$.pixelonetry.peVolo = {	
		conf: {
			api: false,
			count: 1,
			transition: 500
		} 
	};
	
	$.extend($.easing,{
		easeOutQuad: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
	});
	
	var ua = navigator.userAgent.toLowerCase();
	var iDev = ua.match(/(iphone|ipod|ipad)/) !== null;
	var android = !iDev && ua.match(/android ([^;]+)/);
	if (android) {
		android = android[1].split(/\./);
		android = parseFloat(android.shift() + "." + android.join(""));
	} else {
		android = false;
	}
	var mobile = (iDev || android || ua.match(/(android|blackberry|webOS|opera mobi)/) !== null);
	
	var style = document.createElement("div").style;
	var prefix,prefixes = ["O","ms","Webkit","Moz"];
	var test, loop;
	var transform = false, transitionDuration = false, use3d = false;
	
	for (var i=0; i<prefixes.length;i++) {
		test = prefixes[i]+"Transform";
		if (test in style) {
			transform = test;
			prefix = prefixes[i];
			continue;
		}
	}
	
	if (transform) {
		use3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
		test = prefix+"Transition";
		transitionDuration = (test in style) ? test : false;
	}
	
	if (!transitionDuration) {
		loop = window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			function (callback) {
				setTimeout(callback,25);
			};		
	}
	
	function PeVolo(target, conf) {
		var w;
		var slides = [];
		var max;
		var wrapper;
		var current = 0;
		var from = 0;
		var to = 0;
		var begin = 0;
		var scroller;
		var isScrolling = false;
		var touchX,touchY,touchAmountX,touchAmountY,touchScrollX;
		var currentPos = 0;
		var delay = 0;
		var pausedFrom = 0;
		var mouseOver = false;
		var timer;
		var minH = 1;
		var maxH = Number.MAX_VALUE;
		var rH = "auto";
		var inited = false;
		var showAtOnce = conf.count;
		var slideWidth;
		var ptarget;
		
		// init function
		function start() {
			inited = true;
			
			target.addClass("peVolo peNeedResize");
			
			if (mobile) {
				target.addClass("peVoloMobile");
			}
			
			if (target.find("> div.peWrap:eq(0)").length === 0) {
				// no wrapper, add one
				target.wrapInner('<div class="peWrap"></div>');
			}
			
			var tokens = (target.attr("data-height") || "").split(/,| /);
			
			if (tokens[0]) {
				minH = parseInt(tokens[0],10);
			}
			
			if (tokens[1]) {
				rH = $.inArray(tokens[1],["auto","container"]) >= 0 ? tokens[1] : parseFloat(tokens[1],10);
			} 
			
			if (tokens[2]) {
				maxH = parseInt(tokens[2],10);
			}
			
			if (rH === "container") {
				ptarget = target.closest(".pe-full-page");
				ptarget = ptarget.length > 0 ? ptarget : target.parent();
				target.height(ptarget.height());
			} else if (rH === 0) {
				if (minH > 1) {
					target.height(minH);
				}
			} else if (rH === "auto") {
				var firstImg = target.find("img").not(".peCaption img").eq(0);
				if (firstImg.length > 0) {
					var iw = firstImg[0].naturalWidth || firstImg.attr("width") || firstImg.width();
					var ih = firstImg[0].naturalHeight || firstImg.attr("height") || firstImg.height();					
					rH = (iw / ih)*showAtOnce;
				} else {
					rH = 0;
				}
			}
			
			slideWidth = target.attr("data-slidewidth");
			if (slideWidth) {
				conf.slideWidth = parseInt(slideWidth,10);
			}
			
			wrapper = target.find("> div:eq(0)");
			var allSlides = wrapper.find("> div").each(addSlide);
			scroller = wrapper[0].style;
			max = slides.length;
			resize();
			wrapper.css("visibility","visible");
			allSlides.css("visibility","visible").show();
			
			if (!target.hasClass("pe-no-resize") && target.closest(".pe-no-resize").length === 0) {
				$(window).bind("resize",windowHandler);
			}
			
			target.bind("resize",windowHandler);
			
			/*
			if (target.parent().hasClass("scalable")) {
				target.parent().bind("resize",windowHandler);
			}
			*/
			
			target.bind("touchstart touchmove touchend",touchHandler);
			if (target.attr("data-autopause") !== "disabled") {
				target.bind("mouseenter mouseleave",mouseHandler);
			}
			
			if (transitionDuration) {
				target.bind(prefix.toLowerCase()+"TransitionEnd transitionend",setTimer);
			}
			setTimer();
			setTimeout(fireReady,100);
			//target.trigger("resize.pixelonetry");
			return true;

		}
		
		function fireReady() {
			target.trigger("ready.pixelonetry",{"slides":slides.length,markup:slides});
			target.triggerHandler("change.pixelonetry",{"slideIdx":1});
			$(window).trigger("pe-lazyloading-refresh");
		}

		
		function startTimer() {
			if (!inited || delay === 0) {
				return;
			}
			var pause = pausedFrom > 0 ? $.now() - pausedFrom : 0;
			pausedFrom = 0;
			pause = delay - pause;
			if (pause > 0) {
				stopTimer();
				timer = setTimeout(next,pause);				
			} else {
				next();
			}
		}
		
		function pauseTimer() {
			if (!inited) {
				return;
			}
			pausedFrom = $.now();
			stopTimer();
		}
		
		function stopTimer() {
			clearTimeout(timer);
		}
		
		function addSlide(idx,el) {
			slides.push($(el));
		}

		function resize(size) {
			if (!inited) {
				return;
			}
			size = typeof size === "undefined" ? target.width() : size;
			
			if (size === w && rH != "container") {
				return;
			}
			
			w = size;
			
			var slide,img,ratio;
			
			if (slideWidth > 0) {
				showAtOnce = Math.floor(w/slideWidth);
				showAtOnce = Math.max(1,showAtOnce);
			}
			
			if (showAtOnce > 1) {
				size = Math.floor(w/showAtOnce)*showAtOnce;
				target.css("margin-right",(w-size));
				w = size;
			}
			
			target.attr("data-show-navigation",showAtOnce < slides.length ? "yes" : "no");
			target.trigger("pe-carousel-navigation");
			
			var newH = false;
			
			if (rH > 0) {
				newH = (w/rH)/showAtOnce;
				newH = Math.max(minH,Math.min(maxH,newH));
			}
			
			if (rH === "container") {
				newH = ptarget.height();
				newH = Math.max(minH,Math.min(maxH,newH));
			}
			
			var scaler,iw,ih;
			
			for (var i = 0; i < max; i++) {
				slide = slides[i];
				slide.width(w/showAtOnce);
				if (newH) {
					// test this
					slide.height(newH);
				}
				if (slide.hasClass("scale")) {
					img = slide.find("img").not(".peCaption img").eq(0);
					if (img.length > 0) {
						img.css("max-width","none");
						if (true) {
							iw = img[0].naturalWidth || img.attr("width");
							ih = img[0].naturalHeight || img.attr("height");
							scaler = $.pixelonetry.Geom.getScaler("fillmax","center","top",w,newH,iw,ih);
							img.transform(scaler.ratio,scaler.offset.w,scaler.offset.h,iw,ih,true);
							//ratio = (w/img[0].naturalWidth)/showAtOnce;
							//console.log(scaler);
							//img[0].style[transform] = "scale("+ratio+","+ratio+")";
							//img.transform(0.5,0,0,w,h)
						} else {
							img.width(w/showAtOnce);
						}
					}
				}
			}
			wrapper.width(w*max/showAtOnce);
			
			if (newH) {
				target.height(newH);
				// test this
				wrapper.height(newH);
			}
			
			if (!isScrolling) {
				scroll(currentPos,0);
			}
			
			target.trigger("resize.pixelonetry");
		}
		
		function next() {
			if (!inited || max <= showAtOnce) {
				return;
			}
			current = (current + 1) % (max-showAtOnce+1);

			jumpTo(current);
		}
		
		function prev() {
			if (!inited || max <= showAtOnce) {
				return;
			}
			current--;
			if (current < 0) {
				current += (max-showAtOnce+1);
			}
			jumpTo(current);
		}

		
		function jumpTo(idx) {
			if (!inited) {
				return;
			}
			
			target.find(".peActiveWidget").trigger("disable.pixelonetry");
			
			current = idx;
			from = to;
			to = 100*(idx/max);
			begin = $.now();
			touchAmountX = 0;
			isScrolling = true;
			target.triggerHandler("change.pixelonetry",{"slideIdx":idx+1});
			if (transitionDuration) {
				currentPos = to;
				scroll(to,conf.transition);
			} else {
				tick();				
			}
		}
		
		function scroll(pos,duration) {
			pos =-pos;
			if (transform) {
				if (transitionDuration && typeof duration !== "undefined") {
					scroller[transitionDuration] = duration+"ms";
				}
				scroller[transform] = use3d ? "translate3d("+pos+"%,0,0)" : "translate("+pos+"%,0)";
			} else {
				wrapper.css("margin-left",parseInt(pos*(w*max/showAtOnce)/100,10));
			}
		}
		
		function tick() {
			if (touchAmountX !== 0) {
				return;
			}
			var elapsed = Math.min(conf.transition,$.now()-begin);
			var pos = $.easing.easeOutQuad(0,elapsed,from,to-from,conf.transition);
			currentPos = pos;
			scroll(pos,0);
			setTimer();
			if (elapsed < conf.transition) {
				loop(tick);
			} else {
				setTimer();
			}
		}
		
		function setTimer() {
			isScrolling = false;
			var sdelay = parseInt(slides[current].attr("data-delay"),10)*1000;
			if (sdelay > 0) {
				delay  = sdelay;
				if (mouseOver) {
					pauseTimer();
				} else {
					startTimer();					
				}
				
			}
		}

		
		function touchHandler(e) {
			var type = e.type;
			var te = e.originalEvent;
			
			
			switch (type) {
			case "touchstart":
				if(te.touches.length > 1 || te.scale && te.scale !== 1) {
					return;
				}
				touchX = te.touches[0].pageX;
				touchY = te.touches[0].pageY;
				touchAmountX = 0;
				break;
			case "touchmove":
				if(te.touches.length > 1 || te.scale && te.scale !== 1) {
					return;
				}
				stopTimer();
				touchAmountX = (te.touches[0].pageX - touchX);
				touchAmountY = Math.abs(te.touches[0].pageY - touchY);
				touchScrollX = currentPos-100*touchAmountX/(w*max);
				if (Math.abs(touchAmountX) > 2 /*|| Math.abs(touchAmountY) < 2*/) {
					e.preventDefault();
					e.stopPropagation();
				}
				scroll(touchScrollX,0);
				break;
			case "touchend":
				
				if (touchAmountX === 0) {
					return;
				}
				
				to = touchScrollX;
				
				var jumped = false;
				
				if (touchAmountX > 10 && current > 0) {
					jumped = true;
					prev();
				}
				
				if (touchAmountX < -10 && current < (max-showAtOnce)) {
					jumped = true;
					next();
				} 
				
				if (!jumped) {
					jumpTo(current);
				}
				
				touchAmountX = 0;
				
				break;
			}
		}

		function mouseHandler(e) {
			if (e.type === "mouseenter") {
				mouseOver = true;
				pauseTimer();
			} else {
				mouseOver = false;
				startTimer();
			}
		}
		
		function windowHandler(e) {
			resize();
		}

		
		function bind() {
			return target.bind.apply(target,arguments);
		}
		
		function getSlide(idx) {
			return slides[idx];
		}
		
		$.extend(this, {
			// plublic API
			bind: bind,
			show: function (idx) {
				jumpTo(idx-1);
			},
			next: next,
			prev: prev,
			pause: pauseTimer,
			resume: startTimer,
			resize: resize,
			getSlide: getSlide,
			current: function () {
				return current;
			},
			currentPos: function () {
				return currentPos;
			},
			destroy: function() {
				$(window).unbind("resize",windowHandler);
				
				target
					.unbind("touchstart touchmove touchend",touchHandler)
					.unbind("mouseenter mouseleave",mouseHandler)
					.unbind(prefix.toLowerCase()+"TransitionEnd transitionend",setTimer)
					.data("peVolo", null);
				
				target = undefined;
			}
		});
		
		// initialize
		$.pixelonetry.preloader.load(target,start);
	}
	
	// jQuery plugin implementation
	$.fn.peVolo = function(conf) {
		
		// return existing instance	
		var api = this.data("peVolo");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peVolo.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeVolo(el, conf);
			el.data("peVolo", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));
   /* ==============================================
   Pixelonetry volo-skin (simpleskin)
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelonetry */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	$.pixelonetry.peVoloSimpleSkin = {	
		conf: {
			api: false
		} 
	};
	
	var ieOld = $.browser.msie && $.browser.version < 9;
	
	function PeVoloSimpleSkin(target, conf) {
		var slider;
		var slides;
		var prevC,nextC,bulletsC;
		var w,h;
		
		function resizeControls() {
			if (!w || !h || w<20 || h<20) {
				setTimeout(resize,100);
				return;
			}
			var offset = 0;
			if (nextC) {
				switch (target.attr("data-controls-arrows")) {
				case "edges":
					nextC.css({top: (h-nextC.height())/2,left: w-nextC.width()-6}).show();
					prevC.css({top: (h-prevC.height())/2,left: 6}).show();
					break;
				case "edges-full":
					nextC.css({top: 0,left: w-nextC.width()}).show();
					prevC.css({top: 0,left: 0}).show();
					nextC.height(h);
					prevC.height(h);
					// ie8
					if (ieOld) {
						prevC.find("a").height(h);
						nextC.find("a").height(h);
					}
					break;
				case "edges-buttons":
					var cw = nextC.width();
					var ch = nextC.height();
					nextC.addClass("pe-edges-buttons").css("top",(h-ch) >> 1).show();
					prevC.addClass("pe-edges-buttons").css("top",(h-ch) >> 1).show();
					
					// ie8
					if (ieOld) {
						//prevC.find("a").height(ch).width(cw);
						//nextC.find("a").height(ch).width(cw);
					}
					break;
				default:
					offset = w-nextC.width()-12;
					nextC.css({top: h-nextC.height()-8,left: offset}).show();
					offset -= (prevC.width()-2);
					prevC.css({top: h-prevC.height()-8,left: offset}).show();					
				}
				
			}
			
			if (bulletsC) {
				bulletsC.css({top: h-bulletsC.height()-12,left: 9}).show();
			}
		}
		
		function prev() {
			slider.prev();
			return false;
		}
		
		function next() {
			slider.next();
			return false;
		}
		
		function jump(el) {
			var idx = el.currentTarget.getAttribute("data-idx");
			slider.show(parseInt(idx,10)+1);
			return false;
		}
		
		function select(idx) {
			if (bulletsC) {
				bulletsC.find("a").removeClass("selected").eq(idx).addClass("selected");
			}			
		}

		
		function change(e,data) {
			select(data.slideIdx-1);
		}


		
		function buildUI() {
			if (target.attr("data-controls-arrows") != "disabled") {
				prevC = $(
					'<div class="peVoloPrev"><a href="#">%0</a></div>'
						.format(target.attr("data-icon-font")  == "enabled" ? '<i class="icon-left-open"></i>' : '')
				).find("a").click(prev).end().hide();
				
				nextC = $(
					'<div class="peVoloNext"><a href="#">%0</a></div>'
						.format(target.attr("data-icon-font") == "enabled" ? '<i class="icon-right-open"></i>' : '')
				).find("a").click(next).end().hide();
			}
			
			if (target.attr("data-controls-bullets") != "disabled") {
				bulletsC = $('<div class="peVoloBullets"></div>').hide();
				for (var i=0;i<slides;i++) {
					bulletsC.append('<a href="#" data-idx="'+i+'"></a>');
				}
				bulletsC.delegate("a","click",jump);
				select(0);	
			}
			
			if (prevC) target.prepend(prevC).prepend(nextC);
			if (bulletsC) target.prepend(bulletsC);
			resizeControls();
		}

		
		function ready(e,data) {
			slides = data.slides;
			if (slides > 1) {
				buildUI();
			}
		}
		
		function doResize() {
			w = target.width();
			h = target.height();
			resizeControls();
		}

		
		function resize() {
			doResize();
			// sometimes it's needed
			setTimeout(doResize,50);
		}

		
		
		// init function
		function start() {
			slider = target[target.attr("data-plugin") || "peVolo"]({api:true});
			
			var captions = target.peVoloCaptions({
					api:true,
					slider:slider,
					origH:parseInt(target.attr("data-orig-height"),10),
					origW:parseInt(target.attr("data-orig-width"),10),
					orig:target.attr("data-orig") 
				});
			
			slider.bind("ready.pixelonetry",ready);
			slider.bind("resize.pixelonetry",resize);
			slider.bind("change.pixelonetry",change);
		}
		
		function getSlider() {
			if (slider) {
				return slider;
			}
			return false;
		}

		
		$.extend(this, {
			// plublic API
			getSlider: getSlider,
			destroy: function() {
				target.data("peVoloSimpleSkin", null);
				target = undefined;
			}
		});
		
		// initial0ize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.peVoloSimpleSkin = function(conf) {
		
		// return existing instance	
		var api = this.data("peVoloSimpleSkin");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peVoloSimpleSkin.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeVoloSimpleSkin(el, conf);
			el.data("peVoloSimpleSkin", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));
   /* ==============================================
   Pixelonetry volo-captions
  =============================================== */
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */
	/*global jQuery,setTimeout,setInterval,clearInterval,clearTimeout,WebKitCSSMatrix,pixelonetry */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	$.pixelonetry.peVoloCaptions = {	
		conf: {
			slider: false,
			origW: false,
			origH: false,
			orig: "default",
			api: false
		} 
	};
	
	
	// 0-480, 481-767, 768-980, 980 - anything
	var cssT = $.support.csstransitions;
	var cssA = $.support.cssanimation;
	var ieOld = $.browser.msie && $.browser.version < 9;
	var jwin = $(window);
		
	var properties = "";
	
	if (cssT) {
		//properties = "opacity, %0transform".format($.support.csstransitionsPrefix);
		properties = "opacity";
	}
		
	function PeVoloCaptions(target, conf) {
		var w,h,cw,ch;
		var slider;
		var slides;
		var active = {};
		var current = -1;
		var scaled = false;
		//var captionsLayer;
		
		function resizeCaption(c) {
			if (!w || !h || w<20 || h<20) {
				setTimeout(resize,100);
				return;
			}
			c = $(c);
			
			var scaler;
			
			if (c.find(".peCaptionLayer").length > 0) {
				c.css({
					"margin": 0,
					"padding": 0,
					"background": "none"
				});
				var r = 1,x = 0, y = 0;
				
				cw = parseInt(c.attr("data-orig-width"),10) || conf.origW;
				ch = parseInt(c.attr("data-orig-height"),10) || conf.origH;
				
				if (cw && ch) {
					scaler = $.pixelonetry.Geom.getScaler("fit","center","center",w,h,cw,ch);
					r = scaler.ratio;
					x = scaler.offset.w;
					y = scaler.offset.h;
				} else {
					r = h/conf.origH;
				}
				
				if (r != 1 || x !== 0 || y !== 0 || scaled) {
					c.transform(r,x,y,null,null,true);
					scaled = true;
				}
				
			} else {
				var align = (c.attr("data-align") || "bottom,left").split(",");
				scaler = $.pixelonetry.Geom.getScaler("none",align[1],align[0],w,h,c.outerWidth(),c.outerHeight());
				var co = (c.attr("data-offset") || "-20,40").split(",");
				c.css({
					"margin-top": scaler.offset.h+parseInt(co[0],10),
					"margin-left": scaler.offset.w+parseInt(co[1],10)
				});	
			}			
		}

		
		function resizeCaptions() {
			var i,j;
			for (i in active) {
				if (typeof i == "string" && active[i]) {
					for (j = 0; j<active[i].length;j++) {
						resizeCaption(active[i][j]);
					}
				}
			}
		}
		
		function removeAnimationClasses() {
			var layer = $(this);
			layer.removeClass(layer.data("transition-classes"));
		}
		
		function resize() {
			w = target.width();
			h = target.height();
			resizeCaptions();
		}
		
		/*
		function remove(el,idx) {
			slides[idx].append(active[idx]);
			delete active[idx];
		}
		*/
		
		function fadeIn(el) {
			var jel = $(el);
			
			var duration = parseFloat(jel.attr("data-duration") || 0.5);
			var delay = parseFloat(jel.attr("data-delay") || 0);
			var layers = jel.find(".peCaptionLayer");
			var i,layer,x,y,tClass,cmd;
			
			if (layers.length > 0) {
				
				jel.addClass("pe-has-layers");
								
				for (i=0;i<layers.length;i++) {
					layer = layers.eq(i);
					
					duration = parseFloat(layer.attr("data-duration"),10) || 1;
					delay = parseFloat(layer.attr("data-delay"),10) || 0;
					
					
					if ((cmd = layer.attr("data-command"))) {
						if (typeof slider[cmd] === "function") {
							if (delay) {
								setTimeout(function () {
									slider[cmd]();
								},delay*1000);
							} else {
								slider[cmd]();
							}
						}
						//continue;
					}
										
					x = parseInt(layer.attr("data-x"),10) || 0;
					y = parseInt(layer.attr("data-y"),10) || 0;
					
					//conf.orig = "center";
					
					if (conf.orig === "center" || layer.attr("data-origin") === "center") {
						
						if (h <= 400 && y < 0) {
							//alert("here");
							//y = 0;
						}
						
						x += (cw - layer.width()) >> 1; 
						y += (ch - layer.height()) >> 1;
					}
					
					layer.css({
						"left": x+"px",
						"top": y+"px"
					});
					
					if (cssA) {
						layer[0].style[cssA+"Delay"] = delay + "s";
						layer[0].style[cssA+"Duration"] = duration + "s";
						tClass = "animated ";
						tClass += layer.attr("data-transition") || "peZoom";
						// workaround for some chrome version which reach 100% cpu usage in a background tab
						// disabled for now, in case they fix
						//layer.one("webkitAnimationEnd",removeAnimationClasses);
						layer.addClass(tClass).data("transition-classes",tClass);
					} else {
						//layer.stop().css("opacity",0).delay(delay*1000).animate({opacity:ieOld ? 1 : 1},Math.min(duration,1)*1000);
						layer.stop().css("opacity",0).delay(delay*1000).animate({opacity:1},ieOld ? 0 : Math.min(duration,1)*1000);
					}
					
				}
				
				jel.css("opacity",1);
				
			} else {
				if (cssT) {
					el.style[cssT+"Property"] = properties;
					el.style[cssT+"Duration"] = duration + "s";
					el.style[cssT+"Delay"] = delay + "s";
					jel.css("opacity",1);
					jel.transform(1,0,0,w,h);
				} else {
					jel.stop().delay(delay*1000).animate({opacity:1,left:0,top:0},Math.min(duration,1)*1000);
				}
			}
			jel.find("img").addClass("pe-lazyloading-forceload");
			jwin.triggerHandler("pe-lazyloading-refresh");
		}
		
		function fadeOut(el) {
			var jel = $(el);
			if (cssT) {
				el.style[cssT+"Property"] = "opacity";
				el.style[cssT+"Delay"] = "0s";
				el.style[cssT+"Duration"] = "0.5s";	
				jel.css("opacity",0);	
			} else {
				jel.stop().animate({opacity:0},500);
			}
			//console.log(el);
		}
		
		function killCaption(i) {
			if (active[i].hasClass('pe-caption-persistent')) {
				return;
			}
			var j, layers;
			if (cssT) {
				layers = active[i].find("> div.peCaptionLayer");
				for (j=0;j<layers.length;j++) {
					layers.eq(j).removeClass(layers.eq(j).data("transition-classes"));
				}		
			}
			slides[i].append(active[i]);
			active[i] = false;
		}
		
		function clean(force) {
			var i,j,layers;
			for (i in active) {
				if (typeof i == "string" && i != current && active[i]) {
					killCaption(i);
				}
			}
		}
		
		function setTransition(el) {
			el = $(el);
			el.fadeTo(0,0);
			var left = 0, top = 0;
			switch (el.attr("data-transition")) {
			case "flyRight":
				left = 100;
				break;
			case "flyLeft":
				left = -100;
				break;
			case "flyTop":
				top = -100;
				break;
			case "flyBottom":
				top = 100;
				break;
			}
			if (cssT) {
				el.transform(1,left,top,w,h);
			} else {
				el.css({left:left,top:top});
			}

		}

		
		function change(e,data) {
			var i,j,idx = data.slideIdx-1;
			
			if (idx === current) {
				return;
			}
			
			// detect overlap: current slide was being remove when made active again (caused by fast prev/next)
			if (active[idx]) {
				current = -1;
				// destroy anything with no mercy
				clean(true);
			} 
			
			var c = slides[idx].find(".peCaption");
			
			for (i = 0; i<c.length;i++) {
				setTransition(c[i]);
			}
			
			c.fadeTo(0,0);
			target.prepend(c);
						
			current = idx;
			var persistent = false;
			
			if (!(active[idx] && active[idx].hasClass('pe-caption-persistent'))) {
				active[idx] = c;
			} else {
				persistent = true;
			}
			
			resize();
			
			for (i in active) {
				if (typeof i == "string" && i != idx && active[i]) {
					if (active[i].hasClass('pe-caption-persistent')) {
						continue;
					}
					for (j = 0; j<active[i].length;j++) {
						fadeOut(active[i][j]);
					}
				}
			}
			
			setTimeout(clean,500);
			
			for (i = 0; i<c.length;i++) {
				fadeIn(c[i]);
			}	
			
			if (!persistent) {
				active[idx] = c;
			}
		}
		
		function ready(e,data) {
			slides = data.markup;
		}
		
		// init function
		function start() {
			if (conf.slider) {
				link(conf.slider);
			}
		}
		
		function link(s) {
			slider = s;
			slider.bind("ready.pixelonetry",ready);
			slider.bind("resize.pixelonetry",resize);
			slider.bind("change.pixelonetry",change);
		}
		
		$.extend(this, {
			// plublic API
			link: link,
			destroy: function() {
				target.data("peVoloCaptions", null);
				target = undefined;
			}
		});
		
		// initialize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.peVoloCaptions = function(conf) {
		
		// return existing instance	
		var api = this.data("peVoloCaptions");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peVoloCaptions.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeVoloCaptions(el, conf);
			el.data("peVoloCaptions", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));

   /* ==============================================
   Pixelonetry Vario
  =============================================== */

   /* ==============================================
   Pixelonetry vista
  =============================================== */
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */
	/*global jQuery,setTimeout,setInterval,clearInterval,clearTimeout,WebKitCSSMatrix,pixelonetry */
	
	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};
	
	function CSSAnimation(target) {
		var deferred = new $.Deferred();
		target.one($.support.cssanimationEnd,deferred.resolve);
		return deferred.promise();
	}
	
	$.pixelonetry.peVista = {	
		conf: {
			api: false,
			duration: 2000,
			speed: 10
		}
	};
	
	
	var mobile = $.pixelonetry.browser.mobile;
	var cssT = $.support.csstransitions;
	var cssA = $.support.cssanimation;
	var tEnd = $.support.csstransitionsEnd;
		
	function PeVista(target, conf) {
		var w,h;
		var slides = [];
		var max;
		var wrapper;
		var current = 0;
		var scroller;
		var currentPos = 0;
		var delay = 0;
		var pausedFrom = 0;
		var mouseOver = false;
		var timer;
		var minH = 1;
		var maxH = Number.MAX_VALUE;
		var rH = "auto";
		var inited = false;
		var allSlides;
		var slideWidth;
		var depth = 1;
		var fadeTransition = new $.Deferred();
		var ptarget;
		
		var pzEnabled = typeof window.peDisablePanZoom === "undefined" ? true : false;
		pzEnabled = pzEnabled && $.support.csstransforms;
			
		// init function
		function start() {
			inited = true;
			
			target.addClass("peVolo peNeedResize");
			
			if (mobile) {
				target.addClass("peVoloMobile");
			}
			
			if (target.find("> div.peWrap:eq(0)").length === 0) {
				// no wrapper, add one
				target.wrapInner('<div class="peWrap"></div>');
			}
			
			var tokens = (target.attr("data-height") || "").split(/,| /);
			
			if (tokens[0]) {
				minH = parseInt(tokens[0],10);
			}
			
			if (tokens[1]) {
				rH = $.inArray(tokens[1],["auto","container"]) >= 0 ? tokens[1] : parseFloat(tokens[1],10);
			} 
			
			if (tokens[2]) {
				maxH = parseInt(tokens[2],10);
				maxH = maxH === 0 ? 1024 : maxH;
			}
			
			if (rH === "container") {
				ptarget = target.closest(".pe-full-page");
				ptarget = ptarget.length > 0 ? ptarget : target.parent();
				target.height(ptarget.height());
			} else if (rH === 0) {
				if (minH > 1) {
					target.height(minH);
				}
			} else if (rH === "auto") {
				var firstImg = target.find("img").not(".peCaption img").eq(0);
				if (firstImg.length > 0) {
					var iw = firstImg[0].naturalWidth || firstImg.attr("width") || firstImg.width();
					var ih = firstImg[0].naturalHeight || firstImg.attr("height") || firstImg.height();					
					rH = (iw / ih);
				} else {
					rH = 0;
				}
			}
			
			slideWidth = target.attr("data-slidewidth");
			if (slideWidth) {
				conf.slideWidth = parseInt(slideWidth,10);
			}
			
			conf.duration = (parseInt(target.attr("data-fade"),10) || 2)*1000;
			conf.speed = (parseInt(target.attr("data-speed"),10) || 10);
			pzEnabled = pzEnabled && target.attr("data-transition") != "fade";
			
			
			wrapper = target.find("> div:eq(0)");
			
			allSlides = wrapper.find("> div").each(addSlide);
			var immediateStart = true;
			
			scroller = wrapper[0].style;
			max = slides.length;
			resize();
			wrapper.css("visibility","visible");
			
			allSlides.css("visibility","hidden").show().css("position","absolute").css("z-index",0);
			//allSlides.eq(0).css("visibility","visible").css("z-index",1);
			var firstSlide = allSlides.eq(0);
			
			if (pzEnabled) {
				firstSlide.find("img").not(".peCaption img").eq(0).css("max-width","none").pePanZoomImage({"duration":conf.speed});
			}
			
			firstSlide.css("visibility","visible").css("z-index",1);
			
			if (!target.hasClass("pe-no-resize") && target.closest(".pe-no-resize").length === 0) {
				$(window).bind("resize",windowHandler);
			}
			
			target.bind("resize",windowHandler);
			
			if (mobile) {
				target.bind("swipeleft swiperight",swipeHandler);
			} else if (target.attr("data-autopause") !== "disabled") {
				target.bind("mouseenter mouseleave",mouseHandler);
			}
			
			if (immediateStart) {
				setTimer();
				setTimeout(fireReady,100);
			}
			//target.trigger("resize.pixelonetry");
			return true;

		}
		
		function fireReady() {
			target.trigger("ready.pixelonetry",{"slides":slides.length,markup:slides});
			target.triggerHandler("change.pixelonetry",{"slideIdx":1});
		}

		
		function startTimer() {
			if (!inited || delay === 0) {
				return;
			}
			var pause = pausedFrom > 0 ? $.now() - pausedFrom : 0;
			pausedFrom = 0;
			pause = delay - pause;
			if (pause > 0) {
				stopTimer();
				timer = setTimeout(next,pause);				
			} else {
				next();
			}
		}
		
		function pauseTimer() {
			if (!inited) {
				return;
			}
			pausedFrom = $.now();
			stopTimer();
		}
		
		function stopTimer() {
			clearTimeout(timer);
		}
		
		function addSlide(idx,el) {
			slides.push($(el));
		}
		
		function scale(img,iw,ih,w,newH) {
			var scaler;
			img.css("max-width","none");
			if (true) {
				iw = iw || img[0].naturalWidth || img.attr("width");
				ih = ih || img[0].naturalHeight || img.attr("height");
				scaler = $.pixelonetry.Geom.getScaler("fillmax","center","top",w,newH,iw,ih);
				img.transform(scaler.ratio,scaler.offset.w,scaler.offset.h,iw,ih,true);
			} else {
				img.width(w);
			}
		}

		function resize(size) {
			
			if (!inited) {
				return;
			}
			size = typeof size === "undefined" ? target.width() : size;
			
			if (size === w && rH != "container") {
				return;
			}
			
			w = size;
			
			var slide,img,ratio;
			
			var newH = false;
			
			if (rH > 0) {
				newH = (w/rH);
				newH = Math.max(minH,Math.min(maxH,newH));
			}
			
			if (rH === "container") {
				newH = ptarget.height();
				newH = Math.max(minH,Math.min(maxH,newH));
			}
			
			var scaler,iw,ih,i,pzImage;
			
			for (i = 0; i < max; i++) {
				slide = slides[i];
				slide.width(w);
				if (newH) {
					// test this
					slide.height(newH);
				}
				
				img = slide.find("img").not(".peCaption img").eq(0);
				
				if (img.length > 0) {
					if (slide.hasClass("scale") && !pzEnabled) {
						scale(img,0,0,w,newH);
					}
				}
			}
			
			wrapper.width(w);
			
			if (newH) {
				h = newH;
				target.height(newH);
				// test this
				wrapper.height(newH);
			}
			
			if (pzEnabled) {
				img = allSlides.eq(current).find("img").not(".peCaption img").eq(0);
				if ((pzImage = img.data("pePanZoomImage"))) {
					pzImage.resize();
				}
			}
						
			target.trigger("resize.pixelonetry");
		}
		
		function next() {
			if (!inited || max <= 1) {
				return;
			}
			
			jumpTo((current + 1) % (max));
		}
		
		function prev() {
			if (!inited || max <= 1) {
				return;
			}
			var idx = (current-1);
			if (idx < 0) {
				idx += (max);
			}
			jumpTo(idx);
		}
		
		function fadeResolve() {
			fadeTransition.resolve();
		}
		
		function jumpTo(idx) {
			if (!inited) {
				return;
			}
			
			var prev = current;
			var prevImg = allSlides.eq(prev).find("img").not(".peCaption img").eq(0);
			var currImg = allSlides.eq(idx).find("img").not(".peCaption img").eq(0);
			current = idx;
			
			if (pzEnabled) {
				var pzImage = prevImg.data("pePanZoomImage");
				
				if (pzImage) { 
					//pzImage.stop();
				}
				
				pzImage = currImg.data("pePanZoomImage"); 
				
				if (pzImage) {
					pzImage.start();
				} else {
					currImg.css("max-width","none").pePanZoomImage({"duration":conf.speed});
				}
			}
			
			var active = allSlides.eq(idx);
			depth++;
			
			var style = active[0].style;
			fadeTransition.reject();
			fadeTransition = new $.Deferred();
			
			if (cssT) {				
				style[cssT] = "opacity "+0+"ms";
			}
			
			active.css("opacity",0).css("visibility","visible").css("z-index",depth);
			
			target.triggerHandler("change.pixelonetry",{"slideIdx":idx+1});
			
			if (cssT) {
				style[cssT] = "opacity "+conf.duration+"ms";
				active.css("opacity",1);
				active.one(tEnd,fadeResolve);
			} else {
				active.stop().animate({"opacity":1},conf.duration).promise().done(fadeResolve);
			}
			
			if (currImg.length === 0) {
				allSlides.eq(prev).stop().animate({"opacity":0},100);
			}
			
			$.when(fadeTransition).done(clean);
		}
		
		function clean() {
			allSlides.not(allSlides.eq(current)).css("z-index",0).css("visibility","hidden");
			allSlides.eq(current).css("z-index",1).css("visibility","visible");
			depth = 1;
			setTimer();
		}
		
		function setTimer() {
			var sdelay = parseInt(slides[current].attr("data-delay"),10)*1000;
			if (sdelay > 0) {
				delay  = sdelay;
				if (mouseOver) {
					pauseTimer();
				} else {
					startTimer();					
				}
				
			}
		}

		function swipeHandler(e) {
			if (e.type === "swipeleft") {
				prev();
			} else {
				next();
			}
		}
		
		function mouseHandler(e) {
			if (e.type === "mouseenter") {
				mouseOver = true;
				pauseTimer();
			} else {
				mouseOver = false;
				startTimer();
			}
		}
		
		function windowHandler(e) {
			resize();
		}

		
		function bind() {
			return target.bind.apply(target,arguments);
		}
		
		function getSlide(idx) {
			return slides[idx];
		}
		
		$.extend(this, {
			// plublic API
			bind: bind,
			show: function (idx) {
				jumpTo(idx-1);
			},
			next: next,
			prev: prev,
			pause: pauseTimer,
			resume: startTimer,
			resize: resize,
			getSlide: getSlide,
			current: function () {
				return current;
			},
			currentPos: function () {
				return currentPos;
			},
			destroy: function() {
				$(window).unbind("resize",windowHandler);
				
				target
					.unbind("swipeleft swiperight",swipeHandler)
					.unbind("mouseenter mouseleave",mouseHandler)
					//.unbind(prefix.toLowerCase()+"TransitionEnd transitionend",setTimer)
					.data("peVista", null);
				
				target = undefined;
			}
		});
		
		// initialize
		$.pixelonetry.preloader.load(target,start);
	}
	
	// jQuery plugin implementation
	$.fn.peVista = function(conf) {
		
		// return existing instance	
		var api = this.data("peVista");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelonetry.peVista.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeVista(el, conf);
			el.data("peVista", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));

(function ($) {

	$.pixelonetry = $.pixelonetry || {version: '1.0.0'};

	$.pixelonetry.pePanZoomImage = {	
		conf: { 
			zoom	: 'random',
			align	: 'random',
			pan		: 'random',
			duration: '10',
			paused	: false
		} 
	};
	
	var valign = ["top","bottom"];
	var halign = ["left","right"];
	
	function PePanZoomImage(t, conf) {

		/* private vars */

		var self = this;
		var target = t;

		var tw,th,w,h,ratioFrom,ratioTo,xFrom,xTo,yFrom,yTo,xPrev,yPrev,counter,duration = 500,normalized,repeat = 0;
		var rw,rh;
		var curR,curX,curY;
		var zoom,pan,align,pzoom = false,palign = false;
		var paused = false;
		var upscale = 1.3;
		
		
		// get a scaler object
		function computeValues() {
			
			var scaler;
			// deal with loop
			if (repeat > 0) {
				// not first run, save last scale ratio
				xFrom = xTo;
				yFrom = yTo;
				ratioFrom = ratioTo;
			} else {
				// get the scaler using conf options
				scaler = $.pixelonetry.Geom.getScaler(zoom == "out" ?  "fill" : "none",align.w,align.h,w,h,tw,th);
				xFrom = scaler.offset.w;
				yFrom = scaler.offset.h;
				ratioFrom = scaler.ratio;
			}
			
			scaler = $.pixelonetry.Geom.getScaler(zoom == "in" ?  "fill" : "none",pan.w,pan.h,w,h,tw,th);
			xTo = scaler.offset.w;
			yTo = scaler.offset.h;
			ratioTo = scaler.ratio;
			
			xPrev = 0;
			yPrev = 0;
			
			duration = parseFloat(normalized)*33;
			
			// reset counter
			counter = 0;
			
			// update runs count
			repeat++;
			
		}
		
		function randomSpot() {
			return valign[Math.round(Math.random())]+","+halign[Math.round(Math.random())];
		}
		
		function computeSettings() {
			
			if (pzoom) {
				zoom = pzoom;
				pzoom = false;
			} else {
				zoom = conf.zoom == "random" ? (Math.random() > 0.5 ? "out" : "in") : conf.zoom	;
			}
			
			if (palign) {
				align = palign;
				palign = false;
			} else {
				align = $.pixelonetry.Geom.splitProps(conf.align == "random" ? randomSpot() : conf.align);
			}
			
			pan = $.pixelonetry.Geom.splitProps(conf.pan == "random" ? randomSpot() : conf.pan);
			
			pan.w = align.w === "left" ? "right" : "left";
			pan.h = align.h === "top" ? "bottom" : "top";
			
		}
		
		
		function worker() {
			if (paused) { return; }
			var now = counter/duration;
			curR = ratioFrom+(ratioTo-ratioFrom)*now;
			curX = xFrom+(xTo-xFrom)*now;
			curY = yFrom+(yTo-yFrom)*now;
			
			target.transform(curR*upscale,curX*upscale,curY*upscale,tw,th);
			counter++;
			
			if (counter > duration) {
				self.pause();
			}
		}
		
		function boundaries() {
			var el = t.parent();
			var nh,nw;
			
			while (el && !el.width()) {
				el = el.parent();
			}
			
			nw = el ? el.width() : 800;
			nh = el ? el.height() : 600;
			
			if (rw === nw && rh === nh) {
				return false;
			}
			
			rw = w = nw;
			rh = h = nh;
			
			var power = 0.3;
			
			if (w/tw > h/th) {
				upscale = w/tw*(1+power);
				w = w/upscale;
				h = h/upscale;
				normalized = Math.max(conf.duration,conf.duration*((th-h)/h)/power);				
			} else {
				upscale = h/th*(1+power);
				w = w/upscale;
				h = h/upscale;
				normalized = Math.max(conf.duration,conf.duration*((tw-w)/w)/power);				
			}
			
			return true;
		}

		
		$.extend(self, {
			init: function(e) {
				tw = parseInt(t.attr("width"),10) || t.width() || t[0].width;
				th = parseInt(t.attr("height"),10) || t.height() ||  t[0].height;
				
				target.css("image-rendering","optimizeQuality").css("-ms-interpolation-mode","bicubic");
				self.start();
				//target.bind("resize",self.resize);
			},
			
			
			start: function() {
				
				self.stop();
				repeat = 0;
				
				boundaries();
				
				computeSettings();
				computeValues();
				paused = false; /* check this */
				
				if (conf.paused) {
					worker();
					paused = true;
				} 
				
				
				$.pixelonetry.ticker.register(worker);
			},
			
			resize: function() {
				if (boundaries()) {
					pzoom = zoom;
					palign = align.w+","+align.h;
					//console.log(zoom,align);
					self.start();
				}
			},
			
			stop: function() {
				$.pixelonetry.ticker.unregister(worker);
			},
			
			reset: function() {
				paused = true;
				repeat = 0;
				computeSettings();
				computeValues();
				paused = false;
			},
			
			getTarget: function() {
				return target;
			},
			
			pause: function() {
				paused = true;
			},
			
			resume: function() {
				paused = false;
			},
			
			destroy: function() {
				self.paused = true;
				self.stop();
				self = undefined;
				target.data("pePanZoomImage", null);
				target = undefined;		
			}
			
		});
		
		if ((!t.width()) && (!t[0].width)) {
			t.one("load",self.init);
		} else {
			self.init();
		}
		
	}
	
	
	// jQuery plugin implementation
	$.fn.pePanZoomImage = function(conf) {
		// return existing instance
		
		var api = this.data("pePanZoomImage");
		
		if (api) { 
			api.start();
			return api; 
		}

		conf = $.extend(true, {}, $.pixelonetry.pePanZoomImage.conf, conf);
		
		// install kb for each entry in jQuery object
		this.each(function() {
			api = new PePanZoomImage($(this), conf); 
			$(this).data("pePanZoomImage", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
})(jQuery);

   /* ==============================================
   Pixelonetry Widgets
  =============================================== */
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry,$ */
	$.pixelonetry = $.pixelonetry || {};

	var items = [];
	var active = [];
	
	function Factory() {
		function add(cond,widget) {
			items.push({
				check:cond,
				widget:widget
			});
		}
		
		function build(target,controller) {
			if (target.data("peWidgets")) {
				return false;
			}
			var applied = false;
			target.data("peWidgets",true);
			var n = items.length;
			var item;
			var elem;
			for (var i=0;i<n;i++) {
				item = items[i];
				elem = item.check(target,controller);
				if (elem) {
					applied = true;
					if (item.widget) {
						active.push(new item.widget(elem));
					}
				}
			}
			return applied;
		}
		
		$.extend(this, {
			"add":add,
			"build":build
		});
	}
	
	$.pixelonetry.widgets = new Factory();
}(jQuery));
   /* ==============================================
   Pixelonetry Widgets bslinks
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry,$ */
	
	//var iDev = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
	var iDev = $.pixelonetry.browser.mobile;
	var videoRegexp = /[^w](mp4|webm|ogv)$|^http:\/\/(vid\.ly|youtube\.|www\.youtube\.|youtu\.be|vimeo\.|www\.vimeo\.)/i;
	var hasFlare = typeof $.fn.peFlareLightbox === "function";
	
	function noop() {
		return false;
	}
	
	var imgreg = /\.(jpg|jpeg|png|gif)$/i;
	
	function addLink() {
		var link = $(this);
		
		/*
		if (this.href.charAt(this.href.length-1) === "#" && !link.attr("data-filter")) {
			link.click(noop);
		}
		*/
		
		var target = link.attr("data-target");
		
		var handler = (target && pixelonetry.targets[target]) ? pixelonetry.targets[target] : false;
		if (handler) {
			link.click(handler);
		}
		
		if (hasFlare) {
			if (target === "flare") {
				link.peFlareLightbox({
					titleAttr: "data-title"
				});
			} else if (!link.attr("data-toggle") && link.attr("href") && link.attr("href").match(imgreg)) {
				var rel = link.attr("rel");
				if (!rel || !rel.match(/prettyPhoto/)) {
					link.peFlareLightbox();
				}
			}
		}
	
		
		switch (link.attr("data-rel")) {
		case "popover":
			link.popover();
			break;
		case "tooltip":
			link.tooltip({placement: link.attr("data-position") || "top"});
			break;
		}

		
		if (link.hasClass("peOver")) {
            var icon = $('<span class="overIcon '+(link.attr("data-target") == "flare" ? "lightbox" : "link")+'Icon"></span>').hide();
			
            link.append(icon).data("icon",icon);
			
            if (!iDev && $.pixelonetry.effects && $.pixelonetry.effects.iconmove) {
                link.bind("mouseenter mouseleave",$.pixelonetry.effects.iconmove);
            }
			
        }
		
		if (link.hasClass("peOverBW")) {
            if (!iDev) {
                link.bind("mouseenter mouseleave",$.pixelonetry.effects.bw);
            }
			
        }
		
		if (link.hasClass("peOverInfo")) {
            if (!iDev) {
				if (link.find("div.title").length === 0) {
					var title = $('<div class="title"></div>');
					title.append('<div class="infoWrap"><span class="peOverElementIconBG">%0</span></div>'.format('<span class="projectIcon peOverElementIcon"><i class="icon-%0 icon-white"></i></span>'.format(link.attr("data-target") == "flare" ? "lightbox" : "link")));
					title.append('<div class="peOverElementInnerBG"></div>');
					link.append(title);
				}
				link.bind("mouseenter mouseleave",$.pixelonetry.effects.info);
            }
			
        }
		
		if (link.hasClass("peVideo")) {
			link.peVideoPlayer({responsive:true});
		}
		
	}
	
	function check(target) {
		var t = target.find("a");
		if (t.length > 0) {
			t.each(addLink);
		}
		return false;
	}
	
	$.pixelonetry.widgets.add(check);
}(jQuery));
   /* ==============================================
   Pixelonetry contactForm
  =============================================== */
   /* ==============================================
   Pixelonetry widgets.contact
  =============================================== */
  /* ==============================================
   Pixelonetry widgets.bootstrap
  =============================================== */

   /* ==============================================
   Pixelonetry widgets-volo
  =============================================== */
  (function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry */
	
	function create(idx,t) {
		t = $(t);
		var slider = t.peVoloSimpleSkin({api:true});
		
		if (!$.pixelonetry.themeSlider) {
			$.pixelonetry.themeSlider = slider;
		}
	}

	function check(target) {
		var t = target.find(".peVolo");
		if (t.length > 0) {
			t.each(create);
			return true;
		}
		return false;
	}
	
	$.pixelonetry.widgets.add(check);
}(jQuery));
  
   /* ==============================================
   Pixelonetry widgets.carousel
  =============================================== */

  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */
	/*global jQuery,setTimeout,clearTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry,prettyPrint */
                
    
	function clickHandler(e) {
		var slider = e.data.slider;
		var target = e.data.target;
		var el = target.find(e.currentTarget);
		if (el.hasClass("prev-btn")) {
			slider.prev();
		} else {
			slider.next();
		}
		return false;
	}

	
	function addTarget() {
		var target = $(this);
		var slider = target.parent().next(".carouselBox");
		if (slider.length === 0) {
			slider = target.parent().prev(".carouselBox");			
		}
		if (slider.length > 0) {
			slider.addClass("peVolo").wrapInner('<div class="peWrap"></div>');
		}
		slider = slider.peVolo({api:true});
		target.on("click","a",{"slider":slider,"target":target},clickHandler);
	}
	
	
	function check(target,controller) {
		var t = target.find(".carousel-nav");
		if (t.length > 0) {
			t.each(addTarget);
			return true;
		}
		return false;
	}
	
	$.pixelonetry.widgets.add(check);
	
}(jQuery));

   /* ==============================================
   Pixelonetry controller
  =============================================== */
  (function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */
	/*jshint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false, validthis: true */
	/*global jQuery,setTimeout,clearTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry,prettyPrint */
	
	var jwin = $(window),sc;
	var jhtml = $("html");
	var body;
	var container;
	var containerH = 0,h = 0;
	var scroller;
	var filterable = false,isotope = false;
	var layoutSwitcher = false;
	var cells;
	var overs;
	var containerHeightTimer = 0;
	var header,arrows,mobile,background;
	var fullpage;
	var headerY = 0,stickyH = 0;
	var isSticky = false;
	var headlines;
	var sections;
	var sliderBG;
	var stickyMode = "sticky";
	var scrolling = false;
	var changedActive = false;
	var staff;
	var footer,sitebody;
	var openProject = false;
	var stickyFooter = false;
	var overlay;
	var ie8 = ($.browser.msie && $.browser.version < 9);
	var cssA = $.support.cssanimation;
	var topt;
	
	window.peGmapStyle = [
        {
            stylers: [
                { saturation: -100 }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];
	
	function imgfilter() {
		return this.href.match(/\.(jpg|jpeg|png|gif)$/i);
	}
	
	pixelonetry.classes.Controller = function() {
		
		var w,h,nw,nh;
		var active;
		var nav;
		var useAnimations = false;
		
		function fullPageResize() {
			fullpage.find(".peNeedResize").triggerHandler("resize");
		}

		function resize() {
			nw = jwin.width();
			nh = window.innerHeight ? window.innerHeight: jwin.height();
			
			if (nw === w && nh === h) {
				return;
			}
			
			w = nw;
			h = nh;
			
			// test this
			if (mobile && jwin.scrollTop() > 0) {
				return;
			}
			
			if (fullpage.length > 0) {
				var fh = Math.max(300,h-body.find("section.pe-main-section:first").offset().top);
				var mh = parseInt(fullpage.attr("data-maxheight"),10);
				if (mh > 0) {
					fh = Math.min(fh,mh);
				}
				
				mh = parseInt(fullpage.attr("data-minheight"),10);
				
				if (mh > 0) {
					fh = Math.max(fh,mh);
				}
				
				fullpage.height(fh);
				fullPageResize();
				setTimeout(fullPageResize,500);
				if ($.browser.msie && $.browser.version < 10) {
					setTimeout(fullPageResize,1500);
					setTimeout(fullPageResize,2000);
					setTimeout(fullPageResize,2000);
				}
			}
			
		}
		
		function makeAnimated(e) {
			cells.filter(e.currentTarget).find("div.scalable img").addClass("animated");			
		}
		
		function sticky(e) {
			var wsp = jwin.scrollTop();
			if (sliderBG && !mobile && $.support.csstransforms) {
				sliderBG.transform(1,0,-wsp >> 1);
			}
			body[wsp > 30 ? "addClass" : "removeClass"]("pe-header-scrolled");
			if (stickyFooter && wsp > Math.max(h,1000)) {
				if (!body.hasClass("pe-sticky")) {
					sitebody.css("margin-bottom",footer.outerHeight());
					body.addClass("pe-sticky");
				}
			} else {
				if (body.hasClass('pe-sticky')) {
					//if (wsp < h-footer.outerHeight()) {
						sitebody.css("margin-bottom",0);
						body.removeClass("pe-sticky");
					//}
				}
			}
		}
		
		function widgets(el,controller) {
			el = el || body;
			
			if (el.hasClass("pe-controller-widgets")) {
				return;
			}
			
			el.addClass("pe-controller-widgets");
			
			el.find('.peSlider.peVolo').attr({
				"data-controls-arrows": "edges-buttons",
				"data-controls-bullets": "enabled",
				"data-icon-font": "enabled"
			});
			
			el.find('.carouselBox').attr({
				"data-height": "0,0"
			});
			
			el.find('a.peVideo').attr({
				"data-autoplay": "disabled"
			});
			
			el.find('.peBackground').attr({
				"data-mobile": mobile ? "true" : ""
			});
			
			el.find('.peSlider[data-height]').not('.peGallerySlider').find('> div').addClass("scale");
			
			if (useAnimations) {
				el.find('.pe-animation-maybe').removeClass('pe-animation-maybe').addClass('pe-animation-wants');
			}
			
			if (el === body) {
				resize();
			}
			
			var parallax = $('.pe-main-section.pe-parallax');
			
			if (ie8) {
				el.find('div:last-child').addClass('pe-last-child');
			}
			
			parallax.each(function (idx) {
				var ps = parallax.eq(idx);
				var xpos = "50%";
				if (ps.hasClass("pe-bg-left")) {
					xpos = '0%';
				} else if (ps.hasClass("pe-bg-right")) {
					xpos = '100%';
				}
				if (!mobile && !ie8) {
					ps.parallax(xpos,0.5);
				}
			});
			
			//el.find(".post-pagination.pe-load-more").peLoadMore();
			
			$.pixelonetry.widgets.build(el,controller);
			
			if (el !== body) {
				var sec = el.closest("section.pe-main-section");
				if (sec.length > 0) {
					sec.data("processed",false);
					animate(sec);
				}
			}
			
		}
		
		function fixHeaderHeight() {
			var logo = header.find("img:first");
			var lh = logo.height() || parseInt(logo.attr("height"),10);
			header.find("header").height(lh).find("> div").height(lh);
			header.find(".pe-menu-main").css("padding-top",lh-37);
			if (!body.hasClass("pe-header-transparent")) {
				body.css("padding-top",header.css("position") === "relative" ? 0 : lh);
			} 
			stickyH = header.height();
			jhtml.data('header-height',stickyH);
			setTimeout(function () {
				stickyH = header.height();
				jhtml.data('header-height',stickyH);
			},100);
		}
		
		function noop(e) {
			e.preventDefault();
			return false;
		}

		
		function makeActive(hash) {
			var url = window.location.href.replace(/#.*/,'') + (hash ? '#'+hash : '');
			var active = header.find("a[href='%0']".format(url));
			
			if (active.length > 0) {
				changedActive = true;
			}
			
			if (changedActive > 0) {
				header.find("li.active").removeClass("active");
				active.parent().addClass("active");
			}	
		}
			
		function sectionHandler(direction) {
			
			if (scrolling) {
				return;
			}
			
			var hash = this.id === 'section-0' ? '' : this.id.replace(/section\-/,'');
			
			/*
			if (!$.browser.msie) {
				window.location.hash = hash;
			}
			*/
			
			makeActive(hash);
		}
		
		function cleanAnimation() {
			var jthis = $(this);
			var cl = jthis.data("removeclass") || "";
			cl += " pe-animation-has pe-animation-wants pe-animation-maybe";
			jthis.removeClass(cl);
			//jthis.removeClass(cl).addClass('pe-animation-maybe pe-animation-wants');
		}

		
		function animate(sec) {
			/*
			if (sec.data("processed")) {
				return;
			}
			*/
			var items = sec.find('.pe-animation-wants').not('.pe-animation-has');
			var delay = 0;
			var incr = 0.3;
			if (items.length > 0) {
				var i,item,cl;
				incr = items.length <= 4 ? 0.3 : 0.1;
				sec.css("overflow","hidden");
				//items.addClass('animated pe-animation-has');
				var clean = [];
				for (i=0;i<items.length;i++) {
					item = items.eq(i);
					if (item.hasClass('pe-animation-has')) {
						continue;
					}
					cl = "animated pe-animation-has "+item.attr('data-animation') || 'fadeIn';
					item.data("removeclass",cl);
					item.one($.support.cssanimationEnd,cleanAnimation);
					item[0].style[cssA+"Delay"] = delay +"s";
					item.addClass(cl);
					delay += incr;
				}

				//items.removeClass('pe-animation-wants');
			}
			sec.data("processed",true);
		}

		
		function animationHandler(direction) {
			var sec = sections.filter(this);
			animate(sec);
		}
		
		function scrollEnd() {
			scrolling = false;
		}

		function hashHandler(e) {
			
			var url = (e && e.currentTarget) ? e.currentTarget.href : window.location.href;
			var hash = url.split(/#/)[1];

			if (hash) {
				var section = sections.filter('[id="section-%0"]'.format(hash));
				if (section.length > 0) {
					makeActive(hash);
					scrolling = true;
					sticky();
					var fixed = header.css("position") == 'fixed';
					scroller.animate({scrollTop: section.offset().top-(fixed ? stickyH : 0)+4},500,scrollEnd);
				}
			}
		}
		
		function staffHandler(e) {
			var member = staff.filter(e.currentTarget);
			
			if (member.data("locked")) {
				return;
			}
			
			var info = member.find(".info-wrap");
			var details = member.find(".details");
			
			
			if (e.type === "mouseenter") {
				member.data("over",true);
				member.css("overflow","hidden").height("auto");
				member.height(member.height());
				info.show();
				details.css("margin-top",-details.height()+41);
				//console.log(-details.height()+24);
			} else {
				if (!member.data("over")) {
					return;
				}
				member.data("locked",true);
				member.data("over",false);
				details.css("margin-top",-20);
				setTimeout(function () {
					info.hide();
					member.height("auto");
					member.data("locked",false);
				},300);
			}
		}
		
		function portfolioLoaded() {
			var project = window.location.hash.match(/\/(.+)/);
			if (project && project[1]) {
				//setTimeout(function () {
					jQuery("a[data-slug='"+project[1]+"']:first").trigger("click");
				//},10);
			} 
		}
		
		function carouselNavigation(e) {
			var carousel = $(e.currentTarget);
			var navigation = carousel.attr("data-show-navigation") != "no";
			try {
				carousel.next()[navigation ? "removeClass" : "addClass"]("pe-block-hidden");
			} catch (x) {
			}
		}
		
     	function wrefresh() {
			$.waypoints('refresh');
		}

		
		function start() {
			
			body = $("body");
			scroller = $("html,body");
			mobile = $.pixelonetry.browser.mobile;
			
			topt = window.peThemeOptions || {};
			useAnimations = (!mobile && $.support.cssanimation);
			useAnimations = useAnimations && topt.animations == "yes";
			useAnimations = useAnimations && window.peAnimations !== false;
			
			if (!mobile && !($.browser.msie && $.browser.version < 9) && body.is(".pe-sticky-footer.page-template-page_builder-php.pe-page-fullwidth")) {
				footer = body.find("> .site-wrapper > div.footer");
				sitebody = body.find("> div > div.site-body");
				stickyFooter = true;
			}
			
			if (mobile) {
				jhtml.addClass("mobile").removeClass("desktop");
				if ($.pixelonetry.browser.android) {
					jhtml.addClass("android");
				} else if ($.pixelonetry.browser.iDev) {
					jhtml.addClass("ios");
				}
			} else {
				jhtml.addClass("desktop").removeClass("mobile");
			}
			
			header = $(".site-wrapper .pe-menu-sticky");
			
			fixHeaderHeight();
			
			fullpage = $(".site-wrapper > .site-body > .pe-full-page");
			
			if (!mobile) {
				header.on('click','a[href=#]',noop);
			}
			
			$(".pe-menu-main").each(function () {
				$(this).peMenu();
			});
			
			// pe menu
			/*
			jQuery(function() {
				$(".pe-menu-main").each(function () {
					$(this).peMenu();
				});
				setTimeout(function () {
					$(".project-filter").peMenu();
				},1000);
			});
			*/
			
			$(".pe-full-page .peSlider[data-height]").attr("data-height","300,container,1440");
			$('.header header .sm-icon-wrap a[data-position]').attr("data-position","bottom");
			
			var escapelist = $(".pe-container .pe-escape-container");
			
			escapelist.each(function(idx) {
				var el = escapelist.eq(idx);
				el.closest(".pe-container").before(el);
			});
			
			var splash = $("section.pe-splash-section");

			if (splash.length > 0) {
				sliderBG = splash.find(".peWrap");
				//sliderBG.parent().one("ready.pixelonetry",function () {
					var caption = splash.find(" > div.peCaption");
					
					if (caption.length > 0) {
						
						headlines = caption.find(".pe-headlines > div");
						if (headlines.length > 0) {
							var mh = 0,mw = 0;
							headlines.each(function (idx) {
								mw = Math.max(headlines.eq(idx).width(),mw);
								mh = Math.max(headlines.eq(idx).height(),mh);
							});
							caption.find(".pe-headlines").width(mw).height(mh);
						}
						
						var slider = splash.find(".peVolo");
						if (mobile && slider.attr("data-transition") === 'pz' && !window.peForcePanZoom) {
							slider.attr("data-transition","fade");
						}
						slider.find(".peCaption").remove();
						slider.find(".peWrap > div:first").prepend(caption);
						
						var ah = 0;
						setInterval(function () {
							ah = (ah + 1) % headlines.length;
							headlines.removeClass("pe-active").eq(ah).addClass("pe-active");
							
						},4000);
					}
				//}); 
			}
			
			if (!mobile) {
				staff = $(".pe-view-layout-class-staff .staff-item");
				staff.on("mouseenter mouseleave",staffHandler);
				
			}
			
			var bgyt = $("#pe-bg-video");
			
			if (bgyt.length > 0) {
				if (!$.fn.mb_YTPlayer || mobile || ie8 || window.peBgVideo === false) {
					if (bgyt.attr("data-fallback")) {
						bgyt.css({
							"background-image" : 'url(%0)'.format(bgyt.attr("data-fallback"))
						}).addClass("pe-active");
					}
				} else {
					var def;
					try {
						def = eval('({%0})'.format(bgyt.attr("data-settings")));
					} catch (x) {
						console.log("error parsing video data-settings");
						def = {containment:'body',autoPlay:true, mute:true, startAt:0, opacity:1, showControls:0};
					}
					var videos = [];
					var i = 0,video;
					while ((video = bgyt.attr('data-video%0'.format(i++)))) {
						videos.push(jQuery.extend({videoURL:video},def));
					}
					bgyt.YTPlaylist(videos, false);

					if ( def.autoPlay ) {

						jwin.on( 'load', function() {
							setTimeout( function() { bgyt.YTPPlay(); }, 1000 );
							setTimeout( function() { bgyt.YTPPlay(); }, 3000 );
							setTimeout( function() { bgyt.YTPPlay(); }, 5000 );
							setTimeout( function() { bgyt.YTPPlay(); }, 10000 );
						});

					}
				}
				$("#pe-bg-video-overlay").addClass("pe-active");
			}
			
			$(".pe-ajax-portfolio:last").one("ajaxloaded.pixelonetry",portfolioLoaded);
			$(body).on("pe-carousel-navigation",".carouselBox",carouselNavigation);
			
			widgets(body,{});
			
			$("img[data-original]:not(img.pe-lazyload-inited)").peLazyLoading();
			
			if (mobile) {
				setTimeout(function () {
					//alert("ok");
					jwin.triggerHandler("pe-lazyloading-refresh");
				},100);
			} else {
				cells = $(".peIsotopeGrid .peIsotopeItem");
				cells.one("mouseenter",makeAnimated);
			}
			
			jwin.resize(resize);
			jwin.on("load",resize);
			jwin.on("scroll",sticky);
			
			sections = $('section.pe-main-section');
			var refresh = false;
			
			if (sections.length > 1) {
				refresh = true;
				sections.filter(".pe-splash-section").waypoint({handler: sectionHandler,offset: -100});
				sections.not(".pe-splash-section").waypoint({handler: sectionHandler,offset: 100});
			}
			
		   if (useAnimations && sections.length > 0) {
				refresh = true;
				var wh = window.innerHeight ? window.innerHeight: jwin.height();
				sections.not(".pe-splash-section").waypoint({handler: animationHandler,offset: wh-(window.peAnimationOffset ? window.peAnimationOffset : 200 )});
			}
			
			if (refresh) {
				setTimeout(wrefresh,500);
				setInterval(wrefresh,1000);
			}
			
			//jwin.on("hashchange",hashHandler);
			
			body.on("click","a[href]",hashHandler);
			hashHandler();
			//makeActive();
			resize();
			overlay = body.find("> .site-loader");
			if (overlay.length > 0) {
				//jwin.one("load",function () {
				setTimeout(function() {
					overlay.addClass("pe-disabled");
					setTimeout(function () {
						overlay.css("visibility","hidden");
					},500);
					jwin.on("beforeunload",function (e) {
						overlay.css("visibility","visible").removeClass("pe-disabled");
					});
				},500);	
				//});
			}
			
			
			
		}
		
		$.extend(this, {
			// public API
			widgets: widgets,
			start: start
		});
		
	};
	
}(jQuery));
  
   /* ==============================================
   Pixelonetry init
  =============================================== */

  /*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry,influx_load,yepnope */
jQuery(function($){
	
	if (window.peFallBackPlayer) {
		$.pixelonetry.video.fallBackPlayer = decodeURIComponent(window.peFallBackPlayer.url);
	}
	
	pixelonetry.controller = new pixelonetry.classes.Controller();		
	pixelonetry.controller.start();
});

 /* ==============================================
   jquery.pixelonetry.widgets.isotope
  =============================================== */
  
(function ($) {
	"use strict";
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval,pixelonetry */
	
	function check(target) {
		var t = target.find(".peIsotope");
		if (t.length > 0) {
			t.peIsotope(); // Initialize the peIsotope plugin
			return true;
		}
		return false;
	}
	
	// Add the check function to the widgets collection
	$.pixelonetry.widgets.add(check);
}(jQuery));