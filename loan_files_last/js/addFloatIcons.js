function getFloatIcons(target, iconArray,productType) {
	var productId = $("#productId").val();
	var chaoshiUrl=$("#emallJijinUrl").val();
	var productType=productType;
	var iconAll_Array = [ 'wx', 'yy', 'fk', 'sc', 'db','kf' ];//all icon keys
	var iconDflt_Array = [ 'wx', 'fk', 'db' ];//all icon keys
	iconArray = iconArray ? iconArray : iconDflt_Array;//needable keys
	var a_l = iconArray.length || iconDflt_Array.length;//needable key length
	var htmls = '<div class="float_icon">'
			+ '<a class="kf" href="http://eim.pingan.com.cn/web/webtalk?encryptStr=&businessType=FIN_SHOP&storeId=&subbiztype="><p style="">在线客服</p></a>'
			+ '<a class="qrcode wx">'
			+ '<i class=""></i>'
			+ '<span style="border:solid 1px #f60;width:120px;height:140px;">'
			+ '<img src="http://chaoshi.pingan.com/app_css/pingan/v40/images/2wm_new.png" style="padding-top:4px;">	'
			+ '</span>'
			+ '<p style="">官方微信</p>'
			+ '</a>'
			+ '<div class="contact_us yy " href="javascript:void(0);">'
			+ '<i class=""></i>'
			+ '<p style="">快速预约</p>'
			+ '</div>'
			+ '<a class="feedback_cs fk" href=" http://www.pingan.com/homepage/contact/contact.jsp " target="_blank">'
			+ '<i class=""></i>'
			+ '<p style="">意见反馈</p>'
			+ '</a>'
			+ '<a class="unFavorite sc" href="javascript:void(0);">'
			+ '<i class=""></i>'
			+ '<p style="">收藏产品</p>'
			+ '<span style="width:145px;height:40px;padding-top:3px;color:#505050;">'
			+ '<font>收藏感兴趣的产品</font><br>'
			+ '<font style="color:#f60;line-height:20px;">我知道了	</font>'
			+ '</span>'
			+ '</a>'
			+ '<a class="favorite unsc" href="javascript:void(0);">'
			+ '<i class=""></i>' + '<p style="">取消收藏</p>' + '</a>'
			+ '<a class="rt_top db" href="javascript:window.scrollTo(0,0);">'
			+ '<i class=""></i>' + '<p style="">返回顶部</p>' + '</a>		'
			+ '</div> ';

	// justify which icon show and which hide
	function showArrayIcon() {
		var i = 0, str = iconAll_Array.join("|");
		for (; i < a_l; i++) {
			iconArray[i] != 'db' && str.indexOf(iconArray[i]) > -1 ? $(
					".float_icon ." + iconArray[i]).css("display", "block")
					: $(".float_icon ." + iconArray[i]).hide();
		}
	}
	//bind all needable icon event
	function dobind() {
		scBind();
		dbBind();
		yyBind();
		bindhover();
	}
	function bindhover() {
		$(".float_icon a,.float_icon div").hover(function() {
			$(this).find('span').css("display", 'block');
			$(this).find("i").hide();
			$(this).find("p").show();
		}, function() {
			$(this).find('span').hide();
			$(this).find("i").show();
			$(this).find("p").hide();
		})
	}
	//bind yuyue
	function yyBind() {
		if (iconArray.toString().indexOf("yy") < 0) {
			return false;
		} else {
			var openDiv = '<div id="backg" class="transparent_class"></div>'
					+ '<div id="lijiyuyue_div">'
					+ '<a id="close"></a>'
					+ '<input type="hidden" id="productName" value="快速预约贷款" />'
					+ '<iframe id="yuyue_iframe" src="" style="margin:0 auto;height:472px;overflow:hidden;width:606px;position:relative" scrolling="no" frameborder="0"></iframe>'
					+ '</div>';
			$("body").append(openDiv);
			$(".float_icon .yy").attr("target", "").attr("href",
					"javascript:void(0);").attr("otype", "button");
			$(".float_icon .yy")
					.unbind("click")
					.bind(
							"click",
							function() {
								$("#backg").css({
									"display" : "block",
									"height" : "1800px"
								});
								var top = ($(window).height() * 1 - $(
										'#lijiyuyue_div').height() * 1)
										/ 2
										+ $(document).scrollTop()
										* 1
										+ "px";
								$('#lijiyuyue_div').css("top", top);
								$("#lijiyuyue_div").css("display", "block");
								$("#yuyue_iframe")
										.attr(
												"src",
												daikuanHost+"/kuaisuyuyue_form.shtml?productId="
														+ $("#productId").val()
														+ "&product_name="
														+ encodeURIComponent($(
																"#productName")
																.val()));
							});
			$("#close").click(function() {
				$("#lijiyuyue_div").css("display", "none");
				$("#backg").css("display", "none");
				$("#yuyue_iframe").attr("src", "");
			});
		}

	}
	//bind 'return top' icon event
	function dbBind() {
		window.displayRetop = function() {
			if ($(document).scrollTop() == 0) {
				$(".float_icon .rt_top").hide();
			} else {
				$(".float_icon .rt_top").css("display", "block");
			}
		}
		var int = self.setInterval("displayRetop()", 1000);
	}
	//bind 'favoirite' icon event,justify if is favorite firstly
	function scBind() {
		if (iconArray.toString().indexOf("sc") < 0) {
			return false;
		}
		isBindSc();
		//if not bind ajax
		function doscbind() {
			
			$.ajax({
				type : "GET",
				url : chaoshiUrl+'/ajaxAddCollects.do?productId='+productId+'&productType='+productType,
				dataType : "jsonp",
				cache : false,
				success : function(json) {
					if(json && json.flag=="isNotLogin"){
						loginPop(true,'',false);
					}else if(json.flag=="fail"){
						alert("收藏失败");
					}else if(json.flag=="success"){
						alert("收藏成功");
						$(".float_icon .unFavorite").hide();
						$(".float_icon .favorite").css("display","block");
						$(".float_icon .favorite").unbind("click").bind("click", colseSc);
						$(".float_icon .favorite p").html("取消收藏");
					}else if(json.flag=="countMax"){
						alert("收藏夹已满");
						$(".float_icon .unFavorite").css("display","block");
						$(".float_icon .favorite").hide();
						$(".float_icon .unFavorite").unbind("click").bind("click", doscbind);
						$(".float_icon .favorite p").html("收藏产品");
					}else if(json.flag=="exist"){
						alert("已收藏");
						$(".float_icon .unFavorite").hide();
						$(".float_icon .favorite").css("display","block");
						$(".float_icon .favorite").unbind("click").bind("click", colseSc);
						$(".float_icon .favorite p").html("取消收藏");
					}
				}
			});
		};
		function colseSc(){
			$.ajax({
				url:protocol+"/memberAlias.jsp",
				dataType:"jsonp",
				success:function(json){
					if(json.isLoginEmall) {
						$.ajax({
							type : "GET",
							url : chaoshiUrl+"/ajaxCloseCollects.do?productId="
									+ productId,
							dataType : "jsonp",
							cache : false,
							success : function(json) {
								if(json.flag=='success'){
									$(".float_icon .unFavorite").css("display","block");
									$(".float_icon .favorite").hide();
									$(".float_icon .unFavorite").unbind("click").bind("click", doscbind);
									$(".float_icon .favorite p").html("收藏产品");
									alert("取消收藏成功")
								}else{
									alert("取消收藏失败")
								}
							},
							error : function() {
								if (window.console) {
									console.log("服务器繁忙，请稍后再试~ 给您带来不便请谅解 ^_^");
								}
							}
						});
					} else {
						loginPop(true,'',false);
					}
				}
			});
		}
		function isBindSc() {
			var flag = false;
			//look up if is favorite
			$
					.ajax({
						type : "GET",
						url : chaoshiUrl+"/ajaxIsCollectsExist.do?productId="
								+ productId,
						dataType : "jsonp",
						cache : false,
						success : function(json) {
							if(json.flag=='exist'){
								$(".float_icon .favorite").unbind("click").bind("click", colseSc);
								flag = true;
								flag ? ($(".float_icon .sc").hide() && $(
										".float_icon .unsc").css('display', 'block'))
										: ($(".float_icon .unsc").hide() && $(
												".float_icon .sc").css('display',
												'block'));
							}else{
								$(".float_icon .unFavorite").unbind("click").bind("click", doscbind);
							}
						},
						complete : function() {
						},
						error : function() {
							if (window.console) {
								console.log("服务器繁忙，请稍后再试~ 给您带来不便请谅解 ^_^");
							}
						}
					});
			return flag;
		}
	}
	
	//entry
	function init() {
		$(target).append(htmls);
		showArrayIcon();
		dobind();
	}
	//interface to outer one
	window.addMoreIcons = function(str, callback, isNew) {
		isNew = isNew || false;
		isNew == true ? ($(".float_icon").clear().append(str)) : $(
				".float_icon").append(str);
		callback.apply(this);
	}
	//start
	init();
}