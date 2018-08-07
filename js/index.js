$(function(){
  // 获取nav数据
  $.get('http://193.112.55.79:9090/api/getindexmenu','',function(res){
    // console.log(res);
    $.each(res.result,function(i,item){
        var img  = item.img    
        img = img.split('"')[1];
       // console.log(img);
       item.img = img
    })
    
    var navHtml = template('mm_nav',{data:res.result})
    // console.log(html);
    $('.mm_nav').html(navHtml);


    // 点击加载更多
  $(".mm_nav a").eq(7).on('click',function(e){
    var txt = $(this).find('p').text();
    if(txt == '更多'){
      $('.mm_nav').css('height',300);    
      $(this).find("p").html('隐藏')
    }else{
      $('.mm_nav').css('height',200);    
      $(this).find("p").html('更多')
    }
    event.preventDefault();
      
  })
  },'json')

  // 获取商品详情
  $.get('http://193.112.55.79:9090/api/getmoneyctrl',function(res){
    // console.log(res);
    $.each(res.result,function(i,item){
      var productComCount  = item.productComCount  
      productComCount = productComCount.substring(1,2);
     item.productComCount = productComCount
  })
    var goodHtml = template('product',{data:res.result});
    $('.product-box').html(goodHtml);
  },'json')
  
  window.onscroll=function(){
    // console.log(this.pageYOffset);
    // console.log($('.broadside .icon'));
    
    if(this.pageYOffset > 300){
      $('.broadside .icon').show();
    }else {
      $('.broadside .icon').hide();
    }
    
  }
})