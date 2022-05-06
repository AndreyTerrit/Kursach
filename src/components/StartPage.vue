<template>
    <v-select
          :items="items"
          label="Outlined style"
          dense
          outlined
        ></v-select>
</template>

<script>
export default {
  name: "StartPage",
  components:{
      
  },
  props:{
    
  },
  data(){
    return{
        items:[]
    }
  },
  computed: {
      
  },
  watch:{
  }
}
</script>