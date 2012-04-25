/* Author:

*/

$(document).ready(function(){
  if($.isFunction('Administry'))
  {  /* setup navigation, content boxes, etc... */
    Administry.setup();
    
    /* progress bar animations - setting initial values */
    Administry.progress("#progress1", 1, 5);
    Administry.progress("#progress2", 2, 5);
    Administry.progress("#progress3", 2, 5);

    /* flot graphs */
    var sales = [{
      label: 'Total Paid',
      data: [[1, 0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,900],[8,0],[9,0],[10,0],[11,0],[12,0]]
    },{
      label: 'Total Due',
      data: [[1, 0],[2,0],[3,0],[4,0],[5,0],[6,422.10],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0]]
    }
    ];

    var plot = $.plot($("#placeholder"), sales, {
      bars: { show: true, lineWidth: 1 },
      legend: { position: "nw" },
      xaxis: { ticks: [[1, "Jan"], [2, "Feb"], [3, "Mar"], [4, "Apr"], [5, "May"], [6, "Jun"], [7, "Jul"], [8, "Aug"], [9, "Sep"], [10, "Oct"], [11, "Nov"], [12, "Dec"]] },
      yaxis: { min: 0, max: 1000 },
      grid: { color: "#666" },
      colors: ["#0a0", "#f00"]      
      });
  }

  // fix sub nav on scroll
    var $win = $(window)
      , $nav = $('.subnav')
      , navTop = $('.subnav').length && $('.subnav').offset().top - 40
      , isFixed = 0

    processScroll()

    $win.on('scroll', processScroll)

    function processScroll() {
      var i, scrollTop = $win.scrollTop()
      if (scrollTop >= navTop && !isFixed) {
        isFixed = 1
        $nav.addClass('subnav-fixed')
      } else if (scrollTop <= navTop && isFixed) {
        isFixed = 0
        $nav.removeClass('subnav-fixed')
      }
    }
});

$('.dropdown-toggle').dropdown();
$(".collapse").collapse()



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