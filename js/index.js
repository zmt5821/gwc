//获取class的方法
function getClass(parent,name){
	var oParent = parent || document;
	var aEles = oParent.getElementsByTagName("*");
	var result=[];
	for(var i=0; i<aEles.length;i++){
		var arr= aEles[i].className.split(' ');
		for(var j=0; j<arr.length;j++){
			if(arr[j]==name){
				result.push(aEles[i])
			}						
		}
	};
	return result;
};
//获取非行间样式的方法
function getCss(obj,arr){
	if(obj.currentStyle){
		return obj.currentStyle[arr];
	}else{
		return getComputedStyle(obj,false)[arr];
	}
};
//js动画方法
function animate(obj,json,fn){		
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var off=true;
		for(var arr in json){//left:200 top:200   arr=>left
			var cur= 0;
			if(arr=='opacity'){
				cur=parseFloat(getCss(obj,arr))*100;//获取值
			}else{
				cur=parseInt(getCss(obj,arr));
			};
			
			var speed = (json[arr] - cur)/8;
			speed= speed>0 ? Math.ceil(speed):Math.floor(speed);
			
			if(cur != json[arr]){
				off=false;
			};
			if(arr=='opacity'){
				cur+=speed;
				obj.style[arr]= cur/100;
				obj.style.filter='alpha(opacity:'+cur+')';
				
			}else{
				obj.style[arr]= cur+speed+'px';
			}
		}
		if(off){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj)
			}
		}
		
	},30)
}
/*综合搜索*//*购物车*/
function Box(){
	var oShopCar = document.getElementById('shoppingCart');	//购物车的div
	var oCar = document.getElementById('car');	//Li
	var oCarSpan = oCar.getElementsByTagName('span')[0];	//三角
	var oBtn = document.getElementById('searchBtn');
	var oBox = document.getElementById('searchContent');
	var off = true;
	oCar.onclick=function(ev){	//点击按钮时，显示下拉菜单 
		var ev = ev || event;
		if(off){
			ev.cancelBubble=true;	//阻止事件冒泡
			oShopCar.style.display = 'block';
			oCarSpan.className = 'act';
			off = false;
		}else{
			ev.cancelBubble=true; //阻止事件冒泡
			oShopCar.style.display = 'none';
			oCarSpan .className = '';
			off = true;
		}
	}
	oShopCar.onclick=function(ev){
		var ev = ev || event;
		ev.cancelBubble=true;	//阻止事件冒泡
	}
	oBtn.onclick=function(ev){	//点击按钮时，显示下拉菜单 
		var ev = ev || event;
		if(off){
			ev.cancelBubble=true;	//阻止事件冒泡
			oBox.style.display = 'block';
			off = false;
		}else{
			ev.cancelBubble=true; //阻止事件冒泡
			oBox.style.display = 'none';
			off = true;
		}
	}
	oBox.onclick=function(ev){
		var ev = ev || event;
		ev.cancelBubble=true;	//阻止事件冒泡
	}
	document.onclick = function(){
		oShopCar.style.display = 'none';
	    oCarSpan .className = '';
	    oBox.style.display = 'none';
	    off = true;
	}
}
Box();
/*header帮助导航*/
function move(obj,span){
		obj.onmousemove = function(){
			span.className = 'act';
		};
		obj.onmouseout = function(){
			span.className = '';
		};
}
function act(){
	var oHelp = document.getElementById('help');
	var oHelpSpan = oHelp.getElementsByTagName('span')[0];
	var oNav = document.getElementById('nav');
	var oNavSpan = oNav.getElementsByTagName('span')[0];
	move(oHelp,oHelpSpan);
	move(oNav,oNavSpan);
}
act();
/*综合搜索方法*/
function SearchBtn(){
	var oBtn = document.getElementById('searchBtn');
	var oSpan = oBtn.getElementsByTagName('span')[0];
	move(oBtn,oSpan);
}
SearchBtn();
/*搜索框焦点事件*/
function onload(){
        var txt = document.getElementById('search');
        txt.style.color = '#c6c6c6';
        txt.onfocus = function ()
        {
            this.place = this.value;
            this.value = "";
            this.style.color = '#000';
        };
         
        txt.onblur = function ()
        {
            this.value = this.place;
            this.style.color = '#c6c6c6';
        }
};
onload();
/*banner menu方法*/
function LeftMenuShow(){
	var oMenu = document.getElementById('menu');
	var aLis = oMenu.getElementsByTagName('li');
	var oTile = oMenu.getElementsByTagName('h3');
	var oMenuContent = getClass(document,'menuContent');
	var oSubmenu = getClass(document,'submenu');
	var aSpan = oMenu.getElementsByTagName('span');

	for(var i = 0; i<aLis.length; i++){
		aLis[i].index=i;
		aLis[i].onmouseover=function(){
			var oAlen = oSubmenu[this.index].children.length;
			for(var i = 0; i<aLis.length; i++){
				aLis[i].className = '';
				oTile[i].className= '';
				oMenuContent[i].style.display = 'none';
				aSpan[i].className='';
			}
			aLis[this.index].className = 'active';
			oTile[this.index].className= 'active';
			aSpan[this.index].className='active';
			oMenuContent[this.index].style.display = 'block';
			for(var i = 0; i<oAlen;i++){
				oSubmenu[this.index].children[i].className = 'active';
			}
		};
		aLis[i].onmouseout = function(){
			for(var i = 0; i<aLis.length; i++){
				aLis[i].className = '';
				oTile[i].className= '';
				oMenuContent[i].style.display = 'none';
				aSpan[i].className='';
			}
			for(var i=0;i<oSubmenu[this.index].children.length;i++){
				oSubmenu[this.index].children[i].className='';
			}
		}
	}
	
}
LeftMenuShow();
/*banner轮播图*/
function banner(){
	var oW= 0;
	var oBannerbig = document.getElementById('bannerbig')
	var oView = document.getElementById("banner");	//banner可视框
	var oUl = oView.getElementsByTagName('ul')[0];	// 轮播图ul
	var oOl = document.getElementById('btns'); // 点击切换按钮
	var oBtns = oOl.children;
	oUl.innerHTML+=oUl.innerHTML;
	var aLis = oUl.children;
	var oLiWidth = aLis[0].offsetWidth;
	var iNum = 0;
	var index = 0;
	var timer = null;
	//轮播图的宽度
	oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
	oW= document.documentElement.clientWidth;	// 页面宽度
	
	//轮播图可视框居中
	oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
	
	//当窗口改变的时候重新计算轮播图居中
	window.onresize=function(){
		oW= document.documentElement.clientWidth;
		oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
	};
	
	for(var i =0; i<oBtns.length;i++){
		oBtns[i].index=i;
		oBtns[i].onclick=function(){
			index=this.index;
			for(var i =0; i<oBtns.length;i++){
				oBtns[i].className='';
			}
			oBtns[index].className='btn';
			if(iNum==aLis.length/2){
				oUl.style.left = 0+'px';
			}
			iNum=index;
			animate(oUl,{'left': -this.index*oLiWidth});
		}
	};
	function play(){
		iNum++;
		if(iNum==aLis.length/2+1){
			oUl.style.left = 0+'px'
			iNum=1;
		}
		for(var i=0; i<oBtns.length;i++){
			oBtns[i].className='';
		};
		index<aLis.length/2-1?index++:index=0;
		oBtns[index].className='btn';
		animate(oUl,{'left': -iNum*oLiWidth});
	}
	clearInterval(timer)
	timer = setInterval(function(){
		play();
	},3500);
	bannerbig.onmousemove=function(){
		clearInterval(timer);
	};
	bannerbig.onmouseout=function(){
		clearInterval(timer)
		timer = setInterval(function(){
			play();
		},3500);
	}
}
banner();
/*banner图轮播end*/
/*返回顶部*/
function returnTop(){
	var oBtn = document.getElementById("back");
	var oH = document.documentElement.clientHeight;
	var oTop = 0;
	var timer=null;
	var off=true;
	window.onscroll=function(){
		oTop = document.documentElement.scrollTop || document.body.scrollTop;	
		if(oTop>oH){
			oBtn.style.display='block'
		}else{
			oBtn.style.display='none'
		};				
		if(!off){
			clearInterval(timer);	
		}
		off=false;				
	};
	oBtn.onclick=function(){	
		timer=setInterval(function(){
			var backTop = Math.floor(oTop/4);
			if(backTop == 0){
				clearInterval(timer)
			}else{
				if(document.documentElement.scrollTop){
					document.documentElement.scrollTop-=backTop;
				}else{
					document.body.scrollTop-=backTop;	
				}		
				off=true;
			}

		},50)
		
	}
}
returnTop();
/*选项卡*/
function tab(){
	var otab = document.getElementById("tab");
	var aLi = otab.getElementsByTagName("li");
	var odiv = document.getElementById("tabdiv");
	var aUl = odiv.getElementsByTagName("ul");
	var ali = odiv.getElementsByTagName('li');	// 每一个公司的li	
	var aOpacity = getClass(document,'articleBoxContent');	// 每一个公司的li下的opacity的box
	var timer = null;
	var oZixun = getClass(document,'zixun');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className="";
					aUl[i].style.display="none";
				}
				aLi[this.index].className="active";
				aUl[this.index].style.display="block";
			}
		}
		for(var i=0;i<ali.length;i++){
			ali[i].index=i;
			ali[i].onmouseover=function(){
				aOpacity[this.index].style.display='block';
				oZixun[this.index].style.display='block';
				}
			ali[i].onmouseout=function(){
				aOpacity[this.index].style.display='none';
				oZixun[this.index].style.display='none';
			}
		}
		
};
 tab();








