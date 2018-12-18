$(document).ready(function() {
	var paraType = "10001";
	var taskId = $("#taskId").val();
	$('#spark_jar').autocomplete({
		serviceUrl : '../program/autoCompleteFilePath?taskId='+taskId+'&date=' + new Date() + '&fileType=.jar',
		onSelect : function(suggestion) {

		},
		onFocus : function(suggestion) {

		}
	});

	$("#master").blur(function() {
		getSparkQueue(taskId);
	});
});

function getSparkQueue(taskIdStr) {
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
			$("#idFormQueue_spark").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function saveSpark(obj) {
	var master = $("#master").val();
	var name = $("#name").val();
	var sparkJar = $("#spark_jar").val();
	var formQueue = $("#idFormQueue_spark").val();
	// 判断必填项不为空
	if (master == "") {
		layer.alert('未输入【MASTER Url】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (name == "") {
		layer.alert('未输入【Spark 名称】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (sparkJar == "") {
		layer.alert('未填写【JAR包】！', {
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