<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab>
          <router-link to="/selectRestaurants">Выбор ресторана</router-link>
        </v-tab>
        <!-- <v-tab>
          <router-link to="/AddForm">Add Article </router-link>
        </v-tab> -->
        <!-- <v-tab>
          <router-link to="/about"> About</router-link>
        </v-tab> -->
        <v-tab>
          <div class="shoppingCartRef">
            <div class="shoppingCartRefCounter">
              {{ this.$store.state.shopping_cart_module.quantity }}
            </div>
            <router-link to="/ShoppingCart"> Корзина</router-link>
          </div>
        </v-tab>
        <v-tab>
          <router-link to="/auth"> Войти</router-link>
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col offset="0" offset-sm="2" cols="12" sm="8">
            <v-sheet min-height="100vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CheckBox from "./components/CheckBox";
import Vue from "vue";

Vue.component("CheckBox", CheckBox);
export default {
  name: "App",

  data: () => ({
    quantity: 0,
  }),
  //   computed: {
  //     quantity_all_dishes() {
  //       //Не менять текущую переменную а создать новую
  //       let quantity = 0;
  //       for (let dish of this.$store.state.shopping_cart_module.dishes_list) {
  //         quantity += dish.quantity_in_cart;
  //       }
  //       return quantity;
  //     },
  //   },
  beforeMount() {
    this.$router.push("/selectRestaurants");
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.shoppingCartRef {
  position: relative;
}
.shoppingCartRefCounter {
  position: absolute;
  top: -16px;
  right: -10px;
  border-radius: 50%;
  background: #dcdcdc;
  color: #2c3e50;
  height: 22px;
  width: 22px;
  padding-top: 3px;
  font-size: 12px;
  font-weight: bold;
}
</style>
