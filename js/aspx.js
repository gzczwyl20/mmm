var productId = location.search;
var id = productId.substring(4);
getContent();
// 商品介绍
function getContent() {
    $.get("http://193.112.55.79:9090/api/getdiscountproduct", {
        "productid": id
    }, function (result) {
        var data = result.result[0];
        console.log(data);
        // 详情内容模板添加
        var htmlStr = template("main_content", {
            "data": data
        });
        $(".content").html(htmlStr);
        // 评论
        var comment = template("comment",{"data":data});
        $(".comment_content").html(comment);

        // var  = 
    }, "json")
}