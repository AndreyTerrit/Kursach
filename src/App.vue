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
          <router-link to="/ShoppingCart"> Корзина</router-link>
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
    //
  }),
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
</style>
