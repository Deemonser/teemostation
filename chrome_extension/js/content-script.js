console.log('这是content script!');
/**
 *  功能：
 *  ①将当前页面 URL 发送到 background
 *  ②接收后台消息，是否注入 JS，并接受展示内容
 *  ③监听 Inject 的点击事件，并发送到 Background
 *
 *  code编号：100
 *  Code 规则：formCode + toCode + actionCode
 */

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
    //发送当前 URl
    sendMessageToBackground({code: 100900001, url: window.location.href}, function (response) {
        tip('收到来自后台的回复：' + response);
        if (response.isShow) {
            injectCustomJs()
            window.postMessage(response.content)
        }
    })
});


// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        // this.parentNode.removeChild(this);
    };
    document.body.appendChild(temp);
}


// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
    tip(JSON.stringify(request));
    sendResponse('我收到你的消息了：' + JSON.stringify(request));
});

// 主动发送消息给后台
function sendMessageToBackground(message, response) {
    chrome.runtime.sendMessage(message, response);
}

// 监听 Inject.js 的消息
window.addEventListener('message', function (evt) {

}, false);

var tipCount = 0;

// 简单的消息通知
function tip(info) {
    console.log(info);
}