function dcsGetCookie(a) {
	var b = document.cookie.lastIndexOf(a + "=");
	if ( - 1 != b) {
		var c = b + a.length + 1,
		d = document.cookie.indexOf(";", c);
		return - 1 == d && (d = document.cookie.length),
		unescape(document.cookie.substring(c, d))
	}
	return null
}
function dcsGetCrumb(a, b) {
	for (var c = dcsGetCookie(a).split(":"), d = 0; d < c.length; d++) {
		var e = c[d].split("=");
		if (b == e[0]) return e[1]
	}
	return null
}
function dcsGetIdCrumb(a, b) {
	for (var c = dcsGetCookie(a), d = c.substring(0, c.indexOf(":lv=")), e = d.split("="), f = 0; f < e.length; f++) if (b == e[0]) return e[1];
	return null
}
function dcsMultiTrack() {
	for (var a = arguments, b = 0; b < a.length; b++) 0 == a[b].indexOf("WT.") && (WT[a[b].substring(3)] = a[b + 1], b++),
	0 == a[b].indexOf("DCS.") && (DCS[a[b].substring(4)] = a[b + 1], b++),
	0 == a[b].indexOf("DCSext.") && (DCSext[a[b].substring(7)] = a[b + 1], b++);
	DCS.dcsdat = (new Date).getTime(),
	dcsTag()
}
function dcsFPC(a) {
	if ("undefined" != typeof a) {
		var b = gFpc,
		c = new Date;
		c.setTime(c.getTime() + 6e4 * c.getTimezoneOffset() + 36e5 * a);
		var d = new Date(c.getTime() + 31536e7),
		e = new Date(c.getTime());
		if ( - 1 != document.cookie.indexOf(b + "=")) {
			var f = dcsGetIdCrumb(b, "id"),
			g = parseInt(dcsGetCrumb(b, "lv")),
			h = parseInt(dcsGetCrumb(b, "ss"));
			if (null == f || "null" == f || isNaN(g) || isNaN(h)) return;
			WT.co_f = f;
			var i = new Date(g);
			e.setTime(h),
			(c.getTime() > i.getTime() + 18e5 || c.getTime() > e.getTime() + 288e5) && (e.setTime(c.getTime()), WT.vt_f_s = "1"),
			(c.getDay() != i.getDay() || c.getMonth() != i.getMonth() || c.getYear() != i.getYear()) && (WT.vt_f_d = "1")
		} else {
			WT.co_f = "2";
			for (var j = c.getTime().toString(), k = 2; k <= 32 - j.length; k++) WT.co_f += Math.floor(16 * Math.random()).toString(16);
			WT.co_f += j,
			WT.vt_f = WT.vt_f_s = WT.vt_f_d = "1";
			var l = "; expires=" + d.toGMTString();
			document.cookie = b + "=" + "id=" + WT.co_f + ":lv=" + c.getTime().toString() + ":ss=" + e.getTime().toString() + l
		}
		WT.co_f = escape(WT.co_f),
		WT.vt_sid = WT.co_f + "." + e.getTime()
	}
}
function dcsVar() {
	var a = new Date;
	WT.tz = -1 * (a.getTimezoneOffset() / 60),
	WT.tz = !WT.tz || "0",
	WT.bh = a.getHours(),
	WT.ul = "Netscape" == navigator.appName ? navigator.language: navigator.userLanguage,
	"object" == typeof screen && (WT.cd = "Netscape" == navigator.appName ? screen.pixelDepth: screen.colorDepth, WT.sr = screen.width + "x" + screen.height),
	document.title && (WT.ti = dcsCode(document.title)),
	parseInt(navigator.appVersion) > 3 && ("Microsoft Internet Explorer" == navigator.appName && document.body ? WT.bs = document.body.offsetWidth + "x" + document.body.offsetHeight: "Netscape" == navigator.appName && (WT.bs = window.innerWidth + "x" + window.innerHeight)),
	WT.ad = 1,
	WT.dl = 23;
	for (var b, c = document.getElementsByTagName("A"), d = 0; d < c.length; d++) if (dcsv(c[d], "adLink")) {
		b = c[d];
		break
	}
	if (null == b) {
		c = document.getElementsByTagName("IMG");
		for (var d = 0; d < c.length; d++) if (dcsv(c[d], "adLink")) {
			b = c[d];
			break
		}
	}
	if (b && dcsv(b, "adLink")) {
		var e = dcsv(b, "adDesc");
		if (e) {
			var f = e.split(";");
			f.length > 1 && (WT.adpid = dcsCode(f[0]), WT.adDesc = dcsCode(f[1]))
		}
		WT.adLink = dcsCode(dcsv(b, "adLink")),
		WT.adareaId = dcsCode(dcsv(b, "areaId")),
		WT.adareaDesc = dcsCode(dcsv(b, "areaDesc")),
		WT.solt_id = dcsCode(dcsv(b, "solt_id")),
		WT.material_id = dcsCode(dcsv(b, "material_id")),
		"img" == b.tagName.toLowerCase() && (WT.adwxh = dcsv(b, "width") + "x" + dcsv(b, "height"))
	}
	DCS.dcsdat = a.getTime(),
	DCS.dcssip = window.location.hostname,
	DCS.dcsuri = window.location.pathname,
	window.location.search && (DCS.dcsqry = window.location.search),
	"" != window.document.referrer && "-" != window.document.referrer && ("Microsoft Internet Explorer" == navigator.appName && parseInt(navigator.appVersion) < 4 || (DCS.dcsref = dcsEscape(window.document.referrer.replace("https", "http"), I18NRE)))
}
function dcsA(a, b) {
	return "&" + a + "=" + dcsEscape(b, RE)
}
function dcsEscape(a, b) {
	if ("undefined" != typeof b) {
		var c = new String(a);
		for (var d in b) c = c.replace(b[d], d);
		return c
	}
	return escape(a)
}
function dcsCreateImage(a) {
	document.images && (gImages[n] = new Image, gImages[n].src = a, n++)
}
function dcsMeta() {
	var a;
	if (document.all ? a = document.all.tags("meta") : document.documentElement && (a = document.getElementsByTagName("meta")), "undefined" != typeof a) for (var b = 1; b <= a.length; b++) {
		var c = a.item(b - 1);
		c.name && (0 == c.name.indexOf("WT.") ? WT[c.name.substring(3)] = dcsCode(c.content) : 0 == c.name.indexOf("DCSext.") ? DCSext[c.name.substring(7)] = dcsCode(c.content) : 0 == c.name.indexOf("DCS.") && (DCS[c.name.substring(4)] = dcsCode(c.content)))
	}
}
function dcsTag(a) {
	if (DCS.dcsref && DCS.dcsref.length > 999) {
		var b = DCS.dcsref.split("?");
		DCS.dcsref = b[1] ? b[0] : ""
	}
	var c = "http" + (0 == window.location.protocol.indexOf("https:") ? "s": "") + "://" + gDomain + (a ? "/" + a: "" == gDcsId ? "": "/" + gDcsId) + "/dcs.gif?";
	for (var d in DCS) DCS[d] && (c += dcsA(d, DCS[d]));
	for (var e = ["co_f", "vt_sid", "vt_f_tlv"], f = 0; f < e.length; f++) {
		var g = e[f];
		WT[g] && (c += dcsA("WT." + g, WT[g]), delete WT[g])
	}
	for (d in WT) WT[d] && (c += dcsA("WT." + d, WT[d]));
	for (d in DCSext) DCSext[d] && (c += dcsA(d, DCSext[d]));
	c.length > 2048 && navigator.userAgent.indexOf("MSIE") >= 0 && (c = c.substring(0, 2040) + "&WT.tu=1"),
	dcsCreateImage(c)
}
function dcsv(a, b) {
	var c = b.toLowerCase(),
	d = a.attributes;
	return d && d[b] ? d[b].nodeValue || d[b].value: d && d[c] ? d[c].nodeValue || d[c].value: null
}
function dcsCode(a) {
	return /.*[\u0391-\uFFE5]+.*$/.test(a) ? dcsEscape(dcsEncode(a), I18NRE) : a
}
function dcsEncode(a) {
	return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
}
function autoclick() {
	var a = new Array;
	if (document.all) {
		a = document.getElementsByTagName("A");
		for (var b = 0; b < a.length; b++) a[b].attachEvent("onclick", dcse);
		a = document.getElementsByTagName("IMG");
		for (var b = 0; b < a.length; b++)"A" != a[b].parentNode.tagName && a[b].attachEvent("onclick", dcse)
	} else {
		a = document.getElementsByTagName("A");
		for (var b = 0; b < a.length; b++) a[b].addEventListener("click", dcse, !1);
		a = document.getElementsByTagName("IMG");
		for (var b = 0; b < a.length; b++)"A" != a[b].parentNode.tagName && a[b].addEventListener("click", dcse, !1)
	}
}
function dcse(a) {
	var b;
	b = document.all ? window.event.srcElement: a.target;
	var c = b.tagName.toLowerCase();
	WT.ac = 1,
	WT.ad = "";
	var d = dcsv(b, "adDesc");
	if (d) {
		var e = d.split(";");
		e.length > 1 && (WT.adpid = dcsCode(e[0]), WT.adDesc = dcsCode(e[1]))
	}
	WT.adLink = dcsCode(dcsv(b, "adLink")),
	WT.adareaId = dcsCode(dcsv(b, "areaId")),
	WT.adareaDesc = dcsCode(dcsv(b, "areaDesc")),
	WT.solt_id = dcsCode(dcsv(b, "solt_id")),
	WT.material_id = dcsCode(dcsv(b, "material_id")),
	"img" == c && (WT.adwxh = dcsv(b, "width") + "x" + dcsv(b, "height")),
	dcsMultiTrack()
}
var gTimeZone = 8,
gFpc = "WT-FPC",
gImages = new Array,
n = 0,
DCS = new Object,
WT = new Object,
DCSext = new Object,
gDomain = "sdc.pingan.com",
gDcsId = "dcs0gg4qdj0ujd5saawfu6soe_7i3j";
if (window.RegExp) var RE = {
	"%09": /\t/g,
	"%20": / /g,
	"%23": /\#/g,
	"%26": /\&/g,
	"%2B": /\+/g,
	"%3F": /\?/g,
	"%5C": /\\/g,
	"%22": /\"/g,
	"%7F": /\x7F/g,
	"%A0": /\xA0/g
},
I18NRE = {
	"%25": /\%/g
};
dcsVar(),
dcsMeta(),
dcsFPC(gTimeZone),
dcsTag("dcsg5gvo9r53qvbwvndi8vt5h_8h7u"),
autoclick();