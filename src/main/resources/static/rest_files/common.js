$(document).ready(function(){
        $("input[name=q]").focus(function(){
            document.onkeydown = function(e){
                var ev = document.all ? window.event : e;
                if(ev.keyCode==13) {
                    $("#searchBtn_v4").click();
                }
            }
        })
        $("#searchBtn_v4").click(function(){
            var q = $("input[name=q]").val();
            q=q.replace(/\//g,'');

            //$("#juheapi_search").css({background:"#FFFFFF"});
            if(q.length==''){
                //$("#juheapi_search").css({background:"#fae1dc"}).focus();
                $("#searchBtn_v4").focus();
                return false;
            }

            //var searchUrl = '/docs/s/q/%40q%40';
            //var searchUrl = '<{R action="docs" method="s" params="q=@q@"}>';
            searchUrl=searchUrl.replace(/%40q%40/,encodeURIComponent(q));
            window.location.href=searchUrl;
        })
        $("#loginout").click(function(){
            $.getJSON(loginOutUrl,function(obj){
                window.location.href=juheIndex;
            })
        })
    })