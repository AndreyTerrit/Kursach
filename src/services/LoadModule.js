
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
        products_REQUESTED(state) {
            state.problem_state = types.request_status.REQUESTED;
        },
        products_FAILED(state, error) {
            state.products_error = error;
            state.problem_state = types.request_status.FAILED;
        },
    },
    actions:{
        parse_products({ state, commit}){
            let controller_parse = new AbortController();
            controller = controller_parse;
            commit(types.mutations.products_REQUESTED);
            Vue.axios
                .get('http://localhost:10000/products',{ //СЕЙЧАС УКАЗАНО ЛОКАЛЬНО, А ВООБЩЕ ПО URL
                    signal: controller_parse.signal
                })
                .then((response) => {
                        commit(types.mutations.ADD_ALL_products,response.data,{root:true})
                        state.problem_state = types.request_status.SUCCEEDED;
                    }
                )
                .catch(error=>{
                    commit(types.mutations.products_FAILED,error)
                })
            //commit(types.mutations.ADD_ALL_products,products,{root:true})
            console.log("fetched data");
        },
        cancel_parse(){
            controller.abort();
        }
    }
}
export default load_module;