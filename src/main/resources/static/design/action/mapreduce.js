$(document).ready(function() {
	var paraType = "10001";
	var taskId = $("#taskId").val();
	$('#mapreduce_jar').autocomplete({
		serviceUrl : '../program/autoCompleteFilePath?taskId='+taskId+'&date=' + new Date() + '&fileType=.jar',
		onSelect : function(suggestion) {

		},
		onFocus : function(suggestion) {

		}
	});
});