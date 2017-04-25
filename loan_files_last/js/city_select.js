// JavaScript Document
(function(){
	//命名空间
	 window.city_select = function(options){
		var self = this;
		
		//ajax地址url
		self.ajax = {
			//getCity : "index.php?_c=goods&_a=get_cities",
			//getCity : "http://10.189.205.69/Apply/getRegion",
			getCity : chaoshi_context_path+"/loan/getCity.do",
//			getCity : "http://toa-emall.dmzstg.pingan.com/loan/getCity.do",
			//getCity : "http://pinganbank.api.stg2.24money.com/api/Apply/getRegion",//测试环境
			//http://pinganbank.24money.com/api/Apply/getRegion  生产环境
			getArea : "",
                        fromName : ""
		};
		
		//容器
		self.element = null;
		
		//选择的城市
		self.selected = {
			cityid : 0,
			cityname : "",
			areaid : 0,
			areaname : ""
		};
		
		//初始化
		self.init = function(options){
			self.element = options.element;
			
			if(self.element.length == 0){
				return;
			}
			
			self.eventInit();
		}
		
		//初始化所有事件
		self.eventInit = function(){
			//hover 控制显示隐藏
			self.element.find(".selecttext").click(function(){
				self.element.find(".city_select").show();
                                var fromName = $(this).attr("data-name");
                                self.ajax.fromName = fromName;
			});
			
			//关闭按钮
			self.element.find(".city_close").click(function(){
				self.element.find(".city_select").hide();
			});
			
			//获取初始化城市信息数据
			self.setCityInfo();
			
			//为tabs增加事件
			self.element.find(".tablist a").click(function(){
				var lis = self.element.find(".tablist li");
				var index = lis.index($(this).parent());
				
				lis.removeClass("current");
				lis.eq(index).addClass("current");
				
				var list = self.element.find(".city_cont .slist");
				
				list.hide();
				list.eq(index).show();
			});
			
			//为城市链接增加事件
			self.element.delegate(".citylist a","click",function(){
				var cityid = $(this).attr("data-id");
				self.setAreaInfo(cityid);
				
				self.selected.cityid = cityid;
				self.selected.cityname = $(this).text();
			});
			
			//为区块链接增加事件
			self.element.delegate(".arealist a","click",function(){
				var areaid = $(this).attr("data-id");
				
				self.selected.areaid = areaid;
				self.selected.areaname = $(this).text();
				
				//设置citytext
				self.setCityText();
			});
		}
		//初始化城市信息数据
		self.setCityInfo = function(){
                    $.ajax({
			url : self.ajax.getCity,
			type : "GET",
			cache : true,
			dataType:'jsonp',
			jsonp:'callback',
			success : function(data_data){
				self.fillCityInfo(data_data.data);
			}
                    });
			//测试信息
//			self.fillCityInfo(getCityData());
		}
		
		//创建城市信息html
		self.fillCityInfo = function(data){
			var html = '<li><a href="javascript:void(0)" data-id="{dataid}">{cityname}</a></li>';
			var string = '';
			
			for(var i = 0;i<data.length;i++){
				string += html.replace(/{dataid}/,data[i].region_id).replace(/{cityname}/,data[i].region_name);
			}
			
			self.element.find(".citylist").empty().append(string);
		}
		
		//获取区块信息
		self.setAreaInfo = function(cityid){
					self.fillAreaInfo([]);
                    $.ajax({
                        url: self.ajax.getCity,
                        type: "POST",
                        cache: false,
						dataType:'jsonp',
						jsonp:'callback',
                        data: {
                            province_id: cityid
                        },
                        success: function(data_data) {
                            self.fillAreaInfo(data_data.data);
                        }
                    });
			//测试信息
			//self.fillAreaInfo(getAreaInfo(cityid-1));
			
			self.element.find(".tablist a:eq(1)").trigger("click");
		}
		
		//创建区块html
		self.fillAreaInfo = function(data){
			var html = '<li><a href="javascript:void(0)" data-id="{dataid}">{areaname}</a></li>';
			var string = '';
			
			for(var i = 0;i<data.length;i++){
				string += html.replace(/{dataid}/,data[i].region_id).replace(/{areaname}/,data[i].region_name);
			}
			
			self.element.find(".arealist").empty().append(string);
		}
		
		//设置选择的城市区块信息
		self.setCityText = function(){
			var cityname = self.selected.cityname;
                        var cityId = self.selected.areaid;
                        var name = self.ajax.fromName;
			var reg = /[北京|上海]/;
			
			if(!reg.test(cityname) && self.element.attr("btrue")=="true"){
				//self.element.parents("td").find(".tips").text("目前仅限京牌、沪牌车辆可申请办理").show();
			}else{
				//self.element.parents("td").find(".tips").hide();
			}
			$("input[name="+name+"]").val(cityId+"-"+cityname+"-"+self.selected.areaname);
			self.element.find(".selecttext").addClass("f-c-666").text(cityname + self.selected.areaname);
			self.element.find(".city_close").trigger("click");
		};
		
		self.init(options);
	}
})();

$(function(){
	//初始化选择城市
	$(".J_city_select").each(function(){
		var $cs = $(this);
		new city_select({
			element : $cs
		});
	});
	
})