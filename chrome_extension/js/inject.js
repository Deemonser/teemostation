console.log('这是 inject.js');



//页面加载完成后
$(function () {
    console.log('onLoad：' + window.location.href);
    showButton()
});


//在页面显示下载按钮
function showButton() {
    $('body').append('<div id="dg" style="z-index: 9999; position: fixed ! important; right: 30px; top: 90px;">我是悬浮按钮</div>');

}








