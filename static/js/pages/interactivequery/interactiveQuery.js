$(function () {
    //页面加载完成之后执行
    //初始化表格
    queryTableInit();
    // 日期控件
    laydate.render({
        elem: '#date', //指定元素
    });
});
var mydata = [{
    code: "14555555545",
    type: "IT共享",
    des: "问题描述",
    name: "张三",
    statu: "0",
    date: "2018-01",
    handle: '编辑'
},
    {
        code: "14555555545",
        type: "IT共享",
        des: "问题描述",
        name: "张三",
        statu: "1",
        date: "2018-01",
        handle: '编辑'
    },
    {
        code: "14555555545",
        type: "IT共享",
        des: "问题描述",
        name: "张三",
        statu: "0",
        date: "2018-01",
        handle: '编辑'
    },
    {
        code: "14555555545",
        type: "IT共享",
        des: "问题描述",
        name: "张三",
        statu: "1",
        date: "2018-01",
        handle: '编辑'
    }
];

//初始化表格
function queryTableInit() {
    $JQGrid.init({
        "id": "queryTable",
        "useCheckAll": false,
        colNames: ['交互编号', '服务类型', '问题描述', "客户名称", "交互状态", "受理日期", "操作"],//jqGrid的列显示名字
        colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name: 'code', index: 'code', width: 100},
            {name: 'type', index: 'type', width: 80},
            {name: 'des', index: 'des', width: 80},
            {name: 'name', index: 'name', width: 80},
            {
                name: 'statu', index: 'statu', width: 100,
                formatter: function (cellvalue, options, rowObject) {
                    var statu=cellvalue;
                    if(statu==0){
                        statu = "<span><img src='../../img/statu0.png' alt='' class='statu'>处理中</span>"
                    }else{
                        statu = "<span><img src='../../img/statu1.png' alt='' class='statu'>已完成</span>"
                    }
                    return statu;
                }
            },
            {name: 'date', index: 'date', width: 100},
            {
                name: 'handle', index: 'handle', width: 100, select: false, formatter: function () {
                    var handle = "<span class='handle-color' onclick='openCode()'>编辑</span>";
                    return handle;
                }
            }
        ],
        "jqObj": {
            "data": mydata,
            "datatype": "local",
            "rownumbers": false
        }
    });
}

//点击编号，查看详情
function openCode() {
    layer.open({
        shade: 0.8,
        resize: false,
        type: 2,
        fix: true,
        title: "交互记录-详细信息",
        shadeClose: false,
        scrollbar: false,
        shift: 2,
        closeBtn: 1,
        area: ["98%", "98%"],
        btn: ["保存"],
        content: "interactiveDetail.html",
        success: function (layero, index) {

        },
        yes: function (index, layero) {

        },

    });
}