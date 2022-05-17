import {typesRestaurants} from '@/store/typesRestaurants'

import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'

let controller = new AbortController();

Vue.use(VueAxios,axios)
let restaurants_modules= {
    namespaced: false,
    state:{
        problem_state_restaurant: "",
        restaurants_error : "",
        restaurants: []
    },
    mutations:{
        restaurants_REQUESTED(state) {
            state.problem_state_restaurant = typesRestaurants.request_status.REQUESTED;
        },
        restaurants_FAILED(state, error) {
            state.restaurants_error = error;
            state.problem_state_restaurant = typesRestaurants.request_status.FAILED;
        },
        add_all_restaurants(state,restaurants){
            state.restaurants = restaurants;
        }
    },
    actions:{
        parse_restaurants({ state, commit}){
            let controller_parse = new AbortController();
            controller = controller_parse;
            //console.log(typesRestaurants.mutations.restaurants_REQUESTED)
            commit(typesRestaurants.mutations.restaurants_REQUESTED);
            Vue.axios
                .get('http://localhost:10000/restaurants',{ //СЕЙЧАС УКАЗАНО ЛОКАЛЬНО, А ВООБЩЕ ПО URL
                    signal: controller_parse.signal
                })
                .then((response) => {
                    //console.log("this is parse restourants")
                    //console.log(response.data)
                        commit(typesRestaurants.mutations.ADD_ALL_restaurants,response.data)
                        state.problem_state_restaurant = typesRestaurants.request_status.SUCCEEDED;
                        //console.log(store.state.restaurants_modules.restaurants)//ok
                    }
                )
                .catch(error=>{
                    commit(typesRestaurants.mutations.restaurants_FAILED,error)
                })
            //commit(typesRestaurants.mutations.ADD_ALL_restaurants,restaurants,{root:true})
            console.log("fetched data");
            
        },
        cancel_parse_restaurants(){
            controller.abort();
        }
    }
}
export default restaurants_modules;