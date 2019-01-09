console.log('This is background of TeemoStation')

/**
 *功能
 *
 *①刷新状态，如果登录了，下载支持的 URL列表，并保存到本地
 *②接收content-script 传来的 URL，判断是否注入 Inject.js
 *
 * code编号：900
 * Code 规则：formCode + toCode + actionCode
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

    if (request.code === 100900001) {//content发送的 Url
        sendResponse({isShow: true,content:[]})
    } else if (request.code === 100900002) {

    }

});

/**
 *  刷新登录状态，下载支持的 URL 列表
 */
function refreshStatus() {

}

/**
 *  保存支持的 URL 列表清单
 */
function saveSupportList() {

}



