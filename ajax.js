jQuery.extend({

    // ajax默认的配置
    ajaxSettings: {
        url: location.href,
        type: "GET",
        async: true,
        dataType: null,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        complete: function(){},
        success: function(){},
        error: function(){}
    },

    // 解析JSON数据为js对象
    parseJSON: function( JSONStr ) {
        var obj;

        try {
            obj = JSON.parse( JSONStr );
        }catch (e) {
            obj = Function( 'return ' + JSONStr )();
        }

        return obj;
    },

    // 执行js脚本
    parseScript: function( script )  {
        Function( script )();
    },

    // 给页面动态添加style样式表
    parseStyle: function( style ) {
        $('<style></style>').html( style ).appendTo( 'head' );
    },

    // 把js数据转换为url参数数据的形式
    stringifyData: function( data ) {
        var result = '', key;

        for( key in data ) {

            // 为了防止IE浏览器发送的数据出现乱码，统一转换为URI编码形式的字符串
            result += encodeURIComponent( key ) + '=' + encodeURIComponent( data[ key ] ) + '&';
        }

        // 去掉最后一个多余的&符号并返回
        return result.slice( 0, -1 );
    },

    // 返回一个计算好的配置对象
    parseConfig: function( options ) {
        var config = {};
        config = jQuery.extend( config, jQuery.ajaxSettings, options );

        // 统一把type转换为大写
        config.type = config.type.toUpperCase();

        // 如果是get请求，把数据转换后添加url中，然后设置config.data为null
        if( config.type === 'GET' ) {
            config.url += '?' + jQuery.stringifyData( config.data );
            config.data = null;
        }

        // 如果是poat请求，把数据转换即可
        else if( config.type === 'POST' ) {
            config.data = jQuery.stringifyData( config.data );
        }

        return config;
    },

    // 发送ajax
    ajax: function( options ) {
        /*
         * 实现思路：
         * 1、根据用户传入的配置和默认的配置得到一份融合后的配置
         * 2、创建xhr对象
         * 3、open
         * 4、监听onreadystatechange事件
         * 4.1、readyState 为 4的时候，证明请求完成了，可以执行complete
         * 4.2、status在200~300之间，或者304，证明请求成功，可以执行success，否则error
         * 5、send
         * */

        var config = jQuery.parseConfig( options ), result;

        var xhr = new XMLHttpRequest();
        xhr.open( config.type, config.url, config.async );

        // 如果是POST请求发送的数据，那么通过Content-Type告知后台我们传送的数据格式是什么，
        // 让对方根据我们的格式做相应的解析。
        if( config.type === 'POST' ) {
            xhr.setRequestHeader( 'Content-Type', config.contentType );
        }
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 ) {
                config.complete();

                // 请求成功，根据dataType对请求回来的数据做相应的处理
                if( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 304 ) {

                    switch ( config.dataType ) {

                        // 如果请求的是JSON，帮用户解析后传入成功回调
                        case 'JSON':
                            result = jQuery.parseJSON( xhr.responseText );
                            break;

                        // 如果请求的是脚本，帮用户执行，然后原物返回
                        case 'script':
                            jQuery.parseScript( xhr.responseText );
                            result = xhr.responseText;
                            break;

                        // 如果请求的是css样式表，帮用户执行，然后原物返回
                        case 'style':
                            jQuery.parseStyle( xhr.responseText );
                            result = xhr.responseText;
                            break;

                        // 其他类型全部原物返回
                        default:
                            result = xhr.responseText;
                            break;
                    }

                    config.success && config.success( result, xhr.statusText, xhr );
                }

                // 请求失败
                else {
                    config.error( xhr, xhr.statusText, { msg: '失败了' } );
                }
            }
        };
        xhr.send( config.data );
    },

    // 提供一个发送get请求的便捷方法
    get: function( url, data, fn ) {
        fn = fn || jQuery.isFunction(data)? data: null;
        data = jQuery.isFunction(data)? null: data;

        jQuery.ajax({
            type: 'get',
            url: url,
            data: data,
            success: fn
        });
    },

    // 提供一个发送post请求的便捷方法
    post: function() {
        fn = fn || jQuery.isFunction(data)? data: null;
        data = jQuery.isFunction(data)? null: data;

        jQuery.ajax({
            type: 'post',
            url: url,
            data: data,
            success: fn
        });
    },

    // 请求一个JSON数据
    getJSON: function( url, fn ) {
        jQuery.ajax({
            type: 'get',
            dataType: 'JSON',
            url: url,
            success: fn
        });
    },

    // 请求一个JSON数据
    getScript: function( url, fn ) {
        jQuery.ajax({
            type: 'get',
            dataType: 'script',
            url: url,
            success: fn
        });
    },

    // 请求一个css样式表数据
    getCss: function( url, fn ) {
        jQuery.ajax({
            type: 'get',
            dataType: 'style',
            url: url,
            success: fn
        });
    }
});
