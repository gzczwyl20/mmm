$(function(){
  // 获取商品详情
  $.get('http://193.112.55.79:9090/api/getmoneyctrl',function(res){
    console.log(res);
    var goodHtml = template('product',{data:res.result});
    $('.product-box').html(goodHtml);
    var page = Math.ceil(res.totalCount / res.pagesize);
    // console.log(page);
    var pageHtml =  '';
    for (var i = 0; i  < page; i++) {
      pageHtml += '<option value="'+i+'">'+(i+1)+' / '+page+' </option>'
    }
    $('#selectPage').html(pageHtml)

    var index =0;
    $('#selectPage').on('change',function(){
      index = $(this).val();
      $.get('http://193.112.55.79:9090/api/getmoneyctrl',{'pageid':index},function(res){
          var goodHtml = template('product',{data:res.result});
          $('.product-box').html(goodHtml);
          var page = Math.ceil(res.totalCount / res.pagesize);
          // console.log(page);
          var pageHtml =  '';
          for (var i = 0; i  < page; i++) {
            pageHtml += '<option value="'+i+'">'+(i+1)+' / '+page+' </option>'
          }
          $('#selectPage').html(pageHtml);
          $('#selectPage').val(index);
        },'json')
    })
    // 上一张
    $('.page-l').on('click',function(){
        index -- ;
        if (index < 0){
          alert('已经是第一页了');
          index =0;
          return;
        }
        $.get('http://193.112.55.79:9090/api/getmoneyctrl',{'pageid':index},function(res){
          var goodHtml = template('product',{data:res.result});
          $('.product-box').html(goodHtml);
          var page = Math.ceil(res.totalCount / res.pagesize);
          // console.log(page);
          var pageHtml =  '';
          for (var i = 0; i  < page; i++) {
            pageHtml += '<option value="'+i+'">'+(i+1)+' / '+page+' </option>'
          }
          $('#selectPage').html(pageHtml);
          $('#selectPage').val(index);
        },'json')    
    })

    //下一张
    $('.page-r').on('click',function(){
      index++;
      if(index == page){
        index = page-1;
        alert('已经是最后一页了');
        return;
      }
      $.get('http://193.112.55.79:9090/api/getmoneyctrl',{'pageid':index},function(res){
          var goodHtml = template('product',{data:res.result});
          $('.product-box').html(goodHtml);
          var page = Math.ceil(res.totalCount / res.pagesize);
          // console.log(page);
          var pageHtml =  '';
          for (var i = 0; i  < page; i++) {
            pageHtml += '<option value="'+i+'">'+(i+1)+' / '+page+' </option>'
          }
          $('#selectPage').html(pageHtml);
          $('#selectPage').val(index);
        },'json')  
    })
  },'json')
})