/* Author:

*/




// Preload images
imageObj = new Image();
imgs = ["static/images/scnu.gif"];
for (i = 0; i <= imgs.length; i++) imageObj.src = imgs[i];



// tree view
if($.isFunction('$.fn.treeview')){
	$('#nap37_1browser').treeview();
	$('#nap38_browser').treeview();
	
}


// slideDown btn
$(function(){ 
  $('.slideDown').toggle(
    function(e){
    $(e.target.slice(1)).slideUp('slow');
    e.preventDefault();
  },
    function(e){
    $(e.target.slice(1)).slideDown('slow');
    e.preventDefault();
  }

  )
});


// easy toggle player infomation
/*
	TODO 
	do not use span
*/
$(function(){

    $('.ToggleBtn').toggle(function(e){
        $('.toggle').hide('slow');
        $('.span12').addClass('span16');
    },
      function(e){

        $('.span12').removeClass('span16');
        $('.toggle').show('fast');
      });

});


// tabs
$(function(){
  $(".tabs").tabs();
  if($.isFunction('$.fn.carousel')){
  $('.carousel').carousel();
  }
});


// school search
$('#schoolbtn').click(function(e){
})