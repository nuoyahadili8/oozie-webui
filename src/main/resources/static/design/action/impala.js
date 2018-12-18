$(document).ready(function() {
	autocomplete();
	// queryConfImpalaForList();
});

function autocomplete() {
	var taskId = $("#taskId").val();
	$('#impala_script').autocomplete({
		serviceUrl : '../program/autoCompleteFilePath?taskId=' + taskId + '&date=' + new Date() + '&fileType=.imsql',
		onSelect : function(suggestion) {
		},
		onFocus : function(suggestion) {
		}
	});
}

function queryConfImpalaForList() {
	var platformId = $("#platformId").val();

	$.ajax({
		async : false,
		url : '../confImpala/selectForOption',
		timeout : 30000,
		data : {
			platformId : platformId,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#impala_jdbc-url").empty();
			if (data.length == 0) {
				$("#impala_jdbc-url").append("<option value=''>没有可选项，请配置</option>");
			} else if (data.length >= 1) {
				$("#impala_jdbc-url").append("<option value=''>请选择...</option>");
			}
			$.each(data, function(i, item) {
				$("#impala_jdbc-url").append("<option value='" + item.url + "'>" + item.name + "</option>");
			});
		},
		error : function(request, status, error) {
		}
	});
}

function auto_value_impala(obj) {
	var taskId = $("#taskId").val();
	var platformId = $("#platformId").val();
	var opt = obj.options[obj.selectedIndex]
	var name = opt.text;

	$.ajax({
		async : false,
		url : '../confImpala/selectByName',
		timeout : 30000,
		data : {
			platformId : platformId,
			name : name,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#impala_principal").val(data.principal);
		},
		error : function(request, status, error) {
		}
	});

	//$("#impala_job-xml").val("${nameNode}/user/oozieweb/conf/hive-site.xml");
	getImpalaQueue();
	selectImpalaHadoopUser();
}

function getImpalaQueue() {
	var taskId = $("#taskId").val();

	$.ajax({
		async : false,
		url : '../task/getQueue',
		timeout : 30000,
		data : {
			taskId : taskId,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#impala_queue").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

function selectImpalaHadoopUser() {
	var taskId = $("#taskId").val();

	$.ajax({
		async : false,
		url : '../hadoopUser/selectByTaskId',
		timeout : 30000,
		data : {
			taskId : taskId,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#impala_username").val(data.username);
			$("#impala_kerberos").val("true")
			$("#impala_keytab").val(data.kerberosFile);
		},
		error : function(request, status, error) {
		}
	});
}

window.define = ace.define
var impalaEditor = ace.edit("impalaEditor");
impalaEditor.setTheme("ace/theme/xcode");
impalaEditor.session.setMode("ace/mode/sql");

function editImpalaSql() {
	var taskId = $("#taskId").val();
	var nodeId = $("#impala_div").attr("data-node");
	var sqlFileName = "";

	console.log("nodeId:" + nodeId);
	if ($("#impala_script").val().length == 0) {
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
					sqlFileName = data.sqlFileName + "_" + nodeId + ".imsql";
					console.log("sqlFileName:" + sqlFileName);
				}
				$("#impala_script").val("${nameNode}" + sqlFileName);
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
						impalaEditor.setValue(data);
						var divtype = "impalaSql_div";

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
		sqlFileName = $("#impala_script").val().replace("${nameNode}", "");
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
				impalaEditor.setValue(data);
				var divtype = "impalaSql_div";
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

function saveImpalaSql() {
	var taskId = $("#taskId").val();
	var nodeId = $("#impala_div").attr("data-node");
	var sqlFileName = $("#impala_script").val().replace("${nameNode}", "");
	var sqlContent = impalaEditor.getValue();

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

				var divtype = "impalaSql_div";
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

function saveImpala(obj) {
	var kerberos = $("#impala_kerberos").val();
	var jdbcUrl = $("#impala_jdbc-url").val();
	var script = $("#impala_script").val();
	var jobXml = $("#impala_job-xml").val();
	var formQueue = $("#impala_queue").val();

	// 判断必填项不为空
	if (kerberos == "") {
		$("#impala_kerberos").val("true");
	}
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
