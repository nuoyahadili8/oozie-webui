$(document).ready(function() {
	var paraType = "10001";
	var taskId = $("#taskId").val();
});

function saveEmail(obj) {
	var to = $("#email_to").val();
	var subject = $("#email_subject").val();
	var body = $("#email_body").val();
	// 判断必填项不为空
	if (to == "") {
		layer.alert('未填写【邮件接收地址】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (subject == "") {
		layer.alert('未填写【邮件主题】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if (body == "") {
		layer.alert('未填写【邮件正文】！', {
			icon : 0,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	htmltojson(obj);
}