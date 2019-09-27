<template>
  <v-app>
    <v-content class="container">
      <client-only><loaders></loaders></client-only>
      <v-container fluid><nuxt /> </v-container>
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
<style scoped>
.login-container {
  position: fixed;
}
.container {
  margin: 0;
  width: 100%;
  max-width: 100%;
  text-align: center;
}
  html, body {
    overflow: hidden;
  }
</style>
