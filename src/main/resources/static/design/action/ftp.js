$(document).ready(function() {
	// selectFtpForOption();
});

function selectFtpForOption() {
	$.ajax({
		async : false,
		url : '../confFtp/getOption',
		dataType : 'json',
		timeout : 30000,
		data : {
			date : new Date()
		},
		success : function(data) {
			$("#ftp_name").empty();
			if (data.length == 0) {
				$("#ftp_name").append("<option value=''>没有可选项，请配置</option>");
			} else if (data.length > 1) {
				$("#ftp_name").append("<option value=''>请选择...</option>");
			}
			$.each(data, function(i, item) {
				$("#ftp_name").append("<option value='" + item.name + "'>" + item.name + "</option>");
			});
		},
		error : function(request, status, error) {
		}
	});
}

function getFtpQueue(taskIdStr) {
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
			$("#ftp_queue").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function changeFtpName(obj) {
	var opt = obj.options[obj.selectedIndex]
	var name = opt.text;

	getFtpQueue();

	$.ajax({
		async : false,
		url : '../confFtp/getByName',
		dataType : 'json',
		timeout : 30000,
		data : {
			name : name,
			date : new Date()
		},
		success : function(data) {
			$("#ftp_ip").val(data.ip);
			$("#ftp_port").val(data.port);
			$("#ftp_user").val(data.username);
			$("#ftp_password").val(data.password);
		}
	});
}