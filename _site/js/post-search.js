/**
 * Created by Administrator on 2017/1/11 0011.
 */
$(document).ready(function () {
    var names=[],
        urls=[];
    $('.navbar-nav > li:last-child').click(function(event){
        event.preventDefault();
        $(".search-tool").css("display", "block");
        $(".search-content").focus();
    });
    $(".close>span").click(function(event){
        event.preventDefault();
        $(".search-tool").css("display", "none");
    });
    $(document).keyup(function (e) {
        if(e.keyCode == 27){
            $(".search-tool").css("display", "none");
        }
    });
    $.getJSON('../../../../../search.json',function(data){
        if(data.code==0){
            for(var index in data.data){
                var item=data.data[index];
                names.push(item.title);
                urls.push(item.url);
            }
        }
        $('#search-content').typeahead({
            source: names,
            afterSelect: function(item){
                $('.search-tool').css("display","none");
                window.location.href=(urls[names.indexOf(item)]);
                return item;
            }
        });
    }).error(function(data, b) { console.log("json解析错误，搜索功能暂不可用，请检查文章title，确保不含有换行等特殊符号"); });
});
