var Pa_Common=new Object();
Pa_Common._state=new Array();
Pa_Common._frames=null;
Pa_Common._frames_index=0;

Pa_Common.getFrames=function(win)
{
if (win==window) return null;
this._frames=new Array();
this._frames_index=0;
if (win.frames&&typeof(win.frames.length)=='number'&&win.frames.length>0) {
	for (var i=0;i<win.frames.length;i++) {
		this._pressFrames(win.frames[i]);
	}
} else {
	this._frames[this._frames_index]=win;
	this._frames_index+=1;
}
return this._frames;
}

Pa_Common._pressFrames=function(win){
if (win==window) return;
if (win.frames&&typeof(win.frames.length)=='number'&&win.frames.length>0) {
	for (var i=0;i<win.frames.length;i++) {
		this._pressFrames(win.frames[i]);
	}
} else {
	this._frames[this._frames_index]=win;
	this._frames_index+=1;
}}

Pa_Common.IsSafari=function()
{return navigator.userAgent.indexOf('Safari')!=-1;}

Pa_Common.IsOpera=function()
{return window.opera!=null;}

Pa_Common.IsIE=function()
{return document.getElementsByTagName('body')[0].currentStyle!=null;}

Pa_Common.ConvertHsvColorToRgbColor=function(hsv)
{
var h=hsv[0];var s=hsv[1];var v=hsv[2];var r;var g;var b;
if(s==0)
return new Array(v,v,v);
var htemp;
if(h==360)
htemp=0;
else
htemp=h;
htemp=htemp/60;
var i=Math.floor(htemp);
var f=htemp-i;
var p=v*(1-s);
var q=v*(1-(s*f));
var t=v*(1-(s*(1-f)));
if(i==0){r=v;g=t;b=p;}
if(i==1){r=q;g=v;b=p;}
if(i==2){r=p;g=v;b=t;}
if(i==3){r=p;g=q;b=v;}
if(i==4){r=t;g=p;b=v;}
if(i==5){r=v;g=p;b=q;}
r=Math.round(r);
g=Math.round(g);
b=Math.round(b);
return new Array(r,g,b);
}

Pa_Common.ConvertRgbColorToHsvColor=function(rgb)
{
var r=rgb[0];var g=rgb[1];var b=rgb[2];var h;var s;var v=Math.max(Math.max(r,g),b);
var min=Math.min(Math.min(r,g),b);var delta=v-min;
if(v==0)
s=0
else
s=delta/v;
if(s==0)
h=0;
else {
	if(r==v)
	h=60*(g-b)/delta;
	else if(g==v)
	h=120+60*(b-r)/delta;
	else if(b==v)
	h=240+60*(r-g)/delta;
}
if(h<0)
h+=360;
return new Array(h,s,v);
}

Pa_Common.ConvertDecimalToHexadecimal=function(d,digits)
{
var chars="0123456789abcdef";
var h='';
var mod;
while(d>0) {
	mod=d%16;
	h=chars.substr(mod,1)+h;
	d-=mod;
	d/=16;
}
if(digits) {
	while(h.length<digits) {
		h="0"+h;
	}
}
return h;
}

Pa_Common.ConvertHtmlColorToRgbColor=function(html)
{
html=html.replace(/[^0-9a-f]/ig,'');
if(html.length==3)
return new Array(parseInt(html.substr(0,1)+html.substr(0,1),16),parseInt(html.substr(1,1)+html.substr(1,1),16),parseInt(html.substr(2,1)+html.substr(2,1),16));
else if(html.length==6)
return new Array(parseInt(html.substr(0,2),16),parseInt(html.substr(2,2),16),parseInt(html.substr(4,2),16));
else
return new Array(255,255,255);
}

Pa_Common.ConvertRgbColorToHtmlColor=function(rgbColor)
{return"#"+Pa_Common.ConvertDecimalToHexadecimal(rgbColor[0],2)+Pa_Common.ConvertDecimalToHexadecimal(rgbColor[1],2)+Pa_Common.ConvertDecimalToHexadecimal(rgbColor[2],2);}

Pa_Common.GetContrastingHtmlColorForRgbColor=function(rgb)
{
var illuminance=(rgb[0]*2)+(rgb[1]*5)+(rgb[2]);
if(illuminance>1024)
return"#000000";
else
return"#ffffff";
}

Pa_Common.GetElementInfo=function(element)
{
var curleft=0;
var curtop=0;
var obj=element;
var leftComplete=false;
var topComplete=false;
var isIE=Pa_Common.IsIE();
while(obj) {
	if(!leftComplete)
	curleft+=obj.offsetLeft;
	if(!topComplete)
	curtop+=obj.offsetTop;
	if(isIE&&obj.offsetParent&&obj.offsetParent.style.position=='relative')	{
		if(!obj.offsetParent.style.width) {
			leftComplete=true;
			if((obj.offsetParent.style.top||obj.offsetParent.style.bottom)) {
				curtop+=obj.offsetHeight;
				topComplete=true;
			}
		}
	}
	obj=obj.offsetParent;
}
var elementInfo=new Object();
elementInfo.Left=curleft;
elementInfo.Top=curtop;
elementInfo.Width=element.offsetWidth;
elementInfo.Height=element.offsetHeight;
return elementInfo;
}

Pa_Common.GetWindowInfo=function(win)
{
if(win==null || typeof(win)=='undefined') win=window;
var scrollX=0,scrollY=0,width=0,height=0;
if(typeof(win.pageXOffset)=='number') {
	scrollX=win.pageXOffset;
	scrollY=win.pageYOffset;
} else if(win.document.body&&(win.document.body.scrollLeft||win.document.body.scrollTop)) {
	scrollX=win.document.body.scrollLeft;
	scrollY=win.document.body.scrollTop;
} else if(win.document.documentElement&&(win.document.documentElement.scrollLeft||win.document.documentElement.scrollTop)) {
	scrollX=win.document.documentElement.scrollLeft;
	scrollY=win.document.documentElement.scrollTop;
}
if(typeof(win.innerWidth)=='number') {
	width=win.innerWidth;
	height=win.innerHeight;
} else if(win.document.documentElement&&(win.document.documentElement.clientWidth||win.document.documentElement.clientHeight)) {
	width=win.document.documentElement.clientWidth;
	height=win.document.documentElement.clientHeight;
} else if(win.document.body&&(win.document.body.clientWidth||win.document.body.clientHeight)) {
	width=win.document.body.clientWidth;
	height=win.document.body.clientHeight;
}
if(win.document.documentElement&&(win.document.documentElement.scrollHeight||win.document.documentElement.offsetHeight)) {
	if(win.document.documentElement.scrollHeight>win.document.documentElement.offsetHeight) {
		contentWidth=win.document.documentElement.scrollWidth;
		contentHeight=win.document.documentElement.scrollHeight;
	} else {
		contentWidth=win.document.documentElement.offsetWidth;
		contentHeight=win.document.documentElement.offsetHeight;
    }
} else if(win.document.body&&(win.document.body.scrollHeight||win.document.body.offsetHeight)) {
	if(win.document.body.scrollHeight>win.document.body.offsetHeight) {
		contentWidth=win.document.body.scrollWidth;
		contentHeight=win.document.body.scrollHeight;
	} else {
		contentWidth=win.document.body.offsetWidth;
		contentHeight=win.document.body.offsetHeight;
	}
} else {
	contentWidth=width;
	contentHeight=height;
}
if(height>contentHeight)
height=contentHeight;
if(width>contentWidth)
width=contentWidth;
var rect=new Object();
rect.ScrollX=scrollX;
rect.ScrollY=scrollY;
rect.Width=width;
rect.Height=height;
rect.ContentWidth=contentWidth;
rect.ContentHeight=contentHeight;
return rect;
}

Pa_Common.GetCurrentStyleValue=function(element,styleRule,jsStyleRule,defaultValue)
{
var value='';
try { 
	if(document.defaultView&&document.defaultView.getComputedStyle)
	value=document.defaultView.getComputedStyle(element,"").getPropertyValue(styleRule);
	else if(element.currentStyle)
	value=element.currentStyle[jsStyleRule];
}catch(e){}
if((value=='inherit'||value=='transparent')&&element.parentNode!=null)
return Pa_Common.GetCurrentStyleValue(element.parentNode,styleRule,jsStyleRule,defaultValue);
else if(value!=''&&value!=undefined&&value!='rgba(0, 0, 0, 0)')
return value;
else
return defaultValue;
}

Pa_Common.GetStyleOffset=function(element)
{
var result=new Object();
result.Height=Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'border-top-width','borderTopWidth','0')),0)+
Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'border-bottom-width','borderBottomWidth','0')),0)+
Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'padding-top','paddingTop','0')),0)+
Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'padding-bottom','paddingBottom','0')),0);
result.Width=Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'border-left-width','borderLeftWidth','0')),0)+
Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'border-right-width','borderRightWidth','0')),0)+
Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'padding-left','paddingLeft','0')),0)+
Pa_Common.IsNanDefault(parseInt(Pa_Common.GetCurrentStyleValue(element,'padding-right','paddingRight','0')),0);
return result;
}

Pa_Common.IsNanDefault=function(value,defaultValue)
{
if(isNaN(value))
return defaultValue;
else
return value;
}

Pa_Common.EscapeForRegExp=function(value)
{return value.replace(/([\\\(\^\$\*\+\?\{\}\.\)\|\-])/g,'\\$1');}

Pa_Common.GetSelectedHtmlInElement=function(element,includeAllContentIfNoSelection,includeAllContentIfInvalidSelection,invalidSelectionMessage)
{
var selectionIsValid=true;
var content=null;
if(window.getSelection) {
	var selection=window.getSelection();
	if(selection&&selection.rangeCount>0&&selection.toString().length>0) {
		selectionIsValid=false;
		var selectedRange=selection.getRangeAt(0);
		var availableRange=document.createRange();
		availableRange.selectNode(element);
		if(availableRange.compareBoundaryPoints(Range.START_TO_START,selectedRange)<=0&&availableRange.compareBoundaryPoints(Range.END_TO_END,selectedRange)>=0) {
			var temp=document.createElement('div');
			temp.appendChild(selectedRange.cloneContents());
			content=temp.innerHTML;
		} else if(invalidSelectionMessage) alert(invalidSelectionMessage);
	}
} else if(document.selection) {
	var range=document.selection.createRange();
	if(range&&range.text) {
		selectionIsValid=false;
		var parent=range.parentElement();
		if(parent!=null&&Pa_Common.ElementContainsElement(element,parent))
		content=range.htmlText;
		else if(invalidSelectionMessage)
		alert(invalidSelectionMessage);
	}
}
if(content==null&&((selectionIsValid&&includeAllContentIfNoSelection)||includeAllContentIfInvalidSelection))
content=element.innerHTML;
return content;
}

Pa_Common.ElementContainsElement=function(parent,child)
{
if(!parent||!child)
return false;
if(parent==child)
return true;
if(parent&&parent.childNodes) {
	for(var i=0;i<parent.childNodes.length;i++) {
		if(parent.childNodes[i]==child||Pa_Common.ElementContainsElement(parent.childNodes[i],child))
		return true;
	}
}
return false;
}

Pa_Common.GetCurrentCursorIndex=function(inputElement)
{
var index=0;
if(inputElement.selectionStart||inputElement.selectionStart=='0')
index=inputElement.selectionStart;
else if(document.selection) {
	var originalValue=inputElement.value;
	var range=document.selection.createRange();
	var escapeChar=String.fromCharCode(1);
	range.text=escapeChar;
	index=inputElement.value.indexOf(escapeChar);
	inputElement.value=originalValue;
}
return index;
}

Pa_Common._delayedSetCurrentCursorSelection=function(stateId)
{
var state=Pa_Common.GetStateByStateId(stateId,'Pa_Common_SetCurrentCursorSelection');
if(state) {
	Pa_Common.SetCurrentCursorSelection(state.InputElement,state.StartIndex,state.EndIndex,false,state.PersistedValue);
	Pa_Common.ClearStateByStateId(stateId,'Pa_Common_SetCurrentCursorSelection');
}}

Pa_Common.CreateSafeFunction=function(instance,func)
{return function(){return func.apply(instance,arguments);}}

Pa_Common.DisposeContent=function(parentElement)
{
if(parentElement&&parentElement.childNodes&&parentElement.childNodes.length>0) {
	for(var i=0;i<parentElement.childNodes.length;i++) {
		if(parentElement.childNodes[i].dispose) {
			try {
				parentElement.childNodes[i].dispose();
			} catch(e){}
		}
		Pa_Common.DisposeContent(parentElement.childNodes[i]);
	}
}}

Pa_Common.SetCurrentCursorSelection=function(inputElement,startIndex,endIndex,functionKeyWasHandled,persistedValue)
{
if(Pa_Common.IsSafari()||Pa_Common.IsOpera()) {
	if(functionKeyWasHandled) {
		var state=Pa_Common.GetStateByKey(inputElement,'Pa_Common_SetCurrentCursorSelection');
		if(state&&state.CursorTimeout)
		window.clearTimeout(state.CursorTimeout);
		state=new Object();
		state.InputElement=inputElement;
		state.StartIndex=startIndex;
		state.EndIndex=endIndex;
		state.PersistedValue=persistedValue;
		var stateId=Pa_Common.SaveStateByKey(inputElement,'Pa_Common_SetCurrentCursorSelection',state);
		state.CursorTimeout=window.setTimeout(new Function('Pa_Common._delayedSetCurrentCursorSelection('+stateId+');'),9);
		Pa_Common.SaveStateByKey(inputElement,'Pa_Common_SetCurrentCursorSelection',state);
		return;
	} else {
		inputElement.focus();
		if(persistedValue)
		inputElement.value=persistedValue;
	}
}
try {
	if(document.selection) {
		var range=inputElement.createTextRange();
		range.move('character',startIndex);
		range.moveEnd('character',endIndex-startIndex);
		range.select();
	} else if(inputElement.setSelectionRange) {
		inputElement.setSelectionRange(startIndex,endIndex);
		inputElement.focus();
	} else if(inputElement.selectionStart||inputElement.selectionStart=='0') {
		inputElement.selectionStart=startIndex;
		inputElement.selectionEnd=endIndex;
	}
}catch(e){}}

Pa_Common.GetStateByStateId=function(stateId,processId)
{
if(Pa_Common._state.length>stateId&&stateId>=0&&Pa_Common._state[stateId]&&Pa_Common._state[stateId]._stateProcessId==processId)
return Pa_Common._state[stateId]._state;
else return null;
}

Pa_Common.GetStateByKey=function(key,processId)
{
for(var i=0;i<Pa_Common._state.length;i++) {
	if(Pa_Common._state[i]&&Pa_Common._state[i]._stateKey==key&&Pa_Common._state[i]._stateProcessId==processId)
	return Pa_Common._state[i]._state;
}
return null;
}

Pa_Common.SaveStateByStateId=function(stateId,processId,state)
{
if(Pa_Common._state.length>stateId&&stateId>=0&&Pa_Common._state[stateId]&&Pa_Common._state[stateId]._stateProcessId==processId)
Pa_Common._state[stateId]._state=state;
}

Pa_Common.SaveStateByKey=function(key,processId,state)
{
var emptyIndex=-1;
for(var i=0;i<Pa_Common._state.length;i++) {
	if(!Pa_Common._state[i])
	emptyIndex=i;
	else if(Pa_Common._state[i]._stateKey==key&&Pa_Common._state[i]._stateProcessId==processId) {
		Pa_Common._state[i]._state=state;
		return i;
	}
}
var stateBucket=new Object();
stateBucket._stateKey=key;
stateBucket._stateProcessId=processId;
stateBucket._state=state;
if(emptyIndex!=-1) {
	Pa_Common._state[emptyIndex]=stateBucket;
	return emptyIndex;
} else {
	Pa_Common._state[Pa_Common._state.length]=stateBucket;
	return Pa_Common._state.length-1;
}}

Pa_Common.ClearStateByStateId=function(stateId,processId)
{
if(Pa_Common._state.length>stateId&&stateId>=0&&Pa_Common._state[stateId]&&Pa_Common._state[stateId]._stateProcessId==processId)
Pa_Common._state[stateId]=null;
}

Pa_Common._hiddenSelects=new Array();
Pa_Common._elementsHidingSelects=new Array();
Pa_Common._addHiddenSelect=function(elementHidingSelect,selectElement)
{
var hiddenSelect=null;
var emptyIndex=-1;
for(var i=0;i<Pa_Common._hiddenSelects.length&&hiddenSelect==null;i++) {
	if(Pa_Common._hiddenSelects[i]) {
		if(Pa_Common._hiddenSelects[i].SelectElement==selectElement)
		hiddenSelect=Pa_Common._hiddenSelects[i];
	} else emptyIndex=i;
}
if(hiddenSelect==null) {
	hiddenSelect=new Object();
	hiddenSelect.SelectElement=selectElement;
	hiddenSelect.ElementsHidingSelectsIndeces=new Array();
	hiddenSelect.OriginalVisibility=selectElement.style.visibility;
	hiddenSelect.SelectElement.style.visibility='hidden';
	if(emptyIndex==-1) {
		Pa_Common._hiddenSelects[Pa_Common._hiddenSelects.length]=hiddenSelect;
		hiddenSelect.Index=Pa_Common._hiddenSelects.length-1;
	} else {
		Pa_Common._hiddenSelects[emptyIndex]=hiddenSelect;
		hiddenSelect.Index=emptyIndex;
	}
}
var ignore=false;
for(var i=0;i<hiddenSelect.ElementsHidingSelectsIndeces.length&&!ignore;i++) {
	if(hiddenSelect.ElementsHidingSelectsIndeces[i]==elementHidingSelect.Index)
	ignore=true;
}
if(!ignore) {
	elementHidingSelect.HiddenSelectsIndeces[elementHidingSelect.HiddenSelectsIndeces.length]=hiddenSelect.Index;
	hiddenSelect.ElementsHidingSelectsIndeces[hiddenSelect.ElementsHidingSelectsIndeces.length]=elementHidingSelect.Index;
}}

Pa_Common._addElementHidingSelect=function(element)
{
var elementHidingSelect=null;
var emptyIndex=-1;
for(var i=0;i<Pa_Common._elementsHidingSelects.length&&elementHidingSelect==null;i++) {
	if(Pa_Common._elementsHidingSelects[i]) {
		if(Pa_Common._elementsHidingSelects[i].Element==element)
		elementHidingSelect=Pa_Common._elementsHidingSelects[i];
	} else emptyIndex=i;
}
if(elementHidingSelect==null) {
	elementHidingSelect=new Object();
	elementHidingSelect.Element=element;
	elementHidingSelect.HiddenSelectsIndeces=new Array();
	if(emptyIndex==-1) {
		Pa_Common._elementsHidingSelects[Pa_Common._elementsHidingSelects.length]=elementHidingSelect;
		elementHidingSelect.Index=Pa_Common._elementsHidingSelects.length-1;
	} else {
		Pa_Common._elementsHidingSelects[emptyIndex]=elementHidingSelect;
		elementHidingSelect.Index=emptyIndex;
	}
}
return elementHidingSelect;
}

Pa_Common.HideSelectBoxes=function(element,hideAll)
{
if(element.getClientRects) {
	var selectBoxes=document.getElementsByTagName('select');
	var elementRect=element.getClientRects()[0];
	var elementHidingSelect=null;
	for(var i=0;i<selectBoxes.length;i++) {
		if(selectBoxes[i].getClientRects) {
			var rects=selectBoxes[i].getClientRects();
			for(var j=0;j<rects.length;j++) {
				if(hideAll||(rects[j].top<elementRect.bottom&&elementRect.top<rects[j].bottom&&rects[j].left<elementRect.right&&elementRect.left<rects[j].right)) {
					var inElement=false;
					var selectParent=selectBoxes[i].offsetParent;
					while(selectParent!=null) {
						if(selectParent==element) {
							inElement=true;
							break;
						}
						selectParent=selectParent.offsetParent;
					}
					if(!inElement) {
						if(elementHidingSelect==null)
						elementHidingSelect=Pa_Common._addElementHidingSelect(element);
						Pa_Common._addHiddenSelect(elementHidingSelect,selectBoxes[i]);
						selectBoxes[i].style.visibility='hidden';
					}
					break;
				}
			}
		}
	}
}}

Pa_Common.ShowSelectBoxes=function(element)
{
var elementHidingSelect=null;
for(var i=0;i<Pa_Common._elementsHidingSelects.length&&elementHidingSelect==null;i++) {
	if(Pa_Common._elementsHidingSelects[i]) {
		if(Pa_Common._elementsHidingSelects[i].Element==element)
		elementHidingSelect=Pa_Common._elementsHidingSelects[i];
	}
}
if(elementHidingSelect==null)
return;
var hiddenSelect;
for(var i=0;i<elementHidingSelect.HiddenSelectsIndeces.length;i++) {
	hiddenSelect=Pa_Common._hiddenSelects[elementHidingSelect.HiddenSelectsIndeces[i]];
	if(hiddenSelect) {
		if(hiddenSelect.ElementsHidingSelectsIndeces.length==1) {
			if(hiddenSelect.SelectElement.style.visibility=='hidden')
			hiddenSelect.SelectElement.style.visibility=hiddenSelect.OriginalVisibility;
			Pa_Common._hiddenSelects[hiddenSelect.Index]=null;
		} else {
			var elementsHidingSelects=new Array();
			for(var j=0;j<hiddenSelect.ElementsHidingSelectsIndeces.length;j++) {
				if(hiddenSelect.ElementsHidingSelectsIndeces[j]!=elementHidingSelect.Index)
				elementsHidingSelects[elementsHidingSelects.length]=hiddenSelect.ElementsHidingSelectsIndeces[i];
			}
			hiddenSelect.ElementsHidingSelectsIndeces=elementsHidingSelects; 
		}
	}
}
Pa_Common._elementsHidingSelects[elementHidingSelect.Index]=null;
}

Pa_Modal=new Object();
Pa_Modal._variableName='Pa_Modal';
Pa_Modal.LoadingHtmlUrl=null;
Pa_Modal.WindowCssClasses=new Array();
Pa_Modal.WindowTitleCssClasses=new Array();
Pa_Modal.WindowCloseCssClasses=new Array();
Pa_Modal.WindowContentCssClasses=new Array();
Pa_Modal.WindowMaskCssClasses=new Array();
Pa_Modal.WindowFooterCssClasses=new Array();
Pa_Modal.WindowResizeCssClasses=new Array();
Pa_Modal.ZIndex=100;
Pa_Modal._isShown=false;
Pa_Modal._initialized=false;
Pa_Modal._modal=null;
Pa_Modal._modalTitle=null;
Pa_Modal._modalClose=null;
Pa_Modal._modalAnimationMask=null;
Pa_Modal._modalMask=null;
Pa_Modal._modalIframe=null;
Pa_Modal._modalResize=null;
Pa_Modal._modalFooter=null;
Pa_Modal._modalContent=null;
Pa_Modal._animationHandle=null;
Pa_Modal._isOpening=false;
Pa_Modal._checkForScrollResizeHandle=null;
Pa_Modal._lastModalInfo=null;
Pa_Modal._lastWindowInfo=null;
Pa_Modal._isDragging=false;
Pa_Modal._moveModalInfo=null;
Pa_Modal._resizeModalInfo=null;
Pa_Modal._isResizing=false;
Pa_Modal.Configure=function(loadingHtmlUrl,windowCssClasses,windowTitleCssClasses,windowCloseCssClasses,windowContentCssClasses,windowFooterCssClasses,windowResizeCssClasses,windowMaskCssClasses,zIndex){
this.LoadingHtmlUrl=loadingHtmlUrl;
this.WindowCssClasses=windowCssClasses;
this.WindowTitleCssClasses=windowTitleCssClasses;
this.WindowCloseCssClasses=windowCloseCssClasses;
this.WindowContentCssClasses=windowContentCssClasses;
this.WindowMaskCssClasses=windowMaskCssClasses;
this.WindowFooterCssClasses=windowFooterCssClasses;
this.WindowResizeCssClasses=windowResizeCssClasses;
this.ZIndex=zIndex;
window.onunload=new Function('event','Pa_Frame_Mask.Close();'); 
}

Pa_Modal.IsShown=function()
{return this._isShown;}

Pa_Modal.Open=function(url,width,height,onCloseFunction,x,y,ignoreCloseAndAnimation)
{
if(!ignoreCloseAndAnimation&&this._isShown) this.Close();
else if(this._hiddenSelects) Pa_Common.ShowSelectBoxes(this._modalAnimationMask)
if(!this._initialized) this._initialize();
Pa_Frame_Mask.Show();
try{
	this._modalTitle.childNodes[1].innerHTML=this._modalIframe.contentWindow.document.title;}
catch(err){}
if(!ignoreCloseAndAnimation) this._modalIframe.src=url;
try{
	this._modalIframe.contentWindow.opener=window;
}catch(err){}
this._modalAnimationMask.style.display='none';
this._modalMask.style.display='none';
this._lastWindowInfo=Pa_Common.GetWindowInfo();
this._modalAnimationMask.style.display='block';
if(width>this._lastWindowInfo.Width) width=this._lastWindowInfo.Width;
this._modalAnimationMask.style.position='absolute';
this._modalAnimationMask.style.zIndex=this.ZIndex;
this._modalAnimationMask.style.display='block';
this._modalAnimationMask.style.visibility='hidden';
this._modalAnimationMask.style.overflow='hidden';
this._modalAnimationMask.style.width=width+'px';
this._modalContent.style.width=width+'px';
this._modal.style.position='absolute';
this._modal.style.display='block';
this._modal.style.visibility='hidden';
this._modal.style.left='0px';
this._modal.style.top='0px';
this._modalMask.style.position='absolute';   //Mask Attribute
this._modalMask.style.display='block';
this._modalMask.style.zIndex=this.ZIndex;
this._modalMask.style.visibility='visible';
var modalContentOffset=Pa_Common.GetStyleOffset(this._modalContent);
var offset=(this._modal.offsetHeight-this._modalContent.offsetHeight)-modalContentOffset.Height;
if(height+offset>this._lastWindowInfo.Height) height=this._lastWindowInfo.Height-offset;
if(width<this._modalResize.offsetWidth*2) width=this._modalResize.offsetWidth*2;
if(width<this._modalClose.offsetWidth*2) width=this._modalClose.offsetWidth*2;
if(height<this._modalTitle.offsetHeight+this._modalFooter.offsetHeight) height=this._modalTitle.offsetHeight+this._modalFooter.offsetHeight;
this._modalIframe.style.height=height+'px';
this._modalContent.style.height=height+'px';
this._modalContent.style.width=(width-(this._modal.offsetWidth-this._modalContent.offsetWidth)-modalContentOffset.Width)+'px';
this._modalAnimationMask.style.width=width+'px';
this._modalAnimationMask.style.height=this._modal.offsetHeight+'px';
this._modalMask.style.left='0px';  //Mask Attribute
this._modalMask.style.top='0px';
this._modalMask.style.width=this._lastWindowInfo.ContentWidth+'px';
this._modalMask.style.height=this._lastWindowInfo.ContentHeight+'px';
this._lastWindowInfo=Pa_Common.GetWindowInfo();
var panelWidth=this._modal.offsetWidth;
var panelHeight=this._modal.offsetHeight;
var animatePropertyName,animateTargetValue,animateNextValue;
if(typeof(x)=='undefined'||isNaN(parseInt(x,10))) x=((this._lastWindowInfo.Width-panelWidth)/2)+this._lastWindowInfo.ScrollX;
if(x+panelWidth>this._lastWindowInfo.Width+this._lastWindowInfo.ScrollX) x=this._lastWindowInfo.Width+this._lastWindowInfo.ScrollX-panelWidth;
if(x<this._lastWindowInfo.ScrollX) x=this._lastWindowInfo.ScrollX;
if(typeof(y)=='undefined'||isNaN(parseInt(y,10))) y=((this._lastWindowInfo.Height-panelHeight)/2)+this._lastWindowInfo.ScrollY;
if(y+panelHeight>this._lastWindowInfo.Height+this._lastWindowInfo.ScrollY) y=this._lastWindowInfo.Height+this._lastWindowInfo.ScrollY-panelHeight;
if(y<this._lastWindowInfo.ScrollY) y=this._lastWindowInfo.ScrollY;
this._modalAnimationMask.style.left=x+'px';
this._modalAnimationMask.style.top=y+'px';
animateTargetValue=0;
animateNextValue=-panelHeight;
this._modal.style.visibility='visible';
this._modalAnimationMask.style.visibility='visible';
this._modalAnimationMask.style.overflow='hidden';
Pa_Common.HideSelectBoxes(this._modalAnimationMask,true);
this._isOpening=true;
if(ignoreCloseAndAnimation) this._animationHandle=window.setTimeout(new Function(this._variableName+'._animate(0,0,0,0);'),9);
else{
	this._modalIframe.style.display='none';
	this._animate(0,-panelHeight,panelHeight/3,.67);
}
this._lastModalInfo={Url:this._modalIframe.src,OnCloseFunction:onCloseFunction,X:x,Y:y,Width:parseInt(width,10),Height:parseInt(height,10)};
this._isShown=true;
} //End Open

Pa_Modal._checkForScrollResize=function()
{
if(this._checkForScrollResizeHandle)
window.clearTimeout(this._checkForScrollResizeHandle);
if(this._isShown&&!this._isOpening&&this._lastWindowInfo) {
	try {
		this._modalTitle.childNodes[1].innerHTML=this._modalIframe.contentWindow.document.title;
	} catch(err) {}
	var windowInfo=Pa_Common.GetWindowInfo();
	if(windowInfo.ScrollX!=this._lastWindowInfo.ScrollX||windowInfo.ScrollY!=this._lastWindowInfo.ScrollY||windowInfo.Width!=this._lastWindowInfo.Width||windowInfo.Height!=this._lastWindowInfo.Height)
	this.Open(null,this._lastModalInfo.Width,this._lastModalInfo.Height,this._lastModalInfo.OnCloseFunction,this._lastModalInfo.X,this._lastModalInfo.Y,true);
	else
	this._checkForScrollResizeHandle=window.setTimeout(new Function('window.'+this._variableName+'._checkForScrollResize();'),999);
}}
	
Pa_Modal.Close=function(returnValue)
{
if(this._isShown) {
	if(!this._initialized)
	this._initialize();
	this._modal.style.position='absolute';
	this._modal.style.display='none';
	this._modalAnimationMask.style.position='absolute';
	this._modalAnimationMask.style.display='none';
	this._modalMask.style.position='absolute';  //Mask Close
	this._modalMask.style.display='none';
	Pa_Frame_Mask.Close();
	this._modalIframe.src=this.LoadingHtmlUrl;
	var onCloseFunction=this._lastModalInfo.OnCloseFunction;
	this._isShown=false;
	this._lastModalInfo=null;
	this._windowInfo=null;
	Pa_Common.ShowSelectBoxes(this._modalAnimationMask)
	if(onCloseFunction)
	onCloseFunction(returnValue);
	this.Dispose();
}}

Pa_Modal.Refresh=function()
{
if(this._animationHandle)
window.clearTimeout(this._animationHandle);
this.Dispose();
if(this._isShown&&this._lastModalInfo)
this.Open(this._lastModalInfo.Url,this._lastModalInfo.Width,this._lastModalInfo.OnCloseFunction,this._lastModalInfo.Height,this._lastModalInfo.OnCloseFunction,this._lastModalInfo.X,this._lastModalInfo.Y);
}

Pa_Modal._initialize=function()
{
Pa_Frame_Mask.Init();
this._modalMask=document.createElement('div');  //Mask Create
this._modalMask.style.width='auto';
this._modalMask.style.height='auto';
this._modalMask.style.position='absolute';
this._modalMask.style.display='none';
this._modalMask.dispose=new Function('Pa_Modal.Dispose();');
var mm=this._modalMask;
if(this.WindowMaskCssClasses.length>0) {
	mm.className=this.WindowMaskCssClasses[0];
	for(var i=1;i<this.WindowMaskCssClasses.length;i++) {
		mm.appendChild(document.createElement('div'));
		mm=mm.childNodes[0];
		mm.className=this.WindowMaskCssClasses[i];
		mm.style.width='auto';
		mm.style.height='auto';
	}
}
document.body.appendChild(this._modalMask);
this._modalAnimationMask=document.createElement('div');
this._modalAnimationMask.style.position='absolute';
this._modalAnimationMask.style.display='none';
this._modalAnimationMask.style.overflow='hidden';
this._modal=document.createElement('div');
this._modal.style.width='auto';
this._modal.style.height='auto';
this._modal.style.position='absolute';
this._modal.style.display='none';
var m=this._modal;
if(this.WindowCssClasses.length>0) {
	m.className=this.WindowCssClasses[0];
	for(var i=1;i<this.WindowCssClasses.length;i++) {
		m.appendChild(document.createElement('div'));
		m=m.childNodes[0];
		m.className=this.WindowCssClasses[i];
		m.style.width='auto';
		m.style.height='auto';
	}
}
this._modalTitle=document.createElement('div');
m.appendChild(this._modalTitle);
if(this.WindowTitleCssClasses.length>0) {
	this._modalTitle.className=this.WindowTitleCssClasses[0];
	for(var i=1;i<this.WindowTitleCssClasses.length;i++) {
		this._modalTitle.appendChild(document.createElement('div'));
		this._modalTitle=this._modalTitle.childNodes[0];
		this._modalTitle.className=this.WindowTitleCssClasses[i];
	}
}
this._modalTitle.onmousedown=new Function('event','window.'+this._variableName+'._startDrag(event); return false;');
this._modalClose=document.createElement('div');
this._modalTitle.appendChild(this._modalClose);
var mc=this._modalClose;
if(this.WindowCloseCssClasses.length>0) {
	mc.className=this.WindowCloseCssClasses[0];
	for(var i=1;i<this.WindowCloseCssClasses.length;i++) {
		mc.appendChild(document.createElement('div'));
		mc=mc.childNodes[0];
		mc.className=this.WindowCloseCssClasses[i];
	}
}
this._modalClose.onclick=new Function('window.'+this._variableName+'.Close();');
var mt=document.createElement('span');
this._modalTitle.appendChild(mt);
var e=document.createElement('div');
e.style.clear='both';
this._modalTitle.appendChild(e);
this._modalContent=document.createElement('div');
m.appendChild(this._modalContent);
if(this.WindowContentCssClasses.length>0) {
	this._modalContent.className=this.WindowContentCssClasses[0];
	for(var i=1;i<this.WindowContentCssClasses.length;i++) {
		this._modalContent.appendChild(document.createElement('div'));
		this._modalContent=this._modalContent.childNodes[0];
		this._modalContent.className=this.WindowContentCssClasses[i];
	}
}
this._modalIframe=document.createElement('iframe');
this._modalIframe.src=this.LoadingHtmlUrl;
this._modalIframe.width='100%';
this._modalIframe.border='0';
this._modalIframe.frameBorder='no';
this._modalIframe.style.borderLeftWidth='0px';
this._modalIframe.style.borderRightWidth='0px';
this._modalIframe.style.borderTopWidth='0px';
this._modalIframe.style.borderBottomWidth='0px';
this._modalContent.appendChild(this._modalIframe);
this._modalFooter=document.createElement('div');
m.appendChild(this._modalFooter);
var mf=this._modalFooter;
if(this.WindowFooterCssClasses.length>0) {
	mf.className=this.WindowFooterCssClasses[0];
	for(var i=1;i<this.WindowFooterCssClasses.length;i++) {
		mf.appendChild(document.createElement('div'));
	mf=mf.childNodes[0];
	mf.className=this.WindowFooterCssClasses[i];
	}
}
this._modalResize=document.createElement('div');
mf.appendChild(this._modalResize);
var e=document.createElement('div');
e.style.clear='both';
mf.appendChild(e);
var mr=this._modalResize;
if(this.WindowResizeCssClasses.length>0) {
	mr.className=this.WindowResizeCssClasses[0];
	for(var i=1;i<this.WindowResizeCssClasses.length;i++) {
		mr.appendChild(document.createElement('div'));
		mr=mr.childNodes[0];
		mr.className=this.WindowResizeCssClasses[i];
	}
}
this._modalResize.onmousedown=new Function('event','window.'+this._variableName+'._startResize(event); return false;');
this._modalAnimationMask.appendChild(this._modal);
document.body.appendChild(this._modalAnimationMask);
this._initialized=true;
} //End _initialize

Pa_Modal.Dispose=function()
{
if(this._initialized) {
	if(this._animationHandle)
	window.clearTimeout(this._animationHandle);
	this._isShown=false;
	this._isOpening=false;
	if(document&&document.body) {
		document.body.removeChild(this._modalAnimationMask);
		document.body.removeChild(this._modalMask);  //Mask Remove
		Pa_Frame_Mask.Remove();
		this._modalClose.onclick=null;
		this._modalTitle.onmousedown=null;
		this._modalResize.onmousedown=null;
		this._modal=null;
		this._modalTitle=null;
		this._modalClose=null;
		this._modalAnimationMask=null;
		this._modalMask=null;
		this._modalIframe=null;
		this._modalResize=null;
		this._modalFooter=null;
		this._modalContent=null;
	}
	this._initialized=false;
}}

Pa_Modal._animate=function(targetValue,nextValue,step,acceleration)
{
if(this._animationHandle)
window.clearTimeout(this._animationHandle);
if(!this._isOpening)
return;
var currValue=parseInt(this._modal.style.top,10);
if((step<0&&currValue<targetValue)||(step>0&&currValue>targetValue)||Math.abs(step)<1) {
	this._modal.style.top=targetValue+'px';
	this._modal.style.position='static';
	this._modalAnimationMask.style.overflow='visible';
	this._animationHandle=null;
	if(!this._isResizing&&!this._isDragging)
	this._modalIframe.style.display='block';
	this._isOpening=false;
	this._lastWindowInfo=Pa_Common.GetWindowInfo();
	this._checkForScrollResizeHandle=window.setTimeout(new Function('window.'+this._variableName+'._checkForScrollResize();'),999);
} else {
	this._modal.style.top=nextValue+'px';
	nextValue=nextValue+step;
	if(step>0&&nextValue>targetValue)
	nextValue=targetValue;
	else if(step<0&&nextValue<targetValue)
	nextValue=targetValue;
	step=step*acceleration;
	this._animationHandle=window.setTimeout(new Function(this._variableName+'._animate('+targetValue+','+nextValue+','+step+','+acceleration+');'),19);
}}

Pa_Modal._startDrag=function(event)
{
if(!this._initialized)
this._initialize();
if(!event)
event=window.event;
this._moveModalInfo=new Object();
this._moveModalInfo.StartMouseX=event.pageX?event.pageX:event.screenX;
this._moveModalInfo.StartMouseY=event.pageY?event.pageY:event.screenY;
this._moveModalInfo.StartModalX=this._lastModalInfo.X;
this._moveModalInfo.StartModalY=this._lastModalInfo.Y;
this._moveModalInfo.Button=event.button;
document.onmouseup=new Function('event','window.'+this._variableName+'._endDrag(event); return false;');
document.onmousemove=new Function('event','window.'+this._variableName+'._drag(event); return false;');
this._modalIframe.style.display='none';
this._isDragging=true;
}

Pa_Modal._endDrag=function(event)
{
if(!this._initialized)
this._initialize();
this._isDragging=false;
this._moveModalInfo=null;
document.onmouseup=null;
document.onmousemove=null;
this._modalIframe.style.display='block';
}

Pa_Modal._drag=function(event)
{
if(!this._initialized)
this._initialize();
if(!event)
event=window.event;
if(event.button!=this._moveModalInfo.Button) {
	this._endDrag(event);
	return;
}
var eventX=typeof(event.pageX)!='undefined'?event.pageX:event.screenX;
var eventY=typeof(event.pageY)!='undefined'?event.pageY:event.screenY;
var xChange=eventX-this._moveModalInfo.StartMouseX;
var yChange=eventY-this._moveModalInfo.StartMouseY;
this.Open(null,this._lastModalInfo.Width,this._lastModalInfo.Height,this._lastModalInfo.OnCloseFunction,this._moveModalInfo.StartModalX+xChange,this._moveModalInfo.StartModalY+yChange,true);
}

Pa_Modal._startResize=function(event)
{
if(!this._initialized)
this._initialize();
if(!event)
event=window.event;
this._resizeModalInfo=new Object();
this._resizeModalInfo.StartMouseX=event.pageX?event.pageX:event.screenX;
this._resizeModalInfo.StartMouseY=event.pageY?event.pageY:event.screenY;
this._resizeModalInfo.StartModalWidth=this._lastModalInfo.Width;
this._resizeModalInfo.StartModalHeight=this._lastModalInfo.Height;
this._resizeModalInfo.Button=event.button;
document.onmouseup=new Function('event','window.'+this._variableName+'._endResize(event); return false;');
document.onmousemove=new Function('event','window.'+this._variableName+'._resize(event); return false;');
this._modalIframe.style.display='none';
this._isResizing=true;
}

Pa_Modal._endResize=function(event)
{
if(!this._initialized)
this._initialize();this._isResizing=false;this._resizeModalInfo=null;document.onmouseup=null;document.onmousemove=null;this._modalIframe.style.display='block';
}

Pa_Modal._resize=function(event)
{
if(!this._initialized)
this._initialize();
if(!event)
event=window.event;
if(event.button!=this._resizeModalInfo.Button) {this._endResize(event);return;}
var eventX=typeof(event.pageX)!='undefined'?event.pageX:event.screenX;var eventY=typeof(event.pageY)!='undefined'?event.pageY:event.screenY;var xChange=eventX-this._resizeModalInfo.StartMouseX;var yChange=eventY-this._resizeModalInfo.StartMouseY;this.Open(null,this._resizeModalInfo.StartModalWidth+xChange,this._resizeModalInfo.StartModalHeight+yChange,this._lastModalInfo.OnCloseFunction,this._lastModalInfo.X,this._lastModalInfo.Y,true);
}

var Pa_Frame_Mask=new Object();
Pa_Frame_Mask._objects=null;

Pa_Frame_Mask.Init=function() 
{
if (!(window.top && window.top.frames)) return;
var subFrames=Pa_Common.getFrames(window.top);
if (subFrames==null) return;
this._objects=new Array();
var index=0;
var doc = null;
for (var i=0;i<subFrames.length;i++) {
	try{
		if (subFrames[i]==window) continue;
		var doc=subFrames[i].document;
		this._objects[index]=new Object();
		this._objects[index]._win=subFrames[i];
		this._objects[index]._mask=doc.createElement('div');  //Mask Create
		this._objects[index]._mask.style.width='auto';
		this._objects[index]._mask.style.height='auto';
		this._objects[index]._mask.style.position='absolute';
		this._objects[index]._mask.style.display='none';

		var mm=this._objects[index]._mask;
		if(Pa_Modal.WindowMaskCssClasses.length>0) {
			mm.className=Pa_Modal.WindowMaskCssClasses[0];
			for(var j=1;j<Pa_Modal.WindowMaskCssClasses.length;j++) {
				mm.appendChild(document.createElement('div'));
				mm=mm.childNodes[0];
				mm.className=this.WindowMaskCssClasses[j];
				mm.style.width='auto';
				mm.style.height='auto';
			}
		}
		this._objects[index]._mask.className=Pa_Modal.WindowMaskCssClasses[0];
		doc.body.appendChild(this._objects[index]._mask);
		index+=1;
	}catch(e){
	}
}}

Pa_Frame_Mask.Show=function() 
{
if (this._objects==null) return;
for (var i=0;i<this._objects.length;i++) {
	var windowInfo=Pa_Common.GetWindowInfo(this._objects[i]._win);
	this._objects[i]._mask.style.position='absolute';   //Mask Attribute
	this._objects[i]._mask.style.display='block';
	this._objects[i]._mask.style.zIndex=100;
	this._objects[i]._mask.style.visibility='visible';
	this._objects[i]._mask.style.left='0px';  //Mask Attribute
	this._objects[i]._mask.style.top='0px';
	this._objects[i]._mask.style.width=windowInfo.ContentWidth+'px';
	this._objects[i]._mask.style.height=windowInfo.ContentHeight+'px';
}}

Pa_Frame_Mask.Close=function() 
{
if (this._objects==null) return;
for (var i=0;i<this._objects.length;i++) {
	this._objects[i]._mask.style.position='absolute';  //Mask Close
	this._objects[i]._mask.style.display='none';
}
}

Pa_Frame_Mask.Remove=function() 
{
if (this._objects==null) return;
for (var i=0;i<this._objects.length;i++) {
	this._objects[i]._win.document.body.removeChild(this._objects[i]._mask);  //Mask Remove
}
this._objects=null;
}

Pa_Modal.Configure('/app_inc/pingan/v20/blank.html',['pa_modal'],['pa_modal_title'],['pa_modal_close'],['pa_modal_content'],['pa_modal_footer'],['pa_modal_resize'],['pa_modal_mask'],100);