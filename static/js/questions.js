/**
 * Created by Think on 2018/8/11.
 */

new Vue({
    el:"#questions",

    created(){
        this.showname();
        this.getquestions()
    },

    data(){
        return{
            res:[]
        }
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
        getquestions () {
            let that = this;
            axios.get("http://39.104.13.197:8000/questions/",{
                params:{
                    "o":"new",
                    "c":""
                }
            })
                .then(function(response){
                    that.res = response.data
                })
                .catch(function(err){
                    console.log(err);
                });

        },
        showname(){
           return store.commit('showname')
        }

}
})




