$(function () {
    //点击选择按钮触发input type=file
    $("#filecontainer").click(function () {
        $('#uploadfile').click();
    });
//文件input的change事件,change上传文件方法
    $('#uploadfile').on('change',function(){
        //验证文件后缀
        var upFileName  = $('#uploadfile').val();
        var index1=upFileName.lastIndexOf(".");
        var index2=upFileName.length;
        var suffix=upFileName.substring(index1+1,index2);
        //获取文件名长度
        var arr=upFileName.split('\\');
        var filename=arr[arr.length-1];
        $("#uploadfile").parent().before("<div class='service-upload'>"+filename+"<i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i></div>");
    });
});
// 交互状态
function openConfirm() {
    layer.confirm('<i class="fa fa-exclamation-circle layicon" aria-hidden="true"></i>确定点击完毕吗？点击完毕后交互记录将无法进行流转。', {
        title:false,
        btnAlign: 'c',
        area: ['200px', '140px'],
        closeBtn:0,
        btn: ['取消','确定'],
    });
}