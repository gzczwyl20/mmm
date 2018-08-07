$(function(){
    getcenter();

    function getcenter() {
       /*
        获得屏幕的高度
        获得body的高度
        获取滚动的高度
        如果body的高度 减去屏幕的高度  在减去被滚去的高度 小于100 
        再次发送请求申请4条数据展示
        用户如果重复再150px之间的高度来回滑动
        会一直发送请求
        先使用反证法  如果触发了 就停止发送请求
       
       */
        var flag = true;
        $(document).on("scroll", function () {
            // console.log($("body").height(), $(window).height(), $(window).scrollTop());
            if (($("body").height() - $(window).height() - $(window).scrollTop()) < 150) {
                if (!flag) {
                    return;
                } else {
                    flag = false;
                    console.log("正在加载");

                    $.ajax({
                        url: "http://193.112.55.79:9090/api/getinlanddiscount",
                        success: function (result) {
                            flag = true;
                            // console.log(result);
                            var more = result.result;
                            // console.log(more);
                            var append = template("temp_cufind_content_more",{"data":more});
                            // console.log(append);
                            $(".cufind_content").append(append);

                        }
                    })
                }
            }
        })

        $.get("http://193.112.55.79:9090/api/getinlanddiscount", function (result) {
            // console.log(result);
            var data = result.result;
            // console.log(data);
            var htmlStr = template("temp_cufind_content", {
                "data": data
            });
            // console.log(htmlStr);
            $(".cufind_content").html(htmlStr);

        }, "json");

    }
})