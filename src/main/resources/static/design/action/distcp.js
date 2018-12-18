
$(document).ready(function() {
});

function getDistcpQueue(taskIdStr) {
	var taskId = null;
	if (taskIdStr == '' || taskIdStr == null) {
		taskId = $("#taskId").val();
	} else {
		taskId = taskIdStr;
	}
	$.ajax({
		async : false,
		url : '../task/getQueue',
		dataType : 'json',
		timeout : 30000,
		data : {
			taskId : taskId,
			date : new Date()
		},
		success : function(data) {
			$("#idFormQueue_distcp").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function auto_namenode(obj) {
	var opt = obj.options[obj.selectedIndex]

	var taskIdStr = $("#taskId").val();
	getDistcpQueue(taskIdStr);
}

function saveDistcp(obj) {
	var distcpType = $("#distcp_type").val();// "0"
	var nameNode = $("#idNameNode").val();
	var inOut = $("#idInOut").val();
	var formQueue = $("#idFormQueue_distcp").val();
	// 判断必填项不为空
	if (distcpType == "-1") {
		layer.alert('请选择【复制类型】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (distcpType == "1" && nameNode == '') {
		layer.alert('未输入【远程NameNode】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (inOut == "") {
		layer.alert('未填写【输入/输出】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (formQueue == "") {
		layer.alert('未填写【使用队列】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	htmltojson(obj);
}