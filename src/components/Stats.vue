<template>
  <v-row
    v-if="
      this.$store.state.report.game === undefined ||
        this.$store.state.report.game.status === 'CREATED'
    "
  >
    <v-col class="text-center">
      <h1>Игра скоро начнется</h1>
      <div class="text-center qr_code">
        <img src="../assets/img/qr_code.png" />
      </div>
      <h2>Для получения ссылки на игру отсканируйте qr код</h2>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <h1 v-show="this.$store.state.report.game.status === 'FINISHED'">
        Игра закончена!
      </h1>

      <v-simple-table style="width: 100%;">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center first-row">Место</th>
              <th class="text-center">Участник</th>
              <th v-for="i in taskNumber" :key="i" class="text-center">
                Задание {{ i }}
              </th>
              <th class="text-center">Очки</th>
              <th class="text-center" style="max-width: 100px;">
                Затраченное время
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userStats" :key="item.name">
              <td class="first-row">{{ index + 1 }}</td>
              <td>{{ item.userName }}</td>
              <td v-for="task in item.tasks" :key="task.taskid">
                <div :class="['tag', task.status]">{{ task.status }}</div>
              </td>
              <td>{{ item.scope }}</td>
              <td style="max-width: 100px;">
                {{ transformCommitDate(item.lastCommit) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DateUtils } from '~/services/DateUtils'

@Component({
  layout: 'dark2'
})
export default class extends Vue {
  public userStats: any[] = []
  public taskNumber: number = 0
  public polling: any = null

  public async loadStats() {
    try {
      const { userStats = [] } = await this.$axios.$get('/api/stats')
      let taskNumber = 0
      this.userStats = userStats
        .map((userStat: any) => {
          userStat.tasks.sort((t1: any, t2: any) => {
            if (t1.taskId === t2.taskId) {
              return t1.lastCommit < t2.lastCommit
                ? -1
                : t1.lastCommit > t2.lastCommit
                ? 1
                : 0
            } else {
              return t1.lastCommit < t2.lastCommit ? -1 : 1
            }
          })
          taskNumber = userStat.tasks.length

          userStat.scope = userStat.tasks.reduce(
            (sum: number, task: any) => sum + task.scope,
            0
          )
          return userStat
        })
        .sort((stat1: any, stat2: any) => stat2.scope - stat1.scope)
      this.taskNumber = taskNumber
    } catch (e) {
      this.userStats = []
      this.taskNumber = 0
    }
  }

  transformCommitDate(date: string) {
    if (!date) {
      return ''
    }
    return DateUtils.beautyTimes(this.$store.state.report.game.startTime, date)
  }

  public head() {
    return {
      title: 'Users'
    }
  }
  async created() {
    this.polling = setInterval(async () => {
      this.loadStats()
    }, 5000)
    this.loadStats()
  }
  beforeDestroy() {
    clearInterval(this.polling)
  }
}
</script>

<style scoped>
.first-row {
  max-width: 50px;
  min-width: 50px;
  width: 50px;
}
.tag {
  width: 100%;
  height: 90%;
  border-radius: 5px;
  color: white;
  vertical-align: middle;
  line-height: 42px;
  text-transform: uppercase;
}
.done {
  background-color: #8bc34a;
}
.in-progress {
  background-color: #ffd54f;
}
.empty {
  /*background-color: #eaedf2;;*/
}

th {
  font-size: 16px;
}

.qr_code img {
  float: none;
  height: 50vh;
}
</style>
