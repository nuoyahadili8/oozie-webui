$(document).ready(function() {
	var paraType = "10001";
	var taskId = $("#taskId").val();
	$('#java_jar').autocomplete({
		serviceUrl : '../program/autoCompleteFilePath?taskId='+taskId+'&date=' + new Date() + '&fileType=.jar',
		onSelect : function(suggestion) {
		},
		onFocus : function(suggestion) {

		}
	});

	$("#main_class").blur(function() {
		getJavaQueue(taskId);
	});
});

function getJavaQueue(taskIdStr) {
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
			$("#idFormQueue_java").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function saveJava(obj) {
	var mainClass = $("#main_class").val();
	var javaJar = $("#java_jar").val();
	var formQueue = $("#idFormQueue_java").val();
	// 判断必填项不为空
	if (mainClass == "") {
		layer.alert('请输入【java类名】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (javaJar == "") {
		layer.alert('未填写【执行Jar包】！', {
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