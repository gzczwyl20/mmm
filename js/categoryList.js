$(function(){
  var categoryId = location.search.substring(12);
  // console.log(categoryId);

  // 标题
  $.get('http://193.112.55.79:9090/api/getcategorybyid',{'categoryid':categoryId},function(res){
    // console.log(res);
    $('.category_tit').html(res.result[0].category);
  },'json')

  // 分页
   $.get('http://193.112.55.79:9090/api/getproductlist',{'categoryid':categoryId},function(res){
    //  console.log(res);
     if(res.result.length == 0){
      var goodHtml = '<h2>该产品已经售空</h2>';
     }else{
      var goodHtml = template('product',{data:res.result});
     }
     var page = Math.ceil(res.totalCount / res.pagesize);
    // console.log(page);
    var pageHtml =  '';
    for (var i = 0; i  < page; i++) {
      pageHtml += '<option value="'+(i+1)+'">'+(i+1)+' / '+page+' </option>'
    }
    $('#selectPage').html(pageHtml)
    $('.product-box').html(goodHtml);
    var index =1;
    $('#selectPage').on('change',function(){
      index = $(this).val();
      // console.log(index);
      
      $.get('http://193.112.55.79:9090/api/getproductlist',{'categoryid':categoryId,'pageid':index},function(res){
          var goodHtml = template('product',{data:res.result});
          $('.product-box').html(goodHtml);
          var page = Math.ceil(res.totalCount / res.pagesize);
          // console.log(page);
          var pageHtml =  '';
          for (var i = 0; i  < page; i++) {
            pageHtml += '<option value="'+(i+1)+'">'+(i+1)+' / '+page+' </option>'
          }
          $('#selectPage').html(pageHtml);
          $('#selectPage').val(index);
        },'json')
    })
    // 上一张
    $('.page-l').on('click',function(){
        index -- ;
        if (index < 1){
          alert('已经是第一页了');
          index =1;
          return;
        }
        $.get('http://193.112.55.79:9090/api/getproductlist',{'categoryid':categoryId,'pageid':index},function(res){
          var goodHtml = template('product',{data:res.result});
          $('.product-box').html(goodHtml);
          var page = Math.ceil(res.totalCount / res.pagesize);
          // console.log(page);
          var pageHtml =  '';
          for (var i = 0; i  < page; i++) {
            pageHtml += '<option value="'+(i+1)+'">'+(i+1)+' / '+page+' </option>'
          }
          $('#selectPage').html(pageHtml);
          $('#selectPage').val(index);
        },'json')    
    })

    //下一张
    $('.page-r').on('click',function(){
      index++;
      if(index > page){
        index = page;
        alert('已经是最后一页了');
        return;
      }
      $.get('http://193.112.55.79:9090/api/getproductlist',{'categoryid':categoryId,'pageid':index},function(res){
        console.log(res);
        
          var goodHtml = template('product',{data:res.result});
          $('.product-box').html(goodHtml);
          var page = Math.ceil(res.totalCount / res.pagesize);
          // console.log(page);
          var pageHtml =  '';
          for (var i = 0; i  < page; i++) {
            pageHtml += '<option value="'+(i+1)+'">'+(i+1)+' / '+page+' </option>'
          }
          $('#selectPage').html(pageHtml);
          $('#selectPage').val(index);
        },'json')  
    })

   },'json')
})