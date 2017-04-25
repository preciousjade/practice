//得到路径中的参数

var source = window.location.search;

/*******************添加手机otp验证*****************/
// 发送短信动态密码的按钮
var btn_sms = $('#request_code'),
//手机文本框对象
    input_phone = $("#phone_number"),
// 缓存手机号
    tempPhoneNum,
// 图形验证码父级DIV
    wrap_authCode = $('#J-phoneLogin-authCode-wrap'),
// 图形验证码输入框
    input_authCode = $('#validCode'),
// 图形验证码图片
    img_authCode = $('#validateImg'),
// 切换图形验证码的按钮
    btn_authCodeChange = $('#J-changeVerifyImg'),
//图形验证码ID
    authCodeId,
// 短信动态密码ID
    smsCodeId,
// 短信动态密码输入框
    input_sms = $('#validate_code');
//绑定发送短信按钮
btn_sms.unbind("click").bind('click', sendValidCode);
input_phone.on({
    "blur": function () {
        var mob = $('#phone_number');
        if (!check_phonenumber(mob.val(), mob)) {
            return false;
        }
    }
});
//倒计时
var count_flag = 60;
var setInterval_obj;
function change_seconds() {
    $("#request_code").html(count_flag + "秒后可重新发送");
    $("#request_code").unbind("click");
    setInterval_obj = setInterval(function () {
        count_flag--;
        if (count_flag == 0) {
            $("#request_code").html("获取动态码");
            count_flag = 60;
            window.clearInterval(setInterval_obj);
            btn_sms.unbind("click").bind('click', sendValidCode);
        }
        else {
            $("#request_code").html(count_flag + "秒后可重新发送");
        }
    }, 1000);
}
input_authCode.on("blur", function () {
    if (input_authCode.val() == "") {
        show_error("validCode", "请输入图形验证码", "true");
    } else {
        clear_span("validCode");
    }
});
var show_imagecode = false;
// 发送短信动态密码
function sendValidCode() {
    //判断手机号
    if (!check_phonenumber(input_phone.val(), input_phone)) {
        return false;
    }

    // 手机号变更重发验证码。
    if (input_phone.val() != tempPhoneNum) {

        // 手机号有改变
        tempPhoneNum = input_phone.val();
        sendAuthCode();
    } else if (input_phone.val() == tempPhoneNum && wrap_authCode.css("display") == 'none') {
        // 手机号没改变 且 不显示图形验证码的情况
        sendAuthCode();
    }
    //合加
    else if (wrap_authCode.css("display") == "block" && input_authCode.val() == "") {//如果图形验证码显示且验证码框为空
        show_error("validCode", "请先输入图形验证码", "true");
    }
    //
    else {
        // 手机号没改变 且 显示图形验证码的情况
        sendCode();
    }
}
//判断是否显示图形验证码
function sendAuthCode() {
    btn_sms.unbind('click');
    // 验证码AJAX
    ajaxAuthCode('otp', function (data) {

        // 记录图形验证码ID
        authCodeId = data.id;

        // 显示图形验证码
        if (data.type == '0') {
            wrap_authCode.show();
            img_authCode.attr('src', data.img);
            input_authCode.val('');
            show_imagecode = true;
        } else {
            wrap_authCode.hide();
            show_imagecode = false;
        }
        btn_sms.unbind("click").bind('click', sendValidCode);
        sendCode();
    });
}
//图形验证码AJAX
function ajaxAuthCode(type, callback) {
    var self = this,
        url = memberi_context_path + '/pinganone/pa/paic/common/appvcode.do',
        data = {
            /*userId: type == 'otp' ? input_phone.val() : $('#userID').val(),*/
            userId: input_phone.val(),
            appId: '10191',
            subsys: type
        },
        options = {
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: data,
            jsonp: 'callBack',
            success: function (res) {
                callback && callback(res);
            }
        };
    $.ajax(options);
}


//校验图形验证码
function check_valicode() {
    btn_sms.unbind('click');
    ajaxviliCode(function (data) {
        if (data.data.returnCode == '0000') {
            change_seconds();
            // 短信动态密码AJAX
            ajaxSmsCode(function (data) {
                if (data.status == 'success') {
                    smsCodeId = data.data.activeId;
                } else if (data.status == 'fail') {
                    alert(data.data.errorMessage);
                    change_authChage();
                }
            });

        } else {
            var error_msg = "";
            switch (data.data.returnCode) {
                case "0002":
                    error_msg = "验证码已失效";
                    break;
                case "0012":
                    error_msg = "重复操作";
                    break;
                case "0001":
                    error_msg = "验证码已过期";
                    break;
                case "0011":
                    error_msg = "请求超时";
                    break;
                case "0003":
                    error_msg = "验证码错误";
                    break;
                case "0004":
                    error_msg = "验证码无效";
                    break;
                case "0014":
                    error_msg = "非法请求";
                    break;
                case "0005":
                    error_msg = "无效请求";
                    break;
                case "0009":
                    error_msg = "系统异常";
                    break;
            }
            alert(error_msg);
            change_authChage();
            btn_sms.unbind("click").bind('click', sendValidCode);
        }
    });

}


//校验图形验证码AJAX
function ajaxviliCode(callback) {
    var self = this,
        url = memberi_context_path + '/pinganone/pa/checkAppVcode.do';
    if (!self.authCodeId) {
        return;
    }
    var data = {
            userId: input_phone.val(),
            validCodeId: authCodeId,
            validCode: input_authCode.val(),
            appId: '10191'
            //otpType: '00'
        },
        options = {
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function (res) {
                callback && callback(res);
            }
        };

    $.ajax(options);
}

//获取短信动态密码
function sendCode() {
    // 前端校验
    if (input_phone.val() == '') {
        show_error("phone_number", "手机号码不能为空");
        btn_sms.unbind("click").bind('click', sendValidCode);
    } else if (wrap_authCode.css("display") != 'none' && input_authCode.val() == '') {
        if (!show_imagecode) {
            show_error("validCode", "请先输入图形验证码", "true");
            btn_sms.unbind("click").bind('click', sendValidCode);
        }

    } else {
        if (wrap_authCode.css("display") != 'none' && input_authCode.val() != '') {
            check_valicode();
        } else {
            change_seconds();
            // 短信动态密码AJAX
            btn_sms.unbind('click');
            ajaxSmsCode(function (data) {
                if (data.status == 'success') {

                    smsCodeId = data.data.activeId;

                } else if (data.status == 'fail') {
                    alert(data.data.errorMessage);
                    change_authChage();
                }

            });
        }
    }
}

//短信动态密码AJAX
function ajaxSmsCode(callback) {
    var self = this,
        url = memberi_context_path + '/pinganone/pa/sendShortMessageBfappvcode.do';
    if (!self.authCodeId) {
        return;
    }
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
            success: function (res) {
                callback && callback(res);
            }
        };

    $.ajax(options);
}
function change_authChage() {
    // 验证码AJAX
    ajaxAuthCode('otp', function (data) {
        // 显示图形验证码
        if (data.type == '0') {
            wrap_authCode.show();
            img_authCode.attr('src', data.img);
            input_authCode.val('');
            show_imagecode = true;
        } else {
            wrap_authCode.hide();
            show_imagecode = false;
        }
        // 记录图形验证码ID
        authCodeId = data.id;
    });
}

btn_authCodeChange.unbind("click").bind('click', change_authChage);

//动态码验证
$("#validate_code").on({
    "blur": function () {
        if (!check_validate()) {
            return false;
        }
        else {
            clear_span("validate_code");
        }
        // else{
        //     show_error("validate_code","","true");
        // }
    }
});
$("#userName").on('blur', function (event) {
    if (!checkUsername()) {
        return false;
    } else {
        clear_span("userName");
    }
});
//检查称呼
function checkUsername() {
    var reg = /^[\u4e00-\u9fa5]{2,5}$/;
    var userNm = $("#userName").val();
    if (!reg.test(userNm)) {
        show_error("userName", "请输入正确称呼");
        return false;
    }
    return true;
}
//检查动态码
var check_validate = function () {
    var validate = $('#validate_code').val();
    if (validate == '') {
        show_error('validate_code', "请输入短信动态码", "true");
        return false;
    } else if (validate.length > 8) {
        show_error('validate_code', "动态码格式错误，请您重新输入", "true");
        return false;
    }
    clear_span('validate_code');
    return true;
}
var check_imagevcode = function () {
    if ($("#validCode").val() == "" && $("#J-phoneLogin-authCode-wrap").css("display") != "none") {
        show_error("validCode", "请输入图形验证码", "true");
        return false;
    } else {
        clear_span("validCode");
        return true;
    }
}

var oHead = document.getElementsByTagName('BODY').item(0);
var oScript = document.createElement("script");
oScript.type = "text/javascript";
oScript.src = jksJSURL;
oHead.appendChild(oScript);

//机器识别码添加隐藏域
function submitRegister() {
    try {
        addGatherCollection(document.forms[0]);
    } catch (e) {
    }
    //document.forms[1].submit();
}

// $("#title_div a").each(function(){
//     $(this).bind("click",function(){
//         if(window.top!=window.self){
//                    window.top.location.replace($(this).attr("href"));
//                    return false;
//          }
//     });
// });


function sumbit_btn_bind() {//提交
    if (!checkUsername()) {
        return;
    }
    if (!check_phonenumber($("#phone_number").val(), $("#phone_number"))) {
        return;
    }
    if (!check_imagevcode()) {
        return;
    }
    if (!check_validate()) {
        return;
    }
    if (smsCodeId == "" || smsCodeId == undefined || smsCodeId == null) {
        alert("请先获取短信验证码");
        return;
    }
    $("#submit_btn").unbind("click").css("background", "#ddd");
    submitRegister();
    var input_sms_val = input_sms.val();//短信验证码
    input_sms_val = input_sms_val.replace(/(^\s*)|(\s*$)/g, "");
    $.ajax({
        type: 'POST',
        url: "/common/registerMemberByOtp.do",
        dataType: "json",
        data: {
            appId: "10191",
            mobileNo: input_phone.val(),
            activeId: smsCodeId,
            activeNo: input_sms_val,//短信验证码
            gatherJKSR: $("#gatherJKSR").val(),
            gatherJKSC: $("input[name='gatherJKSC']").val()
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data) {
            var error_msg = "";
            if (data["core-code"] == "0001") {
                status_flag = "0";
            } else if (data["core-code"] == "0000" || data["core-code"] == "0012") {
                status_flag = "1";
            }
            else if (data["core-code"] == "0018") {
                error_msg = "验证码已过期";
                alert("验证码已过期");
                change_authChage();
                $("#submit_btn").unbind("click").bind("click", sumbit_btn_bind).css("background", "#FF6600");
                return;
            }
            else if (data["core-code"] == "0019") {
                error_msg = "验证码错误";
                alert("验证码错误");
                change_authChage();
                $("#submit_btn").unbind("click").bind("click", sumbit_btn_bind).css("background", "#FF6600");
                return;
            }
            else if (data["core-code"] == "0020") {
                error_msg = "验证码无效";
                alert("验证码无效");
                change_authChage();
                $("#submit_btn").unbind("click").bind("click", sumbit_btn_bind).css("background", "#FF6600");
                return;
            }
            else {
                status_flag = 0;
            }
            if (error_msg != "") {
                if (typeof(pa_sdcajax) == "function") {
                    pa_sdcajax("WT.pn_sku", "快速获客", false, "WT.page_name", "填写资料", false, "WT.error_msg", error_msg, false);
                }
            }
            //提交前
            var post_url = "/dingdanguanli/jinrongchaoshi/unifyLoan.do" + source;
            var data1 = {
                customerName: $("#userName").val(),
                telephone: $("#phone_number").val(),
                productId: "00239791",
                isToa: status_flag
            };
            ///提交
            final_submit(post_url, data1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统忙");
            change_authChage();
            $("#submit_btn").unbind("click").bind("click", sumbit_btn_bind).css("background", "#FF6600");
        }
    });
}
$("#submit_btn").bind("click", sumbit_btn_bind);
//验证手机号码
function check_phonenumber(value, element) {
    var message = "";
    value = $.trim(value);
    if (value == "" || value == null) {
        message = "请输入手机号码";
        show_errorTws("phone_number", message);
        return false;
    }
    else {
        var name_str = value.replace(/(^\s*)|(\s*$)/g, "");
        //var reg=/^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1})+[\d]{8})$/;
        var reg = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|14[0-9]{1}|17[0-9]{1})+[\d]{8})$/;
        if (!reg.test(name_str)) {
            message = "请正确输入手机号码";
            show_errorTws("phone_number", message);
            return false;
        }
        else {
            clear_span("phone_number");
            return true;
        }
    }
}
function show_error(element, msg, flag) {
    $(".error").show();
    $(".error").text(msg);
}
function show_errorTws(element, message) {
    $(".error").show();
    $(".error").text(message);
    //clear_span(element);
    // $(element).next().html("<span style='color:red;font-size;8px;padding-left:3px'>"+message+"</span>");
}

function clear_span(element) {
    //$(".error").hide();
    $(".error").text("");
    //$(element).parent().find("span").text("");
}
perfectInfo = function (serialId) {
    //var ifrUrl = daikuanContextPath + "/banner_wsxx_proxy.shtml?serialId=" + serialId;
    //$("#jxwsxxIframe").attr('src', ifrUrl);
    $('#banner_wsxx').attr('src', daikuanContextPath+'/banner_tyhkwsxx.shtml?serialId=' + serialId);
    $('.wsxxifme').show();
    $('.alert-bg').show();
};

final_submit = function (post_url, data1) {
    //var  callback='jsonp'; 
    $.ajax({
        type: 'post',
        url: post_url,
        data: data1,
        dataType: 'jsonp',
        callback: 'callback',
        success: function (data) {
            var error_msg = "";
            if ("0" == data.code) {
                var succq = "注册用户成功";
                if (data1.isToa * 1 == 1) {
                    succq = "一账通用户成功";
                } else {
                    succq = "注册用户成功";
                }
                if (typeof(pa_sdcajax) == "function") {
                    pa_sdcajax("WT.pn_sku", "快速获客", false, "WT.page_name", succq, false);
                }
                $(".kstl").hide();
                $(".alertk").show();
                //$("#jompLink").attr("href",chaoshi_context_path+"/site/daikuanPingAnCom/banner_tyhkwsxx.jsp?serialId="+data.serialId);
                $("#jompLink").bind('click', function () {
                    perfectInfo(data.serialId);
                });
                // if(window.top!=window.self){
                //           window.top.location.replace("http://daikuan.pingan.com");
                //           return false;
                // }
            }
            // else if(data.data == '验证码错误'){
            //          error_msg="验证码错误";
            //          //setCodeError(data);
            //          change_authChage();

            // }
            else {
                error_msg = data.message;
                alert(error_msg);
                change_authChage();
            }
            if (data.code != "0") {
                if (typeof(pa_sdcajax) == "function") {
                    pa_sdcajax("WT.pn_sku", "快速获客", false, "WT.page_name", "填写资料", false, "WT.error_msg", error_msg, false);
                }

            }
            $("#submit_btn").unbind("click").bind("click", sumbit_btn_bind).css("background", "#FF6600");
        },
        error: function () {
            if (typeof(pa_sdcajax) == "function") {
                pa_sdcajax("WT.pn_sku", "快速获客", false, "WT.page_name", "填写资料", false, "WT.error_msg", "您输入的姓名或手机号码有误，请更正", false);
            }
            alert("您输入的姓名或手机号码有误，请更正");
            change_authChage();
            $("#btn_a_copy").unbind("click").bind("click", sumbit_btn_bind).css("background", "#FF6600");
        }
    });
}
backHome = function () {
    window.location.href = window.location.href
}