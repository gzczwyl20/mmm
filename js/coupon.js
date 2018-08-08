$(function(){
    init();
    function init(){
        getCoupontitle();
    }
    function getCoupontitle(){
        $.get("http://193.112.55.79:9090/api/getcoupon",function(res){
            console.log(res);
            var html=template("couponTitle",{arr:res.result});
            $(".content").html(html);
        });
    }
});