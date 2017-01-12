/**
 * Created by Administrator on 2016/12/19 0019.
 */
$(document).ready(function(){
    /*$('.navbar-nav > li').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });*/
    /*cover();
    $(window).resize(function(){
       cover();
    });
    function cover() {
        var win_width=$(window).width(),
            win_height=$(window).height();
        console.log(win_width+" "+win_height);
        $('#bigpic').attr({
            width:win_width,
            height:win_height
        });
    }*/

$('.content_body').on('mouseenter',function(){
        $(this).children(".time").hide();
        $(this).children(".content").fadeIn('slow');
  });

        $('.content_body').on('mouseleave',function(){
            $(this).children(".content").stop().hide();
            $(this).children(".time").stop().show();

        });


});