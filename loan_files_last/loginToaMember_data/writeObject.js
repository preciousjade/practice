/*
var WIN_32_ACTIVEX_VERSION = 2005016001;
var WIN_64_ACTIVEX_VERSION = 2005016001;
var WIN_PLUGIN_VERSION = 2005016001;
var WIN_SETUP_PATH = "./setup/TOAEncSetup2.5.16.1.exe";
var WIN_32_CAB_PATH = "set/iSecurityPAB.CAB#version=2,5,16,1";
var WIN_64_CAB_PATH = "set/iSecurityPAB_x64.CAB#version=2,5,16,1";

var MAC_PLUGIN_VERSION = 2004024000;
var MAC_SETUP_PATH = "./setup/iSecurityPAB.dmg";
*/
var WIN_32_ACTIVEX_VERSION = 2004024000;                // Windows系统下
// 32位控件版本号，例如2.4.1.3版本号则为2004001003
var WIN_64_ACTIVEX_VERSION = 2004024000;                // Windows系统下
// 64位控件版本号，例如2.4.1.3版本号则为2004001003
var WIN_PLUGIN_VERSION = 2004024000;                    // Windows系统下插件版本号，例如2.4.1.3版本号则为2004001003
var MAC_PLUGIN_VERSION = 2004024000;                    // Windows系统下插件版本号，例如2.4.1.3版本号则为2004001003
var WIN_SETUP_PATH = "./setup/iSecurityPAB.exe";          // Windows系统下安装程序下载路径
var MAC_SETUP_PATH = "./setup/iSecurityPAB.dmg";								// Mac OS系统下安装程序下载路径
var WIN_32_CAB_PATH = "set/iSecurityPAB.CAB#version=2,4,24,0";
var WIN_64_CAB_PATH = "set/iSecurityPAB_x64.CAB#version=2,4,24,0";

var codeBaseFile = "";
var LocalObjVersion="";
var isInistall = false;
var _app = navigator.appName;
//是否支持的系统
var isSupportOS = true;
// 控件
var PassCtrlClsid = "clsid:15453A26-6E82-4A6A-9B61-019AC7240420";
var EditCtrlClsid = "clsid:0545B048-DD5F-4064-87DD-06D5FBE480C4";
var UtilCtrlClsid = "clsid:18ACDA98-568C-4DC0-9586-2F8D0A026648";
var CtlName = "POWERENTERPAB.PowerPasswordXPABCtrl.1";

// 插件
var MIME = "application/x-vnd-sa-isecurity-pab";
var PluginDescription = "SA-iSecurity Plug-in for PAB";

// 控件默认属性
function powerConfig(args) {
    var defaults = { 
       "width":150,
       "height":22,
       "maxLength":16,
       "minLength":6,
       "maskChar":"*",
       "backColor":"#FFFFFF",
       "textColor":"#000000",
       "borderColor":"#FFFFFF",
       "accepts":"[:graph:]+",
       "caption":"平安集团",
       "captionColor":"#87011f",
       "captionFont":"",
       "captionSize":0,
       "captionBold":"true",
       "lang":"zh_CN",
       "softKeyboard":"false"
    };
    for (var p in args)
       if (args[p] != null) defaults[p] = args[p];
    return defaults;
}

function writePluginObject(oid, clsid, cfg) {
    document.write('<object id="' + oid + '" type="' + clsid
       + '" width="' + cfg.width + '" height="' + cfg.height
       + '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px">');
    for (var name in cfg)
       document.write('<param name="' + name + '" value="' + cfg[name] + '">');
    document.write('</object>');
};

function writeObject(oid, clsid, cfg) {
    document.write('<object id="' + oid + '" codebase="'+codeBaseFile+'" classid="' + clsid     
           + '" width="' + cfg.width + '" height="' + cfg.height  + '">');
    for (var name in cfg)
       document.write('<param name="' + name + '" value="' + cfg[name] + '">');
    document.write('</object>');
};

function writeEditObject(oid, cfg) {
    if (!oid || typeof(oid) != "string") {
       alert("writePassObj Failed: oid are required!");
    } else {
		setPEXSetupUrl(oid);
		if(isInistall)
		{
			if (isIE() || navigator.userAgent.indexOf("Trident")>0)
			{
				writeObject(oid, EditCtrlClsid, powerConfig(cfg));
			}
			else
			{
				writePluginObject(oid, MIME, powerConfig(cfg));
			}
		}
    }
};

function writePassObject(oid, cfg) {
    if (!oid || typeof(oid) != "string") {
       alert("writePassObj Failed: oid are required!");
    } else {
		setPEXSetupUrl(oid);
		if(isInistall)
		{
			if (isIE() || navigator.userAgent.indexOf("Trident")>0)
			{
				writeObject(oid, PassCtrlClsid, powerConfig(cfg));
			}
			else
			{
				writePluginObject(oid, MIME, powerConfig(cfg));
			}
		}
	}
};

function writeUtilObject(oid, cfg) {
    if (!oid || typeof(oid) != "string") {
       alert("writePassObj Failed: oid are required!");
    } else {
       if (isIE() || navigator.userAgent.indexOf("Trident")>0)
       {
           if((navigator.platform == "Win64" || navigator.cpuClass == "x64"))
              codeBaseFile = WIN_64_CAB_PATH;
           else
              codeBaseFile = WIN_32_CAB_PATH;
           
           writeObject(oid, UtilCtrlClsid, powerConfig(cfg));
       }
       else
       {
           writePluginObject(oid, MIME, powerConfig(cfg));
       }
    }
};

function getiSecurityMeasure(id, spanId)
{
    try 
    {
       var powerobj = document.getElementById(id);
       var nresult = powerobj.verify();
       if(nresult < 0)
       {          
           var error;
           if(nresult == -1)
           {
              error = "内容不能为空";
           }
           else if(nresult == -2)
           {
              error = "输入长度不足";
           }
           else if(nresult == -3)
           {
              error = "输入内容不合法";
           }
           else if(nresult == -6)
           {
              error = "输入内容不符合contentType属性控制";
           }
           else
           {
              error = powerobj.lastError(); 
           }
           PEGetElement(spanId).innerHTML = error;
           return null;
       }   
       
       value = powerobj.getMeasureValue();
       if(value=="")
       {
           PEGetElement(spanId).innerHTML= powerobj.lastError(); 
           return null;
       }
       else
       {
           return value;
       }
    }
    catch(e)
    {
       PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！";
    }
    return null;
}

function getPassInput(id, ts, spanId, massage, encryptType, AlgorithmCode, ApplicationPublicKey, EncryptionPublicKey)
{
    try
    {
       var powerobj = document.getElementById(id);
       
       powerobj.setTimestamp(ts);
       powerobj.setAlgorithmCode(AlgorithmCode);
       
       if(encryptType == 1){
           powerobj.publicKeyModulus(ApplicationPublicKey);
    	   //powerobj.publicKeyBlob(ApplicationPublicKey);
           //powerobj.publicKeyDER(EncryptionPublicKey);
       }else if(encryptType == 2){
           powerobj.publicKeyModulus(ApplicationPublicKey+":"+EncryptionPublicKey);
           //powerobj.publicKeyBlob(ApplicationPublicKey+":"+EncryptionPublicKey);
           //powerobj.publicKeyDER(ApplicationPublicKey+":"+EncryptionPublicKey);
       }else if(encryptType == 3){
           powerobj.publicKeyModulus(EncryptionPublicKey);
       }else if(encryptType == 4){
           powerobj.publicKeyDER(EncryptionPublicKey);
       }
       
       var nresult = powerobj.verify();
       if(nresult < 0)
       {
           var error;
           if(nresult == -1)
           {
              showError(massage,spanId);
           }
           else if(nresult == -2)
           {
              showError("一账通密码输入长度不足。",spanId);
           }
           else if(nresult == -3)
           {
              showError("一账通密码输入内容不合法。",spanId);
           }
           else if(nresult == -6)
           {
              showError("一账通密码输入内容不符合contentType属性控制",spanId);
           }
           else
           {
              error = powerobj.lastError();
              showError(massage +error ,spanId);
           }
           return null;
       }

       if(encryptType == 1){
           value = powerobj.getValue();
       }else if(encryptType == 2){
           value = powerobj.getPinValue();
       }else if(encryptType == 3 || encryptType == 4){
           value = powerobj.getPinValueForHSM();
       }
       
       if(value=="")
       {
         showError(massage,spanId); 
         return null;
       }
       else
       {
           return value;
       }
    }
    catch(e)
    {
       //PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！:"+e;
       showError("控件尚未安装，请下载并安装控件！" ,spanId);
    }
    return null;
}

function getEditInput(id, ts, spanId, massage, ApplicationPublicKey) 
{
    try 
    {
       var powerobj = document.getElementById(id);
       if((String(navigator.userAgent).indexOf("iPhone") > -1) || (String(navigator.userAgent).indexOf("iPad") > -1) || (String(navigator.userAgent).indexOf("Android") > -1))
	   {
    	   var iosValue = powerobj.value;
    	   if(iosValue.length == 0)
    	   {
    		   PEGetElement(spanId).innerHTML = massage +"内容不能为空";
    	   }
    	   return iosValue;
	   }
       powerobj.setTimestamp(ts);
       powerobj.publicKeyBlob(ApplicationPublicKey);
       var nresult = powerobj.verify();
       if(nresult < 0)
       {          
           var error;
           if(nresult == -1)
           {
              error = "内容不能为空";
           }
           else if(nresult == -2)
           {
              error = "输入长度不足";
           }
           else if(nresult == -3)
           {
              error = "输入内容不合法";
           }
           else
           {
              error = powerobj.lastError(); 
           }
           PEGetElement(spanId).innerHTML = massage +error;
           return null;
       }   
              
       value = powerobj.getValue();
       if(value=="")
       {
           PEGetElement(spanId).innerHTML= massage+powerobj.lastError(); 
           return null;
       }
       else
       {
           return value;
       }
    }
    catch(e)
    {
       PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！";
    }
    return null;
}

function getMFMInput(id, ts, spanId, massage, ApplicationPublicKey) 
{
    try 
    {
       var powerobj = document.getElementById(id); 
       if((String(navigator.userAgent).indexOf("iPhone") > -1) || (String(navigator.userAgent).indexOf("iPad") > -1) || (String(navigator.userAgent).indexOf("Android") > -1))
	   {
    	   return "Can not obtain the MFM.";
	   }
       powerobj.setTimestamp(ts);
       powerobj.publicKeyBlob(ApplicationPublicKey);
       value = powerobj.getMFM();
       if(value=="")
       {
           PEGetElement(spanId).innerHTML= massage + powerobj.lastError(); 
           return null;
       }
       else
       {
           return value;
       }
    }
    catch(e)
    {
       PEGetElement(spanId).innerHTML= massage + e.message;
    }
    return null;
}

function PEGetElement(id)
{
    return  window.document.getElementById(id);
}

function setPEXSetupUrl(oid)
{
    var DownloadPath = getDownLoadPath();
    var ObjVersion = getObjVersion();
    
    if(isRegisterediSecurity()==false){
       if((navigator.platform == "Win32") || 
          (navigator.platform == "Windows") || 
          (navigator.platform == "Win64") ||
          (navigator.platform == "Mac68K") ||
          (navigator.platform == "MacPPC") ||
          (navigator.platform == "Macintosh") ||
          (navigator.platform == "MacIntel")){
           document.write('<div id="x1" class="download_x"></div>');
       }else{
           //document.write('<a href="#" class="download_install">暂不支持此系统</a>');
           isSupportOS = false;
       }
       isInistall = false;
    }else{
       var LocalObjVersion = getLocalObjVersion();
       if(LocalObjVersion < ObjVersion){
           //document.write('<a href="'+DownloadPath+'" class="download_install">点击此处更新控件</a>');
           document.write('<div id="x1" class="download_x"></div>');
           isInistall = false;
       }else{
           isInistall = true;
       }
    }
}

function isRegisterediSecurity(){
    try{
       if (isIE() || navigator.userAgent.indexOf("Trident")>0){
           new ActiveXObject(CtlName);
       }else{
           var powerEnterPlugin = navigator.plugins[PluginDescription];
           if(powerEnterPlugin == null)
              return false;
       }
    }catch(e){
       return false;   
    }
    return true;
}

function getDownLoadPath()
{
	if((navigator.platform == "Win64") || (navigator.cpuClass == "x64") || (navigator.platform == "Win32") || (navigator.platform == "Windows"))
		return WIN_SETUP_PATH;				//Windows OS
	else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel"))
		return MAC_SETUP_PATH;		    	//MAC OS

    return WIN_SETUP_PATH; 
}

function getObjVersion()
{
    if((navigator.platform == "Win64" || navigator.cpuClass == "x64")){
       
       if (isIE() || navigator.userAgent.indexOf("Trident")>0)
       {
           return WIN_64_ACTIVEX_VERSION;         // Windows系统下64位控件版本
       }
       else
       {
           return WIN_PLUGIN_VERSION;              // Windows系统下插件版本
       }
    }else if((navigator.platform == "Win32") || (navigator.platform == "Windows")){
    
       if (isIE() || navigator.userAgent.indexOf("Trident")>0)
       {
           return WIN_32_ACTIVEX_VERSION;         // Windows系统下32位控件版本
       }
       else
       {
           return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
       }
    }else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")){
		ObjVersion = MAC_PLUGIN_VERSION;		  // Mac系统下插件版本
    }
    return "";
}

writeUtilObject("versionObj",{"width":1,"height":1});

function getLocalObjVersion()
{
	if(LocalObjVersion == "")
    {
       try
       {
    	   LocalObjVersion = PEGetElement("versionObj").getVersion();
       }
       catch(e)
       {
    	   
       }
    }
    return LocalObjVersion;
}
function isIE(){
	if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0){
		return true;
	}
	return false;
}