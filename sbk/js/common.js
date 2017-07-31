    function handleMenuMouseOver(menuName) {
    switch (menuName) {
        case "状态查询":
            $("#imgSearchWhite").attr('src', "images/c_search_white.png");
            break;
        case "新卡申领":
            $("#imgAppli").attr('src', "images/c_appli.png");
            break;
        case "卡片挂失":
            $("#imgReportLoss").attr('src', "images/c_report_loss.png");
            break;
        case "相关知识":
            $("#imgKnowledge").attr('src', "images/c_knowledge.png");
            break;
        case "补卡网点":
            $("#imgCardAddr").attr('src', "images/c_card_addr.png");
            break;
        case "密码修改":
            $("#imgChangePass").attr('src', "images/c_change_pass.png");
            break;
        default:
            break;
    }
}

function handleMenuMouseOut(menuName, currentPageName) {
    switch (menuName) {
        case "状态查询":
            $("#imgSearchWhite").attr('src', "images/search_white.png");
            if (currentPageName === "状态查询") {
                $("#imgSearchWhite").attr('src', "images/c_search_white.png");
            }
            break;
        case "新卡申领":
            $("#imgAppli").attr('src', "images/appli.png");
            if (currentPageName === "新卡申领") {
                $("#imgAppli").attr('src', "images/c_appli.png");
            }
            break;
        case "卡片挂失":
            $("#imgReportLoss").attr('src', "images/report_loss.png");
            if (currentPageName === "卡片挂失") {
                $("#imgReportLoss").attr('src', "images/c_report_loss.png");
            }
            break;
        case "相关知识":
            $("#imgKnowledge").attr('src', "images/knowledge.png");
            if (currentPageName === "相关知识") {
                $("#imgKnowledge").attr('src', "images/c_knowledge.png");
            }
            break;
        case "补卡网点":
            $("#imgCardAddr").attr('src', "images/card_addr.png");
            if (currentPageName === "补卡网点") {
                $("#imgCardAddr").attr('src', "images/c_card_addr.png");
            }
            break;
        case "密码修改":
            $("#imgChangePass").attr('src', "images/change_pass.png");
            if (currentPageName === "密码修改") {
                $("#imgChangePass").attr('src', "images/c_change_pass.png");
            }
            break;
        default:
            break;
    }
}

