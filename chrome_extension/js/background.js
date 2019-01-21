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
    // details.requestHeaders[details.requestHeaders.length] = {
    //     name: 'Cookie',
    //     value: 'tvfe_boss_uuid=718e0a25b56635c5; pgv_pvid=228757964; ad_play_index=45; pgv_info=ssid=s8465444159; ts_last=v.qq.com/; ts_uid=2362075656; bucket_id=9231006; ptag=|v_qq_com; login_remember=wx; main_login=wx; vuserid=471752101; vusession=9b8cc6756b8d0cda504777bcd0f4; access_token=17_SPkcZw9oGwUU9ZsjKu4nsGdGBlVnZ5ohGc1-NOMHPfl-lBZfQAXsXwwa0Mk7cWr5s6FV6Vk3Q2ck5ed8YWKcmA; openid=ox8XOvr5CtqiFmnlwrZiGROHJzHU; appid=wx5ed58254bc0d6b7f; wx_nick=Deemons%20; wx_head=http://thirdwx.qlogo.cn/mmopen/vi_32/XwtLNH83BWYBIR66OHzfUPTAeVSAoHiauYcZpSl6P6N3BAnEGBd99qIEabGkUYlzVY9ppDjKF2r2LKDSOMQycOg/132; uid=713636338'
    // }


//     accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
// accept-encoding: gzip, deflate, br
// accept-language: zh-CN,zh;q=0.9,en;q=0.8
// cache-control: max-age=0
// cookie: tvfe_boss_uuid=13647d5810b94268; pgv_pvid=1912895578; pgv_info=ssid=s5378475460; ts_refer=www.baidu.com/link; ts_uid=1179110412; bucket_id=9231000; qv_als=IDtFyZkfsSzj2Om2A11547986951WQGjmw==; ptag=www_baidu_com|v_qq_com; login_remember=wx; main_login=wx; vuserid=471752101; vusession=894dd444fbae0e80bdea90e46d74; access_token=17_NOGTO_gH_12khph4U7bbcYttuqZDvBqO3jG2GWUQkdU86U_lpDUYLaYZfIVrHMfhE0mmr1ss0fHj9WknwHa4_w; openid=ox8XOvr5CtqiFmnlwrZiGROHJzHU; appid=wx5ed58254bc0d6b7f; wx_nick=Deemons%20; wx_head=http://thirdwx.qlogo.cn/mmopen/vi_32/XwtLNH83BWYBIR66OHzfUPTAeVSAoHiauYcZpSl6P6N3BAnEGBd99qIEabGkUYlzVY9ppDjKF2r2LKDSOMQycOg/132; uid=713636338; ts_last=v.qq.com/channel/choice; ad_play_index=85
// referer: https://www.baidu.com/link?url=RV0qLW8pliwhkMAAnxOtHDnvipIU-DEQD2mq5MXE4l_&wd=&eqid=ac672907000448e9000000065c4465e9
// upgrade-insecure-requests: 1
// user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36


    details.requestHeaders[details.requestHeaders.length] = {
        name: 'Cookie',
        value: 'USER_TOKEN=CCA8X3F6PMFTzqAjr_BX24KVGKUVHvu0378a8LQ_AheuFbZO19wmMckOkUfXST7tbzwPB2TvMcDHRSdCV8lZnA'
    };
    // details.requestHeaders[8]={name:'if-modified-since',value:"Fri, 11 Jan 2019 03:11:46 GMT"};

    console.log(details)
    return {requestHeaders: details.requestHeaders};

}, {urls: ["<all_urls>"]}, [ "requestHeaders"]);


