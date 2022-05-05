<template>

<v-container>
<div class="wrapper">
    <v-form
    ref="form"
  >
    <v-text-field
     id="author_name"
     placeholder="Введите имя Автора"

      v-model="article.author"
      label="Автор"
      required
    ></v-text-field>

     <v-textarea
          outlined
          name="input-7-4"
          label="Тело статьи"
          value="Введите что-то"
          v-model="article.body"
        ></v-textarea>

    <v-checkbox
      v-model="article.published"
      label="Опубликовать сразу?"
    ></v-checkbox>

    <router-link to="/">
        <v-btn
        color="#e4dede"
        id="subbtn"
        class="mr-4"
        @click="add_art(article);"
        >
        Опубликовать
        </v-btn>
    </router-link>
  </v-form>

</div>
</v-container>
</template>
<script>
import store from '../store'
import {types} from '@/store/types.js'
export default {
  name: "AddForm",
  props:{
    author: String,
    body: String,
    published: Boolean
  },
  methods:{
    add_art(value) {
      store.dispatch(types.actions.ADD_ARTICLE,value);
      this.$router.push('/');
    }
  },
  data(){
    return{
      article: {
        author: this.author,
        body: this.author,
        published: this.published
      }
    }
  }

}
</script>

<style scoped>
input{
  margin: 10px 0;
}
.wrapper{
 text-align: center;
}
a{
    text-decoration: none;
}
</style>