	function iCookie(){}
	iCookie.setCookie = setCookie;
	iCookie.getCookie = getCookie;
	iCookie.getParam = getParam;
	iCookie.setCookieCury = setCookieCury;
	//创建cookie
	function setCookie(name, value, second) {
		if(second != -1){
			var exp = new Date();
			exp.setSeconds(exp.getSeconds() + second, 0);//设置cookie的期限
			document.cookie = name + "=" + escape(value) + "; expires=" + exp.toUTCString() + "; path=/;domain=" + location.host.substring(location.host.indexOf(".pingan.com")); //创建cookie
		} else {
			document.cookie = name + "=" + escape(value) + "; path=/;domain=" + location.host.substring(location.host.indexOf(".pingan.com")); //创建cookie;//创建cookie
		}
	}
	//提取cookie中的值
	function getCookie(name) {
	    var cookieStr = document.cookie;
	    if(cookieStr.length > 0) {
	        var cookieArr = cookieStr.split(";"); //将cookie信息转换成数组
	        for (var i=0; i<cookieArr.length; i++) {
	            var cookieVal = cookieArr[i].split("="); //将每一组cookie(cookie名和值)也转换成数组
	            if(cookieVal[0].replace(/\s/,"") == name) {
	                return unescape(cookieVal[1]); //返回需要提取的cookie值
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
