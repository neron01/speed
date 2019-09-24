<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">User</h1>
    <h2 class="info-part">{{ user.name }}</h2>
    <nuxt-link class="button" :to="{ name: 'users' }"> Users </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: 'auth'
})
export default class extends Vue {
  public user: { name: string } = { name: '' }
  public asyncData({ params, error, $axios }: any) {
    return $axios
      .$get('/api/users/' + params.id)
      .then((res: any) => {
        return { user: res }
      })
      .catch(() => {
        error({ statusCode: 404, message: 'User not found' })
      })
  }

  public head() {
    return {
      title: `User: ${this.user.name}`
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 30px;
}

.info-part {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}

.button {
  margin-top: 30px;
}
</style>
