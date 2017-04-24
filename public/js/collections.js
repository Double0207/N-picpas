/**
 * Created by Administrator on 2017/4/20.
 */
$(document).ready(function(){
    $(window).on("load",function(){
        imglocation()
    });
});

function imglocation(){

    var picWidth=$(".cont-pic").eq(0).width();
    var num=Math.floor($(".cont-box").width()/picWidth);
    var picArr=[];      //定义一个数用来储存cont-pic的高度
    $(".cont-pic").each(function(index,value){
       //console.log(index+"--"+value);
        var picHeight=$(".cont-pic").eq(index).height();
        if(index<num){
            picArr[index]=picHeight;
            //console.log(picHeight);
        }else{
            var minpicHeight=Math.min.apply(null,picArr);
            //console.log(minpicHeight);
            var minpicIndex=$.inArray(minpicHeight,picArr);
            //console.log(minpicIndex);
            //console.log(value);
            $(value).css({
                "position":"absolute",
                "top":minpicHeight,
                "left":$(".cont-pic").eq(minpicIndex).position().left
            });
            picArr[minpicIndex]+=$(".cont-pic").eq(index).height();
        }
    });
}
/*弹框事件*/
var pg=1;
$(".zhuanji-button").click(function(){
    if(pg==1){
        $(".page-login-bottom").show();
        pg=2;
    }else{
        $(".page-login-bottom").hide();
        pg=1;
    }

})

/*图片移入移出事件*/
var $box_top=$(".box-top");
var $box_buttom=$(".box-buttom");
$(".cont-pic").each(function(i){
    this.onmouseover=function(){
        $box_top.eq(i).show();
        $box_buttom.eq(i).show();
    }
    this.onmouseout=function(){
        $box_top.eq(i).hide();
        $box_buttom.eq(i).hide();
    }
})