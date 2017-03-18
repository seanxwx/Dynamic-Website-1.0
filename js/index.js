/*获取元素*/
var getElem = function(selector){
	return document.querySelector(selector);
}

var getAllElem = function(selector){
	return document.querySelectorAll(selector);
}

/*获取元素样式*/

var getCls = function(element){
	return element.getAttribute('class');
}

/*设置元素样式*/
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}


/*为元素添加样式*/
var addCls = function(element, cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) === -1){
		setCls(element,baseCls+' '+cls);
	}
}


/*为元素删除样式*/
var delCls = function(element, cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) != -1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}

/*初始化样式 init*/
var screenAnimateElements = {
	'.header':[
	'.header_wrap',
	],
	'.screen-1':[
	'.screen-1_heading',
	'.screen-1_subheading',
	],
	'.screen-2':[
	'.screen-2_heading',
	'.screen-2_line',
	'.screen-2_subheading',
	'.screen-2_people',
	'.screen-2_rocket',
	],
	'.screen-3':[
	'.screen-3_picture',
	'.screen-3_heading',
	'.screen-3_line',
	'.screen-3_subheading',
	'.screen-3_lan',
	],

	'.screen-4':[
	'.screen-4_heading',
	'.screen-4_line',
	'.screen-4_subheading',
	'.screen-4_picitem_i_1',
	'.screen-4_picitem_i_2',
	'.screen-4_picitem_i_3',
	'.screen-4_picitem_i_4',
	],
	'.screen-5':[
	'.screen-5_picture',
	'.screen-5_heading',
	'.screen-5_line',
	'.screen-5_subheading',
	],
};

/*设置屏内元素为初始状态*/
var setScreenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];

	for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');

				element.setAttribute('class', baseCls+' '+animateElements[i].substr(1)+'_animate_init');
			}
}

/*设置播放屏内的元素动画*/

var playScreenAnimateDone = function(screenCls){

	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');

				element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
	}
}


window.onload = function(){
	console.log('onload');
	for(k in screenAnimateElements){
	if(k==='.screen-1'){
		continue;
	}
	setScreenAnimateInit(k);				
	}
}

/*滚动到哪就播放到哪*/

var navItems = getAllElem('.header_nav-item');
var outLineItem = getAllElem('.outline_item');

var switchNavItemsActive = function(idx){
	for(var i=0;i<navItems.length;i++){
		delCls(navItems[i],'header_nav-item_status_active');
	}
	addCls(navItems[idx],'header_nav-item_status_active');

	for(var i=0;i<outLineItem.length;i++){
		delCls(outLineItem[i],'outline_item_status_active');
	}
	addCls(outLineItem[idx],'outline_item_status_active');
}
switchNavItemsActive(0);
window.onscroll = function(){
	var top = document.body.scrollTop;
	console.log(top);
	if(top > 1){

		addCls(getElem('.header'), 'header_status_back');
		addCls(getElem('.outline'), 'outline_status_in');
	}else{
		
		delCls(getElem('.header'), 'header_status_back');
		delCls(getElem('.outline'), 'outline_status_in');
		
		switchNavItemsActive(0);
	}

	

	if(top == 0 ){
		navTip.style.left = 0 + 'px';

	}

	if(top > 1){
		
	playScreenAnimateDone('.screen-1');
	
	}

	if(top > 640*1 - 100){
		
	playScreenAnimateDone('.screen-2');
	switchNavItemsActive(1);
navTip.style.left = (1 * 104) + 'px';

	}

	if(top > 640*2 - 100){
		
	playScreenAnimateDone('.screen-3');
	switchNavItemsActive(2);
navTip.style.left = (2 * 104) + 'px';
	}
	if(top > 640*3 - 100){
		
	playScreenAnimateDone('.screen-4');
	switchNavItemsActive(3);
navTip.style.left = (3 * 104) + 'px';
	}
	if(top > 640*4 - 100){

	playScreenAnimateDone('.screen-5');
	switchNavItemsActive(4);
navTip.style.left = (4 * 104) + 'px';
	}


}


/*双向定位*/




var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick = function(){
		document.body.scrollTop = i*640;
	}
}


for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems)

}

for(var i=0;i<outLineItem.length;i++){
	setNavJump(i,outLineItem)

}

/*第四步：滑动门特效*/

var navTip = getElem('.header_nav-tip');
var setTip = function(idx,lib){
	lib[idx].onmouseover = function(){
		console.log(this,idx);
		navTip.style.left = (idx * 104) + 'px';
	}

	var activeIdx=0;
	lib[idx].onmouseout = function(){
		
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header_nav-item_status_active') > -1){
				activeIdx = i;
				break;
			}
		}

		navTip.style.left = (activeIdx * 104) + 'px';
	}

}
for(var i=0;i<navItems.length-1;i++){
	setTip(i,navItems);
}

setTimeout(function(){
	playScreenAnimateDone('.header');
	playScreenAnimateDone('.screen-1');
},200)

var elsebutton = getElem(".screen-else_button");

elsebutton.onclick = function(){
	document.body.scrollTop = 0;
}
