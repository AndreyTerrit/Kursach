import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsList from "@/components/ProductsList";
import AddForm from "@/components/AddForm";
import MyArticle from "@/components/MyArticle";
import store from "../store"
import AboutPage from "@/components/AboutPage";
import MyCarousel from "@/components/MyCarousel"
import selectRestaurantPage from "@/components/SelectRestaurantPage"
Vue.use(VueRouter)

const routes = [
  {
    path: '/restaurant/:name/products',
    //name: 'my-article',
    component: ProductsList,
    props: (route) => store.state.restaurants_modules.restaurants.find((x) => x.name == route.params.name),
  },
  {
    path: '/AddForm',
    name: 'add-form',
    component: AddForm
  },
  {
    path: '/restaurant/:name/products/:id',
    component: MyArticle,
    props: (route) => store.state.products.find((x) => (x.id == route.params.id) && (x.id_restaurant == store.state.restaurants_modules.restaurants.filter(function(restaurant){
        return restaurant.name == route.params.name;
    })[0].id_restaurant ))
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
  },
  {
    path: '/selectRestaurants',
    name: 'selectRestaurants',
    component: selectRestaurantPage,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
