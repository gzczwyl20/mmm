$(function(){
  $.get('http://193.112.55.79:9090/api/getbrandtitle',function(res){
    // console.log(res);
    var html = template('main',{data:res.result})
    $('.main .content-box').html(html);
  },'json')
})