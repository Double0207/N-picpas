// /**
//  * Created by Administrator on 2017/4/19.
//  */
// var dialogModal=document.getElementById("dialogModal");

// var showdialogModal;
// var closedialogModal;
//上传照片
function showdialogModal() {
    document.getElementById("dialogModal").style.display="block";
}
function closedialogModal(){
    document.getElementById("dialogModal").style.display="none";
}


//购物车
function updateTotal() {
    var items = $('div.shopping-cart-items:first div.item');
    $('#cart-total-box .total-items span').text(items.length);
    var total = 0;
    items.each(function(){total += parseInt($(this).find('.price-money span').text(), 10);});
    $('#cart-total-box h3 span').text(total);
}
function removeCartItem(btn) {
    btn = $(btn);
    var item = btn.parents('div.item:first');
    item.hide();
    $.post('shopping-cart/remove-item', {request: item.attr('request'), product: item.attr('product')}, function(response){
        item.appendTo('div.shopping-cart-items.removed');
        item.show();
        showFlashMessage(response);
        updateTotal();
        $('div.shopping-cart-items.removed > h3').show();
    });
}
function restoreCartItem(btn) {
    btn = $(btn);
    var item = btn.parents('div.item:first');
    item.hide();
    $.post('shopping-cart/add-item', {request: item.attr('request'), product: item.attr('product')}, function(response){
        item.appendTo('div.shopping-cart-items:first');
        item.show();
        showFlashMessage(response);
        updateTotal();
        if (! $('div.shopping-cart-items.removed div.item').length) {
            $('div.shopping-cart-items.removed > h3').hide();
        }
    });
}
$(document).ready(function(){
    $(window).scroll(function(){
        var b = $('#cart-total-box');
        if (! b) return;
        if (b.parent().width() == b.parent().prev().width()) return true;
        var s = $(window).scrollTop();
        if (s < b.parent().prev().height()) b.css('margin-top', s);
    });
});



