$(document).ready(function(){
    //------------------------------实现博客标题的颜色渐变效果----------------------//
    $('h2.title').hover(function(){
        $(this).stop().animate({
            color: "#ff69b4"
        },400);
    },function(){
        $(this).stop().animate({
            color: "#777"
        },700);
    });
    $('div.cd-timeline-content > h2.title').on('mouseenter mouseleave',function(event){
        if (event.type == 'mouseenter') {
            $(this).children().stop().animate({
                color: "#ff69b4"
            }, {
                duration: 400
            });
        }

        else {
            $(this).children().stop().animate({
                color: "#777"
            }, {
                duration: 700
            });
        }
    });

  //------------------------------实现音乐栏----------------------//
    $('.musicpictrue').addClass('rotate');
  /*var $audio=document.getElementById("audio");

   $('#Play').click(function(event){
      event.preventDefault();
      if($audio.paused){
         if($('#playIcon').hasClass('fa-play')){
            $('#playIcon').removeClass('fa-play').addClass('fa-pause');
            Play();
         }
      } else{
         $('#playIcon').removeClass('fa-pause').addClass('fa-play');
         Pause();
      }
   });
   function Play(){
      $audio.play();
      TimeSpan();
       $('.musicpictrue').addClass('rotate');
   }
   function Pause() {
      $audio.pause();
       $('.musicpictrue').removeClass('rotate');
   }
   function Load() {
       $audio.load();
   }
   function TimeSpan() {
      var ProcessNow=0,VoiceNow=0;
      setInterval(function(){
         ProcessNow=($audio.currentTime/$audio.duration)*90;
         $('#progress').css("width", ProcessNow);
         var currentTime=timeFormat($audio.currentTime);
         var timeAll=timeFormat(TimeAll());
         $('#1').html(currentTime);
         $('#2').html(timeAll);
      },1000);
   }
   function timeFormat(number){
      var minute=parseInt(number/60);
      var second=parseInt(number%60);
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
   }
   function TimeAll() {
      return $audio.duration;
   }
   $audio.addEventListener('ended',function(){
       $('#playIcon').removeClass('fa-pause').addClass('fa-play');
       $('#progress').css("width", 0);
       $('.musicpictrue').removeClass('rotate');
       Load();
   });*/

    //------------------------------回到顶部----------------------//
    var top=$(window).scrollTop();
    if(top > 0){
        $('.top').show();
    }else{
        $('.top').hide();
    }
    $('.top').click(function(event){
       event.preventDefault();
        $(document).scrollTop(0);
    });

    //------------------------------多说评论数和点赞数----------------------//
    $(function() {
        var shortName = "ycps";
        var threads = "{{ site.url }}{{ page.id }}";

        var jsonUrl = "https://api.duoshuo.com/threads/counts.jsonp?short_name=" + shortName + "&threads=" + threads +  "&callback=?";
        $.getJSON(jsonUrl, function(result) {
            var value='',likes='';
            $.each(result.response, function(i, field) {
                value+= field.comments;
                likes+=field.likes;
                //console.log(value);
                $('.amount').text(value);
                $('.text').text(likes);
            })
        })
    })



    //------------------------------侧边栏外观颜色变化----------------------//
    /*$('li.cell').on('mouseenter mouseleave',function(event){
        if(event.type=='mouseenter'){
            $(this).find('div.per-first').stop().css('color','#ff69b4');
        }else{
            $(this).find('div.per-first').stop().css('color','#777');
        }
    });*/
    $('li.cell').on('mouseenter mouseleave',function(event){
        if(event.type=='mouseenter'){
            $(this).find('div.per-first').stop().animate({
                color: '#ff69b4'
            },400);
        }else{
            $(this).find('div.per-first').stop().animate({
                color: '#777'
            },400);
        }
    });
    //------------------------------分页区的颜色变化----------------------//
    $('div.fenye').on('mouseenter mouseleave','div.link',function(event){
        if(!$(this).parent().hasClass("active")){
            if (event.type == 'mouseenter') {
                $(this).stop().animate({
                    backgroundColor: "#ff69b4"
                }, {
                    duration: 400
                });
            }

            else {
                $(this).stop().animate({
                    backgroundColor: "#777"
                }, {
                    duration: 400
                });
            }
        }
    });

    //------------------------------侧边分类功能实现，利用ajax--------------------//
    var json,lastText="",spaceNum=4,clicked=false,value,num,actived;
    $.ajax({
        url: 'https://pengshahk.github.io/myBlog/classify.txt',
        success: function(data){
            json=JSON.parse(data);
        }
    });
    function showCategory(text){
        var left,right,link="";
        if(clicked==false){
            left=0; right=spaceNum;
        }
        else{
            left=((value-1)*spaceNum)+1;
            right=value*spaceNum+1;
            if(right>=num || left<spaceNum) {
                clicked=false;
            }
        }
        for(var i=0,len=json.length;i<len;i++){
            if(text==json[i]["c"]){
                var html="";
                num=json[i]["s"];
                for(var j=left;j<num&&j<right;j++){
                    html+='<div class="blog-outline"><div class="cd-timeline-block"><div class="circle"></div> <div class="cd-timeline-content"><h2 class="title">';
                    html+='<a href="';
                    html+=json[i]["a"][j][0]+'">'+json[i]["a"][j][1]+'</a></h2><div class="tags">';
                    var arr=json[i]["a"][j][2].toString().split(",");
                    for(var m= 0,n=arr.length;m<n;m++){
                        html+='<span class="label label-primary">'+arr[m]+'</span>';
                    }
                    html+='</div><p>'+json[i]["a"][j][4]+'</p>';
                    html+=' <ul class="details"> <li class="hearts"> <a href="#"><span class="icon fa fa-heart"></span><span class="text"> 0</span></a></li>';
                    html+='<li class="comments"><a href="#"><span class="icon fa fa-comment"></span><span class="amount"></span> 0</a></li>';
                    html+=' <li class="time"><a href="#"><span class="icon fa fa-clock-o"></span>'+json[i]["a"][j][3]+'</a></li></ul></div></div></div>';
                }
                if(num<=spaceNum){
                    link="";
                    $('div.fenye').html(link);
                }else{
                    if(clicked==false){
                        if( left<spaceNum){
                        link+="<a href='#' class='active'><div class='updatelink fenye-a'>1</div></a>";
                        for(i=1,j=Math.floor(num/spaceNum);i<=j;i++){
                            link+="<a href='#'><div class='updatelink fenye-a'>"+(i+1)+"</div></a>";
                        }
                        link+="<a href='#'><div class='updatelink fenye-link'><span class=' icon fa fa-angle-double-right'></span></div> </a>";
                        }
                        else if(right>=num){
                            link+="<a href='#'><div class='updatelink fenye-link'><span class=' icon fa fa-angle-double-left'></span></div>";
                            link+="<a href='#'><div class='updatelink fenye-a'>1</div></a>";
                            for(i=1,j=Math.floor(num/spaceNum);i<=j;i++){
                                if((i+1)==value){
                                    link+="<a href='#' class='active'><div class='updatelink fenye-a'>"+(i+1)+"</div></a>";
                                }else{
                                    link+="<a href='#'><div class='updatelink fenye-a'>"+(i+1)+"</div></a>";
                                }

                            }
                        }
                        $('div.fenye').html(link);
                    }
                }
                //$('div.fenye').html(link);  //更新分页信息
                return html;
            }
        }
        return "";
    }
    $('li.click').on("click",function(){
        if(json!=undefined){
             var text=$(this).find('div.per-first').text();
            if(lastText=""||lastText!=text){
                lastText=text;
                var html=showCategory(text);
                var blog=$('div.blog-outline');
                blog.slideUp(150,function(){
                    $(this).html(html).hide().slideDown(400);
                });
            }
        }
    });
    $('div.fenye').on("click",'div.updatelink',function(event){
        event.preventDefault();
        clicked=true;
         actived=$('a.active').children().text();
        if($(this).text()){
            value=$(this).text();
        }else if($(this).children().hasClass('fa-angle-double-right')){
            value=parseInt(actived)+1;
        }else{
            value=parseInt(actived)-1;
        }
        $('div.fenye > a').removeClass('active');
        $(this).parent().addClass('active');
        var html=showCategory(lastText);
        var blog=$('div.blog-outline');
        blog.slideUp(150,function(){
            $(this).html(html).hide().slideDown(400);
        });
    });
    $('div.fenye').on('mouseenter mouseleave','div.updatelink',function(event){
        if(!$(this).parent().hasClass("active")){
            if (event.type == 'mouseenter') {
                $(this).stop().animate({
                    backgroundColor: "#ff69b4"
                }, {
                    duration: 400
                });
            }

            else {
                $(this).stop().animate({
                    backgroundColor: "#777"
                }, {
                    duration: 400
                });
            }
        }
    });
});








