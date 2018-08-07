$(function () {
  $.get('http://193.112.55.79:9090/api/getcategorytitle', function (res) {
    // console.log(res);
    var titleHtml = template('title', {
      data: res.result
    });
    $('.brief-box').html(titleHtml);
    $('.brief-box').on('tap','a',function(){
      if($(this).find('.up').css('display') == 'none'){
        $(this).find('.up').css('display','block');
        $(this).find('.down').css('display','none');
        $(this).siblings().find('.up').css('display','none');
        $(this).siblings().find('.down').css('display','block');
        // console.log(this.dataset.id);
        var titleid = this.dataset.id;
        var that = $(this).next();
        $.get('http://193.112.55.79:9090/api/getcategory',{'titleid':titleid},function(res){
          // console.log(res);
          var contentHtml = template('content',{data:res.result});
          that.html(contentHtml)
          that.siblings('.content').html("");
        },'json')
       }else{
        $(this).find('.up').css('display','none');
        $(this).find('.down').css('display','block');
        $(this).siblings('.content').html("");
      }
      
      
    })
  }, 'json')

  // 广告关闭
  $('.ad_close').on('tap',function(){
      $('.ad').fadeOut();    
  })
})