$(document).ready(function(){
	check_denglu();
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
         
         $.ajax({
			url : chaoshi_context_path + "/memberAlias.jsp",
			dataType : "jsonp",
			success : function(json) {
				if (json.isLoginEmall) {
		     		$("#zcyzt").css("display","none");
				} else {
					
				}
			}
		});
}


$(function(){
			//flushCode();
});

//性别单选按钮
$("#form_content .gener div").each(function(i,element){
	
	$(element).click(function(){				
	
				$("#form_content .gener div").attr("class","no_checked_form1");
				
				$(this).attr("class","checked_form1");
				$(this).parent().parent().find("input").val($(this).attr("id"));
			
			
		
		});
});

//验证姓名
function check_ownername(element)
{
	element=$("#ownername");
	if(!validate.check_null(element,"请输入联系人姓名")){
		return false;
	}
	if(!validate.check_regular(element,"请输入正确的姓名","username")){
		return false;
	}
	return true;
}

//验证所在城市
function check_city(element)
{
	if(!validate.check_null(element,"请选择城市")){
		return false;
	}
	validate.clean_error(element);
	return true;
}


//验证性别
function check_sex(element)
{
	if(!validate.check_null(element,"请选择性别")){
		return false;
	}
	return true;
}



//验证手机号码
function check_phonenumber(element)
{
	if(!validate.check_null(element,"请输入手机号码")){
		return false;
	}
	if(!validate.check_regular(element,"请正确输入手机号码","phonenumber")){
		return false;
	}
	return true;
}


setTimeout(function(){
	
	$(".select_box_apply div ul li").each(function(){
		if($(this).text()=="请选择"){
			$(this).trigger("click");
		}
	});
},1000);

//下拉框控件

var selectYearData=document.getElementById("selectYearData");
var select_year=document.getElementById("select_year");
var selectMonthData=document.getElementById("selectMonthData");
var select_month=document.getElementById("select_month");
var selectYueGongZiData = document.getElementById("selectYueGongZiData");
var select_yuegongzi = document.getElementById("select_yuegongzi");

var Timer_apply_year=null;
var Timer_apply_month=null;
var Timer_apply_yuegongzi = null;

selectYearData.onmouseover=select_year.onmouseover=function()
{
	clearTimeout(Timer_apply_year);
	select_year.style.display='block';	
}
selectYearData.onmouseout=select_year.onmouseout=function(ev)
{
	var ev=ev||event;
	Timer_apply_year=setTimeout(hide_apply_year,300);
	ev.cancelBubble=true;
}
selectMonthData.onmouseover=select_month.onmouseover=function()
{
	clearTimeout(Timer_apply_month);
	select_month.style.display='block';	
}
selectMonthData.onmouseout=select_month.onmouseout=function(ev)
{
	var ev=ev||event;
	Timer_apply_month=setTimeout(hide_apply_month,300);
	ev.cancelBubble=true;
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

function hide_apply_month(){
	select_month.style.display="none";
}
function hide_apply_year(){
	select_year.style.display="none";
}
function hide_apply_yuegongzi() {
		select_yuegongzi.style.display = "none";
}

$(".select_box_apply div ul li").click(function(){
	var target = $(this),
		value=target.text();
		target.parent().parent().prev().val(value);
		if(target.parent().parent().prev().attr("id")=="select_year_input"){
			if(value=="1994年以后" || value=="1955年以前" || value==""){
				$("#selectMonthData").css("display","none");
			}
			else{
				$("#selectMonthData").css("display","block");
			}
		}
});
 


	

//校验出生年月--年
function check_birthday_year()
{
	var select_year_input=$("#select_year_input");
	var	value=select_year_input.val();
	var element=select_year_input.parent();
	
	if($.trim(value)=="" || $.trim(value)==null|| $.trim(value) == "请选择"){
			var message="请选择年份";
			validate.show_error(element,message);
			return false;
		}
		else{
			validate.clean_error(element);
			//return true;
			if(value=="1994年以后" || value=="1955年以前")
			{
				validate.clean_error(element);
				var year_value=$("#select_year_input").val();
				var year_value_text=year_value.split(" ")[0];
				year_value_text=year_value_text.substring(0,year_value_text.length-3);

				//两个极限值处理
				year_value_text = (year_value_text==1994) ? 1995 : 1954;
				$("#birthday").val(year_value_text+"-01");
				return true;
			}
			else{
				return check_birthday_month();
			}
			
		}
}

//校验出生年月--月
function check_birthday_month()
{
	var select_month_input=$("#select_month_input");
	var	value=select_month_input.val();
	var element=select_month_input.parent();
	
	if($.trim(value)=="" || $.trim(value)==null || $.trim(value) == "请选择"){
			var message="请选择月份";
			validate.show_error(element,message);
			return false;
		}
		else{
			validate.clean_error(element);
			var month_value_text=$("#select_month_input").val();
			month_value=month_value_text.split(" ")[0];
			switch(month_value)
			{
				case "1月":
					month_value="01";
					break;
				case "2月":
					month_value="02";
					break;
				case "3月":
					month_value="03";
					break;
				case "4月":
					month_value="04";
					break;
				case "5月":
					month_value="05";
					break;
				case "6月":
					month_value="06";
					break;
				case "7月":
					month_value="07";
					break;
				case "8月":
					month_value="08";
					break;
				case "9月":
					month_value="09";
					break;
				case "10月":
					month_value="10";
					break;
				case "11月":
					month_value="11";
					break;
				case "12月":
					month_value="12";
					break;

			}
			var year_value=$("#select_year_input").val();
			var year_value_text=year_value.split(" ")[0];
			$("#birthday").val(year_value_text+"-"+month_value);
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
		validate.show_error(element, message);
		return false;
	} else {
		validate.clean_error(element);
		return true;
	}
}


$("#ownername").unbind("blur").bind("blur",check_ownername);

var status_flag;
function sumbit_btn_bind(){
	//if(check_xieyi()){
		if(!check_ownername($("#ownername"))){
			return;
		}
		if(!check_sex($("#gender"))){
			return;
		}
		
		if(!check_birthday_year()){
			return;	
		}
		if(!check_city($("#city_select"))){
			return;
		}
		if (!check_yuegongzi()) {
                   return;
         }
		
		if(!check_phonenumber($("#phone_number"))){
			return;
		}
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
                }else if(data["core-code"]=="0000"){
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
					if (typeof(pa_sdcajax)=="function"){pa_sdcajax("WT.pn_sku","小额消费贷款",false,"WT.page_name","填写资料",false, "WT.error_msg",error_msg,false);}
				}
				carSubmit();
			},
			error : function(data) {
				alert("系统忙");
			}
		});
		//carSubmit();
	//}
}
//提交
$("#submit_btn").bind("click",sumbit_btn_bind);

/*$("#yuedu").unbind("click").bind("click",function(){
		if($(this).attr("class").indexOf("checkbox_checked")>-1){
			$(this).removeClass("checkbox_checked").addClass("checkbox_enchecked");
			alert("需同意贷款预约须知");
		}
		else{
			$(this).removeClass("checkbox_enchecked").addClass("checkbox_checked");
		}
});*/
$("#tuijian").unbind("click").bind("click",function(){
	if($(this).attr("class").indexOf("checkbox_checked")>-1){
		$(this).removeClass("checkbox_checked").addClass("checkbox_enchecked");		
	}
	else{
		$(this).removeClass("checkbox_enchecked").addClass("checkbox_checked");
	}
});

$("#zcyzt").unbind("click").bind("click",function(){
		if($(this).attr("class").indexOf("checkbox_checked")>-1){
			$(this).removeClass("checkbox_checked").addClass("checkbox_enchecked");
			alert("建议注册一账通账号，登陆后可查看贷款审核和放款情况");
		}
		else{
			$(this).removeClass("checkbox_enchecked").addClass("checkbox_checked");
		}
});
	
	
$(".yuyuexuzhi").click(function(){
	
	var top=($(window).height()*1 - $('#yuyuexuzhi_div').height()*1)/2 + $(document).scrollTop()*1 +"px";
    $('#yuyuexuzhi_div').css("top",top);
	$("#yuyuexuzhi_div").css("display","block");	
	
});

$("#close").click(function(){
	$("#yuyuexuzhi_div").hide();		
});


function carSubmit(){//
	        var productId = $('#productId').val(),
                carOwner = $('#ownername').val(),
            	gender = $('#gender').val(),
            	birthday = $('#birthday').val(),
            	citySelect=$("#city_select").val(),
            	telephone = $('#phone_number').val(),
            	salary=$("#select_yuegongzi_input").val(),
            	productName=$("#productName").val();
            var WT_mc = $('#WT_mc_id').val();
            if(WT_mc=="" || WT_mc==null || WT_mc==undefined){
            	WT_mc="-";
            }
/*            
            var posid = $('#posid').val();
	        var aid = $('#aid').val();*/
	        var receive="";
	        if($("#tuijian").attr("class").indexOf("checkbox_checked")>-1){
	        	receive=1;
	        }else{
	        	receive=0;
	        }
            var citys=new Array(3);
            if(citySelect!=null){
 		         citys=citySelect.split("-");
 		   	    }
 		    var cityId=citys[0],
 		    	city=citys[2];
 		       
            var options = {
                data: {
                    productName: productName,
                    name: carOwner,
                    gender: gender,
                    city: city,
                    cityId: cityId,
                    birthday: birthday,
                    phoneNumber: telephone,
                    productId: productId,
                    isToa: status_flag,
                    salary: salary,
                    recommend: receive
                },
				type:'POST',
                callback: 'submitCallback',
                url: '/dingdanguanli/jinrongchaoshi/xiaoXiaoloanOrder.do'
            };
            _request_callback(options);
        }
        

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
	        	pa_sdcajax("WT.pn_sku","小额消费贷款",false,"WT.page_name",page_name,false,"WT.tx_i","dk_"+data.serialId,false,"WT.register_name",registerName,false);
	        }else{
	        	pa_sdcajax("WT.pn_sku","小额消费贷款",false,"WT.page_name",page_name,false,"WT.tx_i","dk_"+data.serialId,false);
	        }
			} 
		show_denglu_zhuce_qiche();
		//增加广告位
		$(document).trigger("addAdv20151201.PA");
		window.scrollTo(0,0);
	} else if (data.code == '1') {
		$.each(data,function(i,items){
			if(i!="code"){
				alert(items);
				error_msg=items;
				change_authChage();
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
		change_authChage();
	}
	if(error_msg!=""){
		if (typeof(pa_sdcajax)=="function"){pa_sdcajax("WT.pn_sku","小额消费贷款",false,"WT.page_name","填写资料",false, "WT.error_msg",error_msg,false);}
	}
	$("#submit_btn").bind("click",sumbit_btn_bind).css("background","#FF6600");
}
function show_denglu_zhuce_qiche(){
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
			}
		}
	});
}    
   _request_callback = function (options) {
            $.ajax({
            	  type:'post',
                url: daikuanContextPath + options.url,
                dataType: "jsonp",
                jsonpCallback: options.callback,
                timeout: options.timeout ? options.timeout : 50000,
                data: options.data ? options.data : {},
                context: options.content ? options.content : undefined,
                success: function (data) {
                },
                error:function (data) {
                	 alert("网路异常");
                	 change_authChage();
                }
            });
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
	if(!check_phonenumber(mob)){
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
		validate.show_error(input_authCode,"请输入图形验证码");
	}else{
		validate.show_error(input_authCode,"");
	}
});
var show_imagecode=false;
// 发送短信动态密码
function sendValidCode() {
	//判断手机号
	if(!check_phonenumber(input_phone)){
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
	  	validate.show_error(input_authCode,"请先输入图形验证码");
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
    	validate.show_error(input_phone,"手机号码不能为空");
    	btn_sms.unbind("click").bind('click', sendValidCode);
    } else if (wrap_authCode.css("display") != 'none' && input_authCode.val() == '') {
    	if(!show_imagecode){
    		validate.show_error(input_authCode,"请先输入图形验证码");
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
    	validate.show_error($('#validate_code'),"");
    	//show_error($('#validate_code'),"");
    }
}});
//检查动态码
var check_validate = function(){
    var validate_val = $('#validate_code').val();
    if(validate_val == ''){
        //show_error($('#validate_code'),"请输入短信动态码");
        validate.show_error($('#validate_code'),"请输入短信动态码");
        return false;
    }else if(validate_val.length>8){
    	validate.show_error($('#validate_code'),"动态码格式错误，请您重新输入");
        return false;
    }
    validate.show_error($('#validate_code'),"");
    return true;
}
var check_imagevcode=function(){
	if($("#validCode").val()=="" && $("#J-phoneLogin-authCode-wrap").css("display")!="none"){
		validate.show_error(input_authCode,"请输入图形验证码");
		return false;
	}else{
		validate.show_error(input_authCode,"");
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