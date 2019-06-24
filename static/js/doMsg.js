
axios.defaults.baseURL = 'http://127.0.0.1:8888';
let vm = new Vue({
   el:'#content',
   data:{
       commentList:[],
       applysList:[],
       chackList:[],
       showcomments:true,
       showapply:false,
       showchack:false,
       applyId:'',
       showDialog:false,
       activeindex:1,
       refuseContent:'',
       allowDialog:false
   } ,
   created(){
        this.getComments();
        this.getchack();
   },
    computed:{
        user(){
            return store.state.username
        },
        notLogin(){
            message_type=4
            return store.state.notLogin
        },
    },
    methods: {
        //获取消息并分类；
        getComments: function () {
            let that = this;
            axios.get('/messages/?message_type=1',{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            }).then((res)=>{
                    that.commentList = res.data;
                    for(let i = 0; i < that.commentList.length; i++){
                        that.commentList[i].message_type='回复';
                        that.commentList[i].sender.head_url =  axios.defaults.baseURL + that.commentList[i].sender.head_url
                    }
                }).catch((err)=>{
                console.log(err)
            })
        },

        getchack(){
            let that = this;
            console.log(store.state.tesssionid);
            axios.get('/applys/',{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            })
                .then((res)=>{
                    that.chackList = res.data;
                    console.log(that.chackList)
                })
        },

        getlike(){
            let that = this;
            //获取点赞
            axios.get('/messages/?message_type=3&message_type=2&message_type=5',{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            },{

            }).then((res)=>{
                that.applysList = res.data.map((i)=>{
                    if(i.message_type == 3){
                        i.message_type = '点赞'
                    }else {
                        i.message_type = '回复'
                    }
                    i.sender.head_url = axios.defaults.baseURL
                        + i.sender.head_url;
                    return i
                })
            }).catch((err)=>{
                console.log(err)
            })
        },
        //点击显示隐藏
        showCommentList(){
            this.showcomments  =true;
            this.showapply = false;
            this.showchack = false;
            this.activeindex = 1
        },
        showApplyList(){
            this.showcomments  =false;
            this.showapply = true;
            this.showchack = false;
            this.activeindex = 2;
            this.getlike()
        },
        showChackList(){
            this.showcomments  =false;
            this.showapply = false;
            this.showchack = true;
            this.activeindex = 3;
            this.getchack()
        },
        //审核拒绝
        refuse(id){
            this.applyId = id;
            this.showDialog = true;

        },
        allow(id){
            this.applyId = id;
            this.allowDialog = true;
        },
        cancaldialog(){
            this.showDialog = false;
           this.refuseContent = ''
        },
        cancalallowdialog(){
            this.allowDialog = false;
        },
        doAllow(){
            let that = this ;
            axios.patch('/members/'+that.applyId+'/',{
                "status":'agree',
                "handle_msg":''
            },{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            }).then((res)=>{
                alert('已通过');
                that.cancalallowdialog();
                that.getchack()
            }).catch((err)=>{
                alert('出错，请重试');
                that.cancaldialog()
            })
        },
        doRefuse(){
            let that = this ;
            axios.patch('/members/'+that.applyId+'/',{
                  "status":'refuse',
                    "handle_msg":that.refuseContent
            },{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            }).then((res)=>{
               alert('已拒绝');
               that.cancaldialog();
                that.getchack()
            }).catch((err)=>{
                alert('出错，请重试');
                that.cancaldialog()
            })
        }



    }
});