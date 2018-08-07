$(function(){
  var productId = location.search.substring(4) || 20;
  // console.log(productId);
  
  $.get('http://193.112.55.79:9090/api/getmoneyctrlproduct',{productid:productId},function(res){
    console.log(res);
    // console.log(res.result[0].productComment);
    
    var mainHtml = template('main',{data:res.result[0]});
    $('.main').html(mainHtml);
    var commentHtml = template('comment',{data:res.result[0]});
    $('.comment').html(commentHtml);
    var footHtml = template('footer_tit',{data:res.result[0]});
    $('.foot_tit').html(footHtml);
  },'json')
})