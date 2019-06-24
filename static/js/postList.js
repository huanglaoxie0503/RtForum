axios.defaults.baseURL = 'http://127.0.0.1:8888/';
let vm = new Vue({
    el:'#content',
    data:{
        groupId:13,
        thisGroup:{},
        postsList:[],
        notLogin:false,
        hot:[]
    },
    created(){
        this.getGroup();
        this.getPosts("全部帖子");
        this.getHot();
    },
    methods:{
        //根据groupID获取小组的信息
        getGroup(){
            let that = this;
            this.getGroupId();
            if(!store.state.tesssionid){
                location.href = '../../login.html';
                that.notLogin = false
            }else {
                that.notLogin = true
            }
            axios.get('/groups/'+that.groupId+'/',{
                headers:{
                    "tsessionid":store.state.tesssionid
                }
            }).then((req)=>{
               that.thisGroup = req.data;
               //处理小组的数组，将需要的groupID对应的小组赋值给thisGroup
            }).catch((err)=>{
                console.log(err)
            })
        },
        getGroupId(){
            this.groupId = location.href.split("=")[1];
        },
        getPosts(category){
            let that = this;
            axios.get('/groups/'+that.groupId+'/posts/?cate='+category,{
                headers:{
                    "tsessionid":store.state.tesssionid
                }
            }).then((req)=>{
                that.postsList = req.data;
            }).catch((err)=>{
                console.log(err);
            })
        },
        getHot(){
            let that = this;
            axios.get('/groups/'+that.groupId+'/posts/?cate=hot',{
                headers:{
                    "tsessionid":store.state.tesssionid
                }
            }).then((req)=>{
                that.hot = req.data;
            }).catch((err)=>{
                console.log(err);
            })
        },

    },
    computed:{
        user:function () {
            return store.state.username;
        }
    }
});


