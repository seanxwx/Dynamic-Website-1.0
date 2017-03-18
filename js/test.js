
var screenAnimateElements = {
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

function setScreenAnimate(screenCls){

	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];

	var isSetAnimateClass = false;

	var isAnimateDone = false;

	screen.onclick = function(){

		//初始化
		if(isSetAnimateClass === false){

			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');

				element.setAttribute('class', baseCls+' '+animateElements[i].substr(1)+'_animate_init');
			}
			isSetAnimateClass = true;
			return;
		}
		//init -> done
		if(isAnimateDone === false){
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');

				element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
			}
			
			isAnimateDone = true;
			return;
		}

		//done -> init
		if(isAnimateDone === true){
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');

				element.setAttribute('class', baseCls.replace('_animate_done','_animate_init'));
			}
			isAnimateDone = false;
			return;
		}
	}
}

for(k in screenAnimateElements){
	setScreenAnimate(k);				
}
setScreenAnimate('.screen-1');
setScreenAnimate('.screen-2');
setScreenAnimate('.screen-3');
setScreenAnimate('.screen-4');
setScreenAnimate('.screen-5');