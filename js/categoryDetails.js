$(function () {
  var idArr = location.search.split("&");
  // console.log(idArr);
  var productId = idArr[0].substring(11);
  var categoryId = idArr[1].substring(11);
  //获取三级标题及数据
  $.get('http://193.112.55.79:9090/api/getproduct', {
    'productid': productId
  }, function (res) {
    // console.log(res);
    var str = res.result[0].productName.substring(0, 12);
    $('.category_tit').html(str);
    var mainHtml = template('main', {
      'data': res.result
    });
    $('.main').html(mainHtml);

  }, 'json')
  //获取二级标题数据
  $.get('http://193.112.55.79:9090/api/getcategorybyid', {
    'categoryid': categoryId
  }, function (res) {
    // console.log(res);
    $('.nav2').html(res.result[0].category);
    $('.nav2').attr('href', './categoryList.html?categoryid=' + categoryId);
  }, 'json')
  //获取评论
  $.get('http://193.112.55.79:9090/api/getproductcom', {
    'productid': productId
  }, function (res) {
    console.log(res);
    var commentHtml = template('comment', {
      'data': res.result
    });
    $('.comment .content').html(commentHtml);
  }, 'json')

  // 广告关闭
  $('.ad_close').on('tap', function () {
    $('.ad').fadeOut();
  })
})