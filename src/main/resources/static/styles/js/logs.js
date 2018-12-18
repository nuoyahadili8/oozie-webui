	/**
		日志展示
		title：弹出框标题
		path：日志绝对路径
	*/
	
	(function(){
		document.write("<script type='text/javascript' src='../static/styles/js/layer/layer.js'></script>");  
	  var showLogs = function(options){
	    this.options = $.extend({
	      "title" : "",
	      "path" : ""
	    },options);
	    this.init();
	  };
	  showLogs.prototype.init = function(){
	  		path = this.options.path.replace("hdfs://nameservice1","");			
      //alert(path)
			//alert(thisId);			
				parent.layer.open({
	        type: 2 
	        ,title: this.options.title
	        ,area: ['1200px', '700px']
	        ,shade: 0
	        ,maxmin: true
	        ,offset: 'auto'
	        ,content: '../logs/showLogText?file='+path
	        ,btn: ['关闭'] 
	        ,btn2: function(){
	          layer.closeAll();
	        }
	        
	        ,zIndex: layer.zIndex //重点1
	        ,success: function(layero){
          layer.setTop(layero); //重点2
        }
      });         
	    //alert("x是"+this.options.x+" y是"+this.options.y+" z是"+this.options.z);
	  };
	  window.showLogs = showLogs;
	}());