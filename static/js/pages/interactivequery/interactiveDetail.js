$(function () {
    // 交互状态tab切换
    $(".tab-title li").on("click", function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".tab-content").eq(index).removeClass("hide").siblings().addClass("hide");
    });

    //显示附件信息
    $(".file-item").on("mouseover", function () {
        $(this).find(".file-detail").removeClass("hide");
    }).on("mouseleave", function () {
        $(this).find(".file-detail").addClass("hide");
    })
});