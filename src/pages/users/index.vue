<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">USERS</h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'users-id', params: { id: index } }">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: 'auth'
})
export default class extends Vue {
  public async asyncData({ $axios }: any) {
    const data = await $axios.$get('/api/users')
    return { users: data }
  }

  public head() {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.title {
  margin: 30px 0;
}
.users {
  list-style: none;
  margin: 0;
  padding: 0;
}
.user {
  margin: 10px 0;
}
</style>
