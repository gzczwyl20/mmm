$(function () {
  var id = location.search.substring(14);
  // 三级导航
  $.get('http://193.112.55.79:9090/api/getbrandtitle', function (res) {
    // console.log(res.result);
    var arr = res.result;
    arr.forEach(function (i, item) {
      // console.log(i.brandTitleId);
      // console.log(id);
      if (i.brandTitleId == id) {
        // console.log(i.brandTitle.split("十")[0]);
        $('.category_tit').html(i.brandTitle.split("十")[0] + '哪个牌子好');
        $('.title1').html(i.brandTitle.split("十")[0] + '哪个牌子好');
        $('.title2').html(i.brandTitle.split("十")[0] + '产品销量排行');
        $('.title3').html(i.brandTitle.split("十")[0] + '最新评论');
      }

    });
  }, 'json')
  // console.log(id);
  // 手机品牌渲染
  $.get('http://193.112.55.79:9090/api/getbrand', {
    brandtitleid: id
  }, function (res) {
    // console.log(res);
    var contentHtml = template('content', {
      data: res.result
    });
    
    $('.content-box').html(contentHtml);

  }, 'json')

  // 销量排行
  $.get('http://193.112.55.79:9090/api/getbrandproductlist', {
    'brandtitleid': id
  }, function (res) {
    // console.log(res);
    
    var seniorityHtml = template('seniority', {
      data: res.result
    });
    if($.trim(seniorityHtml) ==""){
      seniorityHtml = '<h3 style="text-align: center">商品没有数据</h3>'
      $('.seniority-box').html(seniorityHtml);
      return;
    }
    $('.seniority-box').html(seniorityHtml);
   var productid = $('.seniority-box').find('li').eq(0).data('id');
  //  console.log(productid);
   
  var url = res.result[0].productImg;
  var tit = res.result[0].productName;
  $('.comment .tit').html(url+'<p>'+tit+'</p>');
    // 评论渲染
    $.get('http://193.112.55.79:9090/api/getproductcom', {
      productid: productid
    }, function (res) {
      // console.log(res);
      var commentHtml = template('comment', {
        data: res.result
      });
  
      $('.comment-box').html(commentHtml);
    }, 'json')
  }, 'json')



})