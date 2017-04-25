$(function () {
	$(document).on("addAdv20151201.PA", function (e, advContainer, advQYIDArr) {
		$.ajax({
			"url": "http://www.pingan.com/adng/json",
			"data": {
				"areaId": (advQYIDArr || ["QY15120312311406", "QY15120312310505", "QY15120312305804", "QY15120312305103"]).join()
			},
			"dataType": "jsonp",
			"success": function (data) {
				var $tempContainer = $("<div></div>");
				$.each(data.data, function (idx, val) {
					var currData = val;
					$("<div style='float:left; width:215px; height:180px; margin-left:" + (idx>0?"20":"0") + "px;'></div>").
						append("<a href='" + currData.adLink + "' target='_blank' style='display:block; width:100%; height:100%;'></a>", {
							"href": currData.adLink,
							"areadesc": currData.areaDesc,
							"adlink": currData.adLink,
							"areaid": currData.areaId,
							"adname": currData.adName,
							"materrial_id": currData.advertId
						}).
						find("a").append("<img src='" + currData.adUrl + "' style='display:block; width:100%; height:100%; border:none;'>").
						closest("div").appendTo($tempContainer);
				});
				$(advContainer || "#new_adv").css({"overflow": "hidden"}).append($tempContainer.children());
			}
		});
	});
});