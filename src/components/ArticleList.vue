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
                    @click="reload_products"
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
        <div v-if="product_list.length > 0 && $store.state.load_modules.problem_state == 'succeeded'">
    <v-container >
        
    <v-row justify="center">
        <!--product_list - вычисляемое св-во в computed из  $store.state.products...  Здесь происходит вывод списка продуктов конкретного ресторана-->
    <!-- <router-link 
                 > -->
                <v-col
                v-for="product in product_list" 
                 :key="product.id"
                >
                    <v-card
                        elevation="10"
                        class="mx-auto"
                        max-width="344px"
                        outlined
                    >
                    <router-link :to="'/product/' + product.id">
                        <v-img
                            :src="product.src"
                            height="200px"
                            min-width="344px"
                        >
                        </v-img>
                    </router-link>
                    <v-container>
                        <router-link :to="'/product/' + product.id">
                        <div style="color:black">
                        <v-card-title class=" text-center">
                            <h3 class="text-h4 text--primary">{{product.name}}</h3>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="pb-0">
                            <v-row>
                                <v-col>
                                    <p class="">
                                    {{product.weight + product.units_of_measurement}}
                                    </p>
                                </v-col>
                                <v-spacer></v-spacer>
                                
                                <v-col
                                    sm="6"
                                    xs="6"
                                    cols="6"
                                >
                                
                                    <p class="pl-4">
                                    {{"БЖУ : " + product.PCF}}
                                    </p>
                                </v-col>
                            </v-row>
                            <p>{{product.body}} </p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text class="pb-0">
                            <v-row>
                                <v-col>
                                    <p class="font-weight-bold text--primary">Стоимость : </p>
                                </v-col>
                                <v-col
                                    sm="3"
                                    cols="3"
                                >
                                    <p class="font-weight-bold text--primary">{{product.cost + " ₽"}}</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        </div>
                        </router-link>

                        <div class="text-center">
                        <v-btn
                            class="ma-2"
                            outlined
                            color="#1976d2"
                        >
                            В корзину
                        </v-btn>
                        </div>
                    </v-container>
                </v-card>
            </v-col>
    
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
      product: {
        name: this.name,
        cost: this.cost,
        PCF: this.PCF,
        body: this.body,
        published: this.published,
        weight: this.weight,
        units_of_measurement:this.units_of_measurement,
        src:this.src
      },
      dialog: false,
    }
  }
  ,
  name: "ArticleList",
  methods:{
    reload_products(){
      store.state.load_modules.problem_state = types.request_status.REQUESTED;
      store.dispatch('allww');
      this.dialog = false;
    },
    cancel_parse(){
      store.dispatch(types.actions.CANCEL_PARSE)
    }
  },
  computed:{
      product_list(){
          return this.$store.state.products;
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