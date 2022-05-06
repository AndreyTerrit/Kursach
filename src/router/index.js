import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from "@/components/ArticleList";
import AddForm from "@/components/AddForm";
import MyArticle from "@/components/MyArticle";
import store from "../store"
import AboutPage from "@/components/AboutPage";
import MyCarousel from "@/components/MyCarousel"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'my-article',
    component: ArticleList,
  },
  {
    path: '/AddForm',
    name: 'add-form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddForm
  },
  {
    path: '/product/:id',
    component: MyArticle,
    props: (route) => store.state.products.find((x) => x.id == route.params.id)
  },
  {
    path: '/about',
    name: 'about-page',
    component: AboutPage,
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: MyCarousel,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
