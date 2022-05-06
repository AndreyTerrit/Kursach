import Vue from 'vue'
import Vuex from 'vuex'
import load_module from "@/services/LoadModule";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
  },
  getters: {
  },
  mutations: {
    add_prod(state, value){
      let new_product = {
        id: state.products[state.products.length-1].id+1,
        ...value
      }
      state.products.push(new_product);
      console.log(new_product.id);
    },
    change_status(state, id){
      state.products[id-1].published = !state.products[id-1].published;
    },
    add_all_products(state, products){
      state.products = products;
    }
  },
  actions: {
    add_product(context, value){
      context.commit('add_prod', value);
    }
  },
  modules: {
    load_modules: load_module
  }
})
