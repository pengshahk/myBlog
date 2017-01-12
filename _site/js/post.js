/**
 * Created by Administrator on 2016/12/22 0022.
 */
$(document).ready(function(){
    $('.navbar-nav > li').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });
});