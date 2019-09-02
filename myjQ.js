

//1. 整体是一个自调用函数，沙箱模式
(function(window){

// 缓存为局部变量，提高查找效率
    var arr = [];

    var document = window.document;

    var slice = arr.slice;
    var splice = arr.splice;

    var concat = arr.concat;

    var push = arr.push;
    var sort = arr.sort;
    var obj = {};
    var toString = obj.toString;
    var hasOwn = obj.hasOwnProperty;


    var
	version = "1.0.0",

	// 3.$的函数体是一个工厂模式
	jQuery = function( selector, context ) {

         // jQuery.fn是jQuery 原型的简称。
        //  jQuery.fn.init 是一个构造函数
		return new jQuery.fn.init( selector, context );
    };
    
    //4. fn 是jQuery 原型的简称。
    jQuery.fn = jQuery.prototype = {
        jquery:version,
        length:0,
        constructor:jQuery,
        // 返回的原生dom元素，并没有继承jq的原型，
        get:function(num){
            // 比较严谨，判断有没有传参
            if(arguments.length===0){
                return slice.call(this)
            }else {
                // Return just the one element from the set
		        return num < 0 ? this[ num + this.length ] : this[ num ];
            }
        },
        eq:function(num){
            // 1.正数或0按照指定下标获取对应的元素，非正数倒着获取对应的元素
            // 2.然后把获取到的元素包装成jQ对象返回
            // return jQuery(this.get(num))

            return this.pushStack(this.get(num))
        },
        first:function(){
            return this.eq(0)
        },
        last:function(){
            return this.eq(-1)
        },
        toArray:function(){
            // 把jQ实列转换为数组返回
           return slice.call(this)
        },
        slice:function(start,end){
           var arr = slice.call(this,start,end);

        //    return jQuery(arr);
            // slice返回的是截取后的新实例，链断啦
            // 所以要记录上级链，只要记录上级链，就交由pushStack处理
            return this.pushStack(arr)
        },
        push:function(){
          return  push.apply(this,arguments)
        },
        // _push 这个属性存储的就是数组的push,通过jQ实例调用这个方法，
        // 是方法调用模式，那么_push 执行的时候内部this已经为jQ实例啦，就不用在call或apply 啦
        _push:push,
        sort:sort,
        splice:splice,
        pushStack:function(arr){
            // pushStack 方法内部会 新 创建一个JQ实例，
            //然后给这个实例添加一个preObj属性，记录该方法的调用者
            var $new = jQuery(arr);
            $new.preObj = this;
            return $new;
            // return this.preObj = this;
        },
        end:function(){
            return this.preObj;
        },
        each:function(fn){
           return each(this,fn)
        }
     
    };

     // 1.判断obj是不是数组，如果是，则用var i 的形式遍历它，
            // 2.如果是其他对象，则使用for in 的形式遍历它，因为 for in 可以遍历到原型上可枚举的方法
            // 3.把遍历到的下标和值依次传递给回调。
            // 4.each 方法会改变传入回调执行时的this,这个值就是编列到的value

            // 判断是不是数组
           function each(obj,fn){
            if( isArrayLike(obj)){
                for(var i = 0;i<obj.length;i++){
                    if(fn.call(obj[i],i,obj[i])===false){    // 如果回调返回false，each 支持中断
                        break;
                    }
                }
            }else {
                for(var key in obj){
                   if( fn.call(obj[k],key,obj[k])===false){
                       break;
                   }
                }
            }
            return obj;
           }

    // 判断是不是window
    function isWindow(w){
        return !!w && w.window === w
    }

    /**
     * 判断是不是函数
     * @param {} fn 
     */
    function isFunction(fn){
      return  typeof fn ==='function'
    }

    // 获取一个对象的具体类型
    function getObjType(obj){
        // return Object.prototype.toString.call(obj).slice(8-1)
        return toString.call(obj).slice(8-1)
    }

    // 判断参数是不是对象（函数，数组等等，都是对象）
    //5种基本数据类型：string number，boolean,undefined,null
    function isObj(obj){
        return typeof obj ==='object' && obj !==null;
    }
    function isNumber(number){
        return typeof number ==='number'
    }

    // 判断是不是html字符串
    function isHTML(str){
       return ( str[ 0 ] === "<" &&
       str[ str.length - 1 ] === ">" &&
       str.length >= 3 )
    }
    // 判断参数是不是字符串
    function isString(str){
        return typeof str ==='string'
    }
    function parseHTML(str){
        /**
         * 1.创建一个临时DOM元素，
         * 2.给这个DOM元素设置innerHTML，为传入进来的html字符串
         * 3.返回DOM元素的子元素
         */
       var div =  document.createElement('div')
       div.innerHTML = str;
       return div.children
    }

    /**
     * 判断是否是类数组
     * @param {*} arrayLike 
     * 1.如果是函数或者window，直接返回false,
     * 2.判断arrayLike是不是对象，是的话进一步判断
     * 3.判断arrayLike 是不是真数组，如果是直接返回true
     * 4.判断arrayLike 是不是类数组，如果是直接返回true、
     * 4.1 如果arrayLike的length为0 ，那么是伪数组，
     * 4.2 或者arrayLike 的length 为数值，并且大于0，并且存在最大下标值，那么默认为伪数组
     * 5.默认返回false
     */
    function isArrayLike(arrayLike){
            if(isFunction(arrayLike) || isWindow(arrayLike)){
                return false
            }else if(isObj(arrayLike)){
                if(getObjType(arrayLike)==='Array'){
                    return true
                }else if(arrayLike.length===0 ||
                    (
                        isNumber(arrayLike.length) && 
                        arrayLike.length>0 &&
                        (arrayLike.length-1) in arrayLike  //in 运算符
                    )){
                    return true
                }
            }

            return false;
    }

   
    // 传入函数，该函数在DOM树构建完毕的时候执行
    function ready(fn){
        /**
         * 1.判断dom树是否构建完毕，如果是，执行fn函数即可，
         * 2.如果不是，监听DOM树构建完毕的事件，事件触发时执行fn
         */

         //无论是ie8还是现代浏览器，readyState 值为"complete" ，DOM树一定构建完毕，
         //如果是现代浏览器，readyState 值为 "interactive",DOM树也构建完毕。
         if(document.readyState ==='complete' ||
            (document.addEventListener && document.readyState ==='interactive')
         ){
             fn()
         }else {
             //现代浏览器
             if(document.addEventListener){
                 document.addEventListener('DOMContentLoaded',fn)
             }else {
                document.attachEvent("onreadystatechange",function(){
                    if(document.readyState==='complete'){
                        fn();
                    }
                })
             }
         }

    }

    //5.在原型上定义构造函数

    var init = jQuery.fn.init = function(selector){

        // 如果参数为空
        // HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
        }
       

        // 如果参数是函数
        if(isFunction(selector)){
            
            
            ready(selector)
        }
        // 如果参数是字符串
        else if(isString(selector)){
            
            // 如果是HTML字符串
            if(isHTML(selector)){
                
                push.apply(this,parseHTML(selector));
                // 否则，认为是选择器，去页面中获取元素，把获取到的元素依次添加到实例中
            }else {
                
                push.apply(this,document.querySelectorAll(selector))
               
            }
        }
        // 如果参数是数组或者伪数组
        else if(isArrayLike(selector)){

            try {
                push.apply(this,selector)
            }
            catch(e){
                // 在ie8 中，如果报错了，那么selector 一定是用户自定义的伪数组
                push.apply(this,slice.call(selector))
            }
           
        }
        
    }



    // 6.把构造函数的原型替换为工厂的原型，为的是让实例能够访问$.fn 上的成员,
    // 为了实现插件机制
    init.prototype = jQuery.fn;

    // 对外暴露$
    window.jQuery = window.$ = jQuery;
})(window);