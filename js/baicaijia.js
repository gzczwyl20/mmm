$(function () {
    gettitle();

    function gettitle() {
        $.ajax({
            url: "http://193.112.55.79:9090/api/getbaicaijiatitle",
            success: function (result) {
                // console.log(result);
                var data = result.result;
                var titleId = template("title", {
                    "data": data
                });
                $(".ul_title").html(titleId);
                tap();
                var firstLi = $(".ul_title li").eq(0);
                // console.log(firstLi);
                firstLi.addClass("active");
                $("#nav").on("tap", function () {
                    firstLi.removeClass("active");
                })
            }
        })
    }

    function tap() {
        var ul = document.querySelector("#nav ul");
        var lis = document.querySelectorAll("#nav ul li a");
        $("#nav ul").width($("#nav ul li").width() * $("#nav ul li").length);
        var myScroll1 = new IScroll('#nav', {
            scrollY: false,
            scrollX: true,
            tap: true
        });

        //让他默然开始是0 显示第一页
        var id = 0;
        firstContent();

        function firstContent() {
            $.get("http://193.112.55.79:9090/api/getbaicaijiaproduct", {
                "titleid": id
            }, function (result) {
                var data = result.result;
                console.log(data);
                var content = template("content", {
                    "data": data
                });
                // console.log(content);
                // activeLi(0);
                $(".ul_content").html(content);
            }, "json")
        }


        //封装过的
        itcast(ul).tap(function (e) {
            var liDom = e.target;
            myScroll1.scrollToElement(liDom);
            activeLi(liDom);
            id = $(liDom).data("id");
            // console.log(id);
            $.get("http://193.112.55.79:9090/api/getbaicaijiaproduct", {
                "titleid": id
            }, function (result) {
                var data = result.result;
                // console.log(data);
                var content = template("content", {
                    "data": data
                });
                // console.log(content);
                $(".ul_content").html(content);
            }, "json")
        })

        //排他
        function activeLi(dom) {
            for (var i = 0; i < lis.length; i++) {
                var element = lis[i];
                // console.log(element);
                element.classList.remove("active");
            }
            dom.classList.add("active");
        }
    }
  
})