/**
 * Created by Think on 2018/8/3.
 */


axios.defaults.baseURL = 'http://127.0.0.1:8888/';

new Vue({
   el:"#content" ,
    data:{
        urlPrv:"http://127.0.0.1:8888/",
        // comments:[],
        thisPost:{},
        thiscomment:{},
        notLogin:false,
        postId:'',
        content:'',
        like:false,
        replyer:'回复',
        commentContent:'',
        showComment:'展开评论',
        showCom:false,
    },
    created(){
        this.getPost();
        this.getComments();
    },
    methods:{

        //获取这个帖子
        getPost:function(){
            let that = this;
            if(!store.state.tesssionid){
                location.href = "../../login.html"
            }
            that.postId = location.href.split('=')[1];
            axios.get("/posts/"+that.postId+"/",{
                headers:{
                    tsessionid: store.state.tesssionid
                }
            }).then((req)=>{
                that.thisPost = req.data;
                that.notLogin = true
            }).catch((err)=>{
                console.log(err);
                that.notLogin = false
            })
        },
        //获取评论
        getComments:function () {
            let that = this;
            axios.get("posts/"+that.postId+"/comments/",{
                headers:{
                    tsessionid: store.state.tesssionid
                }
            }).then((req)=>{
                that.thiscomment = req.data;
                for(let i = 0; i<that.thiscomment.length; i++){
                    Vue.set(that.thiscomment[i],['showComment'] , '展开评论');
                    if(that.thiscomment[i]['has_liked'] === true){
                        that.like = true
                    }
                }

            }).catch((err)=>{
                console.log(err)
            })
        },
        //点击回复
        replyaa:function(id,name){
              this.replyer = `回复${name}`;
              this.thisPost.user.id = id;
        },
        //回复请求
        addReplys:function (index,commId) {
            let that = this;
            axios.post('/comments/'+commId+'/replys/',{
                "content":that.content,
                "replyed_user":that.thisPost.user.id
            },{
                headers:{
                    tsessionid: store.state.tesssionid
                }
            }).then((req)=>{
                that.content = '';
                that.getCommToComm(index,commId)
            })
        },
        //点赞
        addLike:function (id,index) {
            let that = this;
            axios.post('/comments/'+id+'/likes/',{},{
                headers:{
                    tsessionid: store.state.tesssionid
                }
            }).then((req)=>{
                that.like = true;
               Vue.set(that.thiscomment[index],'like_nums', 1 + that.thiscomment[index].like_nums);
            }).catch((err)=>{

            })
        },
        addComment:function () {
            let that = this;
            axios.post("/posts/"+that.postId+"/comments/",{
                "content":that.commentContent
            },{
                headers:{
                    tsessionid: store.state.tesssionid
                }
            }).then((req)=>{
                that.getComments();
                that.commentContent =''
            }).catch((err)=>{
                console.log(err)
            })
        },
        getCommToComm:function (index,id) {
            let that = this;
            axios.get('/comments/'+id+'/replys/',{
                headers:{
                    tsessionid: store.state.tesssionid
                }
            }).then((req)=>{
                Vue.set(that.thiscomment[index],"commToComm",req.data);
            }).catch((err)=>{
                console.log(err)
            })
        },
        showedComment:function (index,commentId) {
            let that = this;
            if(that.thiscomment[index]['showCom'] === true){
                that.thiscomment[index]['showComment'] = '展开评论';
                Vue.set(that.thiscomment[index],"showCom",false);
            }else {
                that.thiscomment[index]['showComment'] = '收起评论';
                for(let i = 0; i<that.thiscomment.length; i++){
                    Vue.set(that.thiscomment[i],['showCom'] , false)
                }
                Vue.set(that.thiscomment[index],"showCom",true);
                that.getCommToComm(index,commentId);
            }
        }
    },

});
