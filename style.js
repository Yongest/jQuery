/**
 * Created by zy on 2019/1/17.
 */
(function(window){

    // 静态方法
    jQuery.extend({

        // 兼容获取元素样式
        getStyle: function(elem, styleName) {

            // 参数不合格，不做处理
            if(!jQuery.isDOM(elem) || !jQuery.isStr(styleName)) {
                return;
            }

            if(window.getComputedStyle) {
                return window.getComputedStyle(elem)[styleName];
            }else {
                return elem.currentStyle[styleName];
            }
        }
    });

    // 实例方法
    jQuery.fn.extend({

        /*
         * css的三种使用方式：
         * 1、获取第一个元素的样式  -  1个字符串参数，返回样式值
         * 2、批量添加样式 - 1个对象参数，返回this
         * 3、添加单个样式 - 2个字符串参数，返回this
         * */
        css: function(key, val) {
            /*
            * 1、参数为1并且为字符串
            * 1.1、获取第一个元素指定的样式并返回
            * 2、参数为1并且为对象
            * 2.1、先遍历得到所有的元素
            * 2.2、再遍历传入的对象，得到要设置的样式
            * 2.3、分别给每一个元素设置样式
            * 2.4、返回this链式编程
            * 3、参数为2并且都为字符串
            * 3.1、先遍历得到所有的元素
            * 3.2、分别给每一个元素设置传入的样式
            * 3.3、返回this链式编程
            * */
            var arg = arguments, argLen = arg.length;

            // 参数为1并且为字符串，获取第一个元素指定的样式并返回
            if(argLen === 1 && jQuery.isStr(key)) {
                return jQuery.getStyle(this.get(0), key);
            }

            // 参数为1并且为对象，批量给所有元素设置样式
            else if(argLen === 1 && jQuery.isObj(key)) {

                // 遍历得到所有元素
                return this.each(function(i, elem) {

                    // 遍历得到所有样式名与样式
                    jQuery.each(key, function(styleName, style) {

                        // 给每一个元素分别设置样式
                        elem.style[styleName] = style;
                    });
                });
            }

            // 参数为2并且都为字符串，给所有元素设置传入的样式
            else if(argLen === 2 && jQuery.isStr(key) && jQuery.isStr(val)) {

                // 遍历得到所有元素
                return this.each(function() {

                    // 给每一个元素设置传入的样式
                    this.style[key] = val;
                });
            }
        },

        /*
         * css的五种使用方式：
         * 1、获取第一个元素的样式  -  1个字符串参数，返回样式值
         * 2、批量添加样式 - 1个对象参数，返回this
         * 2.1、对象中的val是字符串值
         * 2.2、对象中的val是方法，需要调用方法得到具体的值
         * 3、添加单个样式 - 2个参数，返回this
         * 3.1、第二个参数是字符串值
         * 3.2、第二个参数是函数，需要调用函数得到具体的值
         * */
        _css: function(key, val) {
            /*
             * 一、参数为1
             * 1、为字符串
             * 1.1、获取第一个元素指定的样式并返回
             *
             * 2、为对象
             * 1.1、先遍历得到所有的元素
             * 1.2、再遍历传入的对象
             * 1.2.1、对象的值为字符串
             * 1.2.1.1、直接给元素设置即可
             *
             * 1.2.2、对象的值为方法
             * 1.2.2.1、执行该方法，
             * 1.2.2.2、需要修改其this为当前遍历到的元素
             * 1.2.2.3、需要传入元素的下标与要设置样式的当前值
             * 1.2.2.4、给元素设置样式为函数的返回结果
             *
             * 二、参数为2，第一个都为字符串
             * 1.1、第二个参数为字符串
             * 1.1.1、先遍历得到所有的元素
             * 1.1.2、给每一个元素设置值
             *
             * 1.2、第二个参数为函数
             * 1.2.1、先遍历得到所有的元素
             * 1.2.2、然后调用函数
             * 1.2.3、需要修改其this为当前遍历到的元素
             * 1.2.4、需要传入元素的下标与要设置样式的当前值
             * 1.2.5、给元素设置样式为函数的返回结果
             * */
            var arg = arguments, argLen = arg.length;

            if(argLen === 1) {

                // string
                if(jQuery.isStr(key)) {
                    return jQuery.getStyle(this.get(0), key);
                }

                // object
                else if(jQuery.isObj(key)) {

                    // 遍历实例，得到元素
                    this.each(function(i, elem) {

                        // 遍历对象，得到的值为string || function
                        jQuery.each(key, function(k, v) {

                            // 对象的值为string
                            if(jQuery.isStr(v)) {
                                elem.style[k] = v;
                            }
                            // 对象的值为function
                            else if(jQuery.isFun(v)) {
                                elem.style[k] = v.call(elem, i, jQuery.getStyle(elem, k));
                            }
                        });
                    });
                }
            }

            else if(argLen === 2 && jQuery.isStr(key)) {

                // 第二参数为stirng
                if(jQuery.isStr(val)) {
                    this.each(function() {
                        this.style[key] = val;
                    });
                }
                // 第二参数为function
                else if(jQuery.isFun(val)) {
                    this.each(function(i) {
                        this.style[key] = val.call(this, i, jQuery.getStyle(this, key));
                    });
                }
            }

            // 链式编程，返回this
            return this;
        },

        /*
         * attr的三种使用方式：
         * 1、获取第一个元素的属性节点值  -  1个字符串参数，返回值
         * 2、批量添加属性节点 - 1个对象参数，返回this
         * 3、添加单个属性节点值  - 2个字符串参数，返回this
         * */
        attr: function(key, val) {
            /*
             * 1、参数为1并且为字符串
             * 1.1、获取第一个元素指定的属性节点值并返回
             * 2、参数为1并且为对象
             * 2.1、先遍历得到所有的元素
             * 2.2、再遍历传入的对象，得到要设置的属性节点
             * 2.3、分别给每一个元素设置属性节点
             * 2.4、返回this链式编程
             * 3、参数为2并且都为字符串
             * 3.1、先遍历得到所有的元素
             * 3.2、分别给每一个元素设置传入的属性节点
             * 3.3、返回this链式编程
             * */

            var arg = arguments, argLen = arg.length;

            if(argLen === 1 && jQuery.isStr(key)) {
                return this.get(0).getAttribute(key);
            }else if(argLen === 1 && jQuery.isObj(key)) {
                return this.each(function(i, elem) {
                    jQuery.each(key, function(k, v) {
                        elem.setAttribute(k, v);
                    });
                });
            }else if(argLen === 2 && jQuery.isStr(key) && jQuery.isStr(val)){
                return this.each(function() {
                    this.setAttribute(key, val);
                });
            }
        },

        /*
         * prop的三种使用方式：
         * 1、获取第一个元素的属性值  -  1个字符串参数，返回值
         * 2、批量添加属性 - 1个对象参数，返回this
         * 3、添加单个属性值  - 2个字符串参数，返回this
         * */
        prop: function(key, val) {
            var arg = arguments, argLen = arg.length;

            if(argLen === 1 && jQuery.isStr(key)) {
                return this.get(0)[key];
            }else if(argLen === 1 && jQuery.isObj(key)) {
                return this.each(function(i, elem) {
                    jQuery.each(key, function(k, v) {
                        elem[k] = v;
                    });
                });
            }else if(argLen === 2 && jQuery.isStr(key) && jQuery.isStr(val)){
                return this.each(function() {
                    this[key] = val;
                });
            }
        },

        /*
         * 只要有一个元素有，那么就返回true，都没有返回false。
         * */
        hasClass: function(cName) {

            var has = false;
            this.each(function() {
                if( (' ' + this.className + ' ').indexOf(' '+ cName +' ') > -1 ) {
                    has = true;
                    return false;
                }
            });
            return has;
        },

        /*
        * 批量给所有元素添加class
        * */
        addClass: function(classes) {
            /*
            * 1、使用split把classes劈成数组
            * 2、遍历得到每一个元素
            * 3、再遍历数组得到每一个class
            * 4、如果元素不存在遍历到的单个class，那么累加进去
            * 5、链式编程返回this
            * */

            // 使用split把classes劈成数组
            classes = classes.split(' ');

            // 遍历得到每一个元素
            return this.each(function(i, elem) {

                // 把元素包装成JQ实例才可以复用hasClass方法
                var $elem = jQuery(elem);

                // 遍历数组得到每一个class，元素没有就累加进去
                jQuery.each(classes, function(i, c) {
                    if(!$elem.hasClass(c)) {
                        elem.className += ' ' + c;
                    }
                });
            });
        },

        /*
         * 不传参数删除全部class，
         * 传参可以批量删除指定class。
         * */
        removeClass: function(classes) {
            /*
             * 1、使用split把classes劈成数组
             * 2、遍历得到每一个元素
             * 3、再遍历数组得到每一个class
             * 4、然后取出元素的className使用replace把遍历到的class剔除
             * 5、最终把剔除过的className重新赋值给元素
             * 6、链式编程返回this
             * */

            // 1、使用split把classes劈成数组
            classes = classes.split(' ');

            // 2、遍历得到每一个元素
            return this.each(function() {

                // 把元素的className取出缓存
                var tempClassName = ' ' + this.className + ' ';

                // 3、再遍历数组得到每一个class
                jQuery.each(classes, function(i, c) {

                    // 不断剔除class
                    tempClassName = tempClassName.replace(' ' + c + ' ', ' ');
                });

                // 把剔除后的className重新赋值给元素
                this.className = tempClassName;
            });
        },

        /*
         * 不传参数删除全部class，
         * 传参可以批量删除指定class。
         * */
        _removeClass: function(classes) {
            /*
             * 1、参数个数为0
             * 2、遍历得到每一个元素
             * 3、设置元素的className属性为空字符串即可
             *
             * 1、使用split把classes劈成数组
             * 2、遍历得到每一个元素
             * 3、再遍历数组得到每一个class
             * 4、然后取出元素的className使用replace把遍历到的class剔除
             * 5、最终把剔除过的className重新赋值给元素
             * 6、链式编程返回this
             * */

            if(arguments.length === 0) {
                return this.each(function() {
                    this.className = '';
                });
            }else {
                // 1、使用split把classes劈成数组
                classes = classes.split(' ');

                // 2、遍历得到每一个元素
                return this.each(function() {

                    // 把元素的className取出缓存
                    var tempClassName = ' ' + this.className + ' ';

                    // 3、再遍历数组得到每一个class
                    jQuery.each(classes, function(i, c) {

                        // 不断剔除class
                        tempClassName = tempClassName.replace(' ' + c + ' ', ' ');
                    });

                    // 把剔除后的className重新赋值给元素
                    this.className = tempClassName;
                });
            }
        },

        /*
        * 有则删除，无则添加
        * */
        toggleClass: function(classes) {
            /*
            * 1、使用split把classes劈成数组
            * 2、遍历得到每一个元素
            * 3、再遍历数组得到每一个class
            * 4、元素有则删除，无则添加
            * 5、链式编程返回this
            * */
            classes = (classes || '').split(' ');
            return this.each(function() {

                // 注意要复用之间的实例成员，需要把elem包装成实例才行
                var $elem = jQuery(this);
                jQuery.each(classes, function(i, c) {
                    if($elem.hasClass(c)) {
                        $elem.removeClass(c);
                    }else {
                        $elem.addClass(c);
                    }
                });
            });
        },

        /*
         * 1、不传参获取第一个元素的value属性
         * 2、传参给每一个元素都设置，返回this
         * 3、传入null，清除元素的value属性
         * */
        val: function(val) {

            // 不传参借用prop获取第一个元素的value属性返回
            if(arguments.length === 0) {
                return this.prop('value')
            }

            // 借用prop方法设置元素的value属性
            else {
                return this.prop('value', val == null? '': val);
            }
        },

        /*
         * 1、不传参获取第一个元素的innerHTML属性
         * 2、传参给每一个元素都设置，返回this
         * 3、传入null，清除元素的innerHTML属性
         * */
        html: function(val) {

            // 不传参借用prop获取第一个元素的innerHTML属性返回
            if(arguments.length === 0) {
                return this.prop('innerHTML');
            }

            // 借用prop方法设置元素的innerHTML属性
            else {
                return this.prop('innerHTML', val == null? '': val);
            }
        },

        /*
         * 1、不传参获取所有元素的innerText属性
         * 2、传参给每一个元素都设置，返回this
         * 3、传入null，清除元素的innerText属性
         * */
        text: function(val) {

            var result = '';

            // 不传参获取所有元素的innerText属性一起返回
            if(arguments.length === 0) {
                this.each(function() {
                    result += this.innerText;
                });
                return result;
            }

            // 借用prop方法设置元素的innerText属性
            else {
                return this.prop('innerText', val == null? '': val);
            }
        },

        /*
         * 1、不传参获取所有元素的innerText属性
         * 2、传参给每一个元素都设置，返回this
         * 3、传入null，清除元素的innerText属性
         * */
        _text: function(val) {

            // 不传参获取所有元素的innerText属性一起返回
            if(arguments.length === 0) {

                // 使用静态map收集每一个元素的innerText，
                // 最后返回一个数组，再使用join方法变成字符串返回
                return jQuery.map(this, function() {
                    return this.innerText;
                }).join('');
            }

            // 借用prop方法设置元素的innerText属性
            else {
                return this.prop('innerText', val == null? '': val);
            }
        }
    });

})(window);
