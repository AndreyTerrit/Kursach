<template>
<v-container>
    <v-card
    max-width="420px"
    class="mx-auto"
    >
    <v-carousel>
        <v-card v-for="img in rec_list"
            :key="img">
            <v-carousel-item
            
            :src="img.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
            >
            </v-carousel-item>
        </v-card>
    </v-carousel>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MyCarousel",
  props:{
      id:Number,
  },
  data(){
    return{

    } 
  },
  computed:{
        rec_list(){
            let rec_list = this.$store.state.products.slice(0);
            rec_list.splice(this.id-1,1);
            return rec_list;
        }
    }
}
</script>