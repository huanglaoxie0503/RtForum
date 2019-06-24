/**
 * Created by Think on 2018/8/11.
 */

axios.defaults.baseURL = 'http://127.0.0.1:8888/';

let vm = new Vue({
    el:"#content",
    data:{
        show:0,
        category:'',
        title:'',
        content:'',
        file:'',
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
        },
    },
    methods:{
        showname(){
            if(!store.state.username){
                location.href = '../../login.html';
                notLogin = false
            }else {
                notLogin = true
            }
        },
        changeImage: function(e){
            this.file = e.target.files[0];
        },
        addquestion(event){
            let that = this;
            //序列化表单
            event.preventDefault();
            let formData = new FormData();
            formData.append('category', that.category);
            formData.append('title', that.title);
            formData.append('content', that.content);
            formData.append('image', this.file);
            axios.post('questions/',formData,{
                headers:{
                    tsessionid:store.state.tesssionid
                }
            }).then((req)=>{
                alert("成功");
                location.href = './questionsList.html'
            }).catch((err)=>{
                console.log(err)
            })
        },
        getCategory(cate){
            const that =this;
            if(cate === 0){
                that.category = "技术问答";
                that.show = 0
            }else if(cate === 1){
                that.category = "技术分享";
                that.show = 1
            }else if(cate === 2){
                that.category = "活动建议";
                that.show = 2
            }
        }
    }
})

