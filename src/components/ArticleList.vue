<template>

    <v-container>
        <!-- ПРИ ЗАГРУЗКЕ СПИСКА -->
            
            <div class="" v-if="$store.state.load_modules.problem_state == 'requested'">
                <div class="loading">
                <h1>Loading...</h1>
                <br><v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                ></v-progress-circular>
                <br><button class="cancel-btn" @click="cancel_parse">Отменить загрузку</button>
                </div>
            </div>
        
        <!-- ПРИ ОШИБКЕ ЗАГРУЗКИ -->
        <div v-if="$store.state.load_modules.problem_state == 'failed'" class="loading-error">

            <h1>Loading error!</h1>

            <v-dialog
            v-model="dialog"
            width="500"
            >
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

                <v-card-text class="mt-7" >
                Вы уверены?
                </v-card-text>
            
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="reload_articles"
                >
                    Да
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    нет
                </v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        <!-- ПРИ УСПЕШНОЙ ЗАГРУЗКЕ -->
        <div v-if="$store.state.articles.length > 0 && $store.state.load_modules.problem_state == 'succeeded'">
    <v-container >
        
    <v-row justify="center">
    <router-link v-for="article in $store.state.articles"
                 :key="article.id"
                 :to="'/Article/' + article.id"
                 >
                <v-col
                >
                    <v-card
                    elevation="10"
                    class="mx-auto"
                    max-width="344px"
                    outlined
                    >
                
                    <v-img
                    :src="article.src"
                    height="200px"
                    min-width="344px"
                    ></v-img>

                    <v-container>
                        <v-card-title class="text-align-center">
                        <h3>{{article.author}}</h3>
                        </v-card-title>
                    </v-container>

                    <v-card-subtitle>
                    {{article.body}}
                    </v-card-subtitle>
                </v-card>
            </v-col>
    </router-link>
    </v-row>
    </v-container>
  </div>

</v-container>

</template>

<script>

import store from "@/store"
import {types} from '@/store/types.js'
export default {
  components:{
    //MyArticle,
  },
  data(){
    return{
      article: {
        author: this.author,
        body: this.author,
        published: this.published,
        src:this.src
      },
      dialog: false,
    }
  }
  ,
  name: "ArticleList",
  methods:{
    reload_articles(){
      store.state.load_modules.problem_state = types.request_status.REQUESTED;
      store.dispatch(types.actions.PARSE_ARTICLES);
      this.dialog = false;
    },
    cancel_parse(){
      store.dispatch(types.actions.CANCEL_PARSE)
    }
  }

}
</script>

<style scoped>
.reload-btn{
  background-color: #e4dede;
  border: none;
  padding: 5px 7px;
  border-radius: 5px;
   margin-top: 40px;
}
.cancel-btn{
  background-color: #e4dede;
  border: none;
  padding: 5px 7px;
  border-radius: 5px;
  margin-top: 40px;
}

.window-requested{
  text-align: center;
}

a{
    text-decoration: none;
}

.loading{
    text-align: center;
    padding: 100px 0;
}

.loading-error{
    text-align: center;
    padding: 100px 0;
}

.text-align-center{
    text-align: center;
}
</style>