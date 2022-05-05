import Vue from 'vue'
import Vuex from 'vuex'
import load_module from "@/services/LoadModule";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
  },
  getters: {
  },
  mutations: {
    add_art(state, value){
      let new_article = {
        id: state.articles[state.articles.length-1].id+1,
        ...value
      }
      state.articles.push(new_article);
      console.log(new_article.id);
    },
    change_status(state, id){
      state.articles[id-1].published = !state.articles[id-1].published;
    },
    add_all_articles(state, articles){
      state.articles = articles;
    }
  },
  actions: {
    add_article(context, value){
      context.commit('add_art', value);
    }
  },
  modules: {
    load_modules: load_module
  }
})
