 (function(jwplayer){

  var template = function(player, config, div) {
    var sayhello=function() {
        
        div.innerHTML = config.text;
        console.log('helloworld');
    };


    function setup(evt) {
      player.getPlugin("dock").setButton('helloworld', sayhello, 'static/style/img/hello-in.png', 'static/style/img/hello-over.png');
    }



    player.onReady(setup);
    this.resize = function(width, height) {};
  };

  jwplayer().registerPlugin('helloworld', template);

})(jwplayer);