
import {types} from '@/store/types.js'
import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'

let controller = new AbortController();

Vue.use(VueAxios,axios)
let load_module= {
    namespaced: true,
    state:{
        problem_state: "",
    },
    mutations:{
        ARTICLES_REQUESTED(state) {
            state.problem_state = types.request_status.REQUESTED;
        },
        ARTICLES_FAILED(state, error) {
            state.articles_error = error;
            state.problem_state = types.request_status.FAILED;
        },
    },
    actions:{
        parse_articles({ state, commit}){
            let controller_parse = new AbortController();
            controller = controller_parse;
            commit(types.mutations.ARTICLES_REQUESTED);
            Vue.axios
                .get('http://localhost:10000/articles',{
                    signal: controller_parse.signal
                })
                .then((response) => {
                        commit(types.mutations.ADD_ALL_ARTICLES,response.data,{root:true})
                        state.problem_state = types.request_status.SUCCEEDED;
                    }
                )
                .catch(error=>{
                    commit(types.mutations.ARTICLES_FAILED,error)
                })
            //commit(types.mutations.ADD_ALL_ARTICLES,articles,{root:true})
            console.log("fetched data");
        },
        cancel_parse(){
            controller.abort();
        }
    }
}
export default load_module;