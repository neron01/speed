<template>
  <div class="wrapper">
    <a @click.prevent="modalShown = true">
      {{ auth.authUser ? auth.authUser.email : 'Войти' }} ▾
    </a>
    <div class="modal" v-if="modalShown">
      <a @click.prevent="reset">Закрыть окно</a> <br /><br />
      <div v-if="auth.authUser">
        <v-btn @click.prevent="logout">Выйти</v-btn>
      </div>
      <div v-else>
        <v-form @submit.prevent="authSubmit">
          <p class="error" v-if="form.error">{{ form.error }}</p>
          <p>
            <v-text-field
              v-model="form.email"
              label="Введите имя:"
            ></v-text-field>
          </p>
          <v-btn type="submit">
            {{ mode.register ? 'Начать' : 'Войти' }}
          </v-btn>
        </v-form>
        <a @click.prevent="mode.register = !mode.register" class="form-switch" style="font-size: 13px;">
          {{ mode.register ? 'Войти, если есть аккаунт' : 'Создать аккаунт' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./LoginForm.vue.ts"></script>

<style>
a {
  text-decoration: underline;
}
.wrapper {
  height: 22px;
  position: relative;
}
.modal {
  width: 250px;
  background-color: white;
  position: absolute;
  right: -1px;
  top: -1px;
  border: 1px solid #888;
  padding: 0.4em 0.8em;
}
.modal form {
  margin: 1em auto 0.2em;
}
.modal .form-switch {
  float: right;
}
.error {
  color: red;
}
</style>
