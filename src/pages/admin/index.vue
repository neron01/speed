<template>
  <v-container>
    <h3 class="title-custom">
      Админка
    </h3>
    <v-row class="text-left"
      ><v-btn @click="createGame()">Создать</v-btn></v-row
    >
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Номер</th>
            <th class="text-center">Статус</th>
            <th class="text-center">Start Time</th>
            <th class="text-center">End Time</th>
            <th class="text-center"></th>
            <th class="text-center"></th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="game._id" v-for="game in games">
            <td>{{ game._id }}</td>
            <td>{{ game.status }}</td>
            <td>{{ game.startTime }}</td>
            <td>{{ game.endTime }}</td>
            <td><v-btn @click="start(game._id)">Старт</v-btn></td>
            <td><v-btn @click="stop(game._id)">Стоп</v-btn></td>
            <td><v-btn @click="deleteGame(game._id)">Удалить</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">Имя</th>
          <th class="text-center"></th>
        </tr>
        </thead>
        <tbody>
        <tr :key="user._id" v-for="user in users">
          <td>{{ user._id }}</td>
          <td>{{ user.email }}</td>
          <td><v-btn @click="deleteUser(user._id)">Удалить</v-btn></td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DateUtils } from '~/services/DateUtils'

@Component({
  layout: 'admin'
  // middleware: 'auth',
})
export default class extends Vue {

  public games: any[] = [];
  public users: any[] = [];

  public formatDate(date: string): string {
    return DateUtils.formatFull(date)
  }
  public async start(gameId: string) {
    try {
      await this.$axios.$post('/api/game', {
        gameId,
        status: 'IN_PROGRESS'
      })
      this.refreshData()
    } catch {}
  }

  public async stop(gameId: string) {
    try {
      await this.$axios.$post('/api/game', {
        gameId,
        status: 'FINISHED'
      })
      this.refreshData()
    } catch {}
  }
  public async deleteGame(gameId: string) {
    try {
      await this.$axios.$delete('/api/game', {
        data: { gameId }
      })
      this.refreshData()
    } catch {}
  }
  public async deleteUser(userId: string) {
    try {
      await this.$axios.$delete('/api/auth', {
        data: { userId }
      })
      this.refreshData()
    } catch {}
  }
  public async createGame() {
    try {
      await this.$axios.$post('/api/game')
      this.refreshData()
    } catch {}
  }
  public async refreshData() {
    try {
      const { games } = await this.$axios.$get('/api/game')
      const { users } = await this.$axios.$get('/api/auth');
      this.games = games
      this.users = users
    } catch {}
  }

  public async asyncData({ $axios }: any) {
    try {
      const { games } = await $axios.$get('/api/game');
      const { users } = await $axios.$get('/api/auth');
      return { games, users }
    } catch {
      return {}
    }
  }
  data() {
    return {}
  }
  public head() {
    return {
      title: 'Admin'
    }
  }
}
</script>

<style scoped></style>
