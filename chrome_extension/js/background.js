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


window.onbeforeunload = function () {
    console.log("background.js  onbeforeunload.....")
};

window.onload = function () {
    console.log("background.js  onload.....")
//创建一个通知面板

    // chrome.notifications.create(
    //     Math.random() + '',  // id
    //
    //     {
    //
    //         type: 'list',
    //
    //         iconUrl: 'img/ic_teemo.png',
    //
    //         appIconMaskUrl: 'img/ic_teemo.png',
    //
    //         title: '通知主标题',
    //
    //         message: '通知副标题',
    //
    //         contextMessage: '好开心呀，终于会使用谷歌扩展里面的API了！',
    //
    //         buttons: [{title: '按钮1的标题', iconUrl: 'img/ic_teemo.png'}, {title: '按钮2的标题', iconUrl: 'img/ic_teemo.png'}],
    //
    //         items: [{title: '消息1', message: '今天天气真好！'}, {title: '消息2', message: '明天天气估计也不错！'}],
    //
    //         eventTime: Date.now() + 2000
    //
    //     },
    //
    //     (id) => {
    //
    //         console.log(id);
    //
    //     }
    // );

};

/**
 * 监听来自content-script的消息
 *
 * request:
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(JSON.stringify(request));

    if (request.code === 100900001) {//content发送的 Url

        let data = {
            isShow: request.url === 'https://www.baidu.com/',
            injectHtml:
                `
    <div id="teemo_logo" class="teemo_show">
        <img width="50px" height="50px" style="border-radius:25px"
             src=" https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3853438363,2898496628&fm=58 " alt="提莫驿站"/>
        <div class="teemo_button_container">
            <button onclick="teemo_getDownloadUrl()">下载 PNG</button>
            <button onclick="teemo_getDownloadUrl()">下载 PSD</button>
        </div>
    </div>
<script type="text/javascript">
                 
function teemo_getDownloadUrl(){
    $.get("https://api.apiopen.top/todayVideo",
        function (data, status) {
            teemo_downloadFile("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3247626063,1548382144&fm=26&gp=0.jpg")
        });
}
</script>                         
`,
            injectCss:
                `

        .teemo_show {
            z-index: 9999;
            position: fixed ! important;
            right: 30px;
            top: 90px;
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 25px;
            padding: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: yellowgreen;
            transition: width 0.5s, height 0.5s, padding 0.5s, border-radius 0.5s;
            -moz-transition: width 0.5s, height 0.5s, padding 0.5s, border-radius 0.5s, -moz-transform 0.5s;
            -webkit-transition: width 0.5s, height 0.5s, padding 0.5s, border-radius 0.5s, -webkit-transform 0.5s;
            -o-transition: width 0.5s, height 0.5s, padding 0.5s, border-radius 0.5s, -o-transform 0.5s;
        }

        .teemo_show:hover {
            width: 200px;
            height: 300px;
            border-radius: 5px;
            padding: 10px;

        }

        .teemo_button_container {
            display: flex;
            width: 80%;
            flex-direction: column;
            margin-top: 30px;
        }

        .teemo_button_container button {
            width: 100%;
            height: 36px;
            display: block;
            margin: 0 auto 22px;
            text-align: center;
            color: #fff;
            background: #5599FF;
            outline: none;
            border-width: 0px;
            border-radius: 3px;
        }

        .teemo_button_container button:hover {
            background: #4e9fef;
        }

            `,

        };
        sendResponse(data)
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


//注入 html
function injectJs(html) {
    $('body').append(html);

}


// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    console.log(details)
    var headStr = '';
    for (var i = 0; i < details.requestHeaders.length; ++i) {
        let header = details.requestHeaders[i];
        headStr = headStr + header.name + ':"' + header.value + '",';
    }
    console.log(headStr);

    details.requestHeaders[details.requestHeaders.length] = {
        name: 'Cookie',
        value: 'USER_TOKEN=CCA8X3F6PMFTzqAjr_BX24KVGKUVHvu0378a8LQ_AheuFbZO19wmMckOkUfXST7tbzwPB2TvMcDHRSdCV8lZnA'
    };
    // details.requestHeaders[8]={name:'if-modified-since',value:"Fri, 11 Jan 2019 03:11:46 GMT"};

    console.log(details)
    return {requestHeaders: details.requestHeaders};

}, {urls: ["<all_urls>"]}, ["requestHeaders"]);

