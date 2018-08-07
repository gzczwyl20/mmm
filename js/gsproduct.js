$(function(){
  var shopid = 0;  
  var areaid = 0;
  // 渲染下拉列表
          $.get('http://193.112.55.79:9090/api/getgsshop',function(res){
            // console.log(res);
            var jdHtml = template('jd-nav',{'data':res.result});
            $(".jd-list").html(jdHtml);
          },'json')

          $.get('http://193.112.55.79:9090/api/getgsshoparea',function(res){
            // console.log(res);
            var hbHtml = template('hb-nav',{'data':res.result});
            $(".hb-list").html(hbHtml);
          },'json')

          var arr = [
            {'price':'全部价格'},
            {'price':'1-3元'},
            {'price':'3-5元'},
            {'price':'5-10元'},
            {'price':'10-15元'},
            {'price':'15元以上'}
          ];
          var allPrice = template('allPrice',{'data':arr});
          $(".price-list").html(allPrice);
  //  京东筛选效果       
  $('.jd-list').on('tap','li',function(){
    // console.log(123);
    $('.jd-txt').html($(this).text());
    $('.jd-list').hide();
    $('nav>a').find('.up').css('display',"none");
    $('nav>a').find('.down').css('display',"block");
    shopid = this.dataset.id ;
    apply(shopid,areaid);
    $(this).addClass('now');
    $(this).siblings('li').removeClass('now');
  })
  // 华北筛选效果
  $('.hb-list').on('tap','li',function(){
    // console.log(123);
    $('.hb-txt').html($(this).text().substring(0,2));
    $('.hb-list').hide();
    $('nav>a').find('.up').css('display',"none");
    $('nav>a').find('.down').css('display',"block");
    areaid = this.dataset.id ;
    apply(shopid,areaid);
    $(this).addClass('now');
    $(this).siblings('li').removeClass('now');
  })
  // 导航栏下拉效果
  $('nav>a').on('tap',function(){
      if($(this).find('.down').css('display') == 'none'){
        $(this).find('.down').css('display',"block");
        $(this).find('.up').css('display',"none");
        $(".jd-list").hide();
        $(".hb-list").hide();
        $(".price-list").hide();
      }else{
        $(".jd-list").hide();
        $(".hb-list").hide();
        $(".price-list").hide();
        $(this).find('.down').css('display',"none");
        $(this).find('.up').css('display',"block");
        $(this).siblings().find('.up').css('display','none');
        $(this).siblings().find('.down').css('display','block');
        var id = $(this).attr('id');
        $('.'+id).show();
      }   
  })
  function apply (shopid,areaid) {
    shopid = shopid || 0;
    areaid = areaid || 0;
    $.get('http://193.112.55.79:9090/api/getgsproduct',{'shopid':shopid,'areaid':areaid},function(res){
      // console.log(res);
      var productHtml = template('product',{'data':res.result});
      $('.product').html(productHtml);
    },'json')
  }
  apply();
})