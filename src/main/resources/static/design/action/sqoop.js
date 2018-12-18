$(document).ready(function() {
	var paraType = "10001";
	var taskId = $("#taskId").val();

	$("#sqoop_command").blur(function() {
		getSqoopQueue(taskId);
	});
	$("#sqoop_arg").blur(function() {
		getSqoopQueue(taskId);
	});
});

function getSqoopQueue(taskIdStr) {
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
			$("#idFormQueue_sqoop").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function saveSqoop(obj) {
	var command = $("#sqoop_command").val();
	var arg = $("#sqoop_arg").val();
	var formQueue = $("#idFormQueue_sqoop").val();
	// 判断必填项不为空
	if (command == "" && arg == "") {
		layer.alert('请在【sqoop命令行】或【sqoop命令参数】任何一项中输入值！', {
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
	if (command.length > 0 && arg.length > 0) {
		layer.alert('【sqoop命令行】和【sqoop命令参数】两项不能同时输入！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	htmltojson(obj);
}