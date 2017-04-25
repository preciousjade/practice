 //*************************************************
 //新一代，小消，经营贷款，详情页
//************************************************
$(function(){
			
});
		
document.body.style.background="#fff";	
//弹出框
$("#lijiyuyue_a").click(function(){
		
		$("#backg").css({"display":"block","height":"1800px"});
		
		$("#yuyue_name").val("");
		$("#yuyue_phonenum").val("");
		$("#yuyue_yanzhengma").val("");
	
		
		var top=($(window).height()*1 - $('#lijiyuyue_div').height()*1)/2 + $(document).scrollTop()*1 +"px";
		
        $('#lijiyuyue_div').css("top",top);
		$("#lijiyuyue_div").css("display","block");	
		$("#yuyue_iframe").attr("src",daikuanContextPath+"/lijiyuyue_form.shtml?productId="+$("#productId").val()+"&product_name="+encodeURIComponent($("#productName").val()));
});
//弹出框
$("#lijiyuyue_a_copy").click(function(){
		
		
		$("#backg").css({"display":"block","height":"1800px"});
		
		$("#yuyue_name").val("");
		$("#yuyue_phonenum").val("");
		
		var top=($(window).height()*1 - $('#lijiyuyue_div').height()*1)/2 + $(document).scrollTop()*1 +"px";
		
        $('#lijiyuyue_div').css("top",top);
		$("#lijiyuyue_div").css("display","block");	
		$("#yuyue_iframe").attr("src",daikuanContextPath+"/lijiyuyue_form.shtml?productId="+$("#productId").val()+"&product_name="+encodeURIComponent($("#productName").val()));
		
});
$("#close").click(function(){
	$("#lijiyuyue_div").css("display","none");		
	$("#backg").css("display","none");
	$("#yuyue_iframe").attr("src","");
	//$("#yuyue_name").css("color","#000000").css("border","1px solid #e5e5e5");
	//$("#yuyue_phonenum").css("color","#000000").css("border","1px solid #e5e5e5");
	//$("#yuyue_yanzhengma").css("color","#000000").css("border","1px solid #e5e5e5");
});




//筛选条件悬浮	

$(function(){
  var buyT=0,
	    clearT = null,
		  buyT=$("#div_fix").offset().top,
		  move = function(){
		  	var winScroll=$(window).scrollTop();
			  if(winScroll>=buyT)
			  {
				  //$("#div_fix").css({"position":"fixed","top":"0"});
				 // console.log("fixed")
				 	$("#div_fix_copy").css("display","block");
			  }
			  else
			  {
				  //$("#div_fix").css({"position":"","top":""});
				  //console.log("relative");
				  $("#div_fix_copy").css("display","none");
			  };	
		  };
  
  
  $(window).scroll(function(){
  	
  	move();
	  
  });

});	

var cont_0=$("#tiaojian_temp").html()+$("#shuoming_temp").html()+$("#ziliao_temp").html()+$("#jiehuo_temp").html();
$("#cont_0").html(cont_0);
$("#cont_1").html($("#shuoming_temp").html());
$("#cont_2").html($("#ziliao_temp").html());
$("#cont_3").html($("#jiehuo_temp").html());



$("#div_fix .top_ul ul li").each(function(){
		$(this).mouseover(function(){
					$(this).siblings().removeClass("current");
				$(this).siblings().addClass("no_current");
				$(this).removeClass("no_current");
				$(this).addClass("current");
				
				
				var index_div=$(this).index();
				
				for(var i=0;i<4; i++)
				{
					$("#cont_"+i).css("display","none");
					
					//$("#cont_"+i).addClass("hidden");	
				}
				//$("#cont_"+index_div).addClass("show");
				$("#cont_"+index_div).css("display","block");

				/*
				var div_array=$("#div_3 .div_ul .div_one");
				
				div_array.each(function(){
						if($(this).index()==index_div){
							$(this).removeClass("hidden");
							$(this).addClass("show");
						}
						else{
								$(this).removeClass("show");
								$(this).addClass("hidden");
						}
					});
				*/
				//console.log($(this).index());
			});
	
	});	
$("#div_fix_copy .top_ul_copy ul li").each(function(){
		$(this).mouseover(function(){
					$(this).siblings().removeClass("current_copy");
				$(this).siblings().addClass("no_current_copy");
				$(this).removeClass("no_current_copy");
				$(this).addClass("current_copy");
				
				
				var index_div=$(this).index();
				
				for(var i=0;i<4; i++)
				{
					$("#cont_"+i).css("display","none");
					
					//$("#cont_"+i).addClass("hidden");	
				}
				//$("#cont_"+index_div).addClass("show");
				$("#cont_"+index_div).css("display","block");

				/*
				var div_array=$("#div_3 .div_ul .div_one");
				
				div_array.each(function(){
						if($(this).index()==index_div){
							$(this).removeClass("hidden");
							$(this).addClass("show");
						}
						else{
								$(this).removeClass("show");
								$(this).addClass("hidden");
						}
					});
				*/
				//console.log($(this).index());
			});
	
	});	

//窗口弹出


	
