//给 text添加提示
function remind(errorMsg,hintMsg,remindStr){
	try{
		if(document.getElementById(errorMsg)){
			document.getElementById(errorMsg).className='';
			document.getElementById(errorMsg).innerText='';
		}
	}catch(e){	
	} 
	document.getElementById(hintMsg).style.display='';
	document.getElementById(hintMsg).className='HintMsg';
	document.getElementById(hintMsg).innerText=remindStr;
}
//删除提示
function delRemind(errorMsg,hintMsg){
	document.getElementById(hintMsg).className='';
	document.getElementById(hintMsg).innerText='';
}

//给 text添加提示
function showPromptInfo(errorMsg,hintMsg,promptInfo){
	document.getElementById(errorMsg).style.display='none';
	document.getElementById(errorMsg).innerText='';
	document.getElementById(hintMsg).innerText=promptInfo;
}

//清除错误信息
function clearErrorInfo(errorMsg){
	document.getElementById(errorMsg).style.display='none';
	document.getElementById(errorMsg).innerText='';
}

//判断是不是字符和数字
function isCharNum(s) {
	var matches = /^[0-9a-zA-Z]*$/; 
	return (matches.test(s));
}

function isBlank(s) 
{
	if (s == null) 
		return true; 
	return (s.trim().length == 0); 
}


//校验证件号码
function showErrorInfoForIdNo(errorMsg,hintMsg){
	
	var certificateTypeForModifyPWD=document.getElementById("certificateTypeForModifyPWD").value;
	var idNo=document.getElementById("idNo").value;
	if(isBlank(idNo)){
		document.getElementById(hintMsg).innerText='';
		return;
	}
	if(certificateTypeForModifyPWD==1&&idNo.trim().length!=15&&idNo.trim().length!=18)
	{
			document.getElementById(errorMsg).style.display='';
			document.getElementById(errorMsg).innerText='身份证号码位数不正确';		
	}else if(!isCharNum(idNo)){
			document.getElementById(errorMsg).style.display='';
			document.getElementById(errorMsg).innerText='证件号码格式不正确';
	}else{
			document.getElementById(errorMsg).style.display='none';
			document.getElementById(errorMsg).innerText='';			
	}
	document.getElementById(hintMsg).innerText='';
}

//校验信用卡号
function showErrorInfoForCardNo(errorMsg,hintMsg){
	
	var cardNo=document.getElementById("cardNo").value;
	if(isBlank(cardNo)){
		document.getElementById(hintMsg).innerText='';
		return;
	}
	if(cardNo.length<16){
	
		document.getElementById(errorMsg).style.display='';	
		document.getElementById(errorMsg).innerText='卡号位数不正确';
	}else{
		document.getElementById(errorMsg).style.display='none';	
		document.getElementById(errorMsg).innerText='';				
	}
	document.getElementById(hintMsg).innerText='';
}

//校验有效期
function showErrorInfoForExpireDate(errorMsg,id){
	
	var expireDate=document.getElementById(id).value;
	if(isBlank(expireDate)){
		return;
	}
	if(expireDate.length<2){
		document.getElementById('monthErrorId').style.display='';	
		document.getElementById(errorMsg).style.display='';	
		document.getElementById(errorMsg).innerText='有效期位数不正确';
	}else{
		document.getElementById(errorMsg).style.display='none';	
		document.getElementById(errorMsg).innerText='';
		document.getElementById('monthErrorId').style.display='none';	
	}
}

//校验cvv2
function showErrorInfoForLastThreeNum(errorMsg,id){
	
	var lastThreeNum=document.getElementById(id).value;
	if(isBlank(lastThreeNum)){
		return;
	}
	if(lastThreeNum.length!=3){
	
		document.getElementById(errorMsg).style.display='';	
		document.getElementById(errorMsg).innerText='卡背面签名栏末三位数字位数不正确';
	}else{
		document.getElementById(errorMsg).style.display='none';	
		document.getElementById(errorMsg).innerText='';
	}
}

//校验动态密码
function showErrorInfoForDynamicPwd(errorMsg,hintMsg){
	
	var dynamicPwd=document.getElementById("dynamicPwd").value;
	if(isBlank(dynamicPwd)){	
		document.getElementById(errorMsg).style.display='';	
		document.getElementById(errorMsg).innerText='请输入您的动态密码！';
	}else if(dynamicPwd.length!=6){	
		document.getElementById(errorMsg).style.display='';	
		document.getElementById(errorMsg).innerText='动态密码为六位数字，请重新输入！';
	}else{
		document.getElementById(errorMsg).style.display='none';
		document.getElementById(errorMsg).innerText='';	
	}
	document.getElementById(hintMsg).innerText='';
}



var isClose=false; 
//关闭浏览器时，向服务器发送"退出系统"请求，清除服务器端的session 
var http_request=false;   
function send_request(url){
 http_request = false;    
 if(window.XMLHttpRequest){
       http_request=new XMLHttpRequest();
       if(http_request.overrideMimeType){
           http_request.overrideMimeType("text/html");
       }
    }
    else if(window.ActiveXObject){
       try{
           http_request=new ActiveXObject("Xsxml2.XMLHTTP");
       }
       catch(e){
           try{ http_request=new ActiveXObject("Microsoft.XMLHTTP"); }
           catch(e){ } 
       }
    }
    if(!http_request){
        window.alert("不能创建XMLHttpRequest对象实例");
        return false;
    }     
    http_request.open("GET",url,true);
    http_request.send(null);
} 

/**
 * name 请求参数url
 * 获取url链接的参数值
 */
var getQueryString =function(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
