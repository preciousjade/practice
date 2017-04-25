function createCookie(a, b, c) {
	if (c) {
		var d = new Date;
		d.setTime(d.getTime() + 1e3 * 60 * 60 * 24 * c);
		var e = "; expires=" + d.toGMTString()
	} else var e = "";
	var f = document.domain.indexOf("pingan.com.cn") > -1 ? "pingan.com.cn": "pingan.com";
	document.cookie = a + "=" + encodeURI(b) + e + "; path=/;domain=" + f
}
function readCookie(a) {
	for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
		for (var e = c[d];
		" " == e.charAt(0);) e = e.substring(1, e.length);
		if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
	}
	return null
}
function eraseCookie(a) {
	createCookie(a, "", -1)
}
function iw_click() {
	var a = location.href;
	if (a.indexOf("inner_media") > 0) {
		var b = a.indexOf("inner_media") + "inner_media".length + 1;
		createCookie("inner_media", decodeURI(a.substring(b)))
	} else if (a.indexOf("inner_entry") > 0) {
		var c = a.indexOf("inner_entry") + "inner_entry".length + 1;
		createCookie("inner_entry", decodeURI(a.substring(c)))
	}
	var d = new Array;
	if (window.attachEvent) {
		d = document.getElementsByTagName("a");
		for (var e = 0; e < d.length; e++) {
			var f = d[e].getAttribute("otype"); ("entry" == f || "menu" == f || "adtext" == f) && (d[e].detachEvent("onclick", iw_Documentevent), d[e].attachEvent("onclick", iw_Documentevent))
		}
	}
	if (window.addEventListener) {
		d = document.getElementsByTagName("a");
		var e = 0;
		for (e = 0; e < d.length; e++) {
			var f = d[e].getAttribute("otype"); ("entry" == f || "menu" == f || "adtext" == f) && d[e].addEventListener("click", iw_Documentevent, !1)
		}
	}
}
function iw_IsValued(a, b) {
	var c = b.toLowerCase(),
	d = a.attributes;
	return d && d[b] ? d[b].nodeValue && "" != d[b].nodeValue || d[b].value && "" != d[b].value: d && d[c] ? d[c].nodeValue && "" != d[c].nodeValue || d[c].value && "" != d[c].value: !1
}
function iw_GetValue(a, b) {
	var c = b.toLowerCase(),
	d = a.attributes;
	return d && d[b] ? d[b].nodeValue || d[b].value || "": d && d[c] ? d[c].nodeValue || d[c].value || "": ""
}
function iw_Documentevent(a) {
	var b;
	window.addEventListener && (b = a.target),
	window.attachEvent && (b = window.event.srcElement);
	var c = window.location.href,
	d = c.replace(/^https?:\/\/[^\.]+((\.[^\.\/]+)+)\/?.*$/i, "$1"),
	e = "",
	f = iw_GetValue(b, "href");
	iw_marketing_area = "",
	iw_marketing_location = "";
	var g = "",
	h = "",
	i = "",
	j = b.tagName.toLowerCase(),
	k = "",
	l = "";
	if ( - 1 != c.indexOf("?") && (c = c.substring(0, c.indexOf("?"))), !iw_IsValued(b, "otype") && null != b.parentNode && "A" == b.parentNode.tagName && iw_IsValued(b.parentNode, "otype") ? (b = b.parentNode, j = b.tagName.toLowerCase()) : !iw_IsValued(b, "otype") && null != b.parentNode && null != b.parentNode.parentNode && "A" == b.parentNode.parentNode.tagName && iw_IsValued(b.parentNode.parentNode, "otype") && (b = b.parentNode.parentNode, j = b.tagName.toLowerCase()), i = iw_GetValue(b, "otype"), "a" == j) {
		if (i.indexOf("adtext") > -1) {
			var o,
			p,
			m = document.getElementsByTagName("A"),
			n = iw_GetValue(b, "adtextArea");
			for (o = 0, p = 0; o < m.length; o++) if (iw_GetValue(m[o], "adtextArea") == n && (p++, m[o] == b)) {
				iw_marketing_location = p;
				break
			}
		}
		if ("adtext" == i && (iw_marketing_area = iw_GetValue(b, "adtextArea"), k = c + "-" + iw_marketing_area + "-" + iw_marketing_location, createCookie("inner_media", k), iw_IsValued(b, "href") && (e = f.replace(/^https?:\/\/[^\.]+((\.[^\.\/]+)+)\/?.*$/i, "$1"), "#" != f && -1 == f.indexOf("javascript") && d.indexOf("pingan.com.cn") > 0 && d != e))) if (iw_GetValue(b, "href").indexOf("?") > 0) if (iw_GetValue(b, "href").indexOf("inner_media") > 0) {
			var q = b.attributes.href.nodeValue;
			b.attributes.href.nodeValue = q.substring(0, q.indexOf("inner_media")) + "inner_media=" + encodeURI(k)
		} else b.attributes.href.nodeValue = iw_GetValue(b, "href") + "&inner_media=" + encodeURI(k);
		else b.attributes.href.nodeValue = iw_GetValue(b, "href") + "?inner_media=" + encodeURI(k);
		if ("menu" == i) {
			var g = iw_GetValue(b, "otitle");
			if (k = c + "-" + g, createCookie("inner_media", k), iw_IsValued(b, "href") && (e = iw_GetValue(b, "href").replace(/^https?:\/\/[^\.]+((\.[^\.\/]+)+)\/?.*$/i, "$1"), "#" != f && -1 == f.indexOf("javascript") && d.indexOf("pingan.com.cn") > 0 && d != e)) if (iw_GetValue(b, "href").indexOf("?") > 0) if (iw_GetValue(b, "href").indexOf("inner_media") > 0) {
				var q = b.attributes.href.nodeValue;
				b.attributes.href.nodeValue = q.substring(0, q.indexOf("inner_media")) + "inner_media=" + encodeURI(k)
			} else b.attributes.href.nodeValue = iw_GetValue(b, "href") + "&inner_media=" + encodeURI(k);
			else b.attributes.href.nodeValue = iw_GetValue(b, "href") + "?inner_media=" + encodeURI(k)
		}
		if ("entry" == i) {
			var h = iw_GetValue(b, "otitle");
			if (l = c + "-" + h, createCookie("inner_entry", l), iw_IsValued(b, "href") && (e = iw_GetValue(b, "href").replace(/^https?:\/\/[^\.]+((\.[^\.\/]+)+)\/?.*$/i, "$1"), "#" != f && -1 == f.indexOf("javascript") && d.indexOf("pingan.com.cn") > 0 && d != e)) if (iw_GetValue(b, "href").indexOf("?") > 0) if (iw_GetValue(b, "href").indexOf("inner_entry") > 0) {
				var q = b.attributes.href.nodeValue;
				b.attributes.href.nodeValue = q.substring(0, q.indexOf("inner_entry")) + "inner_entry=" + encodeURI(l)
			} else b.attributes.href.nodeValue = iw_GetValue(b, "href") + "&inner_entry=" + encodeURI(l);
			else b.attributes.href.nodeValue = iw_GetValue(b, "href") + "?inner_entry=" + encodeURI(l)
		}
	}
}
iw_click();