// 文件上传
jQuery(function() {
	var $ = jQuery, $list = $('#thelist'), $btn = $('#ctlBtn'),$cfbtn = $('#createFlowBtn'), state = 'pending', uploader;

	uploader = WebUploader.create({

		// 不压缩image
		resize : false,

		// swf文件路径
		swf : 'styles/js/uploader/Uploader.swf',

		// 文件接收服务端。
		server : '../workflow/uploadXML',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick : '#picker'
	});

	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {
		$list.append('<div id="' + file.id + '" class="item">'
				+ '<h4 class="info">' + file.name
				+ '</h4><a onclick="deletefile(this);">删除</a>'
				+ '<p class="state">等待上传...</p>' + '</div>');
	});
	// 删除当前添加的文件条目

	// 文件上传过程中创建进度条实时显示。
	uploader.on(
					'uploadProgress',
					function(file, percentage) {
						var $li = $('#' + file.id), $percent = $li
								.find('.progress .progress-bar');

						// 避免重复创建
						if (!$percent.length) {
							$percent = $(
									'<div class="progress progress-striped active">'
											+ '<div class="progress-bar" role="progressbar" style="width: 0%">'
											+ '</div>' + '</div>')
									.appendTo($li).find('.progress-bar');
						}
						$li.find('p.state').text('上传中');
						$percent.css('width', percentage * 100 + '%');
					});

	uploader.on('uploadSuccess', function(file) {
		$('#' + file.id).find('p.state').text('已上传');
	});

	uploader.on('uploadError', function(file) {
		$('#' + file.id).find('p.state').text('上传出错');
		$("#idTmpFile").val("");
	});

	uploader.on('uploadComplete', function(file,ret) {
		$('#' + file.id).find('.progress').fadeOut();
	});

	uploader.on('uploadAccept',function(object,ret) {
		$('#idTmpFile').val(ret._raw);
	});
	
	uploader.on('all', function(type) {
		if (type === 'startUpload') {
			state = 'uploading';
		} else if (type === 'stopUpload') {
			state = 'paused';
		} else if (type === 'uploadFinished') {
			state = 'done';
		}

		if (state === 'uploading') {
			$btn.text('暂停上传');
		} else {
			$btn.text('开始上传');
		}
	});

	$btn.on('click', function() {
		if (state === 'uploading') {
			uploader.stop();
		} else {
			uploader.upload();
		}
	});
	
	$cfbtn.on('click', function() {
		if($("#idTmpFile").val()==""){
			alert("请先上传文件！");
			return;
		}
		$.ajax({
			type : "POST",
			url : '../workflow/createFlowFromfile',
			data : {file:$("#idTmpFile").val(),date:new Date()},
			dataType : "text",
			success : function(data) {
				$("#uploader").css({left:-1000});

				allscene.clear();

				loadnode(data);
				uploader.reset();
			}
		});	
		
	});
});
function deletefile(fileitem) {
	var x = $(fileitem).parent().parent();
	x.empty();
}