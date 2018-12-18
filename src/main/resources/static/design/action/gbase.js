$(document).ready(function() {
	// queryConfGbaseForList();
});

function queryConfGbaseForList() {
	var platformId = $("#platformId").val();

	$.ajax({
		async : false,
		url : '../confGbase/selectForOption',
		timeout : 30000,
		data : {
			platformId : platformId,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#gbase_jdbc-url").empty();
			if (data.length == 0) {
				$("#gbase_jdbc-url").append("<option value=''>没有可选项，请配置</option>");
			} else if (data.length >= 1) {
				$("#gbase_jdbc-url").append("<option value=''>请选择...</option>");
			}
			$.each(data, function(i, item) {
				$("#gbase_jdbc-url").append("<option value='" + item.url + "'>" + item.name + "</option>");
			});
		},
		error : function(request, status, error) {
		}
	});
}

function auto_value_gbase(obj) {
	var platformId = $("#platformId").val();
	var opt = obj.options[obj.selectedIndex]
	var name = opt.text;

	$.ajax({
		async : false,
		url : '../confGbase/selectByName',
		timeout : 30000,
		data : {
			platformId : platformId,
			name : name,
			date : new Date()
		},
		dataType : 'json',
		success : function(data) {
			$("#gbase_username").val(data.username);
			$("#gbase_password").val(data.password);
		},
		error : function(request, status, error) {
		}
	});

	getGbaseQueue();
}

function getGbaseQueue() {
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
			$("#gbase_queue").val(data.queue);
		},
		error : function(request, status, error) {
		}
	});
}

window.define = ace.define
var gbaseEditor = ace.edit("gbaseEditor");
gbaseEditor.setTheme("ace/theme/xcode");
gbaseEditor.session.setMode("ace/mode/sql");

function editGbaseSql() {
	var taskId = $("#taskId").val();
	var nodeId = $("#gbase_div").attr("data-node");
	var sqlFileName = "";

	console.log("nodeId:" + nodeId);
	if ($("#gbase_script").val().length == 0) {
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
					sqlFileName = data.sqlFileName + "_" + nodeId + ".gsql";
					console.log("sqlFileName:" + sqlFileName);
				}
				$("#gbase_script").val("${nameNode}" + sqlFileName);
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
						gbaseEditor.setValue(data);
						var divtype = "gbaseSql_div";

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
		sqlFileName = $("#gbase_script").val().replace("${nameNode}", "");
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
				gbaseEditor.setValue(data);
				var divtype = "gbaseSql_div";
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

function saveGbaseSql() {
	var taskId = $("#taskId").val();
	var nodeId = $("#gbase_div").attr("data-node");
	var sqlFileName = $("#gbase_script").val().replace("${nameNode}", "");
	var sqlContent = gbaseEditor.getValue();

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

				var divtype = "gbaseSql_div";
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

function saveGbase(obj) {
	var jdbcUrl = $("#gbase_jdbc-url").val();
	var script = $("#gbase_script").val();
	var jobXml = $("#gbase_job-xml").val();
	var formQueue = $("#gbase_queue").val();

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
