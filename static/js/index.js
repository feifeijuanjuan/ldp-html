/**
 * 首页JS
 */

$(function(){
	initCurrentUserInfo();
	appandMenus();
});


function initCurrentUserInfo(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "system/getCurrentUserInfo.do",
	    error: function(request) {
	    	 layer.msg("加载异常！", {time : 3000, icon : 2}); 
	    },
	    success: function(result) {
		    if(result && result.success){
		    	$("#CurrentUser").html(result.data.userName);
		    }else{
		    	layer.msg("加载异常", {time : 3000, icon : 2}); 
		    }
	    }
	});
}


/**
 * 初始化加载菜单
 * @returns
 */
function appandMenus(){
    $.ajax({
        type:"POST",
        url:'system/getUserResourcesList.do',
        success:function(result){ 
        	if(result && result.success){
	    	var ul = $("#side-menu");
			ul.html(appendMenu(result.data, ""));
			ul.children("li").eq(0).addClass("active");
			Contabs.init();
	    }else{
	    	layer.msg("加载异常", {time : 3000, icon : 2}); 
	    }}
    });
}


/**
 * 菜单初始化
 * @param data
 * @param domainId
 */
function appendMenu(data, domainId) {
	var $menuDom=$("<div>");
	if(data) {
		//缓存数据对象
		var dataTemp=[];
		//已添加的菜单
		var dataSuccess={};
		//已添加的菜单(集合)
		var dataRoot=[];
		for(var i in data){
			//第一层
			if(!data[i].parentId){
				dataSuccess[data[i].resourceId]=data[i];
				dataRoot.push(data[i]);
			}else{
				dataTemp.push(data[i]);
			}
		}
		//创建第一层
		creatHtml(dataSuccess);
		//对象个数
		var count=1;
		while(count>0){
			count=0;
			var datas=[];
			for(var i=0,flag=true;dataTemp.length>0&&i<dataTemp.length;flag?i++:i){
				if(dataTemp[i]&&dataSuccess[dataTemp[i].parentId]){
					datas.push(dataTemp[i]);
					dataSuccess[dataTemp[i].resourceId]=dataTemp[i];
					dataTemp.splice(i,1);
					count++
					flag = false;
				}else {
					flag = true;
				}
			}
			if(count>0){
				creatHtml(datas);
			}
		}
		function creatHtml(items){
			$.each(items, function(i, item) {
				
				var parentLi;//父级
				
				var childUl;//子对象
				
				var i = $('<i class="fa fa-gg"></i>');//图标
				
				var span = $('<span class="fa arrow"></span>');
				
				var li = $("<li>").attr("id",item.resourceId).attr('data-index','0');//行对象
				
				//行名称、图标、下拉按钮组合
				var a = $('<a>');
				
				if(!item.resourceUrl){
					a.append(i).append($('<span>').text(item.resourceName).addClass('nav-label')).attr("href", "#");
				}else{
					a.append($('<span>').text(item.resourceName)).attr("href", "#");
				}
				
				//是否为顶级
				if(item.parentId){//如果parentId不为空，则为父级

					parentLi = $menuDom.find("#" + item.parentId);//找到父节点
					
					if($menuDom.find("#sub_"+ item.parentId).length > 0){
						childUl = $menuDom.find("#sub_"+ item.parentId);
					}else{
						childUl =  $('<ul>').addClass("nav nav-second-level").attr('id', "sub_" + item.parentId);
					}
				
				}
				
				if(item.resourceUrl){
					
					a.attr('href',item.resourceUrl).addClass(" J_menuItem").attr('data-index','1');
					
				}else{
					
					a.append(span);
				
				}
				
				li.append(a);
				
				if(!item.parentId){
					
					$menuDom.append(li);
					
				}else{
					
					childUl.append(li);
					
					parentLi.append(childUl);
					
				}
				
			 });
		}
		
		return $menuDom.html();
	}
}