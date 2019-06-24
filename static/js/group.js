/**
 * Created by Think on 2018/7/14.
 */
axios.defaults.baseURL = 'http://127.0.0.1:8888/';
let vm = new Vue({
    el:"#content",
    data:{
        groupMsg:[],
        hotGroup:[],
        showDialog:"none",
        groupId:'',
        apply_reason:'',
        token:'',
        category:'all',
        number:1,
        hotnumber:true
    },
    computed:{
        user(){
            return store.state.username
        },
        notLogin(){
            return store.state.notLogin
        }
    },
    created(){
        this.showname();
        this.getGroup("");
        this.hottGroup("new")
    },
    methods:{
        getGroup(category){
            let that = this;
            that.category = category;
            axios.get('/groups/?c='+category,{
                }).then(function (req) {
                that.groupMsg = req.data;
                if(store.state.tesssionid){
                    that.notLogin = true
                }else {
                    that.notLogin = false
                }
                }).catch(function (err) {
                    console.log(err)
                });
            if(category == 'new'){
                that.number = 1
            }else if(category == '教育同盟'){
                that.number = 2
            }else if(category == '同城交易'){
                that.number = 3
            }else if(category == '程序设计'){
                that.number = 4
            }else if(category == '生活兴趣'){
                that.number = 5
            }
        },
        showname(){
            return store.commit('showname')
        },
        groupOrder(order){
            let that = this;
            axios.get('/groups/?o='+order+"&c="+that.category,{
            }).then(function (req) {
                that.groupMsg = req.data;
            }).catch(function (err) {
                console.log(err)
            });
            if(order == 'new'){
                that.hotnumber = true
            }else {
                that.hotnumber = false
            }
        },
        hottGroup(category){
            let that = this;
            axios.get('/groups/?limit=5',{
            }).then(function (req) {
                that.hotGroup = req.data;
            }).catch(function (err) {
                console.log(err)
            })
        },
        showJoin:function(id){
            this.showDialog = "inline-block";
            this.groupId = id;
        },
        hideJoin(){
            this.showDialog = "none"
        },
        joinGroup(n){
            let that = this;
            tesessionid = this.$cookies.get('tesssionid');
            if(tesessionid == null){
                location.href = '../../login.html'
            }
            axios.post("/groups/"+n+"/members/",{
                "apply_reason":that.apply_reason,
            },{
                headers:{
                    tsessionid:tesessionid
                }
            }).then((req)=>{
                console.log(req.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
});

