
jQuery.ajaxSetup ({cache:false}); 
function show_denglu_zhuce() {
var telephone = $('#phone_number').val();
	$.ajax({
		url : chaoshi_context_path + "/memberAlias.jsp",
		dataType : "jsonp",
		success : function(json) {
			$("#form_div_1").hide();
	     	$("#form_div_3").show();
	     	
			if (json.isLoginEmall&&telephone==json.mobileNo) {
	     
	     		$("#zhuce1").hide();
	     		$("#denglu1").hide();
	     		$("#yesLogin").show();
//	     		if(window.top!=window.self){
		                   window.top.location.replace(chaoshi_context_path	+ "/dingdanguanli/jinrongchaoshi/loanOrder.shtml");
		                   return false;
//		         }
	     		//window.location.href = chaoshi_context_path	+ "/dingdanguanli/jinrongchaoshi/loanOrder.shtml";
			} else {
				$("#yesLogin").hide();
				$("#zhuce1").show();
	     		$("#denglu1").show();
				if(status_flag=="1"){
					$("#zhuce1").hide();
					$("#denglu1").removeClass("unselect_bg").addClass("select_bg");
					$("#zhuce_step").hide();
					$("#denglu_step").show();
					$("#dl_title").show();
					$("#zc_title").hide();
					login(true);
				}else{
					$("#denglu_step").hide();
					$("#zhuce_step").show();
					$("#dl_title").hide();
					$("#zc_title").show();
					registerPop1(true);
				}
				//增加广告位
				$(document).trigger("addAdv20151201.PA");
			}
		}
	});

}
//注册按钮
$("#zhuce1").click(function() {
	$("#zhuce_step").show();
	$("#denglu_step").hide();
	$(this).removeClass("unselect_bg").addClass("select_bg");
	$("#denglu1").removeClass("select_bg").addClass("unselect_bg");
	$("#dl_title").hide();
	$("#zc_title").show();

	registerPop1(true);
});
//登陆按钮
$("#denglu1").click(function() {
	$(this).removeClass("unselect_bg").addClass("select_bg");
	$("#zhuce1").removeClass("select_bg").addClass("unselect_bg");
	$("#zhuce_step").hide();
	$("#denglu_step").show();
	$("#dl_title").show();
	$("#zc_title").hide();
	login(true);
});

//登录下的立即注册
$(".denglu_bottom_span").click(function(){
		$("#zhuce_step").show();
		$("#denglu_step").hide();
		$("#dl_title").hide();
		$("#zc_title").show();
		$("#zhuce1").show();
		$("#zhuce1").removeClass("unselect_bg").addClass("select_bg");
		$("#denglu1").removeClass("select_bg").addClass("unselect_bg");

	registerPop1(true);
});

function registerPop1(state) {

	if (state === undefined) {
		state = true;
	}

	if (state) {
		//      var returnUrl = window.location.href;
		var returnUrl = chaoshi_context_path
				+ "/dingdanguanli/jinrongchaoshi/loanOrder.shtml";
		returnUrl = returnUrl.replace("#", "");
		returnUrl = encodeURIComponent(returnUrl, "utf-8");

 
		var x = chaoshi_context_path
				+ '/member/newCustomerAjaxRegister.do?signtype=MD5&withMobile=1&_='
				+ new Date().getTime() + '&ptag=' + returnUrl;
		var str = "";
		$.ajax({
			url : x,
			method : "post",
			dataType : "jsonp",
			success : function(data) {
				var regUrl = data.redirectURL;
				//$("#url").html(regUrl);
				// window.location.href =regUrl;
				$("#zhuce_step").show();
				$("#zhuce_iframe").attr("src", regUrl);
			},
			error : function() {
				alert('error');
			}
		});
	}

}
var gogal_data;
function login(state) {

	if (state) {
		var returnUrl = chaoshi_context_path
				+ "/dingdanguanli/jinrongchaoshi/loanOrder.shtml";
		returnUrl = returnUrl.replace("#", "");
		returnUrl = encodeURIComponent(returnUrl, "utf-8");
		var x = chaoshi_context_path
				+ '/member/customerAjaxLoginToEbank.do?signtype=MD5&isReg=true&_='
				+ new Date().getTime() + '&ptag=' + returnUrl;
		jQuery.ajaxSetup ({cache:false}); 
		$.ajax({
			url : x,
			method : "post",
			cache : false,
			dataType : "jsonp",
			success : function(data) {
				gogal_data=data;
				setTimeout(function(){
					var logUrl = gogal_data.redirectURL;
					$("#denglu_iframe").attr("src", logUrl);
				},100);
				
			},
			error : function() {
				alert('error');
			}
		});
	}
}

