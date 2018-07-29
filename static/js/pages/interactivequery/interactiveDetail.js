$(function () {
    // 消息记录与流转记录tab切换
    $(".tab-box li").on("click", function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        if(index==0){
            $(".tab-content-box .tab-content").eq(0).removeClass("hide").siblings().addClass("hide");
        }
        if(index==2){
            $(".tab-content-box .tab-content").eq(1).removeClass("hide").siblings().addClass("hide");
        }
    });

    //点击选择按钮触发input type=file
    $("#filecontainer").click(function () {
        $('#uploadfile').click();
    });
//文件input的change事件,change上传文件方法
    $('#uploadfile').on('change', function () {
        //验证文件后缀
        var upFileName = $('#uploadfile').val();
        var index1 = upFileName.lastIndexOf(".");
        var index2 = upFileName.length;
        var suffix = upFileName.substring(index1 + 1, index2);
        //获取文件名长度
        var arr = upFileName.split('\\');
        var filename = arr[arr.length - 1];
        var html = '<div class="ivu-form-item file-item">' +
            '<div class="ivu-form-item-label-sm">' +
            '<label><i class="fa fa-file-word-o" aria-hidden="true"></i></label>' +
            '</div>' +
            '<div class="ivu-form-item-content-sm">' +
            '<div class="clearfix">' +
            '<div class="filebox">' +
            '<div class="file-name">' + filename + '</div>' +
            '<div class="file-opt">' +
            '<a href=""><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></a>' +
            '<i class="fa fa-times-circle" aria-hidden="true" onclick="delFile(this)"></i>' +
            '</div>' +
            '</div>' +
            '<div class="file-detail">' +
            '<span>上传人：</span><span class="name">张三</span> <span>上传时间：</span><span>' + getDate() + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $(".files").append(html);
    });

    setHeight()
// 设置日期
    laydate.render({
        elem: '#date',
        range: true//指定元素
    });
});

//删除附件
function delFile(that) {
    $(that).parents(".file-item").remove();
}

// 获取当前时间函数
function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month < 10) {
        month = "0" + month
    } else {
        month = month
    }
    return (year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second)
}


// 设置消息记录的最大高度

function setHeight() {
    var winH = $(window).height();
    $(".tab-content-box").css({"overflow-y": "auto", "max-height": winH - 120});
    $(".news-item-box").css({"overflow-y": "auto", "max-height": winH - 188});


}
