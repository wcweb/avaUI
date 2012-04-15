var PosterOnePic2 = function(option){
	if(typeof(arguments[0]) == 'undefined'){ return false; }
	var option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
	this.parent = option.parent ? document.getElementById(option.parent) : 'document';
	this.parent = this.parent ? this.parent : document.body;
	this.delay = option.delay ? option.delay : 6000;
	this.delay = this.delay > 1000 ? this.delay : 6000;
	this.data = option.data ? (typeof(option.data) == 'object' ? option.data : []) : [];
	
	if(this.data.length == 0){ return; }
	
	this.limit = 9;
	this.total = this.data.length > this.limit ? this.limit : this.data.length;
	this.current = -1;
	this.items = [];
	this.thumbs = [];
	this.timer = null;
	this.locked = false;
	this.rect = 930;
	this.fxs = {};
	this.imgplace = 'http://static.youku.com/index/img/spacer.gif';
	this.paused = false;
	this.pos_start = 0;
	this.gestures = false; //双手指协同
	
	this.init();
}

PosterOnePic2.prototype = {
	readdata: function(){
		//遍历全部图片
		for(var i=0; i<this.total; i++){
			var data = this.data[i];
			var item = document.createElement('DIV');
			item.className = 'item';
			item.setAttribute('index', i);
			item.innerHTML = '<ul>'
							+ '<li class="item_img"><img src="'+ this.imgplace +'" _src="'+ data.img +'" /></li>'
							+ '<li class="item_info">'
							+ '<div class="item_text">'
							+ '<div class="item_title">'+ data.title +'</div>'
							+ '<div class="item_intro">'+ data.info +'</div>'
							+ '<div class="item_director">'+ data.director +'</div>'
							+ '<div class="item_performer">'+ data.performer +'</div>'
							+ '<div class="item_date">'+ data.date +'</div>'
							+ '</div>'
							+ '<div class="item_block"><div class="item_line"></div></div>'
							+ '<div class="playlight"></div>'
							+ '</li>'
							+ '<li class="item_url"><a href="'+ data.url +'" target="_blank"></a></li>'
							+ '<li class="item_status">'+ (data.tag ? ('<div class="status" style="filter:progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\',M11=0.7,M12=0.7,M21=-0.7,M22=0.7);">'+ data.tag +'</div>') : '') +'</li>'
							+ '</ul>';
			this.items.push(item);
			
			var thumb = document.createElement('LI');
			thumb.setAttribute('index', i);
			//无缩略图 取原图
			if(!data.thumb){ data.thumb = data.img; }
			thumb.innerHTML = '<img src="'+ data.thumb +'" />';
			this.thumbs.push(thumb);
			this.domthumbsbox.appendChild(thumb);
		}
	},
	inititem: function(index){
		return this.domitems.appendChild(this.items[index]);
	},
	loadimage: function(index){
		var img = this.items[index].getElementsByTagName('IMG')[0];
		if(img.getAttribute('_src')){
			img.setAttribute('src', img.getAttribute('_src'));
			img.removeAttribute('_src');	
		}
	},
	show: function(index, type){
		if(this.locked){ return; }
		if(index == this.current){ return; }
		this.locked = true;
		
		var direction = '';
		if(type == 'auto'){
			if(index>this.current){//后
				direction = 'left';	 
			}else{//前
				direction = 'right';
			}
		}else if(type == 'keep-right'){
			direction = 'right';	
		}else if(type == 'keep-left'){
			direction = 'left';
		}
		this.thumbs[index].className = 'current';	
		this.thumbs[this.current].className = '';
		
		var next = this.inititem(index);
		if(direction == 'left'){next.style.left = this.rect + 'px';}
		else{next.style.left = -this.rect + 'px';}
		
		var _this = this;
		var pos = parseInt(this.domitems.style.left ? this.domitems.style.left : 0, 10);
		
		new FX(
			this.domitems, 
			{left: {to: (direction=='left') ? pos-this.rect : pos+this.rect}}, 
			0.4, 
			'fadeIn', 
			function(){
				setTimeout(function(){
					_this.loadimage(index);
					_this.items[index].style.left = '0px';
					_this.domitems.style.left = '0px';
					_this.domitems.removeChild(_this.items[_this.current]);
					_this.current = index;
					_this.locked = false;
				}, 100);
			}
		).start();	
	},
	prev: function(type){
		var index = (this.current -1) < 0 ? this.total-1 : this.current - 1; 
		this.show(index, typeof(type) == 'undefined' ? 'auto' : type);	
	},
	next: function(type){
		var index = (this.current + 1) > this.total-1 ? 0 : this.current + 1; 
		this.show(index, typeof(type) == 'undefined' ? 'auto' : type);
	},
	start: function(){
		var _this = this;
		if(_this.paused){ _this.paused = false; }
		if(this.timer){ return; }
		this.timer = setInterval(function(){
			if(!_this.paused){ _this.next('keep-left'); }
		}, this.delay);
	},
	stop: function(){
		clearInterval(this.timer);
		this.timer = null;
	},
	pause: function(){
		this.paused = true;
	},
	init: function(){
		this.dom = document.createElement('DIV');
		this.dom.className = 'posterOnePic2';
		this.domitems = document.createElement('DIV');
		this.domitems.className = 'items';
		this.domcontrol = document.createElement('DIV');
		this.domcontrol.className = 'control';
		this.domthumbs = document.createElement('DIV');
		this.domthumbs.className = 'thumbs';
		this.domthumbsbox = document.createElement('UL');
		this.btnprev = document.createElement('DIV');
		this.btnprev.className = 'btnprev';
		this.btnnext = document.createElement('DIV');
		this.btnnext.className = 'btnnext';
		
		this.readdata();
		
		this.dom.appendChild(this.domitems);
		this.domthumbs.appendChild(this.domthumbsbox);
		this.domcontrol.appendChild(this.domthumbs);
		this.domcontrol.appendChild(this.btnprev);
		this.domcontrol.appendChild(this.btnnext);
		this.dom.appendChild(this.domcontrol);
		this.parent.appendChild(this.dom);
		
		this.inititem(0);
		this.loadimage(0);
		this.current = 0;
		this.thumbs[0].className = 'current';
		
		this.bind();
		
		if(this.total < this.limit){
			var d = 90*this.total;
			this.domthumbs.style.left = (930 - d)/2 + 'px';	
			this.domthumbs.style.width = d*this.total + 'px';
		}
		this.domcontrol.style.visibility = 'visible';
		if(this.total > 1){
			this.btnprev.style.visibility = 'visible';
			this.btnnext.style.visibility = 'visible';			
			this.start(); 
		}
	},
	bind: function(){
		var _this = this;
		var ua = navigator.userAgent.toLowerCase();
		var isIOS = ua.match(/ipad|iphone|ipod|itouch/i);
		
		for(var i=0; i<this.total; i++){
			this.thumbs[i].ontouchstart = this.thumbs[i].onclick = function(){
				var index = parseInt(this.getAttribute('index'), 10);	
				_this.show(index, 'auto');
			}
			this.items[i].ontouchstart = this.items[i].onmouseover = function(){
				this.className = 'item item_hover';
			}
			this.items[i].ontouchend = this.items[i].onmouseout = function(){
				this.className = 'item';
			}
		}
		this.btnprev.ontouchstart = this.btnprev.onclick = function(){ _this.prev('keep-right'); }
		this.btnnext.ontouchstart = this.btnnext.onclick = function(){ _this.next('keep-left'); }
		
		//for IOS
		if(isIOS){
		 	this.dom.ontouchstart = function(e){
				var e = e.targetTouches[0];
				_this.pos_start = e.pageX;
				_this.stop(); 
			}
			this.dom.ontouchend = this.dom.ontouchend = function(){ 
				_this.start();
			}
			this.dom.ontouchmove = function(e){
				if(_this.gestures){ return; }
				var e = e.targetTouches[0];
				 
				var end = e.pageX;
				var offset = end - _this.pos_start;
				if(offset >= 50){ _this.prev('keep-right'); }
				else if(offset <= -50){ _this.next('keep-left'); }				
				return false;
			}
			this.domcontrol.ontouchmove = function(e){ return false; }
			this.dom.ongesturestart = function(){ _this.gestures = true; }
			this.dom.ongestureend = function(){ _this.gestures = false; }
			
		}else{
			this.dom.onmouseover = function(){ _this.stop(); }
			this.dom.onmouseout = function(){ _this.start(); }	
		}
		
	}
}
