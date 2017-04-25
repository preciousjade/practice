var hosts = [
'www.pingan.com',
'stock.pingan.com',
'futures.pingan.com',
'shop.pingan.com',
'one.pingan.com',
'job.pingan.com',
'bank.pingan.com',
'creditcard.pingan.com',
'money.pingan.com',
'vip.pingan.com',
'trust.pingan.com',
'health.pingan.com',
'about.pingan.com',
'invest.pingan.com',
'asset.pingan.com',
'ir.pingan.com',
'annuity.pingan.com',
'chexian.pingan.com',
'www.wanlitong.com',
'insurance.pingan.com',
'xintuo.pingan.com',
'life.pingan.com',
'baoxian.pingan.com',
'daikuan.pingan.com',
'cardmall.pingan.com',
'jiayuan.pingan.com',
'caifu.pingan.com',
'property.pingan.com',
'elife.pingan.com',
'fund.pingan.com',
'ay.pingan.com',
'club.pingan.com',
'rong.pingan.com',
'licai.pingan.com',
'txt.pingan.com',
'cfe.pingan.com.cn',
'ibank.pingan.com.cn',
'bankcdn.pingan.com.cn',
'caifu.pingan.com.cn',
'ibank.pingan.com.cn',
'bankcdn.pingan.com.cn',
'member.pingan.com.cn',
'www.pingan.com.cn',
'stock.pingan.com.cn',
'bank.pingan.com.cn',
'creditcard.pingan.com.cn',
'ay.pingan.com.cn',
'club.pingan.com.cn',
'rong.pingan.com.cn',
'licai.pingan.com.cn',
'txt.pingan.com.cn'
];

function getSdcJs()
{
	try{
		var js_url = window.location.protocol.indexOf('https:')==0?'https://pa-ssl.pingan.com/app_js/pingan/v20/iw_cookie.js':'http://www.pingan.com/app_js/pingan/v20/iw_cookie.js';
		var SDC_js=document.createElement("script");
		SDC_js.src=js_url;
		var headElem=document.getElementsByTagName("head")[0];
		headElem.appendChild(SDC_js);
	}catch(e){
	}
	
	var host = window.location.host;
	for(var i=0;i<hosts.length;i++)
	{
		// prd domail,return prd js
		if(host.indexOf(hosts[i])!=-1)
			return window.location.protocol.indexOf('https:')==0?'https://pa-ssl.pingan.com/app_js/sdc/prd/sdc9.js':'http://www.pingan.com/app_js/sdc/prd/sdc9.js';
	}
	return window.location.protocol.indexOf('https:')==0?'https://pa-ssl.pingan.com/app_js/sdc/tryout/sdc9.js':'http://www.pingan.com/app_js/sdc/tryout/sdc9.js';
}

function loadWTScript(a, b) {
	var c = document.createElement("script");
	c.type = "text/javascript",
	c.async = !0,
	c.src = a,
	dcsReady(c, b),
	document.getElementsByTagName("head")[0].appendChild(c)
}
function dcsReady(a, b) {
	a.readyState ? a.onreadystatechange = function() { ("loaded" == a.readyState || "complete" == a.readyState) && (a.onreadystatechange = null, b())
	}: a.onload = function() {
		b()
	}
}
loadWTScript(getSdcJs(), function(){ 
    if (typeof(_tag) != "undefined"){
        _tag.DCSext.platform="pinganweb";
        var s=_tag.dcsGetIdAsync();
        if(s) 
            dcsReady(s,function(){_tag.dcsCollect()});
        else
            _tag.dcsCollect();
    }
})