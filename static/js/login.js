/**
 * Created by Think on 2018/7/6.
 */

axios.defaults.baseURL = 'http://127.0.0.1:8888/';
var vm = new Vue({
    el:'#content',
    data:{
        mobile:'',
        password:'',
        account:false,
        datapsw:'',
        datamobile:''
    },
    methods:{
        login: function() {
            // this.getcookie();
            let that = this;
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(!reg.test(that.mobile) || this.password.length < 6 || this.password.length>20){
                alert('请填写正确的信息！')
            }else{
                axios.post('/login/',{
                    'mobile':that.mobile,
                    'password':that.password
                }).then((res)=>{

                    console.log(res.data);
                    this.$cookies.set('tesssionid',res.data.token);
                    this.$cookies.set('nick_name',res.data.nick_name);
                    this.$cookies.set('user_id',res.data.id);
                    location.href = './html/group/group.html'

                }).catch(function (err) {
                    console.log(err);
                    if(err.response.status === 400){
                        if(err.response.data.non_fields){
                            that.datapsw = err.response.data.non_fields;
                            that.datamobile = ''
                        }else if(err.response.data.mobile){
                            that.datapsw = '';
                            that.datamobile = err.response.data.mobile
                        }
                    }
                })
            }
        },
        changeMobile:function(){
            let that = this;
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(!reg.test(that.mobile)){
                this.account = '请输入正确的手机号!';

            }else{
                that.account = '';

            }
        },
        setCookie:function (userId) {
            let str = 'token = '+userId;
            document.cookie = str;
        },
        getcookie:function () {
            let cookies = document.cookie;
            let cookiesArr = cookies.split(';');
            cookiesArr.forEach(function (value, index, array) {
                var a = 'userId';
               if(value.indexOf(a)){
                   console.log(value);
                    return
               }
            });
        }
    }
});

