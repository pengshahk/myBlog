/**
 * Created by Administrator on 2017/1/5 0005.
 */
$(document).ready(function(){
    var centerPhotoIdx=-1,
        stageW,stageH,halfStageW,halfStageH,imgW,imgH,halfImgW,halfImgH,angle,sections,section,posX,posY;
    var getRandomIdx=function(arr) {
        return Math.floor(arr.length * Math.random());
    };
    var getRandomVal=function(range) {
        return (range[1]-range[0])*Math.random()+range[0];
    };
   $.getJSON('photos.json',function(photos){
      var html= ''; 
      $.each(photos,function (photoIndex,photo) {
          html+='<div class="figure" id="'+photoIndex+'">';
          html+='<img class="photo" src="'+photo.src+'"/>';
          html+='<div class="figure-caption">';
          html+='<h3>'+photo.title+'</h3>';
          html+='</div>';
          html+='<p class="description">'+photo.description+'</p>';
          html+='</div>';
      });
      $('.stage').html(html);
      stageW=$('.stage').outerWidth();
      stageH=$('.stage').outerHeight();
      halfStageW=Math.ceil(stageW/2);
      halfStageH=Math.ceil(stageH/2);
      imgW=$('.figure').outerWidth();
      imgH=$('.figure').outerHeight();
      halfImgW=Math.ceil(imgW/2);
      halfImgH=Math.ceil(imgH/2);

       var initSections= function(){
           return eval([
               { //top left
                   "xRange": [
                       -halfImgW,
                       halfStageW - 3 * halfImgW
                   ],
                   "yRange": [
                       -halfImgH,
                       halfStageH - halfImgH
                   ]
               },
               { //top center
                   "xRange": [
                       halfStageW - 2 * halfImgW,
                       halfStageW + 2 * halfImgW
                   ],
                   "yRange": [
                       -halfImgH,
                       halfStageH - 4 * halfImgH
                   ]
               },
               { //top right
                   "xRange": [
                       halfStageW + halfImgW,
                       2 * halfStageW + halfImgW
                   ],
                   "yRange": [
                       -halfImgH,
                       halfStageH - 2 * halfImgH
                   ]
               },
               { //bottom left
                   "xRange": [
                       -halfImgW,
                       halfStageW - 3 * halfImgW
                   ],
                   "yRange": [
                       halfStageH,
                       2 * halfStageH - 2 * halfImgH
                   ]
               },
               { //bottom right
                   "xRange": [
                       halfStageW + halfImgW,
                       2 * halfStageW - halfImgW
                   ],
                   "yRange": [
                       halfStageH,
                       2 * halfStageH - 2 * halfImgH
                   ]
               }
           ]);
       };

       function arrangePhotos(photos){
           // 随机找个作为中心图片
           if (centerPhotoIdx < 0) {
               centerPhotoIdx = getRandomIdx(photos);
               $('#'+centerPhotoIdx).toggleClass('active');
               $('#li_'+centerPhotoIdx).addClass('click');
           }
           $.each(photos,function(photoIndex,photo){
               if($('#'+photoIndex).hasClass('active')){
                   $('#'+photoIndex).css({
                       'left': halfStageW-halfImgW+'px',
                       'top': halfStageH-halfImgH+'px',
                       'transform': 'none'
                   });
               }else{
                   angle=Math.random()*90-45;
                   sections=initSections();
                   section=sections[photoIndex % sections.length];
                   posX=getRandomVal(section.xRange);
                   posY=getRandomVal(section.yRange);
                   $('#'+photoIndex).css({
                       'left': posX+'px',
                       'top': posY+'px',
                       'transform': 'rotateZ('+angle +'deg)'
                   });
               }
           });
       }
       arrangePhotos(photos);
       $('ul.navs > li').click(function(){
           $('ul.navs > li').removeClass('click');
           $(this).toggleClass('click');
           var $id=$(this).attr('id').split('_')[1];
           if( $('#'+$id).hasClass('active')){
               if(!$('#'+$id).hasClass('flipped')){
                   $('#'+$id).css({
                       "transform-style": "preserve-3d",
                       "transform-origin": "0 50% 0",
                       "transform": "translate(320px) rotateY(180deg)"
                   });
                   $('#'+$id).addClass('flipped');
               }else{
                   $('#'+$id).css('transform','none');
                   $('#'+$id).removeClass('flipped');
               }
           }else{
           $('.figure.active').removeClass('active');
           $('#'+$id).toggleClass('active');
           arrangePhotos(photos);
           }
       });
       $('.figure').click(function(){
           var $id=$(this).attr('id');
           $('ul.navs > li').removeClass('click');
           $('#li_'+$id).addClass('click');
           if($(this).hasClass('active')){
               if(!$(this).hasClass('flipped')){
                   $(this).css({
                       "transform-style": "preserve-3d",
                       "transform-origin": "0 50% 0",
                       "transform": "translate(320px) rotateY(180deg)"
                   });
                   $(this).addClass('flipped');
               }else{
                   $(this).css('transform','none');
                   $(this).removeClass('flipped');
               }

           }else {
               $('.figure.active').removeClass('active');
               $('#' + $id).toggleClass('active');
              arrangePhotos(photos);
           }
       });
   });
});
