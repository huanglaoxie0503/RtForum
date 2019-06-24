/**
 * Created by Think on 2018/7/21.
 */


axios.defaults.baseURL = 'http://127.0.0.1:8888/';
let vm = new Vue({
   el:'#content',
   data:{
       avatar:'',
       file:'',
       token:'',
       front_image:'',
       name:'',
       category:"",
       desc:"",
       notice:"",
       $message:''
   } ,

    updated(){
       this.upload()
    },

    created(){
       this.showname()

    },
    computed:{
        user(){
            return store.state.username
        },
        notLogin(){
            return store.state.notLogin
        }
    },
    methods:{

       createGroup:function(){

       },
        showname(){
            return store.commit('showname')
        },
        changeImage: function(e){
            this.file = e.target.files[0];
        },
        upload: function(event){
           let that = this;
           tesessionid = this.$cookies.get('tesssionid');
           if(tesessionid == null){
                location.href = '../../login.html'
            }
           //表单统一验证
           //  setTimeout(function () {
            event.preventDefault();
            let formData = new FormData();
            formData.append('name', that.name);
            formData.append('category', that.category);
            formData.append('desc', that.desc);
            formData.append('notice', that.notice);
            formData.append('front_image', this.file);
            if(that.notice && that.desc && that.front_image && that.name && that.category){
                    axios.post('/groups/', formData,{
                        headers:{
                            "tsessionid": tesessionid,
                            "Content-Type": "multipart/form-data"
                        }
                    }) //调用上传接口,把data传递给接口
                        .then(res => {
                            alert("新建小组成功")
                            that.file = '';
                            let data = res.data;
                            //给父组件传递emit事件，把返回的图片路径相关参数传递过去
                            that.$emit("upload", data );
                            that.$message({
                                type: "success",
                                message: "上传成功！"
                            })
                        }).catch(err => {
                        console.log(err);
                        if(err.data){
                            that.$message({
                                type: "error",
                                message: err.data
                            })
                        }else {
                            that.$message({
                                type: "error",
                                message: "上传失败"
                            })
                        }
                    })
                }else {
                    alert('请填写每一条信息！')
                }
            // });


        },
        getToken:function(id) {
            let cookies = document.cookie;
            let cookiesArr = cookies.split(';');
            cookiesArr.forEach(function (value, index, array) {
                if(value.indexOf(id) != -1){
                    let result = value.split('=')[1];
                    vm.token = result;
                }
            });
        }

    },

});






