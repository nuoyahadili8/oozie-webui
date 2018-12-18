$(document).ready(function() {
	var paraType = "10001";
	var taskId = $("#taskId").val();

	$("#shell_exec").blur(function() {
		getShellQueue(taskId);
	});
});

function getShellQueue(taskIdStr) {
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
			$("#idFormQueue_shell").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function saveShell(obj) {
	var exec = $("#shell_exec").val();
	var formQueue = $("#idFormQueue_shell").val();
	// 判断必填项不为空
	if (exec == "") {
		layer.alert('请输入【Shell命令】！', {
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