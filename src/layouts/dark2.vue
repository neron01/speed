<template>
  <v-app>
    <v-content class="container">
<!--      <div class="login-container"><login-form></login-form></div>-->
      <v-container fluid><nuxt /> </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>
<style>
.login-container {
  position: fixed;
}
.container {
  margin: 0;
  width: 100%;
  max-width: 100%;
  text-align: center;
}
</style>
