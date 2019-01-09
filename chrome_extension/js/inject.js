console.log('这是 inject.js');
/**
 * 功能：
 * 1.添加一个悬浮 logo ，点击后展示下载内容
 * 2.将点击事件传递给 content-script
 *
 *
 * code编号：500
 *
 * Code 规则：formCode + toCode + actionCode
 */



//页面加载完成后
$(function () {
    console.log('onLoad：' + window.location.href);
    // showButton()
});

//在页面显示下载按钮
function showButton() {
    $('body').append('<div id="dg" style="z-index: 9999; position: fixed ! important; right: 30px; top: 90px;">我是悬浮按钮</div>');

}

//监听 content-script 发送的事件
window.addEventListener('message', function (e) {
    console.log('this is Inject,addEventListener')

}, false);








