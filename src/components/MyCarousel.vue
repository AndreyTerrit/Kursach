<template>
<v-container>
    <v-carousel>
        <v-carousel-item
        v-for="img in $store.state.articles"
        :key="img"
        :src="img.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        ></v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: "MyCarousel",
  data(){
    return{

    }
  }
}
</script>