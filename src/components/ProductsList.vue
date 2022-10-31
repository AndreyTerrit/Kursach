<template>
  <v-container>
    <!-- ПРИ ЗАГРУЗКЕ СПИСКА -->

    <div
      class=""
      v-if="$store.state.products_modules.problem_state == 'requested'"
    >
      <div class="loading">
        <h1>Loading...</h1>
        <br /><v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <br /><button class="cancel-btn" @click="cancel_parse">
          Отменить загрузку
        </button>
      </div>
    </div>

    <!-- ПРИ ОШИБКЕ ЗАГРУЗКИ -->
    <div
      v-if="$store.state.products_modules.problem_state == 'failed'"
      class="loading-error"
    >
      <h1>
        Loading error! + {{ $store.state.products_modules.products_error }}
      </h1>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-10"
            color="black"
            dark
            outlined
            v-bind="attrs"
            v-on="on"
          >
            Повторить загрузку
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Подтвердите повторную загрузку
          </v-card-title>

          <v-card-text class="mt-7"> Вы уверены? </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="reload_products"> Да </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> нет </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ПРИ УСПЕШНОЙ ЗАГРУЗКЕ -->
    <div
      v-if="
        product_list.length > 0 &&
        $store.state.products_modules.problem_state == 'succeeded'
      "
    >
      <v-container>
        <v-row>
          <v-col sm="2" cols="12">
            <router-link :to="'/selectRestaurants'">
              <v-btn class="ma-2" outlined color="indigo"> Назад </v-btn>
            </router-link>
          </v-col>
          <v-col cols="12" sm="8" class="text-center">
            <div class="text-primary"><h2>Выберите блюдо</h2></div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row justify="center">
          <!--product_list - вычисляемое св-во в computed из  $store.state.products...  Здесь происходит вывод списка продуктов конкретного ресторана-->
          <!-- <router-link 
                 > -->
          <v-col v-for="product in product_list" :key="product.id">
            <v-card
              elevation="10"
              class="mx-auto"
              max-width="344px"
              outlined
              height="100%"
            >
              <router-link
                :to="'/restaurant/' + name + '/products/' + product.id"
              >
                <v-img :src="product.src" height="200px"> </v-img>
              </router-link>
              <v-container>
                <router-link
                  :to="'/restaurant/' + name + '/products/' + product.id"
                >
                  <div style="color: black">
                    <v-card-title class="text-center">
                      <h3 class="text-h4 text--primary">{{ product.name }}</h3>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="pb-0">
                      <v-row justify="space-between">
                        <v-col cols="3">
                          <p class="">
                            {{ product.weight + product.units_of_measurement }}
                          </p>
                        </v-col>

                        <v-col sm="7" xs="7" cols="9" class="text-end">
                          <p class="pl-4">
                            {{ "БЖУ : " + product.PCF }}
                          </p>
                        </v-col>
                      </v-row>
                      <p>{{ product.body }}</p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="pb-0">
                      <v-row>
                        <v-col>
                          <p class="font-weight-bold text--primary">
                            Стоимость :
                          </p>
                        </v-col>
                        <v-col sm="3" cols="4">
                          <p class="font-weight-bold text--primary">
                            {{ product.cost + " ₽" }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </router-link>

                <div class="text-center">
                  <v-btn
                    class="ma-2"
                    outlined
                    color="#1976d2"
                    @click="add_in_cart(product)"
                  >
                    В корзину
                  </v-btn>
                </div>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import store from "@/store";
import { types } from "@/store/types.js";
export default {
  components: {
    //MyArticle,
  },
  props: {
    id_restaurant: Number,
    telephone: String,
    address: String,
    name: String,
    description: String,
    email: String,
    src: String,
    rating: Number,
  },
  data() {
    return {
      product: {
        //Не нужено
        name: this.name,
        cost: this.cost,
        PCF: this.PCF,
        body: this.body,
        published: this.published,
        weight: this.weight,
        units_of_measurement: this.units_of_measurement,
        src: this.src,
      },
      dialog: false,
      restaurants: [],
    };
  },
  name: "ArticleList",
  methods: {
    reload_products() {
      store.state.products_modules.problem_state =
        types.request_status.REQUESTED;
      store.dispatch(types.actions.PARSE_products);
      this.dialog = false;
    },
    cancel_parse() {
      store.dispatch(types.actions.CANCEL_PARSE);
    },
    add_in_cart(product) {
      store.commit("add_dish", product);
    },
  },
  computed: {
    // Динамически формирует список продуктов для конкретного ресторана
    product_list() {
      let product_list_all = [];
      //console.log(store.state.restaurants_modules.restaurants.find((x) => x.name == "MCdonald's"))
      for (let i = 0; i < this.$store.state.products.length; i++) {
        if (this.$store.state.products[i].id_restaurant == this.id_restaurant) {
          product_list_all.push(this.$store.state.products[i]);
        }
      }
      console.log(product_list_all);
      return product_list_all;
    },
  },
};
</script>

<style scoped>
.reload-btn {
  background-color: #e4dede;
  border: none;
  padding: 5px 7px;
  border-radius: 5px;
  margin-top: 40px;
}
.cancel-btn {
  background-color: #e4dede;
  border: none;
  padding: 5px 7px;
  border-radius: 5px;
  margin-top: 40px;
}

.window-requested {
  text-align: center;
}

a {
  text-decoration: none;
}

.loading {
  text-align: center;
  padding: 100px 0;
}

.loading-error {
  text-align: center;
  padding: 100px 0;
}

.text-align-center {
  text-align: center;
}
</style>
