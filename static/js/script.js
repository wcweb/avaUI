/* Author:

*/



$(document).ready(function(){
  
  /* setup navigation, content boxes, etc... */
  // Administry.setup();
  



// graphs

  if($('#sparkline1').length){
  /* sparklines */
  var _values = [0,3,3,2,0,1,5,7,5,5,0,6,4,6,3,6,14,8,2,9,2,6,9,3,6,5,7,1,7,7,0];
  $('#sparkline1').sparkline(_values, {type: 'bar', barColor: '#A8B2AC', zeroColor: '#DBE6DF', barWidth: 2, barSpacing: 0} );
  $('#sparkline2').sparkline(_values);
  
  /* flot graphs */
    var d1 = [];
    for (var i = 0; i < 14; i += 0.5)
        d1.push([i, Math.sin(i)]);

    var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

    var d3 = [];
    for (var i = 0; i < 14; i += 0.5)
        d3.push([i, Math.cos(i)]);

    var d4 = [];
    for (var i = 0; i < 14; i += 0.1)
        d4.push([i, Math.sqrt(i * 10)]);
    
    var d5 = [];
    for (var i = 0; i < 14; i += 0.5)
        d5.push([i, Math.sqrt(i)]);

    var d6 = [];
    for (var i = 0; i < 14; i += 0.5 + Math.random())
        d6.push([i, Math.sqrt(2*i + Math.sin(i) + 5)]);
                        
    $.plot($("#placeholder"), [
        {
            data: d1,
            lines: { show: true, fill: true }
        },
        {
            data: d2,
            bars: { show: true }
        },
        {
            data: d3,
            points: { show: true }
        },
        {
            data: d4,
            lines: { show: true }
        },
        {
            data: d5,
            lines: { show: true },
            points: { show: true }
        },
        {
            data: d6,
            lines: { show: true, steps: true }
        }
    ]); 
  
  var fh_data = [
  {
    label: 'max',
    data: [[1267873200 * 1000, 2],[1267959600 * 1000, 2],[1268046000 * 1000, 2],[1268132400 * 1000, 3],[1268218800 * 1000, 3],[1268305200 * 1000, 3],[1268391600 * 1000, 3],[1268478000 * 1000, 5],[1268564400 * 1000, 7],[1268650800 * 1000, 4],[1268737200 * 1000, 7],[1268823600 * 1000, 7],[1268910000 * 1000, 12],[1268996400 * 1000, 14],[1269082800 * 1000, 16],[1269169200 * 1000, 18],[1269255600 * 1000, 14],[1269342000 * 1000, 15],[1269428400 * 1000, 17],[1269514800 * 1000, 18],[1269601200 * 1000, 20],[1269687600 * 1000, 16],[1269774000 * 1000, 14],[1269856800 * 1000, 17],[1269943200 * 1000, 19],[1270029600 * 1000, 15],[1270116000 * 1000, 16],[1270202400 * 1000, 13],[1270288800 * 1000, 16],[1270375200 * 1000, 19],[1270461600 * 1000, 13],[1270548000 * 1000, 14],[1270634400 * 1000, 15]]
  },
  {
    label: 'min',
    data: [[1267873200 * 1000, -3],[1267959600 * 1000, -3],[1268046000 * 1000, -2],[1268132400 * 1000, -2],[1268218800 * 1000, 0],[1268305200 * 1000, 0],[1268391600 * 1000, -2],[1268478000 * 1000, 0],[1268564400 * 1000, 2],[1268650800 * 1000, 0],[1268737200 * 1000, -1],[1268823600 * 1000, 2],[1268910000 * 1000, 4],[1268996400 * 1000, 6],[1269082800 * 1000, 9],[1269169200 * 1000, 11],[1269255600 * 1000, 9],[1269342000 * 1000, 9],[1269428400 * 1000, 8],[1269514800 * 1000, 10],[1269601200 * 1000, 11],[1269687600 * 1000, 7],[1269774000 * 1000, 6],[1269856800 * 1000, 9],[1269943200 * 1000, 11],[1270029600 * 1000, 7],[1270116000 * 1000, 7],[1270202400 * 1000, 5],[1270288800 * 1000, 6],[1270375200 * 1000, 9],[1270461600 * 1000, 8],[1270548000 * 1000, 5],[1270634400 * 1000, 7]]
  }
  ];
  function weekendAreas(plotarea) {
    var areas = [];
    var d = new Date(plotarea.xmin);
    // go to the first Saturday
    d.setDate(d.getDate() - ((d.getDay() + 1) % 7))
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    var i = d.getTime();
    do {
      areas.push({ x1: i, x2: i + 2 * 24 * 60 * 60 * 1000 });
      i += 7 * 24 * 60 * 60 * 1000;
    } while (i < plotarea.xmax);

    return areas;
  }
  function showTooltip(x, y, contents) {
    $('<div id="hovertip">' + contents + '</div>').css( {
      position: 'absolute',
      display: 'none',
      top: y + 5,
      left: x + 15,
      border: '2px solid #666',
      padding: '4px',
      'background-color': '#fff',
      opacity: 0.9,
      color: '#666',
      fontSize: '13px'
    }).appendTo("body").fadeIn('fast');
  }
  
  var options = {
    lines: { show: true, lineWidth: 3 },
    points: { show: true },
    legend: { noColumns: 2, position: "se"/*, container: '#flot-legend'*/ },
    yaxis: { min: -25, max: 25 },
    xaxis: { mode: "time", timeformat: "%d %b", monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    selection: { mode: "x" },
    grid: { color: "#666", coloredAreas: weekendAreas, hoverable: true },
    colors: ["#E92424", "#75C5F0"]      
  };
  
  var plot = $.plot($("#flotPlaceholder"), fh_data, options);
  
  $("#flotPlaceholder").bind("selected", function (event, area) {
    plot = $.plot($("#flotPlaceholder"), fh_data,
        $.extend(true, {}, options, {
          xaxis: { min: area.x1, max: area.x2 }
        }));
    $('#clearSelection').show();
  });
  var previousPoint = null;
  $("#flotPlaceholder").bind("plothover", function (event, pos, item) {
    if (item) {
      if (previousPoint != item.datapoint) {
        previousPoint = item.datapoint;
        
        $("#hovertip").remove();
        var y = item.datapoint[1];
        
        showTooltip(item.pageX, item.pageY, y + '°C');
      }
    }
    else {
      $("#hovertip").remove();
      previousPoint = null;            
    }
  });
  $("#clearSelection").click(function () {
    $.plot($("#flotPlaceholder"), fh_data, options);
    $('#clearSelection').hide();
  });
  }




//product
  if($('#productdesc').length){
  /* sample tags */
  var tags=[
    {tag:"js",freq:30},{tag:"jquery",freq:25}, {tag:"pojo",freq:10},{tag:"agile",freq:4},
    {tag:"blog",freq:3},{tag:"canvas",freq:8}, {tag:"dialog",freq:3},{tag:"excel",freq:4},
    {tag:"engine",freq:5},{tag:"flex",freq:18}, {tag:"firefox",freq:23},{tag:"javascript",freq:40},
    {tag:"graph",freq:15},{tag:"grid",freq:20}, {tag:"hibernate",freq:13},{tag:"ical",freq:4},
    {tag:"ldap",freq:9},{tag:"load",freq:20}, {tag:"security",freq:13},{tag:"XSS",freq:21},
    {tag:"CSRF",freq:19},{tag:"html",freq:22}, {tag:"xml",freq:13},{tag:"tools",freq:21}
  ];


  
  
  $('#productdesc').wysiwyg({
    controls: {
      strikeThrough : { visible : true },
      underline     : { visible : true },
      
      justifyLeft   : { visible : true },
      justifyCenter : { visible : true },
      justifyRight  : { visible : true },
      justifyFull   : { visible : true },
      
      indent  : { visible : true },
      outdent : { visible : true },
      
      subscript   : { visible : true },
      superscript : { visible : true },
      
      undo : { visible : true },
      redo : { visible : true },
      
      insertOrderedList    : { visible : true },
      insertUnorderedList  : { visible : true },
      insertHorizontalRule : { visible : true },

      h4: {
              visible: true,
              className: 'h4',
              command: $.browser.msie ? 'formatBlock' : 'heading',
              arguments: [$.browser.msie ? '<h4>' : 'h4'],
              tags: ['h4'],
              tooltip: 'Header 4'
      },
      h5: {
              visible: true,
              className: 'h5',
              command: $.browser.msie ? 'formatBlock' : 'heading',
              arguments: [$.browser.msie ? '<h5>' : 'h5'],
              tags: ['h5'],
              tooltip: 'Header 5'
      },
      h6: {
              visible: true,
              className: 'h6',
              command: $.browser.msie ? 'formatBlock' : 'heading',
              arguments: [$.browser.msie ? '<h6>' : 'h6'],
              tags: ['h6'],
              tooltip: 'Header 6'
      },
      
      cut   : { visible : true },
      copy  : { visible : true },
      paste : { visible : true },
      html  : { visible: true }
    }
  }); 
  
  /* tag input field */
  $("#tags").tagInput({
    tags:tags,
    //jsonUrl:"tags.json",
    sortBy:"frequency",
    suggestedTags:["jquery", "tagging", "tag", "component", "delicious", "javascript"],
    tagSeparator:" ",
    autoFilter:true,
    autoStart:false,
    //suggestedTagsPlaceHolder:$("#suggested"),
    boldify:true
  });
  }



// dashboard

  if($("#placeholder").length){
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



    /* progress bar animations - setting initial values */
    Administry.progress("#progress1", 1, 5);
    Administry.progress("#progress2", 2, 5);
    Administry.progress("#progress3", 2, 5);

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
  }
 



  
  if($('#example').length){
    /* datatable */
    $('#example').dataTable();
    
    /* expandable rows */
    Administry.expandableRows();
  }







  if($('.carousel').length){
     $('.carousel').carousel();
  }
  if($('.dropdown-toggle').length){
    $('.dropdown-toggle').dropdown();
    $(".collapse").collapse();
  }







  // tree view
  if($.isFunction('$.fn.treeview')){
    $('#nap37_1browser').treeview();
    $('#nap38_browser').treeview();
  
  }
});












 






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