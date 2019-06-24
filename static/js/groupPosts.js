/**
 * Created by Think on 2018/8/5.
 */
let token  = $.cookie("token");
$(document).ready(
    $.ajax({
        cache: false,
        dataType: 'json',
        url: "http://127.0.0.1:8888/groups/8/posts/",
        type: 'get',
        contentType: "application/json; charset=utf-8",
        async: true,
        headers:{
            "tsessionid":token
        },
        success:function(data){
            console.log("获取小组帖子成功！")
        }

    })
)
