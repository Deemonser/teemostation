console.log('This is background of TeemoStation')
/**
 *功能
 *
 *①刷新状态，如果登录了，下载支持的 URL，并保存到本地
 *②接收content-script 传来的 URL，判断是否注入 Inject.js
 *③
 */

function test() {
    alert('我是background！');
}


/**
 * 监听来自content-script的消息
 *
 * request:
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});


function refreshStatus() {

}