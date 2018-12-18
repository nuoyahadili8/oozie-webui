function checkABox(obj) {
	var group = $(obj).attr("name");
	var checked = ($(obj).prop('checked'));

	// 选中多个
	if ($(obj).hasClass("checkAll")) {
		if (checked) {
			$("input:checkbox[name='" + group + "']").attr('checked', true);
		} else {
			$("input:checkbox[name='" + group + "']").removeAttr('checked');
		}
		// 选中一个
	} else {
		var allChecked = true;
		if (!checked) {
			allChecked = false;
		} else {
			$("input:checkbox[name='" + group + "']").each(function() {
				if ((!$(this).hasClass("checkAll")) && !($(this).attr('checked'))) {
					allChecked = false;
					return false;
				}
			});
		}

		if (allChecked) {
			$("input:checkbox[name='" + group + "'].checkAll").attr('checked', true);
		} else {
			$("input:checkbox[name='" + group + "'].checkAll").removeAttr('checked');
		}
	}

}

function checkedIdArray(group) {
	var arr = [];
	$("input:checkbox[name='" + group + "']").each(function() {
		if ((!$(this).hasClass("checkAll")) && ($(this).prop('checked'))) {
			arr.push($(this).val());
		}
	});
	return arr;
}


//获取日期 yyyy-mm-dd
function getDate(){
	var nowDate = new Date();
	var date = nowDate.getFullYear()+"-" + formatDate(nowDate.getMonth()+1) + "-" + formatDate(nowDate.getDate());
	return date;
}

//获取日期和时间 yyyy-mm-dd hh:mm:ss
function getTime(){
	var nowDate = new Date();
	var date = nowDate.getFullYear()+"-" + formatDate(nowDate.getMonth()+1) + "-" + formatDate(nowDate.getDate());
	var hours = nowDate.getHours() < 10?(0 + nowDate.getHours()) : nowDate.getHours();
	var minutes = nowDate.getMinutes() < 10?(0 + nowDate.getMinutes()) : nowDate.getMinutes();
	var seconds = nowDate.getSeconds() < 10?(0 + nowDate.getSeconds()) : nowDate.getSeconds();
	var time = date + " " + hours + ":" + minutes + ":" + seconds;
	return time;
}

//格式化数字，不足2位的前面补0
function formatDate(val) {
	var valFormate = val;
	if (valFormate < 10) {
		valFormate = "0" + valFormate;
	}
	return valFormate;
}