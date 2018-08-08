$(function () {
    init();

    function init() {
        getCoupontitle();
        eventList();
    }

    function getCoupontitle() {
        var couponId = location.search;
        var cId = couponId.substr(10);
        // console.log(cId);
        $.ajax({
            type: 'GET',
            url: "http://193.112.55.79:9090/api/getcouponproduct?couponid=" + cId,
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                var html = template("couponProduct", {
                    arr: res.result
                });
                var img = template("sliderImg", {
                    arr: res.result
                });
                // console.log(img);
                $(".product").html(html);
                $(".sImg").html(img);
                var ul = document.querySelector(".sImg");
                var lis = document.querySelectorAll(".sImg li");
                var index = 0;
                $(".rightBtn").on("tap", function () {
                    if (index == lis.length) {
                        index = lis.length;
                    } else {
                        index++;
                    }
                    console.log(index);
                    ul.style.transform = "translateX(-" + (index * 200) + "px)";
                });
                $(".leftBtn").on("tap", function () {
                    if (index == 0) {
                        index = 0;
                    } else {
                        index--;
                    }

                    ul.style.transform = "translateX(-" + (index * 200) + "px)";

                    console.log(index);
                });

            }
        });
    }
    function eventList(){
        $("ul").on("tap","li",function(){
              $(".shadow").hide();     
        });
        $(".product").on("tap","a",function(){
            // console.log(123);
            $(".shadow").show();
        })
    }
    $('.shadow').hide();
});