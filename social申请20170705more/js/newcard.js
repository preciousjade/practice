function step1() {
    // document.getElementById("form1").style.visibility = "visible";
    // document.getElementById("form2").style.visibility = "collapse";
    // document.getElementById("form3").style.visibility = "collapse";
    $("#form1").show();
    $("#form2").hide();
    $("#form3").hide();
    $("#file").hide();
}

step1();

function step2() {
    $("#form1").hide();
    $("#form2").show();
    $("#form3").hide();
    $("#progressImg").attr('src',"images/progress2.png");    

    // document.getElementById("form1").style.visibility = "collapse";
    // document.getElementById("form2").style.visibility = "visible";
    // document.getElementById("form3").style.visibility = "collapse";
}


function step3() {
    $("#form1").hide();
    $("#form2").hide();
    $("#form3").show();
    $("#progressImg").attr('src',"images/progress3.png");
    $("#nameSpan").text($("#name").val());
    $("#phoneSpan").text($("#phone").val());
    $("#identitySpan").text($("#identity").val());
    $("#typeSpan").text($("#type").val());
    $("#bankSpan").text($("#bank").val());
    preview3(uploadedFile);
    // document.getElementById("form1").style.visibility = "collapse";
    // document.getElementById("form2").style.visibility = "collapse";
    // document.getElementById("form3").style.visibility = "visible";
}

function radioClick(value) {
    if (value === "个人上传") {
        $("#file").show();
    } else {
        $("#file").hide();
    }
}

var uploadedFile;
function upload(file) {
    uploadedFile = file;
    alert("上传图片成功！");
}

function preview2(file) {
    var prevDiv = document.getElementById('preview2');
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
        }
        reader.readAsDataURL(file.files[0]);
    }
    else {
        prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
    $("#file").hide();

}


function preview3(file) {
    var prevDiv = document.getElementById('preview3');
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
        }
        reader.readAsDataURL(file.files[0]);
    }
    else {
        prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
}


function a(){
    var name = $("#name").val();
    var re1 = /^[\u4E00-\u9FA5]{1,6}$/;
    if (!re1.test(name)&&$.trim($('#name').val()).length > 0) {
        $("#nameMsg").text("请输入中文姓名");
        return false;
    }else{
        $("#nameMsg").text("");
        return true;
    }
}
function b(){
    var identity = $("#identity").val();
    var re1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!re1.test(identity)&&$.trim($('#identity').val()).length > 0) {
        $("#identityMsg").text("请输入正确的身份证号。");
        return false;
    }else{
        $("#identityMsg").text("");
        return true;
    }
}