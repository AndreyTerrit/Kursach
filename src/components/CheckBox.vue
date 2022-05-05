<template>
  <input type="checkbox" id="" @change.prevent = "change_status(id)" v-model="publ">
</template>

<script>
import store from "../store"
export default {
  name: "CheckBox",
  props:{
    id:Number,
    published: Boolean
  },
  watch:{
    published(newVal, oldVal){
      console.log(`${oldVal} -> ${newVal}`)
    }
  },
  methods:{
    change_status(id){
      store.commit('change_status', id);
    }
  },
  data(){
    return{
      publ: this.published,
    }
  }
}
</script>

<style scoped>

</style>