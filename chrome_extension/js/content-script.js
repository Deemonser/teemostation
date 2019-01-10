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

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
    //发送当前 URl
    sendMessageToBackground({code: 100900001, url: window.location.href}, function (response) {
        tip('收到来自后台的回复：' + JSON.stringify(response));
        if (response.isShow) {
            injectLogo(response.injectHtml);
        }
    })


});


// 主动发送消息给后台
function sendMessageToBackground(message, response) {
    chrome.runtime.sendMessage(message, response);
}


// 简单的消息通知
function tip(info) {
    console.log(info);
}


//注入 html
function injectLogo(html) {
    $('body').append(html);

}


function teemo_event(data) {
    console.log('teemo_custome_event:'+JSON.stringify(data))
    sendMessageToBackground(data, function (response) {})
}