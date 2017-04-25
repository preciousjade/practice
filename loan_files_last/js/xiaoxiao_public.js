(function(){
	var phonenumber_regular=/^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|14[0-9]{1}|17[0-9]{1})+[\d]{8})$/,//手机号码
    zip_code=/^[1-9][0-9]{5}$/,//邮编
	email=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_])+(.[a-zA-Z0-9_])+/,
	username=/^[\u4e00-\u9fa5]{2,10}$/,//纯汉字（2-5位）
	non_negative=/^\\d+$/,//非负数（正整敄1�7+0＄1�7
	positive_integer=/^[0-9]*[1-9][0-9]*$/,//正整敄1�7
	inter_float=/^[0-9]+\.{0,1}[0-9]{0,2}$/,//正数字或保留两位小数
	check_null=function(element,errorMsg){
		var value=$.trim($(element).val());
		if (value == "" || value == null || value==undefined) {
		show_error(element,errorMsg);
		return false;
		}else{
			return true;
		}

	},
	//显示错误信息
	show_error=function(element,errorMsg){
		clean_error(element);
		$(element).parent().next().html("<span style='color:red;font-size;8px;padding-left:3px'>"+errorMsg+"</span>");
	},
	//清除错误信息
	clean_error=function(element){
		$(element).parent().next().children().remove();
	},
	//校验长度
	check_length=function(element,errorMsg,min,max){
		var value=$.trim(element.value);
		if(value.length<min || value.length>max){
			show_error(element,"长度丄1�7"+min+"-"+max);
			return false;
		}
		else{
			return true;
		}
	},
	//正则校验
	check_regular=function(element,errorMsg,check_type){
		//var name_str = value.replace(/(^\s*)|(\s*$)/g, "");
		var value=$.trim($(element).val());
		var regular_str="";
		switch(check_type){
			case "phonenumber"://手机号码
				regular_str=phonenumber_regular;
				break;
			case "positive_integer"://正整敄1�7
				regular_str=positive_integer;
				break;
			case "username"://纯汉字（2-5位）
				regular_str=username;
				break;
			case "zip_code"://邮编
				regular_str=zip_code;
				break;
			case "non_negative"://非负数（正整敄1�7+0＄1�7
				regular_str=non_negative;
				break;
			case "email":
				regular_str=email;
				break;
			case "inter_float"://正数字或保留两位小数
				regular_str=inter_float;
				break;
		}
		if(regular_str==""){
			alert("正则表达式不存在＄1�7");
			return false;
		}
		if (!regular_str.test(value)) {
			show_error(element, errorMsg);
			return false;
		} else {
			clean_error(element);
			return true;
		}
	};
	window.validate = {
		check_null:check_null,
		check_length:check_length,
		check_regular:check_regular,
		show_error:show_error,
		clean_error:clean_error
	}


})();