$.get("http://193.112.55.79:9090/api/getsitenav", function (res) {
   var data=res.result;
  //  console.log(data);
   var content=template("aa",{"data":data})
  //  console.log(content);
   $(".content").html(content);
   

}, 'json')