$(document).ready(function() {
	$("#hive_script").blur(function() {
		var taskIdStr = $("#taskId").val();
		getHiveQueue(taskIdStr);
	});
});

function getHiveQueue(taskIdStr) {
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
			$("#idFormQueue_hive").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function saveHive(obj) {
	var script = $("#hive_script").val();
	var jobXml = $("#job-xml-hive").val();
	var formQueue = $("#idFormQueue_hive").val();
	// 判断必填项不为空
	if (script == "") {
		layer.alert('未编辑【SQL脚本】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (jobXml == "") {
		layer.alert('未配置【配置文件】！', {
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
