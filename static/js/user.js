


/**
 * Created by Ashang on 14-10-8.
 */

var user;//获取用户登录账号
var verify;//获取验证码
var password;//获取密码
var password2;//获取密码
var type;//注册类型 1邮箱 2手机
//手机注册
function phoneReg(cate){
	$(cate).addClass("f3");
	$(cate).next().removeClass();
	$("#phoneReg").css("display","block");
	$("#emailReg").css("display","none");
}
//邮箱注册
function emailReg(cate){
	$(cate).addClass("f3");
	$(cate).prev().removeClass();
	$("#emailReg").css("display","block");
	$("#phoneReg").css("display","none");
}
//邮箱注册下一部
function onemaliNext(){
	user      = $.trim($("#erusername").val());//获取用户邮箱地址
	verify    = $.trim($("#erverify").val());//获取验证码
	uname     = $.trim($("#eruname").val());//获取用户昵称
    password  = $.trim($("#erpasswrod").val());//获取密码
    password2 = $.trim($("#erpasswrod2").val());//获取密码
    mount_reg = $.trim($("#mount_reg").val());//挂载机构

    //检查信息是否为空
	if(user == ""){
        ui.error('请输入邮箱');
		return;
	}
	if(uname == ""){
        ui.error('请输入昵称');
		return;
	}
	if(password == ""){
        ui.error('请输入密码');
		return;
	}
	if(password2 == ""){
        ui.error('请再次输入密码');
		return;
	}
	if(verify == ""){
        ui.error('请输入验证码');
		return;
	}

	//验证邮箱
	if(!user.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
        ui.error('邮箱格式错误');
		return;
	}

    //验证昵称
	if( uname.length > 10){//检查昵称
        ui.error('昵称长度不能大于10位');
		return;
	}

	//检查密码
	if( password.length<6 || password.length>20 ){
		 ui.error('密码长度为6-20位');
		 return;
	}
    if( password != password2 ){
        ui.error('两次输入密码不一致');
        return;
    }

	//检查验证码
	if( verify.length != 5){
        ui.error('验证码长度不正确');
		 return;
	}

	$.ajax({
		async:false,
        type: "POST",
        url:REG_ADDRESS,
        data:"email="+user+"&uname="+uname+"&password="+password+"&type=1&mount_reg="+mount_reg+"&verify="+verify,
        dataType:"json",
        success:function(data){
            if( data.status == '0'){
                ui.error(data.info);
            	return;
            }else{
                ui.success("恭喜您，注册成功!");
                location = data.data;
            }
        }
    });
}


//手机注册下一部
function phoneNext(){
	user      = $.trim($("#prphone").val());//获取用户邮箱地址
	verify    = $.trim($("#prverify").val());//获取验证码
	uname     = $.trim($("#uname").val());//获取用户昵称
    password  = $.trim($("#prpassword").val());//获取密码
    password2 = $.trim($("#prpassword2").val());//获取密码
    mount_reg = $.trim($("#mount_reg").val());//挂载机构

    //检查信息是否为空
	if(user == ""){
        ui.error('请输入手机号');
		return;
	}
	if(verify == ""){
        ui.error('请输入验证码');
		return;
	}
	if(uname == ""){
        ui.error('请输入昵称');
		return;
	}
	if(password == ""){
        ui.error('请输入密码');
		return;
	}
	if(password2 == ""){
        ui.error('请再次输入密码');
		return;
	}


	//检查手机号格式
	if(!user.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
        ui.error('对不起，请填写正确的手机号!');
		 return;
	}

	//检查验证码
	if( verify.length !=6 ){
        ui.error('手机验证码长度不正确!');
		return;
	}

	//验证昵称
	if( uname.length > 10){//检查昵称
        ui.error('昵称长度不能大于10位');
		return;
	}

	//检查密码
	if( password.length<6 || password.length>20 ){
		 ui.error('密码长度为6-20位');
		 return;
	}
    if( password != password2 ){
        ui.error('两次输入密码不一致');
        return;
    }


	$.ajax({
		async:false,
        type: "POST",
        url:REG_ADDRESS,
        data:"phone="+user+"&uname="+uname+"&password="+password+"&type=2&mount_reg="+mount_reg+"&verify="+verify,
        dataType:"json",
        success:function(data){
            if( data.status == '0'){
                ui.error(data.info);
            	return;
            }else{
                ui.success("恭喜您，注册成功!");
                location = data.data;
            }
        }
    });
}

var timerc;
function dtime(){
        if(timerc > 1){
        	timerc=timerc-1;
            $("#dtime").text(timerc);
            setTimeout("dtime()", 1000); //设置1000毫秒以后执行一次本函数
        }else{
        	$('.width97').css("display","none");
    		$('.width80').removeAttr("style");
        }
}
/**
 * 发送手机验证码
 */
function getPhoneVerify(){
	user=$.trim($("#prphone").val());//获取用户手机号
	var phoneVerify=function(){
		//获取手机验证码
		  $.ajax({
		        type: "POST",
		        url:GET_PHONEVERIFY,
		        data:"phone="+user,
		        dataType:"json",
		        success:function(data){
		        	if(data.status=='0'){
                        ui.error(data.info);
		       		 	return;
		        	}else{
                        ui.success(data.info);
		        		$('.width80').css("display","none");
		        		$('.width97').removeAttr("style");
		        		timerc = 60;
		        		dtime();
		       		 	return;
		        	}
		        }
		    });
		}

	//检查手机号格式
	if(!user.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
        ui.error('对不起，请填写正确的手机号!');
		 return;
	}else{
		//验证此手机是否已被注册
	    $.ajax({
	        type: "POST",
	        url:CLICK_PHONE,
	        data:"phone="+user,
	        dataType:"text",
	        success:function(data){
	            if(data==0){
                    ui.error('对不起，此手机已被注册，请更换!');
	            	return;
	            }else{
	            	phoneVerify();
	            }

	        }
	    });
	}
}

//临时处理方法
var timerc;
function dctime(){
    if(timerc > 1){
    	timerc=timerc-1;
        $("#dctime").text(timerc);
        setTimeout("dctime()", 1000); //设置1000毫秒以后执行一次本函数
    }else{
    	$('.width97').css("display","none");
		$('.width80').removeAttr("style");
    }
}

/**
 * 找回密码发送手机验证码
 */
function getRepPhoneVerify(){
	phone=$.trim($("#rephoneval").val());//获取用户手机号
	//检查手机号格式
	if(!phone.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
        ui.error('对不起，请填写正确的手机号!');
		 return;
	}
	//获取手机验证码
	 $.ajax({
		 type: "POST",
		 url:REPOHNE_VAR,
		 data:"phone="+phone,
		 dataType:"json",
		 success:function(data){
			 if(data.status=='0'){
                 ui.error(data.info);
			       	return;
			 }else{
                 ui.success(data.info);
		        $('.width80').css("display","none");
		        $('.width97').removeAttr("style");
		        timerc = 60;
		        dctime();
		       	return;
			 }
		 }
	});
}

//用户信息
function setUserInfo(){
	var uname=$.trim($("#uname").val());//获取用户昵称
	var sex=$('input[name="sex"]:checked').val();//获取性别
	var profession=$("#profession").val();//取得职业信息
	var intro=$.trim($("#intro").val());//取得用户简介
	var interest=$.trim($("#interest").val());//取得感兴趣数据
	var mount_reg=$.trim($("#mount_reg").val());//挂载机构
	var city_names= $("input[name=city_names]").val();//地区信息
	var city_ids= $("input[name=city_ids]").val();//地区信息ids
	var province=$("#province").val();//取得省
	var city=$("#city").val();//取得市
	var area=$("#area").val();//取得区
	var ckemailreg=function(){
		var udata;
		if(type==1){
			udata="&email="+user;
		}else{
			udata="&phone="+user;
		}
		$.ajax({
			async:false,
	        type: "POST",
	        url:REG_ADDRESS,
	        data:"uname="+uname+"&sex="+sex+"&password="+password+"&profession="+profession+"&intro="+intro+"&interest="+interest+"&mount_reg="+mount_reg+udata+"&city_names="+city_names+"&city_ids="+city_ids+"&type="+type+"&verify="+verify,
	        dataType:"json",
	        success:function(data){
	            if(data.status=='0'){
                    ui.error(data.info);
	            	 return;
	            }else{
                    ui.success("恭喜您，注册成功!");
                    location = data.data;
	            }
	        }

	    });
	}

	if(user=="" || password==""){
		return;
	}
	if(uname=="" || uname.length>6){//检查昵称
        ui.error('对不起，昵称长度不正确!');
		 return;
	}else{
		$.ajax({
	        type: "POST",
	        url:CLICK_UNAME,
	        data:"uname="+uname,
	        dataType:"text",
	        success:function(data){
	            if(data==0){
                    ui.error('对不起，此昵称已被注册，请更换!');
	            	 return;
	            }else{
	            	ckemailreg();
	            }

	        }
	    });
	}





}
/**
 * 用户头像设置
 */
/*function setUserFace(){

	$(".regsiter-main").css("z-index","306");
	$(".regsiter-main-headerworap").css("z-index","340");


}*/
/*//登录按下回车
$("#log_username").keydown(function(event){
    if(event.keyCode == 13){
        logSub();
    }
});
$("#log_pwd").keydown(function(event){
    if(event.keyCode == 13){
        logSub();
    }
});*/
    /**
 * 用户成功设置头像
 */
/*function avatarOk(){
 ui.success("设置成功！");
    location.reload();
}*/

/**
 * 返回上一步
 */
function prevBang(){
    $(".reg_set_info").css("display","block");
    $(".reg_set_user_info").css("display","none");
	$(".regsiter-main").css("z-index","200");
	$("#loging-worap-regsiter").css("z-index","1001");
}

//请求事件
function ajaxBang(url,clickid,fdata,callback,type){

    if(fdata!=""){
        var fdata="&"+fdata;
    }
    $.ajax({
        type: "POST",
        url:url,
        data:"p="+p+fdata,
        dataType:"json",
        success:function(data){
            appendHtml(data,clickid,type);
            callback && callback();
        }
    });
}
//追加html
function appendHtml(data,clickid,type){
    $(".more").remove();
    $('.user-imglist').html('');
    if(data.data==""){
    	var text = '';
		$('.user-Release-l').hide();
        $(".user-imglist").append("<span>"+text+"</span>");
    }else{
		$('.user-Release-l').show();
        $(".user-imglist").append(data.data);
    }
    if(data.nowPage+1>data.totalPages){
        return;
    }else{
        var html="<div class=\"more\" ><a href=\"javascript:void(0)\" onclick='fallBang(this)' id=\""+clickid+"\">查看更多</a></div>"
        $(".user-imglist").append(html);
        p=data.nowPage+1;//下一页
    }

}
/**
 * 选项卡效果
 * @param cate
 */
function magbtn(cate){
 var status =$(cate).parent().attr("id");
    if(status=="dshow"){
        $(cate).parent().nextAll().fadeOut();
        $(cate).parent().attr("id","dhide");
    }else{
        $(cate).parent().nextAll().fadeIn();
        $(cate).parent().attr("id","dshow");
    }

}
var onstatus;
/**
 * 登录注册页面
 */
function reg_login(){
    var count = $("#transparent");

    if(count.length > 0){
        var cssStu = $("#transparent");
        if(cssStu.css("display") == "block"){
            count.css("display","none");
        }else{
            count.css("display","block");
        }
    }else{
        if(onstatus == 1){
            return;
        }
        onstatus = 1;
        $.ajax({
            type: "POST",
            url:REG_LOGIN,
            dataType:"json",
            success:function(data){
                $("body").prepend(data);
            }
        });
    }
}

/**
 * 退出成功
 */
function logout(){
    this.$cookies.remove('tesssionid');
    this.$cookies.remove('nick_name');
    this.$cookies.remove('user_id');

    location.href="/html/group/group.html";

}
/**
 * 取消注册
 */
function removeReg(){
    $("#transparent").css("display","none");
}
/*//点击去除提示信息
$("#username").live("focus",function(){
    $("#usernameMeg").css("display","none")
});
$("#password").live("focus",function(){
    $("#passwordMeg").css("display","none")
});
$("#okpwd").live("focus",function(){
    $("#okpwdMeg").css("display","none")
});*/





/**
 * 注册Ajax
 */
function okReg(){
   if(!email_status){
       $("#username").focus();
       return;
   }
    if(!pwd_status){
        $("#password").focus();
        return;
    }
    if(!okpwd_status){
        $("#okpwd").focus();
        return;
    }
    if(!$("#okxy").attr("checked")){
        return;
    }
    //开始异步注册
    $.ajax({
        type: "POST",
        url:REG_ADDRESS,
        data:"username="+$.trim($("#username").val())+"&password="+ $.trim($("#password").val()+"&okpwd="+ $.trim($("#okpwd").val())),
        dataType:"text",
        success:function(data){
            if(data==500){
                return;
            }else{
                ui.success('注册成功!');
                location.reload();
            }
        }
    });

}
/**
 * 搜索框
 * @returns {boolean}
 */
function checkSearch(){
    var text= $.trim($("#searchkey").val());
    if(text==""){
        $("#searchkey").val(text);
        $("#searchkey").focus();
        return false;
    }else{
        return true;
    }
}
/**
 * 问答搜索框
 * @returns {boolean}
 */
function checkWendaSearch(){
    var text= $.trim($("#stu_wdsearch").val());
    if(text==""){
        $("#stu_wdsearch").val(text);
        $("#stu_wdsearch").focus();
        return false;
    }else{
        return true;
    }
}
/**
 * 异步登录
 */
function logSub(){
   var log_username=$.trim($("#log_username").val());
   var log_pwd=$.trim($("#log_pwd").val());
   if(log_username=="" || log_username.length<2){
       ui.error('对不起，账号格式不正确!');
       return;
   }
   if(log_pwd=="" || log_pwd.length<6){
       ui.error('对不起，密码格式不正确!');
       return;
   }
    $("#logSub").val("登录中..");
    $("#logSub").css("disabled","true");
    //开始异步登录
    $.ajax({
        type: "POST",
        url:LOGIN_ADDRESS,
        data:"log_username="+$.trim($("#log_username").val())+"&log_pwd="+ $.trim($("#log_pwd").val()),
        dataType:"json",
        success:function(data){
            if(data.status=='0'){
                $("#logSub").val("登录");
                $("#logSub").css("disabled","false");
                ui.error(data.info);
                return;
            }else{
                $("#transparent").hide();
                ui.success(data.info);
                location.reload();
            }
        }
    });
}

//找回密码js  开始---------------
//手机验证
function repPhone(cate){
	$(cate).addClass("f3");
	$(cate).next().removeClass();
	$("#repPhone").css("display","block");
	$("#repEmail").css("display","none");
}
//邮箱验证
function repEmail(cate){
	$(cate).addClass("f3");
	$(cate).prev().removeClass();
	$("#repEmail").css("display","block");
	$("#repPhone").css("display","none");
}

/**
 * 确认通过手机重置密码
 */
function okPhonepwd(cate){
	$("p").text("");
	var phone=$.trim($("#rephoneval").val());//获取用户手机号
	var pverify=$.trim($("#repverval").val());//获取验证码
	var pwd=$.trim($("#ppwd").val());//获取新密码
	var pwds=$.trim($("#ppwds").val());//获确认密码
	if( !phone.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
		setRepMsg("tsrephone","对不起，手机格式不正确！");
		return;
	}
	if(pverify.length!=6){
		setRepMsg("tsrephonever","对不起，验证码长度不正确！");
		return;
	}
	if(pwd.length<6 || pwd.length>20){
		setRepMsg("tsrephonepwd","对不起，新密码长度不正确！");
		return;
	}
	if(pwds!=pwd){
		setRepMsg("tsrephonepwds","对不起，两次密码输入不一致");
		return;
	}
	$(cate).attr("disabled","disabled");
	$(cate).val("提交中....");
	//修改密码
	 $.ajax({
		 type: "POST",
		 url:REPWDHANDLE,
		 data:"phone="+phone+"&pwd="+pwd+"&repwd="+pwds+"&code="+pverify,
		 dataType:"json",
		 success:function(data){
		 if(data.status=='0'){
			 	$(cate).removeAttr('disabled');
			    $(cate).val("确定");
                ui.error(data.info);
		       	return;
		 }else{
             ui.success(data.info);
		        window.location.href="/";
		  }
		  }
		});
}
/**
 * 邮箱找回密码
 */
function repEmailNext(cate){
	$("p").text("");
	var email=$.trim($("#repemail").val());//获取用户手机号
	var code=$.trim($("#repcode").val());//获取用户手机号
	if(!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
		setRepMsg("repmsgemail","对不起，email不正确！");
		return;
	}
	if(code.length!=5){
		setRepMsg("repmsgcode","对不起，验证码格式不正确！");
		return;
	}
	$(cate).attr("disabled","disabled");
	$(cate).val("提交中....");
	//修改密码
	 $.ajax({
		 type: "POST",
		 url:REPWDEMAIL,
		 data:"email="+email+"&everify="+code,
		 dataType:"json",
		 success:function(data){
		 if(data.status=='0'){
			    $(cate).removeAttr('disabled');
			    $(cate).val("下一步");
                ui.error(data.info);
		       	return;
		 }else{
                ui.success(data.info);
		        window.location.href=OKEMAILADD;
		  }
		  }
		});

}
/**
 * 通用错误提醒
 */
function setRepMsg(id,msg){
	$("#"+id).text(msg);
}




/*

//worap部分最低高度设置
$(document).ready(function(){
           var headHeight = $('.header-worap').height();
           var footHeight = $('.footer-worap').height();
           var miniHeight = (parseInt($(document).height()-headHeight-footHeight))
           $('.worap').css({"min-height":(miniHeight-60)+'px'});
});
*/
