<template>
  <div class="wrapper">
    <a @click.prevent="modalShown = true">
      {{ auth.authUser ? auth.authUser.email : 'Sign in' }} ▾
    </a>
    <div class="modal" v-if="modalShown">
      <a @click.prevent="reset">Close</a> <br /><br />
      <div v-if="auth.authUser">
        <form v-if="mode.passwordRecovery">
          <p class="error" v-if="form.error">{{ form.error }}</p>
          <p>
            Current password<input
              type="password"
              v-model="form.currentPassword"
            />
          </p>
          <p>New password<input type="password" v-model="form.password" /></p>
          <p>
            New password (Again)<input
              type="password"
              v-model="form.passwordAgain"
            />
          </p>
        </form>
        <button @click.prevent="changePass">Change password</button><br />
        <button @click.prevent="logout">Logout</button>
      </div>
      <div v-else>
        <form @submit.prevent="authSubmit">
          <p class="error" v-if="form.error">{{ form.error }}</p>
          <p>Email: <input type="text" v-model="form.email" name="email" /></p>
          <p>
            Password:
            <input type="password" v-model="form.password" name="password" />
          </p>
          <p v-if="mode.register">
            Password (Again):
            <input
              type="password"
              v-model="form.passwordAgain"
              name="passwordAgain"
            />
          </p>
          <button type="submit">
            {{ mode.register ? 'Create account' : 'Sign in' }}
          </button>
        </form>
        <a @click.prevent="mode.register = !mode.register" class="form-switch">
          {{ mode.register ? 'Sign in' : 'Create account' }}
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
  position: absolute;
  right: -1px;
  top: -1px;
  border: 1px solid #888;
  background: #ddd;
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
