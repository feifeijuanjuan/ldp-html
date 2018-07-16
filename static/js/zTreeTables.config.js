var $zTreeTables = {
	//节点样式
	iconSkin:{
		parent:{
			className:"parent",
			imgUrl:""
		},
		leaf:{
			className:"leaf",
			imgUrl:""
		},
		root:{
			className:"root",
			imgUrl:""
		}
	},
	//图片路径
	imgPath : null,
	//使用父节点
	isParent : true,
	//id号
	treeId : "",
	//ztree内置对象，可用于操作
	treeObj : null,
	//设置默认选中的id集合
	selectId : new Array(),
	//自定义加载完成之后的函数
	onLoadEnd : null,
	//是否加载结束状态
	isLoadEnd : false,
	//加载之前的函数
	onLoadBefore : null,
	//设置是否可以点击节点
	isOpenClick : true,
	//访问服务器成功之后的函数
	onAsyncSuccess : null,
	//是否根据节点的父级路径展开
	openPath : false,
	//表头[]
	tableHead:[],
	//列名（除开第一列）属性名，是否可编辑{"attr":"id","edit":false}
	tableColumn:[],
	//表格编辑功能 tableEdit.enable = true 时生效
	tableEdit:{
		//使用自定义函数
		enable:false,
		//编辑之前
		beforeEdit:null,
		//编辑
		onEdit:null,
		//编辑之后
		afterEdit:null,
		//执行编辑
		doEdit:function(afterEdit,call){
			$zTreeTables.tableEdit.afterEdit=afterEdit;
			setTimeout(function(){
				call(function(){
					$zTreeTables.tableEdit.afterEdit=null;
				});
			},200);
		}
	},
	//setting.async.enable = true 时生效
	async : {
		//异步加载时需要自动提交父节点属性的参数。
		autoParam : [],
		//Ajax 提交参数的数据类型。
		contentType : "application/x-www-form-urlencoded",
		//用于对 Ajax 返回数据进行预处理的函数。
		dataFilter : null,
		//Ajax 获取的数据类型。
		dataType : "text",
		//设置 zTree 是否开启异步加载模式
		enable : false,
		//Ajax 请求提交的静态参数键值对。
		otherParam : [],
		//Ajax 的 http 请求模式。
		type : "get",
		//Ajax 获取数据的 URL 地址。
		url : ""
	},
	callback : {
		//用于捕获异步加载之前的事件回调函数，zTree 根据返回值确定是否允许进行异步加载
		beforeAsync : null,
		//用于捕获 勾选 或 取消勾选 之前的事件回调函数，并且根据返回值确定是否允许 勾选 或 取消勾选
		beforeCheck : null,
		//用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作
		beforeClick : null,
		//用于捕获父节点折叠之前的事件回调函数，并且根据返回值确定是否允许折叠操作
		beforeCollapse : null,
		//用于捕获 zTree 上鼠标双击之前的事件回调函数，并且根据返回值确定触发 onDblClick 事件回调函数
		beforeDblClick : null,
		//用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作
		beforeDrag : null,
		//用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作
		beforeDragOpen : null,
		//用于捕获节点拖拽操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作
		beforeDrop : null,
		//用于捕获节点编辑按钮的 click 事件，并且根据返回值确定是否允许进入名称编辑状态
		beforeEditName : null,
		//用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
		beforeExpand : null,
		//用于捕获 zTree 上鼠标按键按下之前的事件回调函数，并且根据返回值确定触发 onMouseDown 事件回调函数
		beforeMouseDown : null,
		//用于捕获 zTree 上鼠标按键松开之前的事件回调函数，并且根据返回值确定触发 onMouseUp 事件回调函数
		beforeMouseUp : null,
		//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作
		beforeRemove : null,
		//用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
		beforeRename : null,
		//用于捕获 zTree 上鼠标右键点击之前的事件回调函数，并且根据返回值确定触发 onRightClick 事件回调函数
		beforeRightClick : null,
		//用于捕获异步加载出现异常错误的事件回调函数
		onAsyncError : null,
		//用于捕获异步加载正常结束的事件回调函数
		onAsyncSuccess : null,
		//用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
		onCheck : null,
		//用于捕获节点被点击的事件回调函数
		onClick : null,
		//用于捕获节点被折叠的事件回调函数
		onCollapse : null,
		//用于捕获 zTree 上鼠标双击之后的事件回调函数
		onDblClick : null,
		//用于捕获节点被拖拽的事件回调函数
		onDrag : null,
		//用于捕获节点被拖拽过程中移动的事件回调函数
		onDragMove : null,
		//用于捕获节点拖拽操作结束的事件回调函数
		onDrop : null,
		//用于捕获节点被展开的事件回调函数
		onExpand : null,
		//用于捕获 zTree 上鼠标按键按下后的事件回调函数
		onMouseDown : null,
		//用于捕获 zTree 上鼠标按键松开后的事件回调函数
		onMouseUp : null,
		//用于捕获节点生成 DOM 后的事件回调函数
		onNodeCreated : null,
		//用于捕获删除节点之后的事件回调函数。
		onRemove : null,
		//用于捕获节点编辑名称结束之后的事件回调函数。
		onRename : null,
		//用于捕获 zTree 上鼠标右键点击之后的事件回调函数
		onRightClick : null
	},
	//setting.check.enable = true 且 setting.check.chkStyle = "checkbox" 时生效
	check : {
		//设置自动关联勾选时是否触发 beforeCheck / onCheck 事件回调函数。
		autoCheckTrigger : false,
		//勾选 checkbox 对于父子节点的关联关系。
		chkboxType : {
			"Y" : "ps",
			"N" : "ps"
		},
		//勾选框类型(checkbox 或 radio）
		chkStyle : "checkbox",
		//设置 zTree 的节点上是否显示 checkbox / radio
		enable : false,
		//当父节点设置 nocheck = true 时，设置子节点是否自动继承 nocheck = true 。
		nocheckInherit : false,
		//当父节点设置 chkDisabled = true 时，设置子节点是否自动继承 chkDisabled = true 。
		chkDisabledInherit : false,
		//radio 的分组范围。
		radioType : "level"
	},
	data : {
		keep : {
			//zTree 的节点叶子节点属性锁，是否始终保持 isParent = false
			leaf : false,
			//zTree 的节点父节点属性锁，是否始终保持 isParent = true
			parent : false
		},
		key : {
			//zTree 节点数据中保存 check 状态的属性名称。
			checked : "checked",
			//zTree 节点数据中保存子节点数据的属性名称。
			children : "children",
			//zTree 节点数据保存节点名称的属性名称。
			name : "name",
			//zTree 节点数据保存节点提示信息的属性名称。
			title : "",
			//zTree 节点数据保存节点链接的目标 URL 的属性名称。
			url : "url"
		},
		//setting.data.simpleData.enable = true 时生效
		simpleData : {
			//确定 zTree 初始化时的节点数据、异步加载时的节点数据、或 addNodes 方法中输入的 newNodes 数据是否采用简单数据模式 (Array)
			enable : false,
			//节点数据中保存唯一标识的属性名称。
			idKey : null,
			//节点数据中保存其父节点唯一标识的属性名称。
			pIdKey : null,
			//用于修正根节点父节点数据，即 pIdKey 指定的属性值。
			rootPId : null
		}
	},
	//setting.edit.enable = true 时生效
	edit : {
		drag : {
			//拖拽时父节点自动展开是否触发 onExpand 事件回调函数。
			autoExpandTrigger : true,
			//拖拽时, 设置是否允许复制节点。
			isCopy : true,
			//拖拽时, 设置是否允许移动节点。
			isMove : true,
			//拖拽到目标节点时，设置是否允许移动到目标节点前面的操作。
			prev : true,
			//拖拽到目标节点时，设置是否允许移动到目标节点后面的操作。
			next : true,
			//拖拽到目标节点时，设置是否允许成为目标节点的子节点。
			inner : true,
			//拖拽节点成为根节点时的 Tree 内边界范围 (单位：px)。
			borderMax : 10,
			//拖拽节点成为根节点时的 Tree 外边界范围 (单位：px)。
			borderMin : -5,
			//判定是否拖拽操作的最小位移值 (单位：px)。
			minMoveSize : 5,
			//拖拽多个兄弟节点时，浮动图层中显示的最大节点数。 多余的节点用...代替。
			maxShowNodeNum : 5,
			//拖拽时父节点自动展开的延时间隔。 (单位：ms)
			autoOpenTime : 500
		},
		//节点编辑名称 input 初次显示时,设置 txt 内容是否为全选状态。
		editNameSelectAll : false,
		//设置 zTree 是否处于编辑状态
		enable : false,
		//删除按钮的 Title 辅助信息。
		removeTitle : "remove",
		//编辑名称按钮的 Title 辅助信息。
		renameTitle : "rename",
		//设置是否显示删除按钮。
		showRemoveBtn : true,
		//设置是否显示编辑名称按钮。
		showRenameBtn : true
	},
	view : {
		//用于在节点上固定显示用户自定义控件
		addDiyDom : null,
		//用于当鼠标移动到节点上时，显示用户自定义控件，显示隐藏状态同 zTree 内部的编辑、删除按钮
		addHoverDom : null,
		//点击节点时，按下 Ctrl 或 Cmd 键是否允许取消选择操作。
		autoCancelSelected : true,
		//双击节点时，是否自动展开父节点的标识
		dblClickExpand : true,
		//zTree 节点展开、折叠时的动画速度，设置方法同 JQuery 动画效果中 speed 参数。
		expandSpeed : "fast",
		//个性化文字样式，只针对 zTree 在节点上显示的<A>对象。
		fontCss : {},
		//设置 name 属性是否支持 HTML 脚本
		nameIsHTML : false,
		//用于当鼠标移出节点时，隐藏用户自定义控件，显示隐藏状态同 zTree 内部的编辑、删除按钮
		removeHoverDom : null,
		//设置是否允许同时选中多个节点。
		selectedMulti : true,
		//设置 zTree 是否显示节点的图标。
		showIcon : true,
		//设置 zTree 是否显示节点之间的连线。
		showLine : false,
		//设置 zTree 是否显示节点的 title 提示信息(即节点 DOM 的 title 属性)。
		showTitle : true,
		//设置 zTree 是否允许可以选择 zTree DOM 内的文本。
		txtSelectedEnable : false
	},
	//初始化树 @param jsonData如果需要异步加载根节点，可以设置为 null 或 []
	init : function(jsonData) {
		var userAgent = navigator.userAgent.toLowerCase();
		var browser = {
			version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
			safari: /webkit/.test(userAgent),
			opera: /opera/.test(userAgent),
			msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
			mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
		};
		if(browser.msie && browser.version <= 7.0){
			this.view.expandSpeed="";
		}
		//设置是否允许同时选中多个节点
		this.view.selectedMulti = false;
		if(!jsonData){
			//启用异步加载
			this.async.enable = true;
			//设置默认传入参数
			this.async.autoParam.push("id");
			//设置加载数据时对数据预处理
			this.async.dataFilter = this.filter_;
		}
		if(this.data.simpleData.enable){
			//设置id编号名称
			this.data.simpleData.idKey = this.data.simpleData.idKey?this.data.simpleData.idKey:"id";
			//设置父级id编号名称
			this.data.simpleData.pIdKey = this.data.simpleData.pIdKey?this.data.simpleData.pIdKey:"parentId";
			//设置默认根节点
			this.data.simpleData.rootPId = this.data.simpleData.rootPId?this.data.simpleData.rootPId:0;
		}
		//设置数据加载完成之后的操作
		this.callback.onAsyncSuccess = function (){
			$zTreeTables.isLoadEnd=true;
			if($zTreeTables.onAsyncSuccess){
				$zTreeTables.onAsyncSuccess();
			}
		};
		//访问服务器失败
		this.callback.onAsyncError = function() {
			$zTreeTables.isLoadEnd=true;
			/*layer.alert('操作失败！<br>服务器访问失败，请联系管理员！', {
				icon:2,
				title: '警告'
			});*/
			return;
		}
		//设置是否可以点击节点
		if(!this.isOpenClick){
			this.callback.beforeClick = function(){
				return $zTreeTables.isOpenClick;
			};
		}
		//展开时禁用双击展开事件--start
		this.callback.beforeCollapse=function(treeId, treeNode){
			$zTreeTables.treeObj.setting.view.dblClickExpand=false;
		}
		this.callback.onCollapse=function(event, treeId, treeNode){
			$zTreeTables.treeObj.setting.view.dblClickExpand=$zTreeTables.view.dblClickExpand;
		}
		this.callback.beforeExpand=function(treeId, treeNode){
			$zTreeTables.treeObj.setting.view.dblClickExpand=false;
		}
		this.callback.onExpand=function(event, treeId, treeNode){
			$zTreeTables.treeObj.setting.view.dblClickExpand=$zTreeTables.view.dblClickExpand;
		}
		//处理焦点事件
		this.callback.beforeMouseDown=function(treeId, treeNode){
			if($zTreeTables.treeObj.getSelectedNodes()[0]!=treeNode){
				$(".rename").blur();
			}
		}
		//展开时禁用双击展开事件--end
		//自定义dom行内容
		this.view.addDiyDom = function (treeId, treeNode) {
			var spaceWidth = 15;
			var liObj = $("#" + treeNode.tId);
			var aObj = $("#" + treeNode.tId + "_a");
			var switchObj = $("#" + treeNode.tId + "_switch");
			var icoObj = $("#" + treeNode.tId + "_ico");
			var spanObj = $("#" + treeNode.tId + "_span");
			aObj.attr('title', '');
			aObj.append('<div class="diy swich"></div>');
			var div = $(liObj).find('div').eq(0);
			switchObj.remove();
			spanObj.remove();
			icoObj.remove();
			div.append(switchObj);
			div.append(spanObj);
			var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
			switchObj.before(spaceStr);
			switchObj.after(icoObj);
			var editStr = '';
			for(var i=0;i<$zTreeTables.tableColumn.length;i++){
				editStr += '<div class="diy" dataColumn="'+$zTreeTables.tableColumn[i]["attr"]+'">' + (treeNode[$zTreeTables.tableColumn[i]["attr"]]!=null&&treeNode[$zTreeTables.tableColumn[i]["attr"]]!=undefined?treeNode[$zTreeTables.tableColumn[i]["attr"]]:"&nbsp;") + '</div>';
			}
			//编辑功能
//			if($zTreeTables.data.simpleData.rootPId!=treeNode[$zTreeTables.data.simpleData.pIdKey]){
				$(div).dblclick(function(){
					if($zTreeTables.edit.enable&&($zTreeTables.callback.beforeEditName==null||$zTreeTables.callback.beforeEditName())){
						if($zTreeTables.tableEdit.enable&&$zTreeTables.tableEdit.beforeEdit!=null){
							$zTreeTables.tableEdit.beforeEdit();
						}
						var temp_data=$zTreeTables.treeObj.getSelectedNodes()[0].name;
						$(div).attr("data",temp_data);
						$zTreeTables.treeObj.editName($zTreeTables.treeObj.getSelectedNodes()[0]);
						$(".rename").parent().siblings().css("display","none");
						$(".rename").css("height",$(div).height()+"px").css("width",$(div).width()+"px");
						$zTreeTables.treeObj.setting.callback.onRename=function (event, treeId, treeNode, isCancel){
							if($zTreeTables.tableEdit.enable&&$zTreeTables.tableEdit.onEdit!=null){
								$zTreeTables.tableEdit.onEdit($(div),treeNode)
							}
							$(div).children().css("display","inline-block");
							//保存数据时，缓存数据
							if(!isCancel){
								$(div).attr("data",treeNode.name);
								if($zTreeTables.tableEdit.enable){
									//还原数据
									treeNode.name=temp_data;
									$zTreeTables.treeObj.updateNode(treeNode);
									setTimeout(function(){
										if($zTreeTables.tableEdit.afterEdit!=null){
											$zTreeTables.tableEdit.afterEdit($(div),treeNode)
										}
										//还原事件
										$zTreeTables.treeObj.setting.callback.onRename=$zTreeTables.callback.onRename;
									},100);
								}
							}
						}
					}
				});
				editStr=$(editStr).each(function(index){
					if($zTreeTables.tableColumn[index]["edit"]){
						var rename_input=$("<input>").attr("class","rename").attr("type","text").attr("dataColumn",$(this).attr("dataColumn"));
						$(this).dblclick(function(e){
							if($zTreeTables.edit.enable){
								if($zTreeTables.tableEdit.enable&&$zTreeTables.tableEdit.beforeEdit!=null){
									$zTreeTables.tableEdit.beforeEdit();
								}
								var temp_this=$(this);
								var temp_text=temp_this.text();
								rename_input.on("mousedown dblclick click",function(e){
									e.stopPropagation();
								});
								//绑定失去焦点事件
								aObj.children().each(function(){
									$(this).off("mousedown").mousedown(function(e){
										$(".rename").blur();
									});
								});
								rename_input.css("height",temp_this.height()+"px").css("width",temp_this.width()+"px");
								rename_input.blur(function(){
									//更新节点数据
									temp_this.attr("data",$.trim(rename_input.val()));
									if($zTreeTables.tableEdit.enable){
										if($zTreeTables.tableEdit.onEdit!=null){
											$zTreeTables.tableEdit.onEdit(temp_this,treeNode)
										}
										setTimeout(function(){
											if($zTreeTables.tableEdit.afterEdit!=null){
												$zTreeTables.tableEdit.afterEdit(temp_this,treeNode);
											}else{
												temp_this.html(temp_text);
											}
										},100);
									}else{
										treeNode[temp_this.attr("dataColumn")]=$.trim(temp_this.attr("data"))
										$zTreeTables.treeObj.updateNode(treeNode);
									}
								});
								temp_this.html(rename_input);
								rename_input.focus();
								rename_input.val($.trim(temp_text));
								e.stopPropagation();
							}
						});
					}
				});
//			}
			aObj.append(editStr);
		};
		//加载树
		$.fn.zTree.init($("#" + this.treeId), this,jsonData);
		//存储树
		this.treeObj = $.fn.zTree.getZTreeObj(this.treeId);
		//加载完毕加载表头
		this.onLoadEnd=function(){
			$zTreeTables.addHead();
		};
		//树结构加载结束之后
		if(this.onLoadEnd!=null){
			var tim = setInterval(function() {
				if ($zTreeTables.isLoadEnd){
					window.clearInterval(tim);
					$zTreeTables.onLoadEnd();
				}
			}, 5);
		}
		
	},
	//添加表头
	addHead:function(){
		//添加表头
		var li_head = '<li class="head"><a>';
		for(var i=0;i<this.tableHead.length;i++){
			li_head+='<div class="diy">'+this.tableHead[i]+'</div>';
		}
		li_head+='</a></li>';
		var rows = $("#" + this.treeId).find('li');
		if (rows.length > 0) {
			rows.eq(0).before(li_head);
		} else {
			$("#" + this.treeId).append(li_head);
			$("#" + this.treeId).append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
		}
	},
	//自动勾选
	selectAllSelectId : function(){
		if(this.selectId!=null&&this.selectId.length>0){
			//选中预选中节点
			for(var i=0;i<this.selectId.length;i++){
				this.treeObj.selectNode(this.treeObj.getNodeByParam("id",this.selectId[i]));
			}
			this.selectId = new Array();
		}
	},
	//取得所有父级节点路径
	getAllParentNodeIds : function(nodes_){
		var parentNodeIds="";
		for(var i=0;i<nodes_.length;i++){
			var nodeTemp=nodes_[i];
			while(nodeTemp.getParentNode()!=null){
				parentNodeIds+=nodeTemp.getParentNode().id+","
				nodeTemp=nodeTemp.getParentNode();
			}
		}
		parentNodeIds=parentNodeIds.substring(0,parentNodeIds.length-1);
		var nodeIds=parentNodeIds.split(",");
		nodeIds=nodeIds.reverse();
		return nodeIds;
	},
	//保存父级节点路径
	saveAllParentNodeIds : function(obj_,elem_,nodes){
		if(!this.openPath)return;
		if(!obj_.getElementById("zTree_"+elem_)){
			$(obj_.getElementById(elem_)).after("<input type='hidden' id='zTree_"+elem_+"'>");
		}
		var temp=this.getAllParentNodeIds(nodes);
		obj_.getElementById("zTree_"+elem_).value=temp;
	},
	//根据节点id展开节点
	openNodes : function(nodeIds_){
		if(!this.openPath||!nodeIds_)return;
		var nodeIds=nodeIds_.split(",");
		var openIndex=0;
		this.treeObj.setting.callback.onAsyncSuccess=function(){
			if(openIndex<nodeIds.length-1){
				openIndex++;
				var node_=$zTreeTables.treeObj.getNodeByParam("id", nodeIds[openIndex]);
				if(node_&&!node_.zAsync){
					$zTreeTables.treeObj.expandNode(node_, true, false, true ,true);
				}
			}else{
				$zTreeTables.selectAllSelectId();
				//if(window.onAsyncSuccess_) $zTreeTables.treeObj.setting.callback.onAsyncSuccess=onAsyncSuccess_;
			}
		}
		for(var i=0;i<nodeIds.length;i++){
			var node_=this.treeObj.getNodeByParam("id", nodeIds[i]);
			if(node_&&!node_.zAsync){
				openIndex=i;
				this.treeObj.expandNode(node_, true, false, true ,true);
				break;
			}
		}
		this.selectAllSelectId();
	},
	//添加节点
	addNode : function(nodeId,text,userData){
		if(this.treeObj.getSelectedNodes()[0].open){
			var selectNode=this.treeObj.getSelectedNodes()[0];
			var nodeid = selectNode.id;
			var newNode={id:nodeId,name:text};
			$.each(userData, function(i) {
				newNode[i]=userData[i];
			});
			this.treeObj.addNodes(selectNode, newNode);
			this.treeObj.selectNode(this.treeObj.getNodeByParam("id", nodeId));
		}else{
			this.treeObj.setting.data.keep.parent=true;
			var selectNode=this.treeObj.getSelectedNodes()[0];
			selectNode.isParent=true;
			selectNode=this.treeObj.getSelectedNodes()[0];
			selectNode["icon"]=this.iconSkin.parent.imgUrl;
			selectNode["iconSkin"] = this.iconSkin.parent.className;
			//设置更新node
			$zTreeTables.treeObj.updateNode(selectNode);
			this.treeObj.updateNode
			var nodeid = selectNode.id;
			var newNode={id:nodeId,name:text};
			$.each(userData, function(i) {  
				newNode[i]=userData[i];
			});
			if(selectNode.zAsync){
				//设置展开之前
				this.treeObj.setting.callback.beforeExpand=function(){
					$zTreeTables.treeObj.addNodes(selectNode, newNode);
					$zTreeTables.treeObj.selectNode($zTreeTables.treeObj.getNodeByParam("id", nodeId));
					$zTreeTables.treeObj.setting.callback.beforeExpand=null;
				}
			}
			//设置数据加载完成
			this.treeObj.setting.callback.onAsyncSuccess=function(){
				$zTreeTables.treeObj.selectNode($zTreeTables.treeObj.getNodeByParam("id", nodeId));
				//if(window.onAsyncSuccess_) $zTreeTables.treeObj.setting.callback.onAsyncSuccess=onAsyncSuccess_;
			}
			this.treeObj.expandNode(selectNode, true, false, true ,true);
			this.treeObj.setting.data.keep.parent=false;
		}
		//进入编辑
		$zTreeTables.treeObj.editName($zTreeTables.treeObj.getSelectedNodes()[0]);
	},
	//移除节点
	removeNode : function(node){
		this.treeObj.setting.callback.onRemove=function(){
			$zTreeTables.treeObj.selectNode(node.getParentNode());
			$zTreeTables.treeObj.setting.callback.onRemove=null;
		}
  		this.treeObj.removeNode(this.treeObj.getSelectedNodes()[0],true);
	},
	//移动节点
	moveNode : function(targetNode,node,ipn){
		//成为子节点
		if(ipn==0){
			this.treeObj.moveNode(targetNode, node, "inner",true);
		}else
		//下移
		if(ipn==1){
			this.treeObj.moveNode(targetNode, node, "next",true);
		}else
		//上移
		if(ipn==-1){
			this.treeObj.moveNode(targetNode, node, "prev",true);
		}else{
			return;
		}
	},
	//重置树
	resetTree : function() {
		$.fn.zTree.init($("#" + this.treeId), this);
	},
	//取得所有选中的id和name
	getSelectNodes:function(){
		var nodes = $zTreeTables.treeObj.getCheckedNodes();
		var dataArray = new Array();
		for(var i=0;i<nodes.length;i++){
			var data={};
			data["id"]=nodes[i]["id"];
			data["name"]=nodes[i]["name"];
			dataArray.push(data);
		}
		return dataArray;
	},
	// xmltojson
	xml2json_: function(xml){
		var jsonObj=new Array();
		if($(xml).find("tree").length>0){
			$(xml).find("tree").children("item").each(function() {
				var nodes = {id : $(this).attr("id")};
				nodes.parentId = $(this).parent().attr("id");
				nodes.name = $(this).attr("text");
				nodes.isParent = ($(this).attr("child") > 0);
				nodes.open = ($(this).attr("open") == 1);
				if ($(this).attr("select") == 1) {
					this.selectId.push(nodes.id);
				}
				nodes.icon = this.imgPath + $(this).attr("im0");
				$(this).children("userdata").each(function() {
					nodes[$(this).attr("name")] = $(this).text();
				});
				if ($(this).children("item").length > 0) {
					nodes.children = this.xml2json_($(this));
				}
				jsonObj.push(nodes);
			});
		}else{
			$(xml).children("item").each(function() {
				var nodes = {id : $(this).attr("id")};
				nodes.parentId = $(this).parent().attr("id");
				nodes.name = $(this).attr("text");
				nodes.isParent = ($(this).attr("child") > 0);
				nodes.open = ($(this).attr("open") == 1);
				if ($(this).attr("select") == 1) {
					this.selectId.push(nodes.id);
				}
				nodes.icon = this.imgPath + $(this).attr("im0");
				$(this).children("userdata").each(function() {
					nodes[$(this).attr("name")] = $(this).text();
				});
				if ($(this).children("item").length > 0) {
					nodes.children = this.xml2json_($(this));
				}
				jsonObj.push(nodes);
			});
		}
		return jsonObj;
	}
};