(function(jw){

  var jwplayer=jw;
	var template=function(player,config,div){
		var list='';
		var toggleCount=1;
		function makecuepoints(){
			div.innerHTML= config.text;
			div.width=200;
			div.height=300;
      div.style.display = 'none';
		}

		function buttonEvent(){
			if(!toggleCount%2){
				if(list!==''){
          this.publicfunction(list);
        }
				div.style.display='block';
			}else{
				div.style.display='none';
			}
			toggleCount+=1;
			
		}

		this.publicfunction=function(something){
			div.innerHTML= something;
		};

		function setup(evt){
			player.getPlugin("dock").setButton('cueboy',buttonEvent,'static/player/img/cueboy_in.png',
        'static/player/img/cueboy_over.png');
		}
		player.onReady(setup);
		this.resize =function(w,h){
			div.width=w;
			div.height=h;
			buttonEvent();
		};
	};
	jwplayer().registerPlugin('cueboy',template);
})(jwplayer);