//判断浏览器分辨率，如果是1024*768的，那么整体框架的宽度是980px，否则是1200px；
$(function(){
	var _browserW = window.screen.width;
	var _W1024 = 1024;
	//alert(_browserW);
	if(_browserW == _W1024){
		$(".top").addClass("top-1000");
		$(".top-con").addClass("top-con1000");
		$(".nav").addClass("nav-1000");
		$(".nav-con").addClass("nav-con1000");
		$(".container").addClass("container1000");
		$(".footer").addClass("footer-1000");
		$(".footer-con").addClass("footer-con1000");
		$(".copy").addClass("copy-1000");
		$(".copy-con").addClass("copy-con1000");
		$(".div-bg1").addClass("div-bg11000");
		$(".div-bg2").addClass("div-bg21000");
		$(".div-bg3").addClass("div-bg31000");
		$(".div-bg4").addClass("div-bg41000");
		$(".col-c2-1").addClass("col-c2-1n");
		$(".col-c2-2").addClass("col-c2-2n");
		$(".col-c7").addClass("col-c7-1000");
		$(".step-n").addClass("step-w").removeClass("step-n");
		var _length = $(".step-w .font-w").length;
		if(_length==1){			
			$(".step-w").addClass("step-w1");
		}else if(_length==2){			
			$(".step-w").addClass("step-w2");
		} else {			
			$(".step-w").addClass("step-w3");
		}
		//alert(_length)
	}
})
//首页banner图片轮播
$(function(){
	var n = 0,
	_imgs = $("div.scroll-img>div"),
	_nums = $(".scroll-num>li"),
	count = _imgs.length;
	_nums.eq(0).addClass("on");
	_imgs.eq(0).siblings().hide();
	_nums.mouseover(function(){
		var i = $(this).index();
		n = i;		
		_imgs.eq(i).fadeIn().siblings().hide();
		$(this).addClass("on").siblings().removeClass("on");
	});
	var m = setInterval(function(){
		_nums.eq(n).trigger('mouseover');
		++n >= count? n=0 : n=n;
	}, 5000);
})
//二级导航
$(function(){
	$("#nav-ul li[data-nav]").each(function(index, element) {
        var totalWidth = 0;
		$(this).find(".sub-navcon").find("dl").each(function(index, element) {
            totalWidth += $(this).outerWidth(true)+90;
        });
		$(this).find(".sub-navcon").width(totalWidth);
    });
	/*$(".js_sub_nav").hover(function(){		
		$(this).children(".sub-nav").css({"opacity":1,"z-index":"1"}).stop(false,true).slideDown(300);
		var sub_navcon = $(".js_sub_nav").find(".sub-nav .sub-navcon");
		sub_navcon.each(function(index) {
        var _dl=$(sub_navcon[index]).find("dl");
		var _dlWidthSum=0;
		_dl.each(function(index) {
            _dlWidthSum+=$(_dl[index]).width()+50;
			//alert($(_dl[index]).width())
        });
		//alert(_dl.length)
		$(sub_navcon[index]).css({width:_dlWidthSum,"margin":"0 auto"})
    });
	},function(){
		$(this).children(".sub-nav").stop(false,true).slideUp(300);
	})*/
	var bjcloud = ["product_timer","users_timer","ctrl-center_timer","bbs_timer","support_timer"];
	$("#nav-ul li[data-nav]").hover(function(){
			var _nav=$(this).attr("data-nav");
			var _this = this;
			clearTimeout(bjcloud[_nav+"_timer"]);
			bjcloud[_nav+"_timer"]=setTimeout(function(){
				$(_this).find(">a").addClass();
				$("[data-nav]").each(function(){
					if(_nav==$(this).attr("data-nav")){
						$(this).find(">a").addClass("nav-li-selected");
					}else{
						$(this).find(">a").removeClass("nav-li-selected");
					}
					//$(this)[_nav==$(this).attr("data-nav")?"addClass":"removeClass"]("nav-up-selected")
				});
				$(".sub-nav",$(_this)).stop(true,true).slideDown(200)
			},150)
		},function(){
			var _nav=$(this).attr("data-nav");
			var _this = this;
			clearTimeout(bjcloud[_nav+"_timer"]);
			bjcloud[_nav+"_timer"]=setTimeout(function(){
				$(_this).find(">a").removeClass("nav-li-selected");
				$(".sub-nav",$(_this)).stop(true,true).slideUp(200)
			},150)
	});
	
	
})
$(function(){
	//滑过资质图片边框和字体颜色
	$(".js_pic a").hover(function(){
		$(this).addClass("a-h");
	},function(){
		$(this).removeClass("a-h");
	})
	//滑过云数据中心模块，边框颜色
	$(".js_border .col-c1-1 .box-con").hover(function(){
		$(this).addClass("div-border");
	},function(){
		$(this).removeClass("div-border");
	})
	ui_common_tab(".js_show_tab .js_tab_caption ul li");//通用tab，滑过效果
	ui_click_tab(".js_click_tab .js_click_caption ul li");//通用tab，滑过效果
	ui_click_tabhot(".js_click_tab .js_click_caption a");
	ui_click_tabindex(".js_click_tab .js_click_caption a");//应用管理首页tab
	ui_list_tab(".js_list_tab .js_list_caption a");//应用管理首页右侧排行新添加tab
	ui_list_tabBox(".js_list_tabBox .js_list_tabA a");//应用管理首页左侧社交生活等 新添加tab
	
	ui_list_analysis2(".js_list_tabBox2 .js_list_tabA2 a");//自助分析 新添加tab
})
//通用tab，滑过效果
function ui_common_tab(obj){
	$(obj).hover(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).addClass("on");
		var temp_id = $(this).parent().children("li").index($(this));
		$(this).parent().parent().next().children("div").css("display","none");
		$(this).parent().parent().next().children("div").eq(temp_id).css("display","block");
		
	})
}
//通用tab，点击效果
function ui_click_tab(Obj){
	$(Obj).click(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).addClass("on");
		var temp_id = $(this).parent().children("li").index($(this));
		$(this).parent().parent().next().children("div").css("display","none");
		$(this).parent().parent().next().children("div").eq(temp_id).css("display","block");
		
	})
}
//推荐热门最新
function ui_click_tabhot(Obj){
	$(Obj).click(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).addClass("on");
	})
}
//推荐热门最新
function ui_click_tabindex(Obj){
	$(Obj).click(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).parent().find("i").remove("i");
		$(this).addClass("on").append("<i></i>");
		//var temp_id = $(this).parent().children("li").index($(this));
		//$(this).parent().parent().next().children("div").css("display","none");
		//$(this).parent().parent().next().children("div").eq(temp_id).css("display","block");
		
	})
}
//通用tab，滑过效果
function ui_list_tab(obj){
	$(obj).click(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).addClass("on");
		var temp_id = $(this).parent().children("a").index($(this));
		$(this).parent().parent().next().children("div").css("display","none");
		$(this).parent().parent().next().children("div").eq(temp_id).css("display","block");
		
	})
}
//通用tab，滑过效果
function ui_list_tabBox(obj){
	$(obj).click(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).addClass("on");
		var temp_id = $(this).parent().children("a").index($(this));
		$(this).parent().next().children("div").css("display","none");
		$(this).parent().next().children("div").eq(temp_id).css("display","block");
		
	})
}
//自助分析下的tab
function ui_list_analysis2(obj){
	$(obj).click(function(){
		$(this).parent().find(".on").removeClass("on");
		$(this).addClass("on");
		var temp_id = $(this).parent().children("a").index($(this));
		$(this).parent().next().children("div").css("display","none");
		$(this).parent().next().children("div").eq(temp_id).css("display","block");
		
	})
}
//合作伙伴
$(function () {	
	var n = 0,
	_index,
	_lis = $(".col-c6-con .content"),
	_nums = $(".col-btn>a"),
	count = _lis.length;
	_nums.eq(0).addClass("on");
	_nums.mouseover(function(){
		var i = $(this).index();
		n = i;	
		$(this).addClass("on").siblings().removeClass("on");
	});
	var t = setInterval(function(){
		_nums.eq(n).trigger('mouseover');
		++n >= count? n=0 : n=n;
	}, 5000);
	
	var ui_div_left = $(".col-c6-con");
	var ui_Width_div = $(".col-c6-con .content").width(); //获取焦点图的宽度（显示面积）
	var ui_div_len = $(".col-c6-con .content").length; //获取焦点图个数


	var ui_group = $(".col-btn a").length;	
	
	$(".col-btn a:eq(0)").addClass("on");
	var ui_guess_Width = ui_Width_div * ui_div_len;
	$(".col-c6-con").css("width", ui_guess_Width);
	$(".col-c6-con .content").css("width",ui_guess_Width/ui_div_len);
	if (ui_div_left.length > 0) {
		var ui_guess_ul_left = document.getElementById('move').style.marginLeft;
	}
	
	$(".col-btn a").hover(function () {
		$(this).addClass("on").siblings().removeClass("on");
		var ul_left = $(".col-btn a").index(this) * -ui_Width_div;
		ui_guess_ul_left = ul_left;
		//$(".col-c6-con").css({ left: ul_left +"px"});
		$(".col-c6-con").animate({ left: ul_left +"px"});
		return false;
	})
});

$(function(){
	$(".js_table_f1 tr:odd").addClass("tr-bink");
	$(".js_table_f1 tr").find("td:last").css({"border-right":"none","text-align":"left"});
	$(".js_table_f1 tr").find("td:first").css({"border-left":"none"});
	$(".js_table_f1 tr").find("th:last").css({"border-right":"none"});
	$(".js_table_f1 tr").find("th:first").css({"border-left":"none"});/**/
	$(".js_table_f1 tbody tr:first").find("td:eq(1)").css({"background":"#fff"});
	$(".js_table_f1 thead tr th").css({"border-top":"none"});
	
	//获取到右侧的高度，然后负值给左侧
	var _h = $(".col-c7 .main-c1j").outerHeight();
	if(_h>400){
		$(".col-c7 .side-c1").css("height",(_h+100)+"px");
	}else{
		//$(".col-c7 .side-c1").css("height",600+"px");
		$(".col-c7 .main-c1j").css("height",675+"px");
	}	
	
	//滑过产品服务左侧导航
	$(".js_list_w6 li").hover(function(){
		$(this).addClass("h");
	},function(){
		$(this).removeClass("h");
	})
	
	//控制中心表格隔行变色
	$(".js_table_f4 tr:even").addClass("tr-bink");
	$(".js_table_f4_2 tr:even").addClass("tr-bink");
	$(".js_table_f4_3 tr:even").addClass("tr-bink");
	$(".check-box").toggle(function(){
		$(this).addClass("check-boxs");
	},function(){
		$(this).removeClass("check-boxs");
	})
	
	//更多操作
	$(".js_more").hover(function(){
		$(this).children(".more").addClass("more-h");
		$(this).children(".operate-dl").show();
	},function(){
		$(this).children(".more").removeClass("more-h");
		$(this).children(".operate-dl").hide();
	})
	
	//滑过控制中心方框变色
	$(".list-item").hover(function(){
		$(this).addClass("list-item-bg");
	},function(){
		$(this).removeClass("list-item-bg");
	})
	
	//预警开关
	$(".js_switch .i-right").click(function(){		
		$(this).parents("td").find(".thick-content").show();
		$(this).children("i").css("display","block");
		$(this).parents(".span-bg").addClass("span-bg1");
		$(this).siblings(".i-left").children("i").css("display","none");
	})
	$(".js_switch .i-left").click(function(){
		$(this).children("i").css("display","block");
		$(this).parents(".span-bg").removeClass("span-bg1");
		$(this).siblings(".i-right").children("i").css("display","none");
	})
	//选择配置选择
	$(".js_more_c li .btn-n1").click(function(){
		$(this).addClass("btn-n1on").siblings(".btn-n1").removeClass("btn-n1on");
		return false;
	})
	$(".js_more_c li .btn-n1").hover(function(){
		$(this).addClass("btn-n1on-hover");
	},function(){
		$(this).removeClass("btn-n1on-hover");
	})
	//购买页面按钮
	$(".btn-white").hover(function(){
		$(this).addClass("btn-blue-h");
	},function(){
		$(this).removeClass("btn-blue-h");
	})
	$(".btn-white").click(function(){
		$(this).addClass("btn-blue-c").siblings().removeClass("btn-blue-c");
		return false;
	})
	//购买方式
	$(".js_month").click(function(){
		$(this).addClass("btn-n1on").siblings().removeClass("btn-n1on");
		$(".li-hour").hide();
		$(".li-month").show();
		return false;
	})
	$(".js_hour").click(function(){
		$(this).addClass("btn-n1on").siblings().removeClass("btn-n1on");
		$(".li-hour").show();
		$(".li-month").hide();
		return false;
	})
	//产品购买数量
	ui_number(".js_number",".a-addn",".a-cut",".input-w4-1");
})
//产品购买数量
function ui_number(objPos,objA,objC,objI){
	var a=$(objI).val();
	$(objPos).delegate(objA,"click",function(){
		a++;
		$(objI).val(a);
		return false;
	})
	$(objPos).delegate(objC,"click",function(){
		a--;
		$(objI).val(a);		
		if(a<=1){
			a=1;
			$(objI).val(1);		
		}
		return false;
	})
}

//虚拟下来框
$(function(){
	$(document).click (function(){
	    $(".select-list").hide();
        //alert(1)
	});
	selectEvent(".select-n1",true);
	selectEvent(".select-list-n1",false);	
	ui_select_load(".select-list-n1 li",".select-n1");
	
	selectEvent(".select-c1",true);
	selectEvent(".select-list-c1",false);
	ui_select_load(".select-list-c1 li",".select-c1");
	
	selectEvent(".select-c2",true);
	selectEvent(".select-list-c1",false);
	ui_select_load(".select-list-n2 li",".select-c2");
})
function ui_select_load(Obj,Obj1){
	$(Obj).hover(function(){
		$(this).addClass("li-hover");
	},function(){
		$(this).removeClass("li-hover");
	})	
	$(Obj).click(function(){
		var s_txt = $(this).text();
		//$(Obj1).html(s_txt);
		$(this).parent(".select-list").siblings().html(s_txt);//修改后
		$(this).parent(".select-list").hide();
	})
}
function selectEvent(slt,isTrue){
	$(slt).click(function(event){
		$(document).click();
		var e=window.event || event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		if(isTrue==true){
			$(slt).siblings().show();
		}
	});
}

//订单管理虚拟下来菜单
$(function(){
	//$(".select_box").click(function(event){   
//		event.stopPropagation();
//		$(this).find(".option").toggle();
//		$(this).siblings().find(".option").hide();
//	});
//	$(document).click(function(event){
//		var eo=$(event.target);
//		if($(".select_box").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length)
//		$('.option').hide();									  
//	});
//	/*赋值给文本框*/
//	$(".option li").click(function(){
//		var value=$(this).text();
//		$(this).parent().siblings(".select_txt").find("span").text(value);
//		//$("#select_value").val(value)
//	})
//	$(".option li").hover(function(){
//		$(this).addClass("h");
//	},function(){
//		$(this).removeClass("h");
//	})
virtual_select(".select_box",".option",".select_txt");
})

//公网宽带
var _index, _offsetLeft, _posx, _left, _spanWidth, _count, _base;
$(function () {
    gongwangkuandai();
})
function gongwangkuandai() {
    var x = $(".column-w1").offset();
    _spanWidth = $(".column-w1 span:first").width() / 5;
    _base = _spanWidth - 2;
    _index = 0;
    $(".column-w2").css("width", _base + "px");
    $(".drag").css("left", _base - 5 + "px");
    if (x == null) return false;
    _offsetLeft = x.left;
    /*$(".column-w1 span").bind("click",function(e){
    _index=$(this).index();
    _posx = e.clientX;
    _left = _posx - _offsetLeft;

    $(".drag").css("left",_left - 5 + "px");
    $(".column-w2").css("width",_left + "px");
    $(this).css("left",_left+"px");
    $(".uc-input").val(parseInt(ComputeValue(_left)));
    return false;
    })*/
    $(".drag").live("mousedown", function (e) {
        var _offsetLeft = $(this).prev(".column-w1").offset().left;
        _posx = e.clientX;
        _left = _posx - _offsetLeft;

        //alert(_left)
        /*
        if (_left <= 0) {
        $(this).prev(".column-w2").css("width", "0px");
        $(this).css("left", "0px");
        }
        else if (_left <= 478) {
        $(this).prev(".column-w2").css("width", _left + "px");
        $(this).css("left", _left + "px");
        }
        else {
        $(this).prev(".column-w2").css("width", 478 + "px");
        $(this).css("left", 478 + "px");
        }
        */
        var _this = this;
        $(document).bind({
            'mousemove': function (e) { mouseMove(e, _this, _offsetLeft) },
            'mouseup': function (e) { mouseUp(e, _this) }
        });
        return false;
    })
    $(".uc-input").live("keyup", function () {
        var _val = $(this).val();
        _val = _val.replace(/[^0-9]/g, '')
        $(this).val(_val)
        if (_val == "") return false;
        if (parseInt(_val) <= 1) $(this).val(1);
        if (parseInt(_val) > 200) $(this).val(200);
        var _sum = ComputeSetLeft(_val) - 5;
        $(this).parent().prev().find(".column-w2").css("width", _sum + "px");
        $(this).parent().prev().find(".drag").css("left", _sum - 5 + "px");
    });
    $(".column .column-w1").find("span").live("click", function (e) {
        _offsetLeft = $(this).parents(".column-w1").offset().left;
        var obj = $(this).parents(".column").find(".drag");
        _posx = e.clientX;
        _left = _posx - _offsetLeft;
        if (_left <= _spanWidth) {
            $(obj).prev(".column-w2").css("width", _spanWidth+"px");
            $(obj).css("left", _spanWidth - 5 + "px");
        }
        else if (_left <= 480) {
            $(obj).prev(".column-w2").css("width", _left + "px");
            $(obj).css("left", _left - 5 + "px");
        }
        else {
            $(obj).prev(".column-w2").css("width", 478 + "px");
            $(this).css("left", 478 - 5 + "px");
        }
        $(obj).parent().next().find(".uc-input").val(parseInt(ComputeValue(_left)));
        return false;
    })
}
function mouseMove(e,obj,_offsetLeft){
	_posx = e.clientX;
	_left = _posx - _offsetLeft;
	if (_left <= _spanWidth) {
	  $(obj).prev(".column-w2").css("width",_spanWidth+"px");
	  $(obj).css("left", _spanWidth - 5 + "px");
	} 
	else if(_left<=480) {
		$(obj).prev(".column-w2").css("width",_left+"px");
		$(obj).css("left", _left - 5 + "px");
	}
	else{			
		$(obj).prev(".column-w2").css("width",478+"px");
		$(this).css("left",478-5+"px");		
	}
	$(obj).parent().next().find(".uc-input").val(parseInt(ComputeValue(_left)));
	return false;
}
function mouseUp(e){
	$(document).unbind('mousemove');
	$(document).unbind('mouseup');
}
function ComputeValue(_setLeft) {
    if (_setLeft <= 48) return 1;
    if (_setLeft > 480) return 200;
    if (_setLeft <= 240) return _left / 48;
    if (_setLeft > 240 && _left <= 360) return (_left - 240) / 1.26315789 + 5;
    if (_setLeft > 360) return (_left - 360) / 1.2 + 100;
}
function ComputeSetLeft(val) {
    if (val <= 1) return 48;
    if (val >= 200) return 480;
    if (val <= 5) return val * 48;
    if (val > 5 && val <= 100) return 240 + (val-5) * 1.26315789;
    if (val > 100) return 360 + (val-100)*1.2
}
function RecursionCount(a,b){
	if(a-b>b){
		return 1+ RecursionCount(a-b,b);
	}else if(a-b < b && a-b>0){
		return 2;
	}else if(a>0 && a-b<0) {
		return 1;
	}else{
		return 0;
	}
}

//购买时长
var _index_m,_offsetLeft_m,_posx_m,_left_m,_spanWidth_m,_count_m,_base_m;
$(function () {
    var x = $(".column-w1-1").offset();
    _spanWidth_m = $(".column-w1-1 span:first").width() / 6;
    _base_m = _spanWidth_m - 2;
    _index_m = 0;
    $(".column-w2-2").css("width", _base_m + "px");
    $(".drag-w1").css("left", _base_m - 5 + "px");
    if (x == null) return false;
    _offsetLeft_m = x.left;
    /*$(".column-w1-1 span").bind("click",function(e){
    _index_m=$(this).index();
    _posx_m = e.clientX;
    _left_m = _posx_m - _offsetLeft_m;

    $(".drag-w1").css("left",_left_m - 5 + "px");
    $(".column-w2-2").css("width",_left_m + "px");
    $(this).css("left",_left_m+"px");
    $(".uc-input-month").val(parseInt(ComputeValue(_left_m)));
    return false;
    })*/
    $(".drag-w1").bind("mousedown", function (e) {
        _posx_m = e.clientX;
        _left_m = _posx_m - _offsetLeft_m;
        //alert(_left)
        if (_left_m <= 20) {
            $(".column-w2-2").css("width", _spanWidth_m + "px");
            $(this).css("left", _spanWidth_m - 5 + "px");
        }
        else if (_left_m <= 478) {
            $(".column-w2-2").css("width", _left_m + "px");
            $(this).css("left", _left_m - 5 + "px");
        }
        else {
            $(".column-w2-2").css("width", 478 + "px");
            $(this).css("left", 478 - 5 + "px");
        }
        $(document).bind({
            'mousemove': mouseMove_M,
            'mouseup': mouseUp_M
        });
        return false;
    })
    $(".uc-input-month").bind("keyup", function () {
        var _val = $(".uc-input-month").val();
        _val = _val.replace(/[^0-9]/g, '')
        $(".uc-input-month").val(_val)
        if (_val == "") return false;
        if (parseInt(_val) <= 1) $(".uc-input-month").val(1);
        if (parseInt(_val) > 24) $(".uc-input-month").val(24);
        _val = $(".uc-input-month").val();
        $(".uc-show-month").text(" " + _val + " ");
        var _sum = ComputeSetLeft_M(_val);
        $(".column-w2-2").css("width", _sum + "px");
        $(".drag-w1").css("left", _sum + "px");
    });

    $(".month .column span").bind("click", function (e) {
        _posx_m = e.clientX;
        _left_m = _posx_m - _offsetLeft_m;
        if (_left_m <= _spanWidth_m) {
            $(".column-w2-2").css("width", _spanWidth_m + "px");
            $(".drag-w1").css("left", _spanWidth_m - 5 + "px");
        }
        else if (_left_m <= 480) {
            $(".column-w2-2").css("width", _left_m + "px");
            $(".drag-w1").css("left", _left_m - 5 + "px");
        }
        else {
            $(".column-w2-2").css("width", 478 + "px");
            $(".drag-w1").css("left", 478 - 5 + "px");
        }
        var _sv = parseInt(ComputeValue_M(_left_m))
        $(".uc-input-month").val(_sv);
        $(".uc-show-month").text(" " + _sv + " ");
    })
})
function mouseMove_M(e){
	_posx_m = e.clientX;
	_left_m = _posx_m - _offsetLeft_m;
	if (_left_m <= _spanWidth_m) {
	  $(".column-w2-2").css("width",_spanWidth_m+"px");
	  $(".drag-w1").css("left", _spanWidth_m - 5 + "px");
	} 
	else if(_left_m<=480) {
		$(".column-w2-2").css("width",_left_m+"px");
		$(".drag-w1").css("left",_left_m-5+"px");
	}
	else{			
		$(".column-w2-2").css("width",478+"px");
		$(".drag-w1").css("left", 478 - 5 + "px");		
	}
var _sv = parseInt(ComputeValue_M(_left_m))
$(".uc-input-month").val(_sv);
$(".uc-show-month").text(" " + _sv + " ");
}
function mouseUp_M(e){
	$(document).unbind('mousemove');
}
function ComputeValue_M(_setLeft) {
    if (_setLeft <= _spanWidth_m) return 1;
    if (_setLeft >= 480) return 24;
	var val=_setLeft/_spanWidth_m;
    return val+(_setLeft - val*_spanWidth_m>0?1:0);
}
function ComputeSetLeft_M(val) {
    if (val <= 1) return _spanWidth_m;
    if (val >= 24) return 480;
    return _spanWidth_m * val;
}

//支付方式选择
$(function(){
	$(".js_pay_list li input").click(function(){
	  $(this).attr("checked","checked");
	  if($(this).attr("checked","checked")){
		  $(".btn-28").addClass("btn-29");
	  }	  
	});
	$(".js_radio img").click(function(){
		$(this).parent().siblings("input").attr("checked","checked");
		$(this).addClass("border-ore");
		$(this).parent().parent().siblings().find("img").removeClass();
		if($(this).attr("class","border-ore")){
		  $(".btn-28").addClass("btn-29");
	  	}		
	})
	//支付方式tab选择
	$(".js_bank i").click(function(){
		$(this).addClass("zfbon").siblings("i").removeClass("zfbon");
		var temp_id = $(this).parent().children("i").index($(this));
		$(this).parent().next(".content-bank").children("div").css("display","none");
		$(this).parent().next(".content-bank").children("div").eq(temp_id).css("display","block");
		
	})
	//发票邮件方式
	$(".js_post em").click(function(){
		if($(this).attr("class")=="mgr-20 mail"){
			$(this).parents(".bill-t").siblings(".bill-address").show();
		} else {
			$(this).parents(".bill-t").siblings(".bill-address").hide();
		}
	})
	//弹出层
	ui_thick(".js_thick", ".js_t_close", ".thick-content");
})
//弹出层
function ui_thick(objShow,objHide,objThick) {
    var _w = $(objThick).width() / 2;
    var _h = $(objThick).height() / 2;
    $(objThick).css("margin-left", -_w + "px");
    if (!(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
        $(objThick).css({
            marginTop: -_h + 'px'
        });
    }
    $(objShow).click(function () {
        $("#thick_bj").show();
        $(objThick).show();		
        return false;
    })
    $(objHide).click(function () {
        $("#thick_bj").hide();
        $(objThick).hide();
        return false;
    }) 	
}

//数据盘
var _uc_drag,_uc_x,_uc_posX,_uc_offsetLeft,_uc_left,_uc_base_left,_span_baseW1,_span_baseW2,_span_baseW3;
var _s_v1 = 512, _s_v2 = 1024, _s_v3 = 2048, _input_val = 0, _sumUC_DataCount = 0;
$(function () {
    //添加一块数据盘
    $(".a-add").bind("click", function () {
        $(document).click();
		var _sum=0;
		var _inputList = $(".uc-input-data");
    	_inputList.each(function (i) {
        	_sum += parseInt($(_inputList[i]).val());
    	})
		if(_sum>=2048){
			$(this).addClass("font-gary1");
			return false;
		}
		else{
			$(this).removeClass("font-gary1");
		}
        if ($(this).hasClass("font-gary")) return false;
        var _len_data = $(this).closest(".column-data").children(".row-li").length;
        if (_len_data < 5) {
            _sumUC_DataCount++;
            var _uc_data_content = "<div class='row-li pb15 w620'><div class='fl position-rel'><div class='column-w1'><span class='block first'><div>512GB</div></span><span class='block second'><div>1024GB</div></span><span class='block second last'><div>2048GB</div></span></div><div class='column-c' style='width: 46px;'><div class='column-oer'><span class='block first'><div>512GB</div></span><span class='block second'><div>1024GB</div></span><span class='block second'><div>2048GB</div></span></div></div><a class='drag-data ^drag-data-index^'><i></i><i></i><i></i></a></div><span class='mgl-15'><input type='text' value='5' class='uc-input-data'> GB</span><a href='javascript:void(0)' class='close-a'></a></div>";
            _uc_data_content = _uc_data_content.replace("^drag-data-index^", "drag-data" + _sumUC_DataCount);
            $(this).parent(".row-li-last").before(_uc_data_content);
			
            uc_drag_data(".drag-data" + _sumUC_DataCount);
            if (4 - _len_data == 0) {
                $(this).addClass("font-gary1");
				$(this).html("不可再添加");
            }
            else {
                $(this).removeClass("font-gary1");
				$(this).html("添加一块");
            }
            $(this).closest(".column-data").find(".disk-number").html(4 - _len_data);
            $(this).closest(".column-data").find(".disk-over-capacity").html(uc_get_dataval(0, 5));
			
        }
        return false;
    })
	//移除一块数据盘
    $(".column-data").delegate('.close-a', 'click', function () {
        $(document).click();
		var _i_val = $(this).siblings("span").find("input").val();
		var _this =this;
		$(this).parent().remove();
		var _s_h = 5 - $('#disk-over-capacity').closest(".column-data").find(">.row-li").length; ;
		$('#disk-over-capacity').closest('.column-data').find('.row-li-last').find(".disk-number").html(_s_h);
		$('#disk-over-capacity').closest('.column-data').find('.row-li-last').find(".disk-info").children("span:first").show();
		$('#disk-over-capacity').text(uc_get_dataval(_i_val, 0));
		$('#disk-over-capacity').closest('.column-data').find('.row-li-last').find(".a-add").removeClass("font-gary1").html("添加一块");
		return false;
	})	
	
	//页面初始化时根据输入框值计算拖动位置20140528
	var _luc=$(".uc-input-data");
	if(_luc.length>1){
		_luc.each(function(index) {
			var _uc_v=$(_luc[index]).val();
            if(parseInt(_uc_v)>=5){
				var _l=calculatePostion(parseInt("0"+_uc_v));
				$(_luc[index]).parent().siblings(".fl").find(".drag-data").siblings(".column-c").css("width", _l + "px");
				$(_luc[index]).parent().siblings(".fl").find(".drag-data").css("left", _l - 5 + "px");
			}
        });
	}
})

//获取剩余数据盘容量
function uc_get_dataval(removeVal,useVal) {
    var _sum_vals = 0;
    var _inputLists = $(".uc-input-data");
    _inputLists.each(function (i) {
        _sum_vals += parseInt( $(_inputLists[i]).val());
    })
    if (_sum_vals >= 2048) return 0;
    if (parseInt("0" + removeVal) > 0) return 2048 - _sum_vals;
    if (useVal > 0) return 2048 - _sum_vals;
    if (parseInt("0" + removeVal) == 0) return 2048;    
}
//加载数据盘拖拽效果
function uc_drag_data(objDrag){	
	_uc_drag=objDrag;
	_uc_x=$(_uc_drag).parent().offset();
	_span_w1=$(_uc_drag).siblings(".column-w1 span:first").width()/512;
	_uc_base_left=_span_w1*5;
	$(_uc_drag).css("left", _uc_base_left - 5 + "px");
	$(_uc_drag).siblings(".column-c").css("width",_uc_base_left+"px");
	if (_uc_x == null) return false;
	_uc_offsetLeft=_uc_x.left;
	_span_baseW1=$(_uc_drag).siblings(".column-w1").find("span:first").width()/512;
	_span_baseW2=$(_uc_drag).siblings(".column-w1").find("span:eq(1)").width()/512;
	_span_baseW3=$(_uc_drag).siblings(".column-w1").find("span:eq(2)").width()/1024;
	
    //绑定鼠标按下事件
	$(_uc_drag).bind("mousedown", function (e) {
	    _uc_drag = $(this);
	    _uc_posX = e.clientX;
	    _uc_left = _uc_posX - _uc_offsetLeft;
	    if (sumVal()) {
	        $(".disk-info").children("span:first").hide();
	        $(".a-add").addClass("font-gary1");
			$(".a-add").html("不可再添加");
	        //return false;
	    }
	    else {
	        $(".disk-info").children("span:first").show();
	        
			if($(this).closest('.column-data').find('.row-li').length<4){
				$(".a-add").html("添加一块");
				$(".a-add").removeClass("font-gary1");
			}
			
	    }
		if (!sumVal()) {
			if (_uc_left <= 0) {
				$(this).siblings(".column-c").css("width", _uc_base_left + "px");
				$(this).css("left", _uc_base_left - 5 + "px");
				_input_val = 5;
			}
			else if (_uc_left <= 240) {
				$(this).siblings(".column-c").css("width", _uc_left + "px");
				$(this).css("left", _uc_left - 5 + "px");
				_input_val = calculateVal(_uc_left, _span_baseW1, 0);
			}
			else if (_uc_left <= 360) {
				$(this).siblings(".column-c").css("width", _uc_left + "px");
				$(this).css("left", _uc_left - 5 + "px");
				_input_val = calculateVal(_uc_left - 240, _span_baseW2, _s_v1);
			}
			else if (_uc_left <= 479) {
				$(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
				$(_uc_drag).css("left", _uc_left - 5 + "px");
				_input_val = calculateVal(_uc_left - 360, _span_baseW3, _s_v2);
			}
			else if (_uc_left >= 479.5) {
				$(_uc_drag).siblings(".column-c").css("width", 479.5 + "px");
				$(_uc_drag).css("left", 479.5 - 5 + "px");
				_input_val = 2048;
			}
			$(this).parent().siblings(".mgl-15").find("input").val(_input_val);
	    	$(".disk-over-capacity").html(uc_get_dataval(0, _input_val));
		}
	    
	    $(document).bind({
	        'mousemove': mouseMove_Data,
	        'mouseup': mouseUp_Data
	    });		
	    return false;
	});	
	
	//输入框输入值控制20140528
	var _inputV=$(_uc_drag).parent().siblings("span").find(".uc-input-data");
	$(_inputV).bind("keyup", function () {
	    _uc_drag = $(this).parent().siblings(".fl").find(".drag-data");
	    $(this).val($(this).val().replace(/[^0-9]/g, ''));
	    var _sum_val = 0;
	    var _inputList = $(".uc-input-data");
	    _inputList.each(function (i) {
	        _sum_val += parseInt( $(_inputList[i]).val());
	    })
	    if (_sum_val > 2048) {
	        var _cv = 2048 - (_sum_val - parseInt( $(this).val()));
	        $(this).val(_cv);
	    }
	}).bind("blur", function () {
	    if ($(this).val() == "") $(this).val(5);
	    if (parseInt("0" + $(this).val()) < 5) $(this).val(5);
	    var _pv = parseInt($(this).val());
	    var _l = calculatePostion(_pv);
	    $(_uc_drag).siblings(".column-c").css("width", _l + "px");
	    $(_uc_drag).css("left", _l - 5 + "px");
	    if (sumVal()) {
	        $(".disk-info").children("span:first").hide();
	        $(".a-add").addClass("font-gary1");
	        $(".a-add").html("不可再添加");
	    }
	    else {
	        $(".disk-info").children("span:first").show();

	        if ($(_uc_drag).closest('.column-data').find('.row-li').length < 4) {
	            $(".a-add").html("添加一块");
	            $(".a-add").removeClass("font-gary1");
	        }
	    }
	    $(".disk-over-capacity").html(uc_get_dataval(0, $(this).val()));
	})

	//单击column-w1>span计算并设定拖动位置
	var cSpan = $(_uc_drag).siblings(".column-w1").find("span");
    $(cSpan).bind("click", function (e) {
        _uc_drag = $(this).parent().parent(".fl").find(".drag-data");
	    _uc_posX = e.clientX;
	    _uc_left = _uc_posX - _uc_offsetLeft;
	    if (_uc_left <= 0) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_base_left + "px");
	        $(_uc_drag).css("left", _uc_base_left - 5 + "px");
	        _input_val = 5;
	    }
	    else if (_uc_left <= 240) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
	        $(_uc_drag).css("left", _uc_left - 5 + "px");
	        _input_val = calculateVal(_uc_left, _span_baseW1, 0);
	    }
	    else if (_uc_left <= 360) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
	        $(_uc_drag).css("left", _uc_left - 5 + "px");
	        _input_val = calculateVal(_uc_left - 240, _span_baseW2, _s_v1);
	    }
	    else if (_uc_left <= 479) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
	        $(_uc_drag).css("left", _uc_left - 5 + "px");
	        _input_val = calculateVal(_uc_left - 360, _span_baseW3, _s_v2);
	    }
	    else if (_uc_left >= 479.5) {
	        $(_uc_drag).siblings(".column-c").css("width", 479.5 + "px");
	        $(_uc_drag).css("left", 479.5 - 5 + "px");
	        _input_val = 2048;
	    }
	    $(_uc_drag).parent().siblings(".mgl-15").find("input").val(_input_val);
	    if (sumVal()) {
	        $(".disk-info").children("span:first").hide();
	        $(".a-add").addClass("font-gary1");
	        $(".a-add").html("不可再添加");
	    }
	    else {
	        $(".disk-info").children("span:first").show();

	        if ($(_uc_drag).closest('.column-data').find('.row-li').length < 4) {
	            $(".a-add").html("添加一块");
	            $(".a-add").removeClass("font-gary1");
	        }
	    }
	    $(".disk-over-capacity").html(uc_get_dataval(0, _input_val));
	})
	//单击column-c>span计算并设定拖动位置
	var cSpan2 = $(_uc_drag).siblings(".column-c").find("span");
	$(cSpan2).bind("click", function (e) {
	    _uc_drag = $(this).parent().parent().parent(".fl").find(".drag-data");
	    _uc_posX = e.clientX;
	    _uc_left = _uc_posX - _uc_offsetLeft;
	    if (_uc_left <= 0) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_base_left + "px");
	        $(_uc_drag).css("left", _uc_base_left - 5 + "px");
	        _input_val = 5;
	    }
	    else if (_uc_left <= 240) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
	        $(_uc_drag).css("left", _uc_left - 5 + "px");
	        _input_val = calculateVal(_uc_left, _span_baseW1, 0);
	    }
	    else if (_uc_left <= 360) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
	        $(_uc_drag).css("left", _uc_left - 5 + "px");
	        _input_val = calculateVal(_uc_left - 240, _span_baseW2, _s_v1);
	    }
	    else if (_uc_left <= 479) {
	        $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
	        $(_uc_drag).css("left", _uc_left - 5 + "px");
	        _input_val = calculateVal(_uc_left - 360, _span_baseW3, _s_v2);
	    }
	    else if (_uc_left >= 479.5) {
	        $(_uc_drag).siblings(".column-c").css("width", 479.5 + "px");
	        $(_uc_drag).css("left", 479.5 - 5 + "px");
	        _input_val = 2048;
	    }
	    $(_uc_drag).parent().siblings(".mgl-15").find("input").val(_input_val);
	    if (sumVal()) {
	        $(".disk-info").children("span:first").hide();
	        $(".a-add").addClass("font-gary1");
	        $(".a-add").html("不可再添加");
	    }
	    else {
	        $(".disk-info").children("span:first").show();

	        if ($(_uc_drag).closest('.column-data').find('.row-li').length < 4) {
	            $(".a-add").html("添加一块");
	            $(".a-add").removeClass("font-gary1");
	        }
	    }
	    $(".disk-over-capacity").html(uc_get_dataval(0, _input_val));
	}) 


    //拖拽事件处理
	function mouseMove_Data(e){
	  _uc_posX= e.clientX;
	  _uc_left = _uc_posX - _uc_offsetLeft;
	  //if(sumVal())return false;  
	  if (_uc_left <= 0) {
		  $(_uc_drag).siblings(".column-c").css("width", _uc_base_left+"px");
		  $(_uc_drag).css("left", _uc_base_left - 5 + "px");
		  _input_val=5;
	  }
	  else if (_uc_left <= 240) {
		  $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
		  $(_uc_drag).css("left", _uc_left - 5 + "px");
		  _input_val=calculateVal(_uc_left,_span_baseW1,0);
	  }
	  else if(_uc_left<=360) {
		  $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
		  $(_uc_drag).css("left", _uc_left - 5 + "px");
		  _input_val=calculateVal(_uc_left-240,_span_baseW2,_s_v1);
	  }
	  else if(_uc_left<=479){
		  $(_uc_drag).siblings(".column-c").css("width", _uc_left + "px");
		  $(_uc_drag).css("left", _uc_left - 5 + "px");
		  _input_val=calculateVal(_uc_left-360,_span_baseW3,_s_v2);
	  }
	  else if(_uc_left>=479.5){
	  	  $(_uc_drag).siblings(".column-c").css("width", 479.5 + "px");
	  	  $(_uc_drag).css("left", 479.5 - 5 + "px");
		  _input_val=2048;
	  }
	  $(_uc_drag).parent().siblings(".mgl-15").find("input").val(_input_val);
	  if (sumVal()) {
	      $(".disk-info").children("span:first").hide();
	      $(".a-add").addClass("font-gary1");
		  $(".a-add").html("不可再添加");
	  }
	  else {
	      $(".disk-info").children("span:first").show();
	      
		  if($(_uc_drag).closest('.column-data').find('.row-li').length<4){
				$(".a-add").html("添加一块");
				$(".a-add").removeClass("font-gary1");
			}
	  }
	  $(".disk-over-capacity").html(uc_get_dataval(0,_input_val));
}
//移除鼠标移动事件
function mouseUp_Data(e){
	$(document).unbind('mousemove');
	$(document).unbind('mouseup');
}
//根据输入值计算拖动位置20140528
function calculatePostion(v){
    var p;
    if (v >= 2048) {
        p = 480;
    }
    else if(v >= 1024){
        p = 360 + (v - 1024) * _span_baseW3;
	}
	else if(v >= 512){
	    p = 240 + (v - 512) * _span_baseW2;
	}
	else if(v >= 0){
	    p = _span_baseW1 * v;
	}
	return p;
}
//验证数据盘总容量是否超出固定值
function sumVal() {
    var _sum_val = 0, _spanW = 0;
    var _thisVal = $(_uc_drag).parent().siblings(".mgl-15").find("input").val();
    var _inputList = $(".uc-input-data");
    _inputList.each(function (i) {
        _sum_val += parseInt($(_inputList[i]).val());
    })
    if (_sum_val > 2048) {
        $(_uc_drag).parent().siblings(".mgl-15").find("input").val(2048 - (_sum_val - _thisVal));
        _thisVal = $(_uc_drag).parent().siblings(".mgl-15").find("input").val();
        if (_thisVal >= 1024) {
            _spanW = 360 + (_thisVal - 1024) * _span_baseW3;
        }
        else if (_thisVal >= 512) {
            _spanW = 240 + (_thisVal - 512) * _span_baseW2;
        }
        else if (_thisVal > 0) {
            _spanW = _thisVal * _span_baseW1;
        }
        $(_uc_drag).siblings(".column-c").css("width", _spanW + "px");
        $(_uc_drag).css("left", _spanW - 5 + "px");
        return true;
    }
	else if(_sum_val==2048){
		return true;
	}
    return false;
}
//计算拖拽时数据盘相应容量值
function  calculateVal(widthVal,baseW,cumulativeVal){
	var _val=parseInt(widthVal/baseW);
	if(cumulativeVal>0)_val=_val+cumulativeVal;
	return _val;
}
//添加数据盘
function add_uc_drag_data() {
    _sumUC_DataCount++;
    var _uc_data_content = "<!--row-li star--><div class='row-li pb15 w620'><div class='fl position-rel'><div class='column-w1'><span class='block first'><div>512GB</div></span><span class='block second'><div>1024GB</div></span><span class='block second last'><div>2048GB</div></span></div><div class='column-c' style='width: 46px;'><div class='column-oer'><span class='block first'><div>512GB</div></span><span class='block second'><div>1024GB</div></span><span class='block second'><div>2048GB</div></span></div></div><a class='drag-data ^drag-data-index^'><i></i><i></i><i></i></a></div><span class='mgl-20'><input type='text' value='5' class='uc-input-data'> GB</span><a href='javascript:' class='close-a'></a><div class='clear'></div></div><!--row-li end-->";
    _uc_data_content = _uc_data_content.replace("^drag-data-index^", "drag-data" + _sumUC_DataCount);
    $(".row-li-last").before(_uc_data_content);
    uc_drag_data(".drag-data"+_sumUC_DataCount);
}
}

//企业个人信息填写
$(function(){
	ui_radio_tab(".js_select_r",".write");
})
function ui_radio_tab(selectObj,contentObj){
    $(selectObj).find("span").click(function () {
        $(this).children("input[type=radio]").attr("checked", 'checked');
        $(this).siblings().children("input[type=radio]").attr("checked", false);
        var index = $(selectObj).find("span").index($(this));
        var selectDiv = $(contentObj).children("div");
        $(selectDiv[index]).show().siblings().hide();
    })	
}

//帮助列表左侧菜单
$(function(){
	$(".js_toggle li .s-t2").toggle(function(){
		$(this).addClass("s-t2on").siblings(".dl-list2").stop(false,true).slideDown();
	},function(){
		$(this).removeClass("s-t2on").siblings(".dl-list2").stop(false,true).slideUp();
	})
	$(".js_cut dd").click(function(){
		$(this).addClass("dd-on").siblings("dd").removeClass("dd-on");
	})
})



function virtual_select(selectObj,optionObj,txtObj){
	$(selectObj).click(function(event){   
		event.stopPropagation();
		$(this).find(optionObj).toggle();
		$(this).siblings().find(optionObj).hide();
		$(this).parent().siblings().find(".option1").hide();
		/*var display =$(optionObj).css('display');
		if(display == 'none'){
			$(selectObj).css("z-index","0");
		}else {
			$(selectObj).css("z-index","20");
		}	*/
		$(".select_box1").css("z-index", "0");
		$(this).css("z-index", "20");

	});
	$(document).click(function(event){
		var eo=$(event.target);
		if($(selectObj).is(":visible") && eo.attr("class")!="option" && !eo.parent(optionObj).length)
		$(optionObj).hide();									  
	});
	/*赋值给文本框*/
	$(optionObj+" li").click(function(){
		var value=$(this).text();
		$(this).parent().siblings(txtObj).find("span").text(value);
	})
	$(optionObj+" li").hover(function(){
		$(this).addClass("h");
	},function(){
		$(this).removeClass("h");
	})
}

$(function(){
	//云通信服务模块
	$(".js_opacity").hover(function(){
		$(this).addClass("col-c2-opacity");
	},function(){
		$(this).removeClass("col-c2-opacity");
	})
	//表格编辑功能
	$(".js_compile").hover(function () {
        $(this).addClass("position-rel").children("p").addClass("p-h");
    }, function () {
        $(this).children("p").removeClass("p-h");
    })
	$(".js_compile p").click(function () {
        $(".compile-con").css("z-index","0");
        $(this).siblings(".compile-con").css("z-index", "99");
        $(this).siblings(".compile-con").show();
        return false;
    })
	$(".js_abrogate").click(function(){
		$(this).parents(".compile-con").hide();
		return false;
	})
	//左侧菜单滑过有背景
	$(".js_current dd").hover(function(){
		$(this).addClass("current-ddhover");
	},function(){
		$(this).removeClass("current-ddhover");
	})
	//翼云动态
	/*var _liLength = $(".list-trends li");
	_liLength.each(function (index) {
		if (index!=0 && (index + 1) % 2 == 0) {
			var _hasc = $(_liLength[index]).hasClass("last");
			if (!_hasc) {
				$(_liLength[index]).css({"border-right":"none","margin-right":"0"});
			}
		}
	});*/
	$(".list-trends li a").hover(function(){
		$(this).animate({left:"5px"});
	},function(){
		$(this).animate({left:"0"});
	})
	
	$("#login-link").click(function(e) {
        if($("#login-box").is(":visible")){
			$("#login-box").hide();
		}else{
			$("#login-box").show();
		}
    });
	
	$(document).click(function (e) {
		var spanArray = $("#login-box span").toArray();
		var target = e.target;
		var result_bool=true;
		$.each( spanArray, function(i, n){
			if(n !== target && !$.contains(n, target)){
				result_bool = result_bool && true;
			}else{
				result_bool = result_bool && false;
				return false;
			}
		});
		if(result_bool && ($("#login-link").get(0) !== target )){
			$("#login-box").hide();
		}
	});
})

$(document).click(function(){
	$(".compile-con").hide();
})

//控制中心new
$(function(){
	//左侧菜单
	$(".js_list_active li").click(function(){
		$(this).addClass("li-active").siblings().removeClass("li-active");
	})
	//左侧折叠
	$(".js_side_fold").click(function(){
		if($(this).attr("class")=="side-fold js_side_fold"){
			$(this).addClass("side-fold-off");
			$(".left-control").addClass("left-control-off");
			$(".right-control").addClass("right-control-on");
			ued_length(".list-c2 li");
			$(".list-c2 li").css({"margin-right":"85px"});
			$(".select_regionnew").addClass("select_regionnew_hide");
		}else{
			$(this).removeClass("side-fold-off");
			$(".left-control").removeClass("left-control-off");
			$(".right-control").removeClass("right-control-on");
			$(".list-c2 li").css({"margin-right":"55px"});
			$(".select_regionnew").removeClass("select_regionnew_hide");
		}
	})
	//概况滑过
	$(".list-c2 li").hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	})
	$(".js_list_c2 li").click(function(){
		$(this).addClass("li-on").siblings().removeClass("li-on");
	})
	//获取用户名的宽度
	var _dH=$(".control-list .li-first").outerWidth();
	$(".control-d1").width(_dH);
	//头部展开
	$(".js_li_hover").hover(function(){
		$(this).addClass("li-first-on").children(".control-d1").show();
	},function(){
		$(this).removeClass("li-first-on").children(".control-d1").hide();
	})
	$(".js_control_center").hover(function(){
		$(this).addClass("control-center-on").children(".control-d2").show();
	},function(){
		$(this).removeClass("control-center-on").children(".control-d2").hide();
	})
	//购买价格展开
	$(".js_open_lose").toggle(function(){
		$(this).parent().siblings(".price-con").show();
		$(this).children("em").html("收起");
		$(this).children("b").addClass("bq");
	},function(){
		$(this).parent().siblings(".price-con").hide();
		$(this).children("em").html("展开");
		$(this).children("b").removeClass("bq");
	})
	//提示弹出层
	ui_thick(".js_engine_close", ".js_t_close", ".thick-cn");
	//选择弹出层
	ui_thick(".js_link_machine", ".js_t_close", ".thick-content");
})
$(function(){
	ued_length(".list-c2 li");
})
//商品列表被3整除的最后加last名
function ued_length(_obj){
	var _liLength = $(_obj);
    _liLength.each(function (index) {
        if (index!=0 && (index + 1) % 5 == 0) {
            var _hasc = $(_liLength[index]).hasClass("last");
            if (!_hasc) {
                $(_liLength[index]).addClass("last");
            }
        }
    });
}

//我的订单new虚拟下拉
$(document).ready(function(){
	$(".js_select_box").click(function(event){   
		event.stopPropagation();
		$(this).find(".js_option").toggle();
		$(this).parent().siblings().find(".js_option").hide();
		if (!$(this).find(".js_option").is(":hidden")) {
            $(".select_regionnew").addClass("select_regionnew_on");
        }else{
			$(".select_regionnew").removeClass("select_regionnew_on");
		}

	});
	$(document).click(function(event){
		var eo=$(event.target);
		if($(".js_select_box").is(":visible") && eo.attr("class")!="js_option" && !eo.parent(".js_option").length)
		$('.js_option').hide();	
		if (!$(this).find(".js_option").is(":visible")) {
            $(".select_regionnew").removeClass("select_regionnew_on");
        }							  
	});
	/*赋值给文本框*/
	$(".js_option a").click(function(){
		var value=$(this).text();
		$(this).parent().siblings(".js_select_txt").find("span").text(value);
		//$("#select_value").val(value)
		$(".select_regionnew").removeClass("select_regionnew_on");
	 })
})

$(function(){
	//修改默认radio样式
	$("input[type='radio'].inp-radio").each(function(){
		var _inpRadio = $(this),
			_bRadio = _inpRadio.next(),
			name = _inpRadio.attr("name") || '';
		if(_inpRadio.is(":checked")){
			_bRadio.addClass("bon-radio");
		}else{
			if(_bRadio.hasClass("bon-radio"))_bRadio.removeClass("bon-radio");
		}
		_bRadio.click(function(){
			_inpRadio.trigger("click");	
			if($("input[type='radio']:checked")){
				$("input[type='radio']:checked").next().addClass("bon-radio");	
				$("input[type='radio']:not(:checked)").next().removeClass("bon-radio");
			}
		});
	})
	//修改默认checkbox样式
	$("input[type='checkbox'].inp-chb").each(function(){
		var _inpChb = $(this),
			_bChb = _inpChb.next();
		if(_inpChb.is(":checked")){
			_bChb.addClass("bon-chb");
		}else{
			if(_bChb.hasClass("bon-chb"))_bChb.removeClass("bon-chb");
		}
		_bChb.click(function(){
			_inpChb.trigger("click");
			if(_inpChb.is(":checked")){
				_bChb.addClass("bon-chb");
			}else{
				_bChb.removeClass("bon-chb");
			}
		})
	})
	//支付
	ued_card(".js_credit_card li");
	$(".js_more_bank").on("click",function(){
		 $(this).siblings(".bank-list").addClass("h-312");
	})
})
//支付
function ued_card(_Cobj){
	$(_Cobj).live("click",function(){
		$(this).addClass("li-border").siblings().removeClass("li-border");
		$(this).parents("div").siblings().find("li").removeClass("li-border");
		$(this).children("input").attr("checked","checked");
		$(".aging-select").show();
		return true;
	})
}

//我的备案
$(function(){
	//选择备案地区
	$(".js_select_area a").click(function(){
		$(this).addClass("current-on").siblings().removeClass("current-on");
	})
	//选择备案类型
	$(".js_select_ba_type li").click(function(){
		$(this).addClass("select-on").siblings().removeClass("select-on");
	})
	//可信云服务详情
	$(".js_approve_details").hover(function(){
		$(this).children(".approve-details").show();
	},function(){
		$(this).children(".approve-details").hide();
	})
})
	
//2015-1-21 by gcl
//图标左右切换（加插件文件modernizr-min.2.6.2.js）
$(function(){
     UID_appSlider("#hotItem-Con", "a.arrowL", "a.arrowR");
})
function UID_appSlider(o, l, r){
    var _o = $(o),//外层DIV
        _w = _o.width(),
        _oChild = _o.find("ul"),
        _btnl = $(l),//左按钮
        _btnr = $(r),//右按钮
        _ele = _o.find("li"),
        _eleW = _o.find("li:first").width(),
		_scrW=_eleW*7;//每次滚动的宽度（个数）
        _flag =1;//页数
    _oChild.css("width", _eleW*_ele.length+"px");
    _btnl.css({cursor:"default", opacity:"0.2"});
    if(_oChild.width() > _w){
        _btnl.click(function(){
            _btnr.css({cursor:"pointer", opacity:"1"});
			
            if(_flag <= 1){
                _flag = 1;
				_btnl.css({cursor:"default", opacity:"0.2"});				
                return false;
            }else{
                if(_flag ==1)_btnl.css({cursor:"default", opacity:"0.2"});
                _oChild.animate({"margin-left": _curV+_scrW+"px"}, 500);
				_curV=_curV+_scrW;
           }
		   _flag --;
        });
        _btnr.click(function(){
            _btnl.css({cursor:"pointer", opacity:"1"});      
           
            if(_flag >= _ele.length/7){
                _btnr.css({cursor:"default", opacity:"0.2"});
                _flag = _ele.length/7;
                return false;
            }else{
                if(_flag == _ele.length/7) _btnr.css({cursor:"default", opacity:"0.2"});
                _oChild.animate({"margin-left": -_scrW*_flag+"px"}, 500);
				_curV=-_scrW*_flag;
            }
			 _flag ++;
        });
    }else{
        _btnr.css({cursor:"default", opacity:"0.2"});
    }
}
$(function(){
	$(".list-appqueue1 li").hover(
		function(){
			$(this).find(".list-appqueue2").removeClass("open").addClass("open");
			//$(this).find(".list-appqueue2").addClass("open");
		},function(){
			$(this).find(".list-appqueue2").addClass("open").removeClass("open");
		}
	)

	//$(".list-appqueue1 li").hover(function(){
//		if($(this).children("dl").attr("class").split("open").length > 1){
//			$(this).children("dl").removeClass("open").addClass("fold");
//			
//		}else{
//			$(this).children("dl").addClass("open").removeClass("fold");
//			}
//	  });

})

$(function(){
	//star
	$(".js_star .star-s").click(function(){
		var _star = $(this);
		if(_star.hasClass("star-ore")){
			_star.removeClass("star-ore");
		}else{
			//alert(_star.index)
			_star.addClass("star-ore");
		}
		$(this).prev().addClass("star-ore");
		$(this).prev().prev().addClass("star-ore");
		$(this).next().removeClass("star-ore");
		$(this).next().next().removeClass("star-ore");
	})
	//big star
	$(".js_star .star-s17").click(function(){
		var _star = $(this);
		if(_star.hasClass("star-ore17")){
			_star.removeClass("star-ore17");
		}else{
			//alert(_star.index)
			_star.addClass("star-ore17");
		}
		$(this).prev().addClass("star-ore17");
		$(this).prev().prev().addClass("star-ore17");
		$(this).next().removeClass("star-ore17");
		$(this).next().next().removeClass("star-ore17");
	})

})


$(function(){
	//应用管理-首页-修改后.html 添加评论
	$(".js_btnComment").click(function(){
		$(this).next(".comment").show();
	})
	$(".js_btnSend").click(function(){
		$(this).parents(".comment").hide();
	})
	
})