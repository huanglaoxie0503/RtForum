/**
 * Created by Think on 2018/8/8.
 */

var ue = UE.getEditor('container');
var html;
ue.ready(function () {
    html = ue.getContent();
});
axios.defaults.baseURL = 'http://127.0.0.1:8888/';

let vm = new Vue({
    el:"#content",
    data:{
        title:'',
        groupId:'',
        notLogin:false
    },
    created(){
        this.getGroupId();
    },
    methods:{
        getGroupId(){
            this.groupId = location.href.split('=')[1];
            if(!store.state.tesssionid){
                location.href = '../../login.html';
                this.notLogin = false
            }else {
                this.notLogin = true
            }
            console.log(this.notLogin)
        },
        addPost(){
            let that = this;
            var ue = UE.getEditor('container');
            var html;
            ue.ready(function () {
                html = ue.getContent();
            });
            axios.post("/groups/"+that.groupId+"/posts/",{
                "title":that.title,
                "content":html
            },{
                headers:{
                    "tsessionid":store.state.tesssionid
                }
            }).then(()=>{
                location.href = './postsList.html?groupid='+that.groupId
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    computed:{
        user:function () {
            return store.state.username
        }
    }
});












