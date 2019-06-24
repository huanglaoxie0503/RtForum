/**
 * Created by Think on 2018/8/12.
 */



axios.defaults.baseURL = 'http://127.0.0.1:8888/';


let vm = new Vue({
    el:"#content",
    data:{
        questions:{},
        content:'',
        answers:[],
        showreply:'评论',
        replyContent:'',
        replies:[],
        replyer:'回复',
        replyeduser:'',
        answerId:'',
        questionId:'',
        replyUserId:'',
        replyUserName:''
    },
    computed:{
        user(){
            return store.state.username
        },
        notLogin(){
            return store.state.notLogin
        },

    },
    created(){
        this.getQuestionId();
        this.showname();
        this.getQuestions();
        this.getanswer();
    },
    methods:{
        getQuestionId(){
            this.questionId = location.href.split('=')[1]
        },
        showedComment:function (index,commentId) {
            let that = this;
            that.replyeduser = that.answers[index].user.id;
            if(that.answers[index]['showreply'] === true){
                Vue.set(that.answers[index],'showComment' , '展开评论');
                that.showcoms = '';
                Vue.set(that.answers[index],"showreply",false);
            }else {
                for(let i = 0; i<that.answers.length; i++){
                    Vue.set(that.answers[i],'showreply', false);
                    this.answers[i]["showComment"] = '展开评论'
                }
                this.answers[index]["showComment"] = '收起评论';
                that.showcoms = '';
                Vue.set(that.answers[index],"showreply",true);
            }

            this.getreply(commentId)
        },

        showname(){
            return store.commit('showname')
        },
        getQuestions:function () {
            const that = this;
            axios.get("questions/",{
                params : {
                    "o": "new",
                    "c": "技术问答",
                }
            })
                .then(function(response){
                    that.questions = response.data[0]
                })
                .catch(function(err){
                });
        },
        getanswer(){
            const that = this;
                axios.get('questions/'+that.questionId+'/answers/',{
                    headers:{
                        "tsessionid": store.state.tesssionid,
                    }
                })
                    .then(function(req){
                        that.answers = req.data;
                        for(let i = 0; i <= req.data.length;i++){
                            Vue.set(that.answers[i],'showComment' , '展开评论');
                        }
                    })
            },
        addanswer(){
            const that = this;
            axios.post("questions/"+that.questionId+"/answers/",{
                "content":that.content
            },{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            }).then((req)=>{
                that.getanswer();
                that.content = '';
            }).catch((err)=>{
                console.log(err)
            })
        },
        //需要选择被评论人和answers的id
        addreply(answerId,userAnswerId,like_nums,index){
            let that = this;
            if(userAnswerId != ''){
                axios.post('answers/'+userAnswerId+'/replys/',{
                    "replyed_user":that.replyeduser,
                    "content":that.replyContent
                },{
                    headers:{
                        "tsessionid": store.state.tesssionid,
                    }
                }).then((req)=>{
                    that.replyContent = '';
                    that.getreply(answerId)

                })
            }else {
                axios.post('answers/'+answerId+'/replys/',{
                    "replyed_user":that.replyeduser,
                    "content":that.replyContent
                },{
                    headers:{
                        "tsessionid": store.state.tesssionid,
                    }
                }).then((req)=>{
                    that.replyContent = '';
                    that.getreply(answerId)
                })
            }

        },
        getreply(id){
            let that = this;
            axios.get('/answers/'+id+'/replys/',{
                headers:{
                    "tsessionid": store.state.tesssionid,
                }
            }).then((req)=>{
                req.data.unshift(1);
                that.replies = req.data;
            }).catch((err)=>{
                console.log(err)
            })
        },
        chooseReply(replyedUser,replyId){
            this.replyer = `回复${replyedUser}`;
            this.answerId = replyId;
        },

        }

})

