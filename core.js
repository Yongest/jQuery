// 1、自调，防止全局变量污染
(function(w) {

    // 缓存一些常用方法
    var version = '1.0.0';

    var document = w.document;

    var arr = [],
        push = arr.push,
        slice = arr.slice;

    var obj = {},
        toString = obj.toString;

    // 3、工厂
    var jQuery = function(selector) {
        return new jQuery.fn.init(selector);
    };

    // 4、原型搞个简称
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        // 版本号
        jquery: version,

        // 默认的length
        length: 0,

        // 把实例转换为数组
        toArray: function() {
            return slice.call(this);
        },

        // 获取指定下标的DOM元素
        get: function(i) {
            return arguments.length === 0? this.toArray()
                : i >= 0? this[i]: this[this.length + i];
        },

        // 获取指定下标DOM包装成的新实例
        eq: function(i) {
            // 把获取到的原生DOM传给pushStack，
            // pushStack会把它包装成新实例，
            // 并且这个新实例会记录当前的this(也就是新实例的上级链),
            // 然后返回新实例。
            return this.pushStack(this.get(i));
        },

        first: function() {
            return this.eq(0);
        },

        last: function() {
            return this.eq(-1);
        },

        /*
         * 截取实例的部分元素，组成新的实例返回。
         * */
        slice: function(start, end) {
            /*
             * 1、先借用数组的slice截取实例的部分元素，得到这部分元素组成的数组
             * 2、然后通过pushStack把这个数组包装成新实例，新实例还记录了上级链
             * 3、最后返回这个新实例
             * */
            return this.pushStack(slice.call(this, start, end));
        },

        push: push,
        sort: arr.sort,
        splice: arr.splice,

        /*
         * 该方法的作用：
         * 1、创建一个新实例，可以指定新实例的内容
         * 2、然后给新实例添加一个prevObject属性，用来记录上级链
         * 3、最后返回这个记录了上级链的新实例
         * */
        pushStack: function(eles) {
            var $new = jQuery(eles);
            $new.prevObject = this;
            return $new;
        },

        /*
         * 找回上级链，如果没有，返回一个新实例。
         * */
        end: function() {
            return this.prevObject || jQuery();
        },

        // 遍历实例
        each: function(fn) {
            // 静态的each遍历谁，返回谁，
            // 这里遍历的是实例，
            // 刚好我们就需要返回实例，
            // 所以直接返回静态each的返回结果即可。
            return jQuery.each(this, fn);
        },

        // 把一组实例映射成另外一组实例
        map: function(fn) {
            /*
             * 1、借用静态的map把实例先映射成数组
             * 2、然后通过pushStack把这个数组包装成新实例，新实例还记录了上级链
             * 3、最后返回这个新实例
             * */
            return this.pushStack(jQuery.map(this, fn));
        },

        ready: function(fn) {
            /*
             * 1、先判断DOM有没有构建完毕，构造完毕直接执行fn即可
             * 2、如果没有构建完毕，那么就让fn在构建完毕的时候执行
             * */

            /*
             * 无乱现代浏览器还是IE8，只要readyState值为complete，那么DOM就构建完毕了；
             * 同时现代浏览器readyState值为interactive的时候，DOM也构建完毕了。
             * */
            if(document.readyState === 'complete'
                || (document.addEventListener && document.readyState === 'interactive')) {
                fn(jQuery);
            }

            else {

                if(document.addEventListener) {
                    // 现代浏览器通过监听DOMContentLoaded事件
                    document.addEventListener('DOMContentLoaded', function(){
                        fn(jQuery);
                    });
                }

                else {
                    // 现代浏览器通过监听DOMContentLoaded事件
                    document.attachEvent('onreadystatechange', function(){
                        if(document.readyState === 'complete') {
                            fn(jQuery);
                        }
                    });
                }
            }

            // 链式编程
            return this;
        }
    };

    // 5、隐藏的构造函数
    var init = jQuery.fn.init = function(selector) {
        /*
         * 1、如果selector转换布尔为true，进一步判断类型做不同处理
         * 2、判断是不是字符串，去掉首尾空格，然后进一步判断
         * 2.1、判断是不是html字符串，是则创建，创建的DOM加到实例中
         * 2.2、不是，作为选择器获取，获取的DOM加到实例中
         * 3、判断是不是真伪数组，是的话把每一项值分别加到实例
         * 4、判断是不是函数，是的话，交由read方法处理
         * 5、其他数据，统一把该数据自己添加到实例中
         * */
        if(selector) {

            // string
            if(jQuery.isStr(selector)) {
                selector = jQuery.trim(selector);

                // html ==> 转换为DOM，加到实例中
                if(jQuery.isHTML(selector)) {
                    push.apply(this, jQuery.createHTML(selector));
                }

                // selector ==> 获取页面DOM，加到实例中
                else {
                    push.apply(this, document.querySelectorAll(selector));
                }
            }

            // arrayLike ==> 取出其值，分别加到实例中
            else if(jQuery.isArrayLike(selector)) {

                // 如果报错，说明是IE8不支持用户自定义的伪数组，
                // 那么就手动把它转换为真数组再添加。
                try {
                    push.apply(this, selector);
                }catch (e) {
                    push.apply(this, slice.call(selector));
                }
            }

            // function ==> 调用read实现
            else if(jQuery.isFun(selector)) {
                return jQuery(document).ready(selector);
            }

            // 其他，直接把自己加到实例中
            else {
                push.call(this, selector);
            }
        }
    };

    // 6、构造函数原型与工厂原型一致
    init.prototype = jQuery.fn;

    // 7、用来扩展实例成员和静态成员的extend
    jQuery.extend = jQuery.fn.extend = function() {
        var arg = arguments, argLen = arg.length;
        var i = 1, key;
        var target = arg[0];

        // 如果一个参数，那么target为this
        if(argLen === 1) {
            target = this;
            i = 0;
        }

        // 遍历得到被copy的对象
        for(; i < argLen; i++) {

            // 遍历对象自己的属性
            for(key in arg[i]) {
                if(arg[i].hasOwnProperty(key)) {
                    target[key] = arg[i][key];
                }
            }
        }

        // 给谁copy东西，返回谁
        return target;
    };

    // 8、添加一些预备的工具性方法
    jQuery.extend({

        // 判断是不是字符串
        isStr: function(str) {
            return typeof str === 'string';
        },

        // 判断是不是数字，过滤掉NaN
        isNum: function(num) {
            return typeof num === 'number' && num === num;
        },

        // 判断是不是函数
        isFun: function(fun) {
            return typeof fun === 'function';
        },

        // 判断是不是DOM
        isDOM: function(dom) {
            // 为了防止传入的是null或undefined，他俩访问属性或报错，所以先过滤一下。
            return !!dom && !!dom.nodeType;
        },

        // 判断是不是window
        isWin: function(w) {
            // 使用window的一个特性，拥有一个window属性指向自己
            return w.window === w;
        },

        // 判断是不是对象
        isObj: function(obj) {
            // 需要过滤掉null，同时注意函数也是对象
            return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
        },

        // 用来获取对象的类型
        getObjType: function(obj) {

            // 不是对象，返回typeof结果
            if(!jQuery.isObj(obj)) {
                return typeof obj;
            }

            // 是对象，返回具体的类型
            return toString.call(obj).slice(8, -1);
        },

        // 判断是不是真伪数组
        isArrayLike: function(arr) {
            var tempLen;

            // 不是对象、是函数、是window，都先过滤掉
            if(!jQuery.isObj(arr) || jQuery.isFun(arr) || jQuery.isWin(arr)) {
                return false;
            }

            /*
             * 走到下面的代码，证明arr是对象，并且不是函数也不是window。
             * 下面的代码先把length缓存一下，以便复用；
             * 然后是真数组OK，
             * 或者length === 0也OK，
             * 再或者length为数字，并且为非负数，并且arr拥有最大下标这个属性，这也OK，
             * 否则都不OK。
             * */
            tempLen = arr.length;
            return jQuery.getObjType(arr) === 'Array'
                || tempLen === 0
                || (jQuery.isNum(tempLen) && tempLen > 0 && (tempLen - 1) in arr);
        },

        // 判断是不是html类型的字符串
        isHTML: function(html) {
            return jQuery.isStr(html) && html[0] === '<'
                && html[html.length - 1] === '>' && html.length >= 3;
        },

        // 把html字符串转换为对应的DOM
        createHTML: function(html) {
            /*
             * 1、创建一个临时的DIV
             * 2、把html作为DIV的innerHTML属性，那么浏览器就会自动把html转换为DIV的子元素
             * 3、返回DIV的子元素
             * */
            var div = document.createElement('div');
            div.innerHTML = html;
            return div.childNodes;
        },

        // 去掉首尾空格
        trim: function(str) {

            // 不是字符串，原物返回
            if(!jQuery.isStr(str)) {
                return str;
            }

            // 优先使用浏览器的，没有再自己实现
            if(str.trim) {
                return str.trim();
            }

            return str.replace(/^\s+|\s+$/g, '');
        },

        /*
         * 作用：帮用户遍历对象的属性与下标或键，把遍历的这些值传给回调使用。
         * each方法与用户约定，如果用户在某些情况下不想让each继续遍历了，
         * 那么就让回调给我返回一个false来通知我停止遍历。
         * */
        each: function(obj, fn) {
            var i, len;

            // 非对象，不遍历
            if(!jQuery.isObj(obj)) {
                return obj;
            }

            // 根据对象的类型采取不同的遍历措施
            if(jQuery.isArrayLike(obj)) {
                for(i = 0, len = obj.length; i < len; i++) {
                    if(fn.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }else {
                for(i in obj) {
                    if(fn.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }

            // 遍历谁返回谁
            return obj;
        },

        /*
         * 作用：帮用户遍历对象的属性与下标或键，把遍历的这些值传给回调，
         * 最后收集回调的返回结果，过滤掉null和undefined，最后统一返回所有收集到的结果。
         * */
        map: function(obj, fn) {
            var i, len, result = [], temp;

            // 非对象，不遍历
            if(!jQuery.isObj(obj)) {
                return obj;
            }

            // 根据对象的类型采取不同的遍历措施
            if(jQuery.isArrayLike(obj)) {
                for(i = 0, len = obj.length; i < len; i++) {
                    temp = fn.call(obj[i], i, obj[i]);
                    temp != null && result.push(temp);
                }
            }else {
                for(i in obj) {
                    temp = fn.call(obj[i], i, obj[i]);
                    temp != null && result.push(temp);
                }
            }

            // 返回收集到的结果
            return result;
        }
    });

    // 2、暴露
    w.$ = w.jQuery = jQuery;

})(window);
