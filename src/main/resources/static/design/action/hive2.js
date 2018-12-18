$(document).ready(function() {
	autocomplete();
	// queryConfHiveTwoForList();
});

function autocomplete() {
	var taskId = $("#taskId").val();
	$('#impala_script').autocomplete({
		serviceUrl : '../program/autoCompleteFilePath?taskId=' + taskId + '&date=' + new Date() + '&fileType=.sql',
		onSelect : function(suggestion) {
		},
		onFocus : function(suggestion) {
		}
	});
}

function queryConfHiveTwoForList() {
	var platformId = $("#platformId").val();

	$.ajax({
		async : false,
		url : '../confHiveTwo/selectForOption',
		timeout : 30000,
		data : {
			platformId : platformId,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#hive2_jdbc-url").empty();
			if (data.length == 0) {
				$("#hive2_jdbc-url").append("<option value=''>没有可选项，请配置</option>");
			} else if (data.length >= 1) {
				$("#hive2_jdbc-url").append("<option value=''>请选择...</option>");
			}
			$.each(data, function(i, item) {
				$("#hive2_jdbc-url").append("<option value='" + item.url + "'>" + item.name + "</option>");
			});
		},
		error : function(request, status, error) {
		}
	});
}

function auto_value_hive2(obj) {
	var platformId = $("#platformId").val();
	var opt = obj.options[obj.selectedIndex]
	var name = opt.text;

	$.ajax({
		async : false,
		url : '../confHiveTwo/getByName',
		timeout : 30000,
		data : {
			platformId : platformId,
			name : name,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#hive2_password").val(data.password);
		},
		error : function(request, status, error) {
		}
	});

	getHive2Queue();
}

function getHive2Queue() {
	var taskId = $("#taskId").val();

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
			$("#hive2_queue").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

window.define = ace.define
var editor = ace.edit("hiveEditor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/sql");

function editHiveSql() {
	var taskId = $("#taskId").val();
	var nodeId = $("#hive2_div").attr("data-node");
	var sqlFileName = "";

	console.log("nodeId:" + nodeId);
	if ($("#hive2_script").val().length == 0) {
		// alert(subsys);
		$.ajax({
			type : "POST",
			url : '../workflow/getSqlFileName',
			timeout : 30000,
			data : {
				date : new Date(),
				taskId : taskId
			},
			dataType : "json",
			success : function(data) {
				console.log("data:" + data);
				if (data.sqlFileName.length != 0) {
					sqlFileName = data.sqlFileName + "_" + nodeId + ".hsql";
					console.log("sqlFileName:" + sqlFileName);
				}
				$("#hive2_script").val("${nameNode}" + sqlFileName);
				$.ajax({
					type : "POST",
					url : '../workflow/getSqlView',
					timeout : 30000,
					data : {
						date : new Date(),
						taskId : taskId,
						nodeId : nodeId,
						sqlFileName : sqlFileName
					},
					dataType : "text",
					success : function(data) {
						editor.setValue(data);
						var divtype = "hiveSql_div";

						if ($("#" + divtype).is(":hidden")) {
							// $("#" + divtype).show();
							$("#" + divtype).trigger("dialog-open");
							$("#" + divtype).attr('sqlid', "");
							$("#" + divtype).attr('sqlid', nodeId);
						} else {
							$("#" + divtype).trigger("dialog-close");
							$("#" + divtype).attr('data-node', "");
						}
					},
					error : function(data, textStatus, errorThrown) {
						layer.alert("数据获取异常，请点击取消重试。", {
							skin : 'layer-ext-moon'
						});
					}
				});
			},
			error : function(data, textStatus, errorThrown) {
				layer.alert("数据获取异常，请点击取消重试。", {
					skin : 'layer-ext-moon'
				});
			}
		});

	} else {
		sqlFileName = $("#hive2_script").val().replace("${nameNode}", "");
		$.ajax({
			type : "POST",
			url : '../workflow/getSqlView',
			timeout : 30000,
			data : {
				date : new Date(),
				taskId : taskId,
				nodeId : nodeId,
				sqlFileName : sqlFileName
			},
			dataType : "text",
			success : function(data) {
				console.log("data:" + data);
				editor.setValue(data);
				var divtype = "hiveSql_div";
				if ($("#" + divtype).is(":hidden")) {
					// $("#" + divtype).show();
					$("#" + divtype).trigger("dialog-open");
					$("#" + divtype).attr('sqlid', "");
					$("#" + divtype).attr('sqlid', nodeId);
				} else {
					$("#" + divtype).trigger("dialog-close");
					$("#" + divtype).attr('data-node', "");
				}

			},
			error : function(data, textStatus, errorThrown) {
				layer.alert("数据获取异常，请点击取消重试。", {
					skin : 'layer-ext-moon'
				});
			}
		});

	}
}

function saveHiveSql() {
	var taskId = $("#taskId").val();
	var nodeId = $("#hive2_div").attr("data-node");
	var sqlFileName = $("#hive2_script").val().replace("${nameNode}", "");
	var sqlContent = editor.getValue();

	$.ajax({
		type : "POST",
		url : '../workflow/saveSql',
		timeout : 30000,
		data : {
			date : new Date(),
			taskId : taskId,
			nodeId : nodeId,
			sqlFileName : sqlFileName,
			sqlContent : sqlContent
		},
		dataType : "text",
		success : function(data) {
			// alert(data);
			if (data == "savetrue") {
				layer.alert("数据保存成功", {
					skin : 'layer-ext-moon'
				});

				var divtype = "hiveSql_div";
				if ($("#" + divtype).is(":hidden")) {
					// $("#" + divtype).show();
					$("#" + divtype).trigger("dialog-open");
					$("#" + divtype).attr('sqlid', "");
					$("#" + divtype).attr('sqlid', nodeId);
				} else {
					$("#" + divtype).trigger("dialog-close");
					$("#" + divtype).attr('data-node', "");
				}
			} else {
				layer.alert("数据保存失败，请点击保存重试。", {
					skin : 'layer-ext-moon'
				});
			}

		},
		error : function(data, textStatus, errorThrown) {
			layer.alert("数据保存异常，请点击保存重试。", {
				skin : 'layer-ext-moon'
			});
		}
	});
}

function saveHive2(obj) {
	var jdbcUrl = $("#hive2_jdbc-url").val();
	var script = $("#hive2_script").val();
	var formQueue = $("#hive2_queue").val();
	// 判断必填项不为空
	if (jdbcUrl == "") {
		layer.alert('请选择【JDBCURL】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (script == "") {
		layer.alert('未编辑【SQL脚本】！', {
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
