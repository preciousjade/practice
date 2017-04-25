function Scroll(obj,speed,interval){ //父级容器，轮播速度，切换间隔
  $("."+obj).each(function(){
    var $box = $(this),
        $imgUl = $box.children(".imgList"),
        $imgLi = $imgUl.children("li"),
        $btnUl = $box.children(".btnList"),
        $btnLi = $btnUl.children("li"),
        $btnPreNex = $box.children(".pre-nex"),
        $btnPre = $box.children(".prev"),
        $btnNex = $box.children(".next"),
        n = $imgLi.length,
        width = $imgLi.width(),
        left = parseFloat($imgUl.css("left")),
        k = 0,
        Player;
    $imgUl.css("width",n*width);
    function scroll(){ //轮播事件
      $imgUl.stop().animate({left:-width},speed,function(){
        k += 1;
        $imgUl.css("left",0);
        $imgUl.children("li:first").appendTo($(this));
        $btnLi.removeClass('cur');
        if(k >= n){
          k = 0;
        }
        $btnUl.children("li").eq(k).addClass('cur');
      });
    }
    $btnLi.click(function(){ //点击事件
      var index = $btnLi.index(this);
      $(this).addClass('cur').siblings("li").removeClass('cur');
      if(index >= k){
        var dif = index-k;
        left = -dif*width;
        $imgUl.stop().animate({left:left},speed,function(){
          $imgUl.css("left",0);
          $imgUl.children("li:lt("+dif+")").appendTo($imgUl);
        });
      }
      else{
        var j = n-(k-index);
        $imgUl.css("left",(index-k)*width);
        $imgUl.children("li:lt("+j+")").appendTo($imgUl);
        $imgUl.stop().animate({left:0},speed);
      }
      k = index;
    });
    $btnPreNex.click(function(){ //左右按钮点击事件
      var index = $btnLi.index(this);
      if($(this).hasClass('next')){
        if(!$imgUl.is(":animated")){
          k += 1;
          $imgUl.animate({left:-width},speed,function(){
            $imgUl.css("left",0);
            $imgUl.children("li:first").appendTo($(this));
            if(k >= n){
              k = 0;
            }
            $btnUl.children("li").removeClass('cur').eq(k).addClass('cur');
          });
        }
      }
      else {
        if(!$imgUl.is(":animated")){
          k += -1;
          $imgUl.css("left",-width);
          $imgUl.children("li:last").prependTo($imgUl);
          $imgUl.stop().animate({left:0},speed);
          if(k < 0){
            k = n-1;
          }
          $btnUl.children("li").removeClass('cur').eq(k).addClass('cur');
        }
      }
    });
    $box.hover(  //鼠标移入、移出事件
        function(){
          clearInterval(Player);
          $btnPreNex.addClass('show');
        },
        function(){
          Player = setInterval(function(){scroll()},interval);
          $btnPreNex.removeClass('show');
        }
    );
    Player = setInterval(function(){scroll()},interval);
  });
}
$(function () {  //读取轮播事件
  Scroll("bannerCon",600,4000);
});
