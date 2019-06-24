/**
 * Created by Think on 2018/8/1.
 */


let token = $.cookie("token");
let userId  =$.cookie("userId");
//debugger
$(document).ready(
    //删除小组函数






    //为每个小组的删除和修改添加事件
    //$(".user-imglist").on("click","strong",function(){
    //    $(this).find("a").attr({"href":"http://localhost:63342/untitled1/product0606/content/personalCenter/changeGroup/createGroup/changeGroup.html"})
    //}),
    //$(".user-imglist").on("click","small",function(){
    //    $.ajax({
    //        type:"delete",
    //        headers:{
    //            "tsessionid":token
    //        },
    //        url:"http://127.0.0.1:8000/groups/8/"
    //    })
    //});
    //点击小组，跳转到小组的posts页面
    $(".user-imglist").on("click","li",function(){
        $.cookie("groupId",$(this).attr("groupId"),{path:"/"});
        //window.location.href = "http://localhost:63342/untitled1/product0606/content/personalCenter/mygroup/groupPosts.html"
    }),

    $("#delete").on("click",function(){
        $.ajax({
            cache: false,
            dataType: 'json',
            url: "http://127.0.0.1:8000/groups/1/",
            type: 'get',
            contentType: "application/json; charset=utf-8",
            async: true,
            headers:{
                "tsessionid":token
            },
            success:function(data){
                console.log("chenggong")
            }

        })

    })

)

new Vue({
    el:"#wrap",
    data(){
        return {
            result:{}
        }
    },
    created(){
        let that = this;
        $.ajax({
            cache: false,
            dataType: 'json',
            url: "http://127.0.0.1:8000/users/" + userId + "/groups/",
            type: 'get',
            contentType: "application/json; charset=utf-8",
            async: true,
            headers: {
                "tsessionid": token
            },
            success: function (data) {
                that.result = data.msg.owner;
                console.log(that.result);
                function deleteGroup(id) {
                    $.ajax({
                        type: "delete",
                        headers: {
                            "tsessionid": token
                        },
                        url: "http://127.0.0.1:8000/groups/" + id + "/"
                    })
                }
            }

        })

    }


})





