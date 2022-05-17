<template>
  <div v-if="$store.state.shopping_cart_module.dishes_list.length > 0">
    <v-row>
      <v-col>
        <v-card
          elevation="0"
          class="mx-4"
          max-width="644px"
          outlined
          height="100%"
        >
          <v-card-title></v-card-title>

          <v-list subheader>
            <v-subheader class="text-center"><h2>Блюда</h2></v-subheader>

            <v-list-item v-for="dish in dishes_list" :key="dish" class="ggg">
              <v-list-item-avatar>
                <v-img :alt="`avatar`" :src="dish.src"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class=""
                  v-text="dish.name"
                ></v-list-item-title>
                <v-row>
                  <v-col>
                    <span>{{ dish.quantity_in_cart }} шт. </span>
                  </v-col>
                  <v-col align-self="center"> {{ dish.cost }} Руб. </v-col>
                </v-row>
              </v-list-item-content>

              <v-btn color="#e4dede" depressed @click="delete_dish(dish)">
                Удалить
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card elevation="0" class="mx-4" outlined>
          <v-card-title
            ><v-subheader class="mx-auto"
              ><h1>Итого</h1></v-subheader
            ></v-card-title
          >

          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Общее Количество товаров : {{ quantity_all }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                Общая сумма : {{ total_sum }} Рублей.
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  rounded
                  text
                  class="mx-auto"
                  v-bind="attrs"
                  v-on="on"
                >
                  Оформить заказ
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Оформление заказа
                </v-card-title>

                <v-card-text class="mt-7">
                  <validation-observer ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="submit">
                      <validation-provider
                        v-slot="{ errors }"
                        name="name"
                        rules="required|max:15"
                      >
                        <v-text-field
                          v-model="name"
                          :counter="10"
                          :error-messages="errors"
                          label="Имя"
                          required
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="phoneNumber"
                        :rules="{
                          required: true,
                          digits: 11,
                        }"
                      >
                        <v-text-field
                          v-model="phoneNumber"
                          :counter="11"
                          :error-messages="errors"
                          label="Номер телефона"
                          required
                        ></v-text-field>
                      </validation-provider>

                      <validation-provider
                        v-slot="{ errors }"
                        name="select"
                        rules="required"
                      >
                        <v-select
                          v-model="payment_method"
                          :items="items"
                          :error-messages="errors"
                          label="Способ оплаты"
                          data-vv-name="select"
                          required
                        ></v-select>
                      </validation-provider>
                      <div v-if="payment_method == 'Безнал'">
                        <v-text-field
                          v-model="card_number"
                          label="Номер карты"
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="card_name"
                          label="Имя на карте"
                          required
                        ></v-text-field>
                      </div>
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="checkbox"
                      >
                        <v-checkbox
                          v-model="checkbox"
                          :error-messages="errors"
                          value="1"
                          label="Согласен с публичной офертой"
                          type="checkbox"
                          required
                        ></v-checkbox>
                      </validation-provider>

                      <v-btn
                        color="primary"
                        text
                        @click="sendOrder"
                        type="submit"
                        :disabled="invalid"
                      >
                        Завершить оформление
                      </v-btn>
                      <v-btn @click="clear" color="primary" text>
                        Очистить
                      </v-btn>
                    </form>
                  </validation-observer>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else class="text-center">
    <h3 class="pt-10 text-primary">В корзине пока пусто!</h3>
  </div>
</template>

<script>
import store from "@/store";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} должен быть {length} цифр. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} ",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  name: "ShoppingCart",
  components: { ValidationProvider, ValidationObserver },
  props: {},
  data() {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      select: null,
      items: ["Наличные", "Безнал"],
      checkbox: null,
      dialog: false,
      payment_method: "",
      card_number: "",
      card_name: " ",
    };
  },
  computed: {
    dishes_list() {
      return this.$store.state.shopping_cart_module.dishes_list;
    },
    quantity_all() {
      //Не менять текущую переменную а создать новую
      let quantity = 0;
      for (let dish of this.$store.state.shopping_cart_module.dishes_list) {
        quantity += dish.quantity_in_cart;
      }
      return quantity;
    },
    total_sum() {
      let total_sum = 0;
      for (let dish of this.$store.state.shopping_cart_module.dishes_list) {
        total_sum += dish.cost * dish.quantity_in_cart;
      }
      return total_sum;
    },
  },
  methods: {
    delete_dish(dish) {
      store.commit("delete_dish", dish);
    },
    sendOrder() {
      //Отправка
      this.dialog = false;
      console.log(this.payment_method);
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.card_number = "";
      this.card_name = "";
      this.$refs.observer.reset();
    },
  },
};
</script>

<style scoped>
.ggg {
  margin: 0 10px;
  border-bottom: 1px solid #e4dede;
}
.ggg:last-child {
  border: none;
}
</style>
