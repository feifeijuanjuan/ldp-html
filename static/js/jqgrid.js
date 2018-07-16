var $JQGrid={
	//初始化对象定义
	tableObj:{
		//*表格id
		"id":"",
		//*数据加载url地址
		"dataUrl":"",
		//参数
		"data":{},
		//是否启用全选
		"useCheckAll":true,
		//*表头
		"colNames":[],
		//*行取值对象
		"colModel":{},
		//*每行的id
		"rowId":"",
		//自适应高度
		"autoHight":false,
		//返回结果时调用方法
		"responseData":function(data){},
		//显示页码
		"showPager":true,
		//用于自定义原函数参数用
		"jqObj":{}
	},
	//用于缓存数据{id取对应表格数据}
	datas:{},
	//用于缓存tableObj的配置
	gridObj:{},
	//初始化调用
	init:function(tableObj){
		$.jgrid.defaults.styleUI = "Bootstrap";
		//临时配置
		var tableObj_={};
		//继承初始化配置
		$.extend(true,tableObj_,this.tableObj);
		//深度继承用户配置
		$.extend(true,tableObj_,tableObj);
		//重置表格
		if($JQGrid.gridObj[tableObj_["id"]]){
			clearInterval($JQGrid.gridObj[tableObj_["id"]].widthTimer);
			$JQGrid.gridDestroy(tableObj_["id"]);
		}
		//生成分页标签
		if(tableObj_["showPager"]){
			if($("#"+tableObj["id"]).siblings("#"+tableObj["id"]+"_pager").length==0){
				$("#"+tableObj["id"]).after($("<div>").attr("id",tableObj["id"]+"_pager"));
			}
		}
		tableObj_.tableEle=$("#"+tableObj["id"])[0].outerHTML;
		tableObj_.tableEleParent=$("#"+tableObj["id"]).parent();
		$JQGrid.gridObj[tableObj_["id"]]=tableObj_;
		$JQGrid.procesData(tableObj_);
	},
	//取选中行的id(useCheckAll==true时多选返回选中行id的集合, useCheckAll==false时单选返回选中行id)
	getAllCheckedId: function(tableId){
		if($JQGrid.gridObj[tableId]["useCheckAll"]){
			return $('#'+tableId).jqGrid('getGridParam','selarrrow');
		}else{
			return $('#'+tableId).jqGrid('getGridParam','selrow');
		}
	},
	//取选中行的所有数据(useCheckAll==true时返回多选选中对象的数组, useCheckAll==false时返回单选选中对象)
	getAllCheckedData:function(tableId){
		var datas=[];
		var ids=$('#'+tableId).jqGrid('getGridParam',$JQGrid.gridObj[tableId]["useCheckAll"]?'selarrrow':'selrow');
		var data=$JQGrid.datas[tableId];
		if(data){
			for(var i=0;i<data.length;i++){
				if($JQGrid.gridObj[tableId]["useCheckAll"]){
					for(var j=0;j<ids.length;j++){
						if(ids[j]&&ids[j]==data[i][this.gridObj[tableId]["rowId"]]){
							datas.push(data[i]);
							break;
						}
					}
				}else{
					if(ids==data[i][this.gridObj[tableId]["rowId"]]){
						datas.push(data[i]);
						break;
					}
				}
			}
		}
		return $JQGrid.gridObj[tableId]["useCheckAll"]?datas:datas[0];
	},
	//刷新表格 elemId:表格id
	refresh:function(tableId){
		if($JQGrid.gridObj[tableId]) $("#"+tableId).trigger("reloadGrid");
	},
	//销毁表格,还原为原始
	gridDestroy:function(tableId){
		if($JQGrid.gridObj[tableId]){
			var tableEle=$JQGrid.gridObj[tableId].tableEle;
			var eleParent=$JQGrid.gridObj[tableId].tableEleParent;
			$.jgrid.gridDestroy(tableId);
			eleParent.append(tableEle);
		}
	},
	//传参查询数据(tableId:表格id号，data:参数)
	//参数格式：支持基本类型(字符串、数字、布尔等)和数组(只支持一维数组类型：用","隔开的字符串)
	search:function(tableId,data){
		//默认参数
		var gridObjData=this.gridObj[tableId]["data"];
		//重置请求参数
		$("#"+tableId).jqGrid("setGridParam",{serializeGridData:function(postData){
			postData.rows=parseInt(postData.rows);
			postData.page=parseInt(postData.page);
			//清理参数
			for(var d in postData){
				if(d!="rows"&&d!="page"){
					delete postData[d];
				}
			}
			//设置默认参数
			$.extend(true,postData,gridObjData);
			//设置用户参数
			$.extend(true,postData,data);
			return postData;
		}}).jqGrid("setGridParam",{postData:data,page:"1"}).trigger("reloadGrid"); 
	},
	procesData:function(tableObj){
		$(window).unbind("resize."+tableObj["id"]);
		//计算table高度
		var parent_=$("#"+tableObj["id"]).parent();
		var tableHeight=$(window).height()-parent_.offset().top-58;
		if(parent&&parent.layer&&window.name&&parent.layer.getFrameIndex(window.name)){
			tableHeight=tableHeight-37;
		}
		var showFalg=false;
		
		function setH(){
			//是否自动高度
			if(!tableObj["autoHight"]){
				tableHeight=$(window).height()-parent_.offset().top-(parent_.find(".ui-jqgrid-pager").length>0?parent_.find(".ui-jqgrid-pager").height()+30:parent_.find(".ui-jqgrid-hdiv").height()+25);
				if(parent&&parent.layer&&window.name&&parent.layer.getFrameIndex(window.name)){
					tableHeight=tableHeight-37;
				}
				if(tableObj["showPager"]){
					$("#"+tableObj["id"]).setGridHeight((tableHeight-parent_.find(".ui-jqgrid-hdiv").height())<200?"auto":(tableHeight-parent_.find(".ui-jqgrid-hdiv").height()));
					
				}else{
					$("#"+tableObj["id"]).setGridHeight("auto");
				}
			}
		}
		function resizeGrid(winWidth){
		setH();
			var gridBoxPWidth = parent_.width();
			var gridBoxWidth = $("#gbox_"+tableObj["id"]).width();
			gridBoxWidth = winWidth - gridBoxPWidth > 0 ? gridBoxPWidth: winWidth;
			$("#"+tableObj["id"]).jqGrid("setGridWidth", gridBoxWidth);
		}
		//计算宽高并设置
		function setW(){
			if(!showFalg&&!$("#"+tableObj["id"]).is(":hidden")){
				resizeWin();
				showFalg=true;
			}else if($("#"+tableObj["id"]).is(":hidden")){
				showFalg=false;
			}
		}
		function resizeWin(){
			var winWidth = $(window).width();
			if(!$("#"+tableObj["id"]).is(":hidden")){
				resizeGrid(winWidth);
				showFalg=true;
			}else{
				showFalg=false;
			}
		}
		$(window).bind('resize.'+tableObj["id"],resizeWin);
		var jqObj={
			//请求地址
			url : tableObj["dataUrl"],
			//发送方式
			mtype : "POST",
			//从服务器端返回的数据类型
			datatype : "json",
			//请求数据格式
			//ajaxGridOptions : {contentType: 'application/json; charset=utf-8'},
			//默认请求参数 {page:"page",rows:"rows", sort: "sidx",order: "sord", search:"_search", nd:"nd", npage:null}
			prmNames:{page:"page",rows:"rows",sort:null,order:null,search:null,nd:null},
			//初始化传参
			postData : tableObj["data"],
			//回传数据处理
			jsonReader : {
				//数据
				root: "list",
				//当前页
				 total: "pages",
				//总行数
				 records: "total",
				//行id
				id:tableObj["rowId"]
			},
			height : tableObj["autoHight"]==false&&(tableHeight-39)>200?(tableHeight-39):"",
			// height:"100%",
			autowidth : true,
			shrinkToFit : true,
			//选择框的列宽
			multiselectWidth : 25,
			//行号列宽
			rownumWidth : 40,
			//默认行数
			rowNum : !tableObj["showPager"]?tableObj.jqObj&&tableObj.jqObj.datatype&&tableObj.jqObj.datatype=='local'?tableObj.jqObj.data.length:-1:20,
			//每页行数集合
			rowList : [10,20,50,100,200],
			//表头
			colNames : tableObj["colNames"],
			//内容
			colModel : tableObj["colModel"],
			//页码id
			pager : "#"+tableObj["id"]+"_pager",
			multiselect : tableObj["useCheckAll"],
			//点击行单选
			multiboxonly : true,
			viewrecords : true,
			rownumbers : true,
			hidegrid : false,
			//加载完成之后执行
			loadComplete:function(data){
				resizeWin();
				//缓存所有返回信息
				$JQGrid.gridObj[tableObj["id"]].responseData(data);
				//缓存列表信息
				if(data&&data.success==false){
					layer.alert('表格数据加载异常！<br>'+data.responseMessage, {
						skin: 'layui-layer-lan',
						icon:2,
						title: '警告'
					});
				}else if(data&&data.success&&data.responseData){
					$JQGrid.datas[tableObj["id"]]=data.responseData.datas;
				}
			},
			loadError:function(){
				layer.alert('操作失败！<br>表格数据加载异常！', {
					skin: 'layui-layer-lan',
					icon:2,
					title: '警告'
				});
			},
			//点击行时选中问题处理
			beforeSelectRow : function(rowid, e) {
				if (e.type == 'click') {
					i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
					cm = $("#"+tableObj["id"]).jqGrid('getGridParam','colModel');
					// 当点击的单元格的属性中有select==false时，不触发选择行事件，其他则选中
					if((cm[i].select)==false){
						return false;
					}
				}
			},
			//设置添加行时的事件
			afterInsertRow:function(){
				//当未启用分页信息时，js添加试题则重置行数
				if(!tableObj["showPager"]&&tableObj.jqObj.datatype&&tableObj.jqObj.datatype=='local'){
					$("#"+tableObj["id"]).jqGrid('setGridParam',{rowNum:$("#"+tableObj["id"]).jqGrid('getGridParam','records')+1});
				}
			},
			//multiselect为ture，且点击头部的checkbox时才会触发此事件
            onSelectAll:function () {
				
            }
		};
		// 深度继承
		$.extend(true,jqObj,tableObj["jqObj"]);
		// 加载列表
		$("#"+tableObj["id"]).jqGrid(jqObj);
		//防止隐藏时，显示问题
		$JQGrid.gridObj[tableObj["id"]].widthTimer=setInterval(setW,50);
	}
};