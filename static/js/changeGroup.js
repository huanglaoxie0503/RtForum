/**
 * Created by Think on 2018/7/21.
 */



let submitnum = 0;
let token = $.cookie("token");
console.log(token);






$(":submit").on("click",function(){


    //判断小组名是否合格
    if($("#gruopname").val() == ''){
        if($("#gruopname").closest("li").children().length<3){
            $("#gruopname").closest("li").append(`
            <p style="color:red;" class="error">*请填写小组名</p>
        `)
        }
    }else{
        $("#gruopname").siblings(".error").remove();
        submitnum += 1;
    }
    //判断小组类型是否合格
    if($("#cid0").val() == ''){
        $("#cid0").closest("li").append(`
        <p style="color: red" class="error">*请选择小组类型</p>
        `)
    }else{
        $("#pid").siblings(".error").remove()
        submitnum += 1;
    }

    //判断简介是否合格
    if($("#intro").val() == ''){
        if($("#intro").closest("li").children().length<3){
            $("#intro").closest("li").append(`
        <p style="color: red;top: 100px" class="error">*请填写简介</p>
        `)
        }
    }else{
        $("#intro").siblings(".error").remove()
        submitnum += 1;
    }

    //判断公告是否合格
    if($("#announce").val() == ''){
        if($("#announce").closest("li").children().length<3){
            $("#announce").closest("li").append(`
        <p style="color: red;top: 100px" class="error">*请填写公告</p>
        `)
        }
    }else{
        $("#announce").siblings(".error").remove()
        submitnum += 1;
    }

    //判断文件的大小格式,只能是图片
    var file = $("#fileUp")[0].files;
    let file1 = $("#fileUp")[0].files[0];
    //大小
    if(!file1){
        $("#fileUp").closest("li").find("p").css({color:"red"})
    }else{ //格式
        var imgFormat = [".bmp",".jpg","jpeg",".png",".pcd",".psd",".dxf","tiff",".pcx"];
        var a= file["0"].name.substring(file["0"].name.length-4,file["0"].name.length);
        var flag = false;
        for(var i = 0;i<imgFormat.length;i++){
            if(a == imgFormat[i]){
                submitnum += 1;
                flag = true;
                break
            }else{
                flag = false
            }
        }
        if(!flag){
            $("#fileUp").closest("li").find("p").text("请选择图片！").css({color:"red"})
        }else{
            $("#fileUp").closest("li").find("p").text("请选择图片！").css({color:"#999999"})
        }
    }

    if(submitnum <5){
        return false
    }else if(submitnum == 5){


        var options = {
            url:"http://39.104.13.197:8000/groups/1/",
            headers:{
                "tsessionid": token
            },
            type : 'patch',
            data:JSON.stringify({
                "name": $("#gruopname").val(), //#小组名
                "category":$("#cid0 option:selected").text(),//小组分类
                "front_image":$("#fileUp")[0].files[0],
                "desc":$("#intro").val(),
                "notice":$("#announce").val()
            }),
            dataType : 'json',
            success:function(){
                console.log("成功")
            }
        }
        $("#myform").ajaxForm(options);
        return false
    }
})


//$("#mysubmit").submit();
//    $.ajax({
//        url : "http://39.104.13.197:8000/groups/",
//
//
//
//        headers:
//        {
//            "tessionid": token
//        },
//        success:function(){
//            alert("成功");
//        }
//    });
//
//}




