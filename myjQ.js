

//1. 整体是一个自调用函数，沙箱模式
(function(window){
    var
	version = "3.4.1",

	// 3.$的函数体是一个工厂模式
	jQuery = function( selector, context ) {

         // jQuery.fn是jQuery 原型的简称。
        //  jQuery.fn.init 是一个构造函数
		return new jQuery.fn.init( selector, context );
    };
    
    //4. fn 是jQuery 原型的简称。
    jQuery.fn = jQuery.prototype = {
        constructor:jQuery
     
    };

    //5.在原型上定义构造函数

    var init = jQuery.fn.init = function(){

    }

    // 6.把构造函数的原型替换为工厂的原型，为的是让实例能够访问$.fn 上的成员,
    // 为了实现插件机制
    init.prototype = jQuery.fn;

    // 对外暴露$
    window.jQuery = window.$ = jQuery;
})(window);