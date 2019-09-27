<template>
  <v-app>
    <v-content class="container">
      <client-only><loaders></loaders></client-only>
      <div class="login-container"><login-form></login-form></div>
      <v-container fluid> <nuxt /> </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'
import Loaders from '~/components/Loaders.vue'

export default {
  components: {
    LoginForm,
    Loaders,
  }
}
</script>
<style>
.login-container {
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 9999999;
}
.container {
  margin: 0;
  width: 100%;
  max-width: 100%;
  text-align: center;
}
</style>
