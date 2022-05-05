<template>
<v-container >
<div class="text-center">
    <v-card
    class="mx-auto"
    tile
  >
  <h1>Статистика</h1>
  <v-simple-table height="300px" class="mt-10">
    <template v-slot:default>
      <thead >
        <tr >
          <th class="text-left">
            Автор
          </th>
          <th class="text-left">
            Статья
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
         v-for="article in $store.state.articles"
                 :key="article.id"
        >
          <td class="text-left">{{ article.author }}</td>
          <td class="text-left">{{ article.body }}</td>
        </tr>
      </tbody>
    </template>
    </v-simple-table>
    </v-card>
    <v-card
    class="mx-auto mt-10"
    tile
    >
        <h1>Это список для примера</h1>
        <v-list dense>
            <v-subheader>Города</v-subheader>
            <v-list-item-group
                color="primary"
            >
                <v-list-item
                    v-for="city in list_cities"
                    :key="city"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="city"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
    </v-list>
    </v-card>
</div>
</v-container>
</template>

<script>
export default {
  name: "AboutPage",
  data(){
      return{
          list_cities:[
              'New-york',
              'Moscow',
              'Kiev',
              'Krasnodar'
          ]
      }
  }
}
</script>

<style scoped>

</style>