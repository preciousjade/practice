	function iCookie(){}
	iCookie.setCookie = setCookie;
	iCookie.getCookie = getCookie;
	iCookie.getParam = getParam;
	iCookie.setCookieCury = setCookieCury;
	//����cookie
	function setCookie(name, value, second) {
		if(second != -1){
			var exp = new Date();
			exp.setSeconds(exp.getSeconds() + second, 0);//����cookie������
			document.cookie = name + "=" + escape(value) + "; expires=" + exp.toUTCString() + "; path=/;domain=" + location.host.substring(location.host.indexOf(".pingan.com")); //����cookie
		} else {
			document.cookie = name + "=" + escape(value) + "; path=/;domain=" + location.host.substring(location.host.indexOf(".pingan.com")); //����cookie;//����cookie
		}
	}
	//��ȡcookie�е�ֵ
	function getCookie(name) {
	    var cookieStr = document.cookie;
	    if(cookieStr.length > 0) {
	        var cookieArr = cookieStr.split(";"); //��cookie��Ϣת��������
	        for (var i=0; i<cookieArr.length; i++) {
	            var cookieVal = cookieArr[i].split("="); //��ÿһ��cookie(cookie����ֵ)Ҳת��������
	            if(cookieVal[0].replace(/\s/,"") == name) {
	                return unescape(cookieVal[1]); //������Ҫ��ȡ��cookieֵ
	            }
	        }
	    }
	}

	function getParam(name){
		var search = document.location.search;
		var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
		var matcher = pattern.exec(search);
		var items = null;
		if(null != matcher){
				try{
						items = decodeURIComponent(decodeURIComponent(matcher[1]));
				}catch(e){
						try{
								items = decodeURIComponent(matcher[1]);
						}catch(e){
								items = matcher[1];
						}
				}
		}
		return items;
	}

	function setCookieCury(name,defVal,second){
		var val = getParam(name) || "";
		if(val){
			setCookie(name, val ,second);
		}else{
			setCookie(name, defVal,second);
		}
	}
