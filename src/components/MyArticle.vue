<template>
<div class="">
    <v-card
    class="mx-auto"
    max-width="600px"
  >
  <div :class="{published: published, unpublished: !published}" class="art"  >
    <v-img
      :src="src"
      height="200px"
    ></v-img>

    <v-card-title>
      {{author}}
    </v-card-title>

    <v-card-subtitle>
      Может быть что-то написано
    </v-card-subtitle>
<v-divider></v-divider>
    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
         @click="show = !show"
      >
        Раскрыть статью
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{body}}
        </v-card-text>
        <CheckBox :id="id" :published="published" @change-one = "$emit('change-publishing',id)" class="ml-3"></CheckBox> Опубликовано
      </div>
    </v-expand-transition>
    </div >
  </v-card>
</div>
</template>

<script>
export default {
  name: "MyArticle",
  props:{
    id: Number,
    author: String,
    body: String,
    published: Boolean,
    src: String
  },
  data(){
    return{
        show: false
    }
  },
  computed: {
      text_size() {
        if (this.published == true) return 30;
        else return 15;
      },
  },
  watch:{
    name(){

    }
  }
}
</script>

<style scoped>
.published{
    border: 3px solid rgb(50, 233, 105);
}
.unpublished{
    border: 3px solid rgb(243, 61, 37);
}
.art{
  padding: 20px 10px;
  border-radius: 20px;
  margin: 10px 0;
}
</style>