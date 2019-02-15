console.log('这是content script!');

/**
 *  功能：
 *  ①将当前页面 URL 发送到 background
 *  ②接收后台消息，是否注入 JS，并接受展示内容
 *  3.添加一个悬浮 logo ，点击后展示下载内容
 *
 *  code编号：100
 *  Code 规则：formCode + toCode + actionCode
 */

/**
 *  判读字符串是否空
 */
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}


// 主动发送消息给后台
function sendMessageToBackground(message, response) {
    chrome.runtime.sendMessage(message, response);
}



//注入 html
function loadHtmlString(html) {
    $('body').append(html);
}


function teemo_event(data) {
    console.log('teemo_custome_event:' + JSON.stringify(data))
    sendMessageToBackground(data, function (response) {
    })
}


/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function dynamicLoadJs(url, callback) {
    if (isEmpty(url)) return;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (typeof(callback) == 'function') {
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}


/**
 * 动态加载CSS
 * @param {string} url 样式地址
 */
function dynamicLoadCss(url) {
    if (isEmpty(url)) return;
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}


/**
 * 动态加载js脚本
 * @param {string} code js脚本
 */
function loadScriptString(code) {
    if (isEmpty(code)) return;
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        // firefox、safari、chrome和Opera
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        // IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
        script.text = code;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
}


/**
 * 动态加载css脚本
 * @param {string} cssText css样式
 */
function loadStyleString(cssText) {
    if (isEmpty(cssText)) return;
    var style = document.createElement("style");
    style.type = "text/css";
    try {
        // firefox、safari、chrome和Opera
        style.appendChild(document.createTextNode(cssText));
    } catch (ex) {
        // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
        style.styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}


/**
 * 下载文件
 */
function teemo_downloadFile(url) {
    if (isEmpty(url)) return;

    download(url)
}




// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
    // loadJQuery();

    //发送当前 URl
    sendMessageToBackground({code: 100900001, url: window.location.href}, function (response) {
        if (response.isShow) {
            loadStyleString(response.injectCss);
            loadHtmlString(response.injectHtml);
        }
    })

});


