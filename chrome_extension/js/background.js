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
    console.log(JSON.stringify(request));

    if (request.code === 100900001) {//content发送的 Url

        var event = {code: 100900002, content: {type: 1}};

        let data = {
            isShow: request.url === 'https://www.baidu.com/',
            injectHtml: `<div id="teemo_logo" onclick="teemo_event({code: 100900002, content: {type: 1}})" style="z-index: 9999; position: fixed ! important; right: 30px; top: 90px;">
                                <img src=" https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3853438363,2898496628&fm=58 "  alt="显示网络上的图片" />
                         </div> 
                         <script type="text/javascript">
                            
                         </script>`,
        };
        sendResponse(data)
    } else if (request.code === 100900002) {
        console.log(JSON.stringify(request))
        $.get("https://api.apiopen.top/todayVideo",
            function (data, status) {
                alert("数据：" + JSON.stringify(data) + "\n状态：" + status);
            });
    }

});


//发送消息到 ContentScript
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}


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


//注入 html
function injectJs(html) {
    $('body').append(html);

}





