<template>
  <v-container>
    <!-- ПРИ ЗАГРУЗКЕ СПИСКА -->
    <div
      class="text-center"
      v-if="
        $store.state.restaurants_modules.problem_state_restaurant == 'requested'
      "
    >
      <div class="loading">
        <br />
        <br />
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
      v-if="
        $store.state.restaurants_modules.problem_state_restaurant == 'failed'
      "
      class="loading-error"
    >
      <v-row justify-content="center">
        <v-col class="text-center">
          <h1>Loading error!</h1>
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
                <v-btn color="primary" text @click="reload_restourants">
                  Да
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  нет
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
    <!-- ПРИ УСПЕШНОЙ ЗАГРУЗКЕ -->
    <div
      v-if="
        $store.state.restaurants_modules.problem_state_restaurant == 'succeeded'
      "
    >
      <v-container>
        <v-row justify="center">
          <!--restourant_list - вычисляемое св-во в computed из  $store.state.restourants...  Здесь происходит вывод списка продуктов конкретного ресторана-->
          <!-- <router-link 
                 > -->
          <v-col
            v-for="restourant in $store.state.restaurants_modules.restaurants"
            :key="restourant.id_restaurant"
          >
            <v-card class="mx-auto my-12" max-width="374" elevation="5">
              <v-img height="250" :src="restourant.src"></v-img>

              <v-card-title>{{ restourant.name }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="restourant.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ms-4">({{ restourant.rating }})</div>
                </v-row>

                <div class="my-4 text-subtitle-1">$ • restourant</div>

                <div>{{ restourant.description }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <router-link
                  :to="'/restaurant/' + restourant.name + '/products'"
                >
                  <v-btn color="deep-purple lighten-2" text @click="open_menu">
                    ОТКРЫТЬ МЕНЮ
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import store from "@/store";
import { typesRestaurants } from "@/store/typesRestaurants";
//import { types } from '@/store/types'

export default {
  name: "selectRestaurantPage",
  components: {},
  props: {},
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    reload_restourants() {
      store.problem_state_restaurant =
        typesRestaurants.request_status.REQUESTED;
      store.dispatch(typesRestaurants.actions.PARSE_restaurants);
      this.dialog = false;
    },
    cancel_parse() {
      console.log(typesRestaurants.actions.cancel_parse_restaurants);
      store.dispatch(typesRestaurants.actions.cancel_parse_restaurants);
    },
  },
  computed: {},
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.cancel-btn {
  background-color: #e4dede;
  border: none;
  padding: 5px 7px;
  border-radius: 5px;
  margin-top: 40px;
}
</style>
