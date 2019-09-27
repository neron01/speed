<template>
  <div class="wrapper">
    <a @click.prevent="modalShown = true">
      {{ auth.authUser ? auth.authUser.email : 'Войти' }} ▾
    </a>
    <div class="modal" v-if="modalShown">
      <a @click.prevent="reset">Закрыть окно</a> <br /><br />
      <div v-if="auth.authUser">
<!--        <form v-if="mode.passwordRecovery">-->
<!--          <p class="error" v-if="form.error">{{ form.error }}</p>-->
<!--          <p>-->
<!--            Current password<input-->
<!--              type="password"-->
<!--              v-model="form.currentPassword"-->
<!--            />-->
<!--          </p>-->
<!--          <p>New password<input type="password" v-model="form.password" /></p>-->
<!--          <p>-->
<!--            New password (Again)<input-->
<!--              type="password"-->
<!--              v-model="form.passwordAgain"-->
<!--            />-->
<!--          </p>-->
<!--        </form>-->
<!--        <button @click.prevent="changePass">Change password</button><br />-->
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
          <p>
            <v-text-field
              v-model="form.password"
              label="Пароль:"
              type="password"
            ></v-text-field>
          </p>
          <p v-if="mode.register">
            <v-text-field
              v-model="form.passwordAgain"
              label="Повторите пароль:"
              type="password"
            ></v-text-field>
          </p>
          <v-btn type="submit">
            {{ mode.register ? 'Создать аккаунт' : 'Войти' }}
          </v-btn>
        </v-form>
        <a @click.prevent="mode.register = !mode.register" class="form-switch">
          {{ mode.register ? 'Войти' : 'Создать аккаунт' }}
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
