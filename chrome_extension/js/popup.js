/**
 *
 * code编号：300
 *
 * Code 规则：formCode + toCode + actionCode
 */
var currentTabID;
var currentTabURL;

$(function () {

    // 加载设置
    var defaultConfig = {userId: 0, avatar: "", name: ""}; // 默认配置
    // chrome.storage.sync.get(defaultConfig, function (items) {
    //     document.body.style.backgroundColor = items.color;
    // });

    //获取当前 tabId
    // var arguments = getUrlVars();
    // if (arguments.url === undefined) {
    //     chrome.tabs.query(
    //         {
    //             active: true,
    //             lastFocusedWindow: true
    //         },
    //         function (tabs) {
    //             currentTabURL = tabs[0].url;
    //             currentTabID = tabs[0].id;
    //         }
    //     );
    // } else {
    //     currentTabURL = decodeURI(arguments.url);
    //     currentTabID = parseInt(decodeURI(arguments.id));
    // }


    var tabs = $(".tabs li a");
    tabs.click(function () {
        var content = this.hash.replace('/', '');
        tabs.removeClass("active");
        $(this).addClass("active");
        $(".tabs_content").hide();
        $(content).fadeIn(200);
    });

    $(".tabs_content").hide();
    $("#one").show()
});


$('#getCurrentUrl').click(function () {

    // chrome.tabs.getSelected(null, function (tab) {
    //     chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function (response) {
    //         console.log(response);　　// 向content-script.js发送请求信息
    //     });
    // });
});

$('#test').click(function () {
    // var bg = chrome.extension.getBackgroundPage();
    // bg.test();

});

$('#getCookie').click(function () {
    // getCookiesJson(currentTabID, currentTabURL, function (json) {
    //     alert(json)
    // })
    window.open('http://www.imooc.com', '_blank', 'width=300,height=200,menubar=no,toolbar=no, status=no,scrollbars=yes')
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log('收到来自content-script的消息：');
//     console.log(request, sender, sendResponse);
//     sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
// });

function getCurrentTabUrl(listen) {
    // chrome.tabs.getSelected(null, function (tab) {
    //     listen(tab.url)
    // });
}

/**
 * 检查是否需要升级
 * @returns {boolean}
 */
function isNeedUpdate() {

    return false
}

/**
 *  显示升级提示
 */
function showUpdateTip() {
    if (confirm("尊敬的用户，检测到有新的版本。\n" +
        "请您升级至最新版本后再使用。\n" +
        "是否下载升级？")) {

    }
}