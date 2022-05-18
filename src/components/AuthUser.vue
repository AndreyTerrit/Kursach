<template>
  <v-container>
    <v-card max-width="400px" class="pt-4 mx-auto text-center" outlined>
      <v-card-title
        ><v-row justify="space-around"
          ><v-col cols="11">
            <span class="text-h5">Вход в аккаунт</span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email или номер телефона*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Пароль*"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Обязательные поля</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer>
          <v-btn
            class="mx-auto"
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Войти
          </v-btn>
        </v-spacer>
        <template>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue darken-1" text v-bind="attrs" v-on="on">
                  Зарегистрироваться
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Регистрация</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Email*" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Пароль*"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Номер телефона*"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*Обязательные поля</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="register">
                    Зарегистрироваться</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Закрыть</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    register() {
      //Регистрация
      this.dialog = false;
    },
  },
};
</script>
