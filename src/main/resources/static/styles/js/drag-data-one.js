
$(function () {
    o_uc_drag_data(".drag-data0");
})

//数据盘
var o_uc_drag,o_uc_x,o_uc_posX,o_uc_offsetLeft,o_uc_left,o_uc_base_left,o_span_baseW1,o_span_baseW2,o_span_baseW3;
var o_s_v1 = 512, o_s_v2 = 1024, o_s_v3 = 2048, o_input_val = 0, o_sumUC_DataCount = 0;

//加载数据盘拖拽效果
function o_uc_drag_data(objDrag){	
	o_uc_drag=objDrag;
	o_uc_x=$(o_uc_drag).parent().offset();
	o_span_w1=$(o_uc_drag).siblings(".column-w1 span:first").width()/512;
	o_uc_base_left=o_span_w1*5;
	$(o_uc_drag).css("left",o_uc_base_left+"px");
	$(o_uc_drag).siblings(".column-c").css("width",o_uc_base_left+"px");
	if (o_uc_x == null) return false;
	o_uc_offsetLeft=o_uc_x.left;
	o_span_baseW1 = $(o_uc_drag).siblings(".column-w1").find("span:first").width() / 512;
	o_span_baseW2=$(o_uc_drag).siblings(".column-w1").find("span:eq(1)").width()/512;
	o_span_baseW3=$(o_uc_drag).siblings(".column-w1").find("span:eq(2)").width()/1024;
	
    //绑定鼠标按下事件
	$(o_uc_drag).bind("mousedown", function (e) {
	    o_uc_drag = $(this);
	    o_uc_posX = e.clientX;
	    o_uc_left = o_uc_posX - o_uc_offsetLeft;
	    if (o_uc_left <= 0) {
	        $(this).siblings(".column-c").css("width", "0px");
	        $(this).css("left","0px");
	        o_input_val = 5;
	    }
	    else if (o_uc_left <= 240) {
	        $(this).siblings(".column-c").css("width", o_uc_left + "px");
	        $(this).css("left", o_uc_left + "px");
	        o_input_val = o_calculateVal(o_uc_left, o_span_baseW1, 0);
	    }
	    else if (o_uc_left <= 360) {
	        $(this).siblings(".column-c").css("width", o_uc_left + "px");
	        $(this).css("left",o_uc_left + "px");
	        o_input_val = o_calculateVal(o_uc_left - 240, o_span_baseW2, o_s_v1);
	    }
	    else if (o_uc_left <= 479) {
	        $(this).siblings(".column-c").css("width", o_uc_left + "px");
	        $(this).css("left", o_uc_left + "px");
	        o_input_val = o_calculateVal(o_uc_left - 360, o_span_baseW3, o_s_v2);
	    }
	    else if (_uc_left >= 479.5) {
	        $(this).siblings(".column-c").css("width", 479.5 + "px");
	        $(this).css("left", 479.5 + "px");
	        o_input_val = 2048;
	    }
	    $(this).parent().siblings(".mgl-20").find("input").val(o_input_val);
	    $(document).bind({
	        'mousemove': o_mouseMove_Data,
	        'mouseup': o_mouseUp_Data
	    });
	    return false;
	});	    

    //拖拽事件处理
	function o_mouseMove_Data(e){
	  o_uc_posX= e.clientX;
	  o_uc_left = o_uc_posX - o_uc_offsetLeft;
	  if (o_uc_left <= 0) {
		  $(o_uc_drag).siblings(".column-c").css("width", "0px");
		  $(o_uc_drag).css("left", "0px");
		  o_input_val=5;
	  }
	  else if (o_uc_left <= 240) {
		  $(o_uc_drag).siblings(".column-c").css("width", o_uc_left + "px");
		  $(o_uc_drag).css("left", o_uc_left + "px");
		  o_input_val=o_calculateVal(o_uc_left,o_span_baseW1,0);
	  }
	  else if(o_uc_left<=360) {
		  $(o_uc_drag).siblings(".column-c").css("width", o_uc_left + "px");
		  $(o_uc_drag).css("left", o_uc_left + "px");
		  o_input_val=o_calculateVal(o_uc_left-240,o_span_baseW2,o_s_v1);
	  }
	  else if(o_uc_left<=479){
		  $(o_uc_drag).siblings(".column-c").css("width", o_uc_left + "px");
		  $(o_uc_drag).css("left", o_uc_left + "px");
		  o_input_val=o_calculateVal(o_uc_left-360,o_span_baseW3,o_s_v2);
	  }
	  else if(o_uc_left>=479.5){
	  	  $(o_uc_drag).siblings(".column-c").css("width", 479.5 + "px");
		  $(o_uc_drag).css("left", 479.5 + "px");
		  o_input_val=2048;
	  }
    $(o_uc_drag).parent().siblings(".mgl-20").find("input").val(o_input_val);
}
//移除鼠标移动事件
function o_mouseUp_Data(e){
	$(document).unbind('mousemove');
}
//计算拖拽时数据盘相应容量值
function  o_calculateVal(widthVal,baseW,cumulativeVal){
	var o_val=parseInt(widthVal/baseW);
	if(cumulativeVal>0)o_val=o_val+cumulativeVal;
	return o_val;
}
}

	
