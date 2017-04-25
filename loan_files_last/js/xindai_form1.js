//*************************************************
//新一代，小消，经营贷款，申请
//************************************************
$(document).ready(function(){
	
});
document.body.style.background="#fff";
function check_xieyi(){
         if($("#yuedu").attr("class").indexOf("checkbox_checked")>-1){
                   return true;
         }
         else{
                   alert("需同意贷款预约须知");
                   return false;
         }
         
}
//校验是否登陆
function check_denglu(){
         var telephone = $('#phone_number').val();
         $.ajax({
			url : chaoshi_context_path + "/memberAlias.jsp",
			dataType : "jsonp",
			success : function(json) {
				//if (json.isLoginEmall&&telephone==json.mobileNo) {
				if (json.isLoginEmall) {
		     		$("#zcyzt").hide();
				} else {
					
				}
			}
		});
}



var city_array = [ "北京", "上海", "广州", "深圳", "东莞", "佛山", "济南", "天津", "厦门", "重庆",
		"昆明" ];

// 验证目前所在地
function check_city(value, element) {
	var message = "";
	value = $.trim(value);
	if (value == "" || value == null) {
		message = "请选择城市";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}
}

// 验证手机号码
function check_phonenumber(value, element) {
	var message = "";
	value = $.trim(value);
	if (value == "" || value == null) {
		message = "请输入手机号码";
		show_error(element, message);
		return false;
	} else {
		var name_str = value.replace(/(^\s*)|(\s*$)/g, "");
		var reg=/^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|14[0-9]{1}|17[0-9]{1})+[\d]{8})$/;
		if (!reg.test(name_str)) {
			message = "请正确输入手机号码";
			show_error(element, message);
			return false;
		} else {
			clear_span(element);
			return true;
		}
	}
}
$("#username").unbind("blur").bind("blur",check_username);
// 验证联系人
function check_username(value, element) {
	var message = "";
	value = $.trim($("#username").val());
	if (value == "" || value == null) {
		message = "请输入联系人姓名";
		show_error($("#username"), message);
		return false;
	} else {
		var name_str = value.replace(/(^\s*)|(\s*$)/g, "");
		//var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
		var reg = /^[\u4e00-\u9fa5]{2,5}$/;
		if (!reg.test(name_str)) {
				message = "请输入中文姓名";
				show_error($("#username"), message);
				return false;
		} else {
			clear_span($("#username"));
			return true;
		}
	}
}

function show_error(element, message) {
	clear_span(element);
	$(element).parent().next().html(
			"<span style='color:red;font-size;8px;padding-left:3px'>" + message
					+ "</span>");
}

function clear_span(element) {
	$(element).parent().next().children().remove();
}

// 表单2
setTimeout(function(){
	
	$(".select_box_apply div ul li").each(function(){
		if($(this).text()=="请选择"){
			$(this).trigger("click");
		}
	});
},1000);
// 下拉框控件

var selectYearData = document.getElementById("selectYearData");
var select_year = document.getElementById("select_year");
var selectMonthData = document.getElementById("selectMonthData");
var select_month = document.getElementById("select_month");
var selectYueGongZiData = document.getElementById("selectYueGongZiData");
var select_yuegongzi = document.getElementById("select_yuegongzi");

var Timer_apply_year = null;
var Timer_apply_month = null;
var Timer_apply_yuegongzi = null;
selectYearData.onmouseover = select_year.onmouseover = function() {
	clearTimeout(Timer_apply_year);
	select_year.style.display = 'block';
}
selectYearData.onmouseout = select_year.onmouseout = function(ev) {
	var ev = ev || event;
	Timer_apply_year = setTimeout(hide_apply_year, 300);
	ev.cancelBubble = true;
}
selectMonthData.onmouseover = select_month.onmouseover = function() {
	clearTimeout(Timer_apply_month);
	select_month.style.display = 'block';
}
selectMonthData.onmouseout = select_month.onmouseout = function(ev) {
	var ev = ev || event;
	Timer_apply_month = setTimeout(hide_apply_month, 300);
	ev.cancelBubble = true;
}
selectYueGongZiData.onmouseover = select_yuegongzi.onmouseover = function() {
	clearTimeout(Timer_apply_yuegongzi);
	select_yuegongzi.style.display = 'block';
}
selectYueGongZiData.onmouseout = select_yuegongzi.onmouseout = function(ev) {
	var ev = ev || event;
	Timer_apply_yuegongzi = setTimeout(hide_apply_yuegongzi, 300);
	ev.cancelBubble = true;
}
function hide_apply_month() {
	select_month.style.display = "none";
}
function hide_apply_year() {
	select_year.style.display = "none";
}
function hide_apply_yuegongzi() {
	select_yuegongzi.style.display = "none";
}
$(".select_box_apply div ul li").click(function() {
	var target = $(this), value = target.text();
	if(target.parent().parent().attr("id")=="select_year"){
		if(value.indexOf("年以")>-1){
			$("#selectMonthData").hide();
		}else{
			$("#selectMonthData").show();
		}
	}
	
	target.parent().parent().prev().val(value);
});

// 房贷切换
$("#form_content .anjie .radio_div").each(function(i, element) {

	$(element).click(function() {
		$("#form_content .anjie .radio_div").removeClass("checked");
		$(this).addClass("checked");

		$("#houseLoanType").val($(this).attr("data-id"));
	});
});

// 车贷单选
$("#form_content .chedai .radio_div").each(function(i, element) {

	$(element).click(function() {

		$("#form_content .chedai .radio_div").removeClass("checked");
		$(this).addClass("checked");
		$(this).parent().parent().find("input").val($(this).attr("data-id"));
		if ($(this).attr("data-id") == "1") {

			$("#car_qk_tr2").css("display", "");
			$("#car_qk_tr3").css("display", "none");
		}
		if ($(this).attr("data-id") == "2") {
			$("#car_qk_tr2").css("display", "");
			$("#car_qk_tr3").css("display", "");
		}
		if ($(this).attr("data-id") == "0") {
			$("#car_qk_tr2").css("display", "none");
			$("#car_qk_tr3").css("display", "none");
		}

	});
});
// 户籍单选
$("#form_content .huji .radio_div").each(function(i, element) {

	$(element).click(function() {

		$("#form_content .huji .radio_div").removeClass("checked");
		$(this).addClass("checked");
		$(this).parent().parent().find("input").val($(this).attr("data-id"));

	});
});
$("#form_content .loan_y .radio_div").each(function(i, element) {

	$(element).click(function() {

		$("#form_content .loan_y .radio_div").removeClass("checked");
		$(this).addClass("checked");
		$(this).parent().parent().find("input").val($(this).attr("data-id"));

	});
});
//平安寿险保单单选
$("#form_content .policy_t .radio_div").each(function(i, element) {

	$(element).click(function() {

		$("#form_content .policy_t .radio_div").removeClass("checked");
		$(this).addClass("checked");
		$(this).parent().parent().find("input").val($(this).attr("data-id"));

	});
});

//不是11个城市时拼接出生年月
// 校验出生年月--年
function check_birthday_year_noin() {
	var select_year_input = $("#select_year_input");
	var value = select_year_input.val();
	var element = select_year_input.parent();

	if ($.trim(value) == "" || $.trim(value) == null || $.trim(value) == "请选择") {
		var message = "请选择年份";
		show_error(element, message);
			return false;
	} else {
		return	check_birthday_month_noin();
	}
}

// 校验出生年月--月
function check_birthday_month_noin() {
	var select_month_input = $("#select_month_input");
	var value = select_month_input.val();
	var element = select_month_input.parent();
	if($("#select_year_input").val().indexOf("年以")>0){
		value="01";
	}
	if ($.trim(value) == "" || $.trim(value) == null || $.trim(value) == "请选择") {
		var message = "请选择月份";
		show_error(element, message);
		return;
	} else {
		var year_string=$("#select_year_input").val();
		if(year_string.indexOf("年以")>0){
			year_string = year_string.replace(/[^0-9]/ig,"");
			var birthday_string = (year_string == "1994" ? 1995 : 1954 ) + "-"+ value;
		}else{
			var birthday_string = year_string.split(" ")[0] + "-"+ value;
		}
		birthday_string= birthday_string.replace(/[ ]/g,"");
		$("#birthday").val(birthday_string);
		return true;
	}
}



// 校验出生年月--年
function check_birthday_year() {
	var select_year_input = $("#select_year_input");
	var value = select_year_input.val();
	var element = select_year_input.parent();

	if ($.trim(value) == "" || $.trim(value) == null || $.trim(value) == "请选择") {
		var message = "请选择年份";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		// return true;

		return check_birthday_month();
	}
}

// 校验出生年月--月
function check_birthday_month() {
	var select_month_input = $("#select_month_input");
	var value = select_month_input.val();
	var element = select_month_input.parent();
	if($("#select_year_input").val().indexOf("年以")>0){
		value="01";
	}
	if ($.trim(value) == "" || $.trim(value) == null || $.trim(value) == "请选择") {
		var message = "请选择月份";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		var year_string=$("#select_year_input").val();
		if(year_string.indexOf("年以")>0){
			year_string = year_string.replace(/[^0-9]/ig,"");
			var birthday_string = (year_string == "1994" ? 1995 : 1954 ) + "-"+ value;
		}else{
			var birthday_string = year_string.split(" ")[0] + "-"+ value;
		}
		birthday_string= birthday_string.replace(/[ ]/g,"");
		$("#birthday").val(birthday_string);
		// console.log("true");
		return true;
	}
}

// 校验银行卡打卡月工资
function check_yuegongzi() {

	var select_yuegongzi_input = $("#select_yuegongzi_input");
	var value = select_yuegongzi_input.val();
	//var value = "<3000";
	var element = select_yuegongzi_input.parent();
	if ($.trim(value) == "" || $.trim(value) == null || $.trim(value) == "请选择") {
		var message = "请选择银行卡打卡月工资";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}
}


// 校验房贷情况
function check_fangdai() {

	var houseLoanType = $("#houseLoanType");
	var value = houseLoanType.val();
	var element = houseLoanType;
	if ($.trim(value) == "" || $.trim(value) == null) {
		var message = "请选择房贷情况";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}
}
//校验保单
function check_baodan() {

	var houseLoanType = $("#pingan_policy");
	var value = houseLoanType.val();
	var element = houseLoanType;
	if ($.trim(value) == "" || $.trim(value) == null) {
		var message = "请选择平安寿险保单情况";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}
}
//校验平安贷款情况
function check_daikuan() {

	var houseLoanType = $("#pingan_loan");
	var value = houseLoanType.val();
	var element = houseLoanType;
	if ($.trim(value) == "" || $.trim(value) == null) {
		var message = "请选择平安贷款情况";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}
}

// 校验车贷
function check_chedai() {

	var carLoanType = $("#carLoanType");
	var value = carLoanType.val();
	var element = carLoanType;
	if ($.trim(value) == "" || $.trim(value) == null) {
		var message = "请选择车贷情况";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}

}

// 校验户籍
function check_huji() {

	var registerPlace = $("#registerPlace");
	var value = registerPlace.val();
	var element = registerPlace;
	if ($.trim(value) == "" || $.trim(value) == null) {
		var message = "请选择户籍";
		show_error(element, message);
		return false;
	} else {
		clear_span(element);
		return true;
	}
}
function check_IdCard(){
	var card=$.trim($("#card_id").val());
	if(card=="" || card==undefined || card==null){
		clear_span($("#card_id"));
		return true;
	}else{
		var name_str = card.replace(/(^\s*)|(\s*$)/g, "");
		var reg = /^\d{17}([0-9]|X|x)$/;
		if (!reg.test(name_str)) {
				message = "请输入正确的身份证号码";
				show_error($("#card_id"), message);
				return false;
		} else {
			clear_span($("#card_id"));
			return true;
		}
	}
}


$("#tuijian").click(function() {

	if ($(this).attr("class").indexOf("checkbox_checked") > -1) {
		$(this).removeClass("checkbox_checked").addClass("checkbox_enchecked");
	} else {
		$(this).removeClass("checkbox_enchecked").addClass("checkbox_checked");
	}

});

$("#zcyzt").click(function() {

	if ($(this).attr("class").indexOf("checkbox_checked") > -1) {
		$(this).removeClass("checkbox_checked").addClass("checkbox_enchecked");
		alert("注册一账通账号，登陆后可查看贷款审核和放款情况");

	} else {
		$(this).removeClass("checkbox_enchecked").addClass("checkbox_checked");
	}

});

$(".yuyuexuzhi").click(
		function() {

			var top = ($(window).height() * 1 - $('#yuyuexuzhi_div').height() * 1)/ 2 + $(document).scrollTop() * 1 + "px";
			$('#yuyuexuzhi_div').css("top", top);
			$("#yuyuexuzhi_div").css("display", "block");

});
$("#close").click(function() {
	$("#yuyuexuzhi_div").css("display", "none");
});
var status_flag;//0不是一账通账户，两个按钮都展示。1是一账通账户，只显示登陆按钮
function next_step_bind(){
         var city_select = $("#city_select");
         var user_name = $("#username");
         var phone_number = $("#phone_number");

         clear_span(user_name);
         clear_span(phone_number);
         clear_span(city_select);
         if (!check_username(user_name.val(), user_name)) {
        	 return;
         }
         if (!check_city(city_select.val(), city_select)) {
                   return;
         }
         if (!check_yuegongzi()) {
                   return;
         }
         if(!check_fangdai()){
        	 return;
         }
         if(!check_chedai()){
        	 return;
         }
         if(!check_baodan()){
        	 return;
         }
         if(!check_daikuan()){
        	 return;
         }
         if(!check_IdCard()){
        	 return;
         }
         if (check_phonenumber(phone_number.val(), phone_number)) {   
             if(!check_imagevcode()){
            	 return;
             }
             if(!check_validate()){
            	 return;
             }
             if(smsCodeId=="" || smsCodeId==undefined || smsCodeId==null){
            	 alert("请先获取短信验证码");
            	 return;
             }
             if (!validateForm()) {
            	 return;
             }
             $("#submit_btn").unbind("click").css("background","#ddd");
             submitRegister();
             var input_sms_val = input_sms.val();
             input_sms_val=input_sms_val.replace(/(^\s*)|(\s*$)/g, "");
             $.ajax({
                   type : 'POST',
                   url : "/common/registerMemberByOtp.do",
                   dataType : "json",
                   data : {
                            appId:"10191",
                            mobileNo:input_phone.val(),
                            activeId:smsCodeId,
                            activeNo:input_sms_val,
                            gatherJKSR:$("#gatherJKSR").val(),
                            gatherJKSC:$("input[name='gatherJKSC']").val()
                   },
                   beforeSend : function(XMLHttpRequest) {
                   },
                   success : function(data) {
                   			var error_msg="";
                            if(data["core-code"]=="0001"){
                                     status_flag="0";
                            }else if(data["core-code"]=="0000" || data["core-code"]=="0012"){
                                     status_flag="1";
                            }
                            else if(data["core-code"]=="0018"){
                            		error_msg="验证码已过期";
                                     alert("验证码已过期");
                                     change_authChange();
                                     $("#submit_btn").bind("click",next_step_bind).css("background","#FF6600");
                                     return;
                            }
                            else if(data["core-code"]=="0019"){
                            		 error_msg="验证码错误";
                                     alert("验证码错误");
                                     change_authChange();
                                     $("#submit_btn").bind("click",next_step_bind).css("background","#FF6600");
                                     return;
                            }
                            else if(data["core-code"]=="0020"){
                            		 error_msg="验证码无效";
                                     alert("验证码无效");
                                     change_authChange();
                                     $("#submit_btn").bind("click",next_step_bind).css("background","#FF6600");
                                     return;
                            }
                            else{
                            	status_flag = 0;
                            }
                            if(error_msg!=""){
								if (typeof(pa_sdcajax)=="function"){pa_sdcajax("WT.pn_sku","新一贷",false,"WT.page_name","填写资料",false, "WT.error_msg",error_msg,false);}
							}
                            xinYiDaiNext();
                   },
                   error : function(XMLHttpRequest,textStatus,errorThrown) {
                            alert("系统忙");
                            $("#submit_btn").bind("click",next_step_bind).css("background","#FF6600");
                            change_authChange();
                   }
             });
       }
}

$("#submit_btn").unbind("click").bind("click",next_step_bind);
function xinYiDaiNext() {
	var serialId = $('#serialId').val(),
		gender = $('#gender').val(),
		customerName = $('#username').val(),
		citySelect = $("#city_select").val(),
		telephone = $('#phone_number').val(),
		productId = $('#productId').val(),
		WT_mc = $('#WT_mc_id').val(),
  		posid = $('#posid').val(),
  		salary=$("#select_yuegongzi_input").val(),
  		isJieShou="";
  		if($("#tuijian").attr("class").indexOf("checkbox_checked")>-1){
  			isJieShou=1;
  		}else{
  			isJieShou=0;
  		}

	var aid = $('#aid').val();
	var citys = new Array(3);
	if (citySelect != null) {
		citys = citySelect.split("-");
	}
	var cityId = citys[0];
	var city = citys[2];

	
	
	
	var serialId = $('#serialId').val();
	var birthday = $('#birthday').val();
	var occupation = "1";//职业类型
	var workPeriod = "0";//现单位工龄
	var salary = $("#select_yuegongzi_input").val();//银行卡打卡月工资
	var income = "";
	switch(salary)
	{
		case "<3000":
			income=2;
			break;
		case "3000-3999":
			income=3;
			break;
		case "4000-4999":
			income=4;
			break;
		case "5000-9999":
			income=5;
			break;
		case ">=10000":
			income=10;
			break;

	}
	var salaryType = "1";//薪资发放方式
	var businessPeriod = "0";//营业执照注册时间
	var houseLoanType = $('#fangchan_qk').val();//您的房产情况
	var houseLoanRepaymentType = $('#houseLoanType').val();//您的房产按揭情况
	var houseRepaymentPeriod = $('#houseRepaymentPeriod').val();//房贷已还款月数
	var isOwnerCar = $('#car_qk').val();
	var carLoanRepayMonths = $('#car_ys').val();
	var carLoanFinishTime = $('#car_time').val();
	var carLoanType = $('#carLoanType').val();
	var registerPlace = $('#registerPlace').val();
	var productId = $('#productId').val();
	var posid = $('#posid').val();
	var aid = $('#aid').val();
	var cardID = $.trim($("#card_id").val());
	var pinganLoan = $('#pingan_loan').val();
	var pinganPolicy = $('#pingan_policy').val();
	
  	var	isJieShou="";
	if($("#tuijian").attr("class").indexOf("checkbox_checked")>-1){
		isJieShou=1;
	}else{
		isJieShou=0;
	}
	var options = {
		data : {
			source : WT_mc,
			customerName : customerName,
			gender : gender,
			city : city,
			cityId : cityId,
			telephone : telephone,
			posid : posid,
			aid : aid,
			productId : productId,
			isToa: status_flag,
			isJieShou: isJieShou,
			birthday : birthday,
			occupation : occupation,
			workPeriod : workPeriod,
			income : income,
			salary : salary,
			salaryType : salaryType,
			businessPeriod : businessPeriod,
			houseLoanType : houseLoanType,
			houseLoanRepaymentType : houseLoanRepaymentType,
			houseRepaymentPeriod : houseRepaymentPeriod,
			isOwnerCar : isOwnerCar,
			carLoanRepayMonths : carLoanRepayMonths,
			carLoanFinishTime : carLoanFinishTime,
			carLoanType : carLoanType,
			registerPlace : registerPlace,
			cardID : cardID,
			pinganLoan : pinganLoan,
			pinganPolicy : pinganPolicy
		},
		callback : 'submitCallback',
		url : '/dingdanguanli/jinrongchaoshi/registerNewloanOrder.do'
	};
	_request_callback(options);
}

/*function nextDoCallback(data) {
	var error_msg="";
	if (data.code == '0') {	
		$("#serialId").val(data.serialId);
		xinYiDaiSubmit();

	} else if (data.code == '1') {
		$.each(data,function(i,items){
			if(i!="code"){
				error_msg=items;
				alert(items);
				change_authChange();
				$("#submit_btn").unbind("click").bind("click",next_step_bind).css("background","#FF6600");
			}
		});
	} else if (data.code == '100') {
		error_msg="系统忙";
		alert("系统忙");
		change_authChange();
		$("#submit_btn").bind("click",next_step_bind).css("background","#FF6600");
	}
	if(error_msg!=""){
		if (typeof(pa_sdcajax)=="function"){pa_sdcajax("WT.pn_sku","新一贷",false,"WT.page_name","填写资料",false, "WT.error_msg",error_msg,false);}
	}
}*/

function submitCallback(data) {
	var error_msg=""; 
	if (data.code == '0') {
		var page_name="注册用户成功";
        if(status_flag*1==1){
        	page_name="一账通用户成功";
        }else{
        	page_name="注册用户成功";
        }
		if (typeof(pa_sdcajax)=="function"){
			if(data.clientNo){
	        	var registerName = data.clientNo;
	        	pa_sdcajax("WT.pn_sku","新一贷",false,"WT.page_name",page_name,false,"WT.tx_i","dk_"+data.serialId,false,"WT.register_name",registerName,false);
	        }else{
	        	pa_sdcajax("WT.pn_sku","新一贷",false,"WT.page_name",page_name,false,"WT.tx_i","dk_"+data.serialId,false);
	        }
		} 
		show_denglu_zhuce();
		window.scrollTo(0,0);
		//location.hash="totop"; 
	} else if (data.code == '1') {
		$.each(data,function(i,items){
			if(i!="code"){
				error_msg=items;
				alert(items);
			}
		});
	} else if (data.code == '100') {
		if(data.message != ''){
			error_msg=data.message;
			alert(error_msg);
		}else{
			error_msg="系统忙";
			alert(error_msg);
		}
	}
	if(error_msg!=""){
		if (typeof(pa_sdcajax)=="function"){pa_sdcajax("WT.pn_sku","新一贷",false,"WT.page_name","填写资料",false, "WT.error_msg",error_msg,false);}
	}
	 $("#submit_btn").bind("click",next_step_bind).css("background","#FF6600");
}

_request_callback = function(options) {
		$.ajax({
			type : 'post',
			url : daikuanContextPath + options.url,
			dataType : "jsonp",
			jsonpCallback : options.callback,
			timeout : options.timeout ? options.timeout : 50000,
			data : options.data ? options.data : {},
			context : options.content ? options.content : undefined,
			beforeSend : function(XMLHttpRequest) {
			},
			success : function(data) {
			},
			error : function(data) {
				alert("系统忙");
			}
		});
	

	
}

function validateForm() {
	var city_flg = false;
	var productId = $("#productId").val();

	for ( var i = 0; i < city_array.length; i++) {
		if ($("#city_select").val().indexOf(city_array[i]) > -1) {
			city_flg = true;
			break;
		}
	}

	if (productId == '00029173') {// 小消不分城市都必须填
		city_flg = true;
	}

	if (!city_flg) {
		if(!check_birthday_year_noin()){
			return false;
		}
	} else// 11个城市必填
	{
		if (!check_birthday_year()) {
			return false;
		}

		if (!check_huji()) {
			return false;
		}

		return true;
	}
	return true;
}

function xinYiDaiSubmit() {
	var serialId = $('#serialId').val();
	var birthday = $('#birthday').val();
	var occupation = "1";//职业类型
	var workPeriod = "0";//现单位工龄
	var salary = "<3000";//银行卡打卡月工资

	switch(salary)
	{
		case "<3000":
			salary=2;
			break;
		case "3000-3999":
			salary=3;
			break;
		case "4000-4999":
			salary=4;
			break;
		case "5000-9999":
			salary=5;
			break;
		case ">=10000":
			salary=10;
			break;

	}
	/*if (salary == "<3000") {
		salary = "小于3000";
	}
	if (salary == ">=5000") {
		salary = "不小于5000";
	}*/
	var salaryType = "1";//薪资发放方式
	var businessPeriod = "0";//营业执照注册时间
	var houseLoanType = $('#fangchan_qk').val();//您的房产情况
	var houseLoanRepaymentType = $('#houseLoanType').val();//您的房产按揭情况
	var houseRepaymentPeriod = $('#houseRepaymentPeriod').val();//房贷已还款月数
	var isOwnerCar = $('#car_qk').val();
	var carLoanRepayMonths = $('#car_ys').val();
	var carLoanFinishTime = $('#car_time').val();
	var carLoanType = $('#carLoanType').val();
	var registerPlace = $('#registerPlace').val();
	var productId = $('#productId').val();
	var posid = $('#posid').val();
	var aid = $('#aid').val();
	
	var	salary=$("#select_yuegongzi_input").val(),
  		isJieShou="";
  		if($("#tuijian").attr("class").indexOf("checkbox_checked")>-1){
  			isJieShou=1;
  		}else{
  			isJieShou=0;
  		}
	var options = {
		data : {
			serialId : serialId,
			birthday : birthday,
			occupation : occupation,
			workPeriod : workPeriod,
			salary : salary,
			salaryType : salaryType,
			businessPeriod : businessPeriod,
			houseLoanType : houseLoanType,
			houseLoanRepaymentType : houseLoanRepaymentType,
			houseRepaymentPeriod : houseRepaymentPeriod,
			carLoanType : carLoanType,
			isOwnerCar : isOwnerCar,
			carLoanRepayMonths : carLoanRepayMonths,
			carLoanFinishTime : carLoanFinishTime,
			carLoanType : carLoanType,
			registerPlace : registerPlace,
			posid : posid,
			productId : productId,
			aid : aid,
			pageType : "submit",
			salary: salary,
			isJieShou: isJieShou
		},
		callback : 'submitCallback',
		url : '/dingdanguanli/jinrongchaoshi/registerNewloanOrder.do'
	};
	_request_callback(options);

}


/*******************添加手机otp验证*****************/
// 发送短信动态密码的按钮
var btn_sms=$('#request_code'),
	//手机文本框对象
	input_phone=$("#phone_number"),
	// 缓存手机号
    tempPhoneNum,
    // 图形验证码父级DIV
    wrap_authCode=$('#J-phoneLogin-authCode-wrap'),
    // 图形验证码输入框
    input_authCode=$('#validCode'),
    // 图形验证码图片
    img_authCode=$('#validateImg'),
    // 切换图形验证码的按钮
    btn_authCodeChange=$('#J-changeVerifyImg'),
    //图形验证码ID
    authCodeId,
    // 短信动态密码ID
    smsCodeId,
    // 短信动态密码输入框
    input_sms=$('#validate_code');
//绑定发送短信按钮
btn_sms.unbind("click").bind('click', sendValidCode);
input_phone.on({"blur":function(){
	var mob=$('#phone_number');
	if(!check_phonenumber(mob.val(),mob)){
		return false;
	}
}});
//倒计时
var count_flag=60;
var setInterval_obj;
function change_seconds(){
	$("#request_code").html(count_flag+"秒后可重新发送");
	$("#request_code").unbind("click");
	setInterval_obj=setInterval(function(){
		count_flag--;
		if(count_flag==0){
			$("#request_code").html("获取动态码");
			count_flag=60;
			window.clearInterval(setInterval_obj);
			btn_sms.unbind("click").bind('click', sendValidCode);
		}
		else{
			$("#request_code").html(count_flag+"秒后可重新发送");
		}
	},1000);
}
input_authCode.on("blur",function(){
	if(input_authCode.val()==""){
		show_error(input_authCode,"请输入图形验证码");
	}else{
		show_error(input_authCode,"");
	}
});
var show_imagecode=false;
// 发送短信动态密码
function sendValidCode() {
	//判断手机号
	if(!check_phonenumber(input_phone.val(), input_phone)){
		return false;
	}
	
	 // 手机号变更重发验证码。
	 if (input_phone.val() != tempPhoneNum) {

	     // 手机号有改变
	     tempPhoneNum = input_phone.val();
	     sendAuthCode();
	 } else if (input_phone.val() == tempPhoneNum && wrap_authCode.css("display") == 'none' ) {
	     // 手机号没改变 且 不显示图形验证码的情况
	     sendAuthCode();
	 }
	//合加
	  else if(wrap_authCode.css("display")=="table-row" && input_authCode.val()==""){//如果图形验证码显示且验证码框为空
	  	show_error(input_authCode,"请先输入图形验证码");
	  }
	  //
	  else {
	     // 手机号没改变 且 显示图形验证码的情况
	     sendCode();
	 }         
}
//判断是否显示图形验证码
function sendAuthCode(){
	btn_sms.unbind('click');
	    // 验证码AJAX
	    ajaxAuthCode('otp',function(data) {	
	        // 记录图形验证码ID
	        authCodeId = data.id;
	
	        // 显示图形验证码
	        if (data.type == '0') {
	            wrap_authCode.show();
	            img_authCode.attr('src', data.img);
	            input_authCode.val('');
	            show_imagecode=true;
	        }else{
	        	wrap_authCode.hide();
	        	show_imagecode=false;
	        }
	        btn_sms.unbind("click").bind('click', sendValidCode);	        
	        sendCode();
	    });
}
//图形验证码AJAX
function ajaxAuthCode(type, callback) {
    var self = this,
        url = memberi_context_path+'/pinganone/pa/paic/common/appvcode.do',
        data = {
            /*userId: type == 'otp' ? input_phone.val() : $('#userID').val(),*/
            userId:input_phone.val() ,
            appId: '10191',
            subsys: type
        },
        options = {
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: data,
            jsonp: 'callBack',
            success: function(res) {
                callback && callback(res);
            }
        };
    $.ajax(options);
}



//校验图形验证码
function check_valicode(){
	btn_sms.unbind('click');
	ajaxviliCode(function(data) {
            if (data.data.returnCode == '0000') {
               change_seconds();
		        // 短信动态密码AJAX
		        ajaxSmsCode(function(data) {
		            if (data.status == 'success') {
		                smsCodeId = data.data.activeId; 		                 
		            } else if (data.status == 'fail') {		                
		                alert(data.data.errorMessage);	
		                change_authChange();
		            }
		        });
                
            } else{
            	var error_msg="";
            	switch(data.data.returnCode){
            		case "0002":
            			error_msg="验证码已失效";
            			break;
            		case "0012":
            			error_msg="重复操作";
            			break;
            		case "0001":
            			error_msg="验证码已过期";
            			break;
            		case "0011":
            			error_msg="请求超时";
            			break;
            		case "0003":
            			error_msg="验证码错误";
            			break;
            		case "0004":
            			error_msg="验证码无效";
            			break;
            		case "0014":
            			error_msg="非法请求";
            			break;
            		case "0005":
            			error_msg="无效请求";
            			break;
            		case "0009":
            			error_msg="系统异常";
            			break;
            	}
                alert(error_msg); 
                change_authChange();               
            }
    });
	btn_sms.unbind("click").bind('click', sendValidCode);
}


//校验图形验证码AJAX
function ajaxviliCode(callback) {
    var self = this,
       url = memberi_context_path+'/pinganone/pa/checkAppVcode.do';
    if (!self.authCodeId) {return;}
    var data = {
            userId: input_phone.val(),
            validCodeId: authCodeId,
            validCode: input_authCode.val(),
            appId: '10191'
        },
        options = {
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(res) {
                callback && callback(res);
            }
        };
    
    $.ajax(options);
}

//获取短信动态密码
 function sendCode() {
    // 前端校验
    if (input_phone.val() == '') {
    	show_error(input_phone,"手机号码不能为空");
    	btn_sms.unbind("click").bind('click', sendValidCode);
    } else if (wrap_authCode.css("display") != 'none' && input_authCode.val() == '') {
    	if(!show_imagecode){
    		show_error(input_authCode,"请先输入图形验证码");
    		btn_sms.unbind("click").bind('click', sendValidCode);
    	}
    	
    } else {
    	if(wrap_authCode.css("display") != 'none' && input_authCode.val() != '') {
    		check_valicode();
    	}else{
    		change_seconds();
	        // 短信动态密码AJAX
	        btn_sms.unbind('click');
	        ajaxSmsCode(function(data) {
	            if (data.status == 'success') {
	                smsCodeId = data.data.activeId; 
	                 
	            } else if (data.status == 'fail') {		                
	                alert(data.data.errorMessage);	
	                change_authChange();	                
	            }
	           
	        });
    	}    	
    }
}

//短信动态密码AJAX
function ajaxSmsCode(callback) {
    var self = this,
       url = memberi_context_path+'/pinganone/pa/sendShortMessageBfappvcode.do';
    if (!self.authCodeId) {return;}
    var data = {
            mobileNo: input_phone.val(),
            validCodeId: authCodeId,
            validCode: input_authCode.val(),
            appId: '10191',
            otpType: '00'
        },
        options = {
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: data,
            jsonp: 'callBack',
            success: function(res) {
                callback && callback(res);
            }
        };
    
    $.ajax(options);
}
function change_authChange(){
	// 验证码AJAX
    ajaxAuthCode('otp', function(data) {

        // 记录图形验证码ID
        authCodeId = data.id;
     	// 显示图形验证码
        if (data.type == '0') {
            wrap_authCode.show();
            img_authCode.attr('src', data.img);
            input_authCode.val('');
            show_imagecode=true;
        }else{
        	wrap_authCode.hide();
        	show_imagecode=false;
        }
        // 图形验证码重新赋值
       // img_authCode.attr('src', data.img);
    });
}
btn_authCodeChange.unbind("click").bind('click', change_authChange);

//动态码验证
$("#validate_code").on({"blur":function(){	
    if(!check_validate()){
        return false;
    }else{
    	show_error($('#validate_code'),"");
    }
}});
//检查动态码
var check_validate = function(){
    var validate = $('#validate_code').val();
    if(validate == ''){
        show_error($('#validate_code'),"请输入短信动态码");
        return false;
    }else if(validate.length>8){
    	show_error($('#validate_code'),"动态码格式错误，请您重新输入");
        return false;
    }
    show_error($('#validate_code'),"");
    return true;
}
var check_imagevcode=function(){
	if($("#validCode").val()=="" && $("#J-phoneLogin-authCode-wrap").css("display")!="none"){
		show_error(input_authCode,"请输入图形验证码");
		return false;
	}else{
		show_error(input_authCode,"");
		return true;
	}
}


var oHead = document.getElementsByTagName('BODY').item(0);
var oScript= document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = jksJSURL;
    oHead.appendChild( oScript);


//机器识别码添加隐藏域
function submitRegister() {
 	try{
addGatherCollection(document.forms[0]);
}catch(e){}
   	//document.forms[1].submit();
}


$("#title_div a").each(function(){
	$(this).bind("click",function(){
		if(window.top!=window.self){
                   window.top.location.replace($(this).attr("href"));
                   return false;
         }
	});
});

