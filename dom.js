jQuery.extend({

    // 根据规则对一组元素进行过滤
    filter: function(elems, selector) {
        /*
        * 1、先通过选择器去页面中获取元素
        * 2、然后遍历获取到的元素
        * 3、在遍历传入的元素
        * 4、找到其中的交集，交由map统一收集返回
        * */
        var nSelecotr = document.querySelectorAll(selector);
        return jQuery.map(nSelecotr, function() {
            var i = 0, len = elems.length;
            for(; i < len; i++) {
                if(elems[i] === this) {
                    return this;
                }
            }
        });
    },

    // 获取元素的上一个元素
    prevElem: function(elem) {

        // 现代浏览器
        if(elem.previousElementSibling) {
            return elem.previousElementSibling
        }

        while(elem = elem.previousSibling) {
            if(elem.nodeType === 1) {
                return elem;
            }
        }
    },

    // 获取元素所有前面的元素
    prevElemAll: function(elem) {
        var result = [];

        // 不断获取上一个元素，直到没有
        while(elem = jQuery.prevElem(elem)) {
            result.push(elem);
        }

        return result;
    },

    // 获取元素的下一个元素
    nextElem: function(elem) {
        var nextElem = null;

        // 现代浏览器
        if(elem.nextElementSibling) {
            return elem.nextElementSibling;
        }

        // 一直寻找元素下一个节点，
        // 直到没有下一个或者找到元素为止。
        nextElem = elem;                            // 起始从elem开始
        while(nextElem = nextElem.nextSibling) {
            if(nextElem.nodeType === 1) {
                return nextElem;
            }
        }
    },

    // 获取元素的后面所有的元素
    nextElemAll: function(elem) {
        var result = [];
        var nextElem = elem;                        // 起始从elem开始

        while(nextElem = jQuery.nextElem(nextElem)) {
            result.push(nextElem);
        }

        return result;
    },

    // 判断数组中是否已经存在某值
    indexOf: function(arr, val) {
        var i, len;
        for(i = 0, len = arr.length; i < len; i++) {
            if(arr[i] === val) {
                return i;
            }
        }
        return -1;
    }
});

jQuery.fn.extend({

    // 把自己添加到指定的父元素中
    // 参数可以是selector || DOM || jQ
    // 返回所有被添加子元素组成的新实例
    appendTo: function(parent) {
        /*
        * 1、先通过jQuery把参数统一包装成jQ实例
        * 2、先遍历父实例(包装的对象)
        * 3、再遍历子实例(this)
        * 4、给父添加每一个子，需要注意只有第一个父添加子本体，以后添加clone版本
        * 5、每添加一个子都需要存储到一个数组中
        * 6、最后通过pushStack把数组包装的jQ实例，并记录上级链然后返回
        * */

        var $parents = jQuery(parent);
        var $sons = this;
        var result = [];

        // 遍历父
        $parents.each(function(i, p) {

            // 遍历子
            $sons.each(function() {

                // 第一个父添加子本体，以后添加clone版本，再把被添加的子存储到数组中
                result.push(p.appendChild(i === 0? this: this.cloneNode(true)));
            });
        });

        // 所有被添加的子包装成新实例，并记录上级链返回
        return this.pushStack(result);
    },

    // 把自己添加到指定的父元素最前面
    // 参数可以是selector || DOM || jQ实例
    // 返回所有被添加子元素组成的新实例
    prependTo: function(parent) {

        var $parent = jQuery(parent);
        var $son = this;
        var result = [];

        // 遍历父
        $parent.each(function(i, p) {

            // 遍历子
            $son.each(function() {

                // 第一个父添加本体，以后clone版本；
                // 添加之后还要把子元素push到result中。
                result.push(p.insertBefore(i === 0? this: this.cloneNode(true), p.firstChild));
            });
        });

        return this.pushStack(result);
    },

    // 给自己添加子元素
    // 参数可以是string || DOM || jQ实例
    // 返回父元素实例，即this
    append: function(son) {
        /*
        * 1、如果son是字符串，先通过createHTML转换为dom节点
        * 2、使用jQuery统一包装成实例
        * 3、遍历父(this)
        * 4、遍历子(参数包装成的新实例)
        * 5、父添加子，注意clone
        * 6、链式编程返回this
        * */

        // 字符串先转换为DOM
        if(jQuery.isStr(son)) {
            son = jQuery.createHTML(son);
        }

        // 统一包装成实例方便统一处理
        var $son = jQuery(son);

        // 遍历父
        return this.each(function(i, p) {

            // 遍历子
            $son.each(function() {

                // 父加子，注意clone
                p.appendChild(i === 0? this: this.cloneNode(true));
            });
        });
    },

    _append: function(son) {

        // 字符串先转换为DOM
        if(jQuery.isStr(son)) {
            son = jQuery.createHTML(son);
        }

        // 包装成实例借用appendTo方法把自己添加到父
        jQuery(son).appendTo(this);

        // 链式编程返回this【】
        return this;
    },

    // 给自己添加子元素，子元素放置在最前面
    // 参数可以是string || DOM || jQ实例
    // 返回父元素实例，即this
    prepend: function(son) {

        // 字符串先转换为DOM
        // 然后统一包装成实例方便统一处理
        if(jQuery.isStr(son)) {
            son = jQuery.createHTML(son);
        }
        var $son = jQuery(son);

        // 遍历父
        return this.each(function(i, p) {
            var pFirstChild = p.firstChild;

            // 遍历子
            $son.each(function() {

                // 父加子，注意clone
                p.insertBefore(i === 0? this: this.cloneNode(true), pFirstChild);
            });
        });
    },

    prepend: function(son) {

        // 字符串先转换为DOM
        if(jQuery.isStr(son)) {
            son = jQuery.createHTML(son);
        }

        jQuery(son).prependTo(this);

        return this;
    },

    // 把自己添加到某兄弟元素的前面
    insertBefore: function( sibling ) {
        /*
         * 实现思路：
         * 1、先把sibling包装成jQ对象统一处理
         * 2、遍历所有的sibling，然后得到他们的每一个父元素
         * 3、遍历所有的子元素
         * 4、父添加子，第一个父添加子元素本体，以后clone
         * 5、收集所有被添加的子元素，然后使用pushStack包装返回
         * */
        var $sibling = jQuery( sibling );
        var $sons = this;
        var result = [];

        // 遍历所有的sibling
        $sibling.each(function( i ) {

            var sibling = this;
            var parent = this.parentNode;

            // 遍历所有被添加的子元素
            $sons.each(function() {

                // 把子元素添加到指定兄弟元素的前面，第一个父添加是子元素本体，以后是clone的，
                // 最后把被添加的元素统一存储到一个容器中
                result.push( parent.insertBefore( i === 0? this: this.cloneNode(true), sibling ) );
            });
        });

        return this.pushStack( result );
    },

    // 在自己的前面添加兄弟节点
    before: function( sibling ) {

        // 如果sibling为字符串，先要转换为DOM
        if( $.isString( sibling ) ) {
            sibling = $.parseHTML( sibling );
        }

        var $sibling = jQuery( sibling );

        // 复用insertBefore把$sibling添加到this的前面
        $sibling.insertBefore( this );

        // 链式编程返回this
        return this;
    },

    // 获取所有元素的直接子元素
    // 返回子元素包装成的新实例
    children: function() {
        /*
        * 1、遍历得到每一个元素
        * 2、得到他们的children
        * 3、最终把所有children包装成新实例返回
        * */

        var result = [];

        this.each(function() {
            result.push.apply(result, this.children);
        });

        return this.pushStack(result);
    },

    find: function(selector) {
        var result = [];
        this.each(function() {
            result.push.apply(result, this.querySelectorAll(selector));
        });
        return this.pushStack(result);
    },

    // 获取所有元素的下一个兄弟元素
    next: function() {
        /*
        * 1、遍历得到每一个元素
        * 2、找到每一个元素下一个兄弟元素
        * 3、最后把所有兄弟一起包成实例返回
        * */

        // 通过(实例的map)把所有的兄弟包成实例返回
        return this.map(function() {
            return jQuery.nextElem(this);
        });
    },

    // 获取所有元素后面的兄弟元素
    nextAll: function() {
        /*
        * 1、遍历得到每一个元素
        * 2、找到每一个元素所有后面的兄弟元素
        * 3、最后把每一个元素所有后面的兄弟一起包成实例返回
        * */
        var result = [];

        this.each(function() {
            result.push.apply(result, jQuery.nextElemAll(this));
        });

        return this.pushStack(result);
    },

    _nextAll: function() {
        var result = [];

        // 遍历每一个元素
        this.each(function() {

            // 获取元素下面所有的兄弟
            var nextElemAll = jQuery.nextElemAll(this);

            // 遍历兄弟，如果之间没有存储过，再存储
            jQuery.each(nextElemAll, function() {
                if(jQuery.indexOf(result, this) === -1) {
                    result.push(this);
                }
            });
        });

        return this.pushStack(result);
    },

    // 获取所有元素的上一个兄弟元素
    prev: function() {
        return this.map(function() {
            return jQuery.prevElem(this);
        });
    },

    // 获取所有元素前面的兄弟元素
    prevAll: function() {
        var result = [];

        // 遍历所有元素
        this.each(function() {

            // 获取每一个元素前面的所有
            var prevElemAll = jQuery.prevElemAll(this);

            // 然后前面的所有，存储之前没有存储过的
            jQuery.each(prevElemAll, function() {
                if(jQuery.indexOf(result, this) === -1) {
                    result.push(this);
                }
            });
        });

        return this.pushStack(result);
    },

    // 获取所有元素的兄弟
    siblings: function() {
        /*
        * 1、遍历得到每一个元素
        * 2、获取元素的父，再通过父获取所有子
        * 3、遍历所有子(即元素的所有兄弟，也包含了自己)，
        * 其中过滤掉自己和之前已经存储过的元素，剩下的存储起来
        * 4、最后返回所有的兄弟包装成的实例
        * */
        var result = [];

        this.each(function(i, elem) {

            // 获取包含了元素自己的所有兄弟
            var siblings = elem.parentNode.children;

            // 遍历所有的兄弟，如果之前没有存储过，并且不是元素自己，那么就存储起来
            jQuery.each(siblings, function(){
                if(jQuery.indexOf(result, this) === -1 && this !== elem) {
                    result.push(this);
                }
            });
        });

        return this.pushStack(result);
    },

    // 删除元素自己
    remove: function() {
        // 原生方法：父元素.removeChild(子元素)
        return this.each(function() {
            this.parentNode.removeChild(this);
        });
    },

    // 清空内容
    empty: function() {
        return this.html(null);
    },
    
    // 获取所有元素的父元素
    parent: function() {
        var result = [];

        this.each(function() {
            if(jQuery.indexOf(result, this.parentNode) === -1) {
                result.push(this.parentNode);
            }
        });

        return this.pushStack(result);
    },

    // 获取所有元素的祖父元素
    parents: function() {
        var result = [];

        this.each(function() {
            var p = this;

            // 不断查找父元素，如果父不是document，并且之前没有存储过，那么存储
            while((p = p.parentNode) !== document) {
                if(jQuery.indexOf(result, p) === -1) {
                    result.push(p);
                }
            }
        });

        return this.pushStack(result);
    },

    // 按照指定规则过滤元素
    filter: function(selector) {
        return this.pushStack(jQuery.filter(this, selector));
    },

    // 获取所有元素符合规则的祖父元素
    _parents: function(selector) {
        var result = [];

        this.each(function() {
            var p = this;

            // 不断查找父元素，如果父不是document，并且之前没有存储过，那么存储
            while((p = p.parentNode) !== document) {
                if(jQuery.indexOf(result, p) === -1) {
                    result.push(p);
                }
            }
        });

        // 把获取到的父元素通过静态filter方法筛选一下，然后包装返回
        return this.pushStack(jQuery.filter(result, selector));
    },
});
