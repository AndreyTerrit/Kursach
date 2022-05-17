<template>
  <div class="">
    <v-container>
      <v-btn class="ma-2" outlined color="indigo" bt @click="goBack">
        Назад
      </v-btn>
    </v-container>
    <v-card class="mx-3">
      <div class="art">
        <v-img :src="src" max-height="360px"></v-img>
        <v-divider></v-divider><v-divider></v-divider><v-divider></v-divider>
        <v-card-title class="text-h3">
          <v-spacer
            ><div class="text-center fff">{{ name }}</div></v-spacer
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-card-subtitle>
          <v-row>
            <v-spacer></v-spacer>
            <v-col>
              <p class="text-h6">
                {{ weight + units_of_measurement }}
              </p>
            </v-col>
            <v-spacer></v-spacer>

            <v-col sm="5" xs="5" cols="8">
              <p class="pl-4 text-h6">
                {{ "БЖУ : " + PCF }}
              </p>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions class="pb-0">
          <v-btn color="orange lighten-2" text @click="show = !show">
            Подробнее
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{ body }}
              <br />
              <br />
              {{ "Остаток : " + quantity + " шт." }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
    <div class="text-center mt-10">
      <p class="text-h2">Попробуйте также !</p>
    </div>
    <MyCarousel :id_restaurant="this.id_restaurant" :id="this.id"></MyCarousel>
  </div>
</template>

<script>
import MyCarousel from "./MyCarousel.vue";
export default {
  name: "MyArticle",
  components: {
    MyCarousel,
  },
  props: {
    id: Number,
    id_restaurant: Number,
    name: String,
    cost: Number,
    PCF: String,
    body: String,
    weight: Number,
    units_of_measurement: String,
    src: String,
    quantity: Number,
    published: Boolean,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    text_size() {
      if (this.published == true) return 30;
      else return 15;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  watch: {
    name() {},
  },
};
</script>

<style scoped>
.published {
  border: 3px solid rgb(50, 233, 105);
}
.unpublished {
  border: 3px solid rgb(243, 61, 37);
}
.art {
  padding: 20px 10px;
  border-radius: 20px;
  margin: 10px 0;
}
</style>
