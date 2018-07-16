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
        $("#uploadfile").parent().before("<div>"+filename+"</div>");
    });
});