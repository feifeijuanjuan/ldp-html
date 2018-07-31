$(function () {
    //页面加载完成之后执行
    //财务共享
    financeTableInit();

    HRTableInit();

    ITTableInit();
    // 日期控件
    laydate.render({
        elem: '#applydate', //指定元素
        range: true
    });
    // 日期控件
    laydate.render({
        elem: '#HR-applydate', //指定元素
        range: true
    });

    // 日期控件
    laydate.render({
        elem: '#IT-applydate', //指定元素
        range: true
    });
});
var mydata = [{
    code: "FQ-ZB032018070007",
    type: "2018-07-23",
    des: "正常申请",
    name: "FSO已完成",
    statu: "万佳",
    date: "业务类型",
    handle: '川气管道6月成本结转循环'
},
    {
        code: "FQ-ZB032018070007",
        type: "2018-07-23",
        des: "正常申请",
        name: "FSO已完成",
        statu: "万佳",
        date: "业务类型",
        handle: '川气管道6月成本结转循环'
    },
    {
        code: "FQ-ZB032018070007",
        type: "2018-07-23",
        des: "正常申请",
        name: "FSO已完成",
        statu: "万佳",
        date: "业务类型",
        handle: '川气管道6月成本结转循环'
    },
    {
        code: "FQ-ZB032018070007",
        type: "2018-07-23",
        des: "正常申请",
        name: "FSO已完成",
        statu: "万佳",
        date: "业务类型",
        handle: '川气管道6月成本结转循环'
    }
];

var HRdata = [{
    code: "XXXXXXXXXX",
    type: "XXXXXXXXXX",
    des: "FQ-ZB032018070007",
    name: "2018-07-23",
    statu: "万佳",
    date: "FSO已完成",
    handle: 'XXXXXXXXXX',
    handle1: 'XXXXXXXXXX',
    handle2: '川气管道6月成本结转循环'
}
];

var ITdata = [{
    code: "",
    type: "HR共享测试071801",
    des: "事件处理中",
    name: "万佳",
    statu: "2018-07-23",
    date: "XXXXXXXXXX",
    handle: 'XXXXXXXXXX',
    handle1: 'XXXXXXXXXX'
}
];

//财务共享
function financeTableInit() {
    $JQGrid.init({
        "id": "financeTable",
        "useCheckAll": false,
        colNames: ['申请编号', '申请日期', '申请类型', "申请状态", "申请人", "业务类型", "业务摘要"],//jqGrid的列显示名字
        colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name: 'code', index: 'code', width: 100},
            {name: 'type', index: 'type', width: 80},
            {name: 'des', index: 'des', width: 80},
            {name: 'name', index: 'name', width: 80},
            {name: 'statu', index: 'statu', width: 100},
            {name: 'date', index: 'date', width: 100},
            {name: 'handle', index: 'handle', width: 100}
        ],
        "jqObj": {
            "data": mydata,
            "datatype": "local",
            "rownumbers": false
        }
    });
}

//HR业务
function HRTableInit() {
    $JQGrid.init({
        "id": "HR-Table",
        "useCheckAll": false,
        colNames: ['服务目录', '申请类型', '申请编号', "申请日期", "申请人", "申请状态", "人事范围", "服务对象", "业务摘要"],//jqGrid的列显示名字
        colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name: 'code', index: 'code', width: 100},
            {name: 'type', index: 'type', width: 80},
            {name: 'des', index: 'des', width: 80},
            {name: 'name', index: 'name', width: 80},
            {name: 'statu', index: 'statu', width: 100},
            {name: 'date', index: 'date', width: 100},
            {name: 'handle', index: 'handle', width: 100},
            {name: 'handle1', index: 'handle1', width: 100},
            {name: 'handle2', index: 'handle2', width: 100}
        ],
        "jqObj": {
            "data": HRdata,
            "datatype": "local",
            "rownumbers": false
        }
    });
}


//IT业务
function ITTableInit() {
    $JQGrid.init({
        "id": "IT-Table",
        "useCheckAll": false,
        colNames: ['服务单号', '服务描述', '服务单状态', "提报人", "提报日期", "服务分类1", "服务分类2", "服务分类3"],//jqGrid的列显示名字
        colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {
                name: 'code', index: 'code', width: 100,select: false,
                formatter: function () {
                    var code = "<span class='handle-color'>6000002931</span>";
                    return code;
                }
            },
            {name: 'type', index: 'type', width: 80},
            {name: 'des', index: 'des', width: 80},
            {name: 'name', index: 'name', width: 80},
            {name: 'statu', index: 'statu', width: 100},
            {name: 'date', index: 'date', width: 100},
            {name: 'handle', index: 'handle', width: 100},
            {name: 'handle1', index: 'handle1', width: 100}
        ],
        "jqObj": {
            "data": ITdata,
            "datatype": "local",
            "rownumbers": false
        }
    });
}

//点击tab进行切换
$(".ivu-tabs-nav li").on("click", function () {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass("active");
    if (index == 0) {
        $(".ivu-tabs-tabpane").eq(0).removeClass("hide").siblings().addClass("hide");
    }
    if (index == 2) {
        $(".ivu-tabs-tabpane").eq(1).removeClass("hide").siblings().addClass("hide");
    }
    if (index == 4) {
        $(".ivu-tabs-tabpane").eq(2).removeClass("hide").siblings().addClass("hide");
    }
    if (index == 6) {
        $(".ivu-tabs-tabpane").eq(3).removeClass("hide").siblings().addClass("hide");
    }
});