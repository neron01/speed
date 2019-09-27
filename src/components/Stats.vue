<template>
  <div>
  <v-row
    v-if="
      this.$store.state.report.game === undefined ||
        this.$store.state.report.game.status === 'CREATED'
    ">
    <v-col class="text-center">
      <h1>Игра скоро начнется</h1>
      <h4 style="font-weight: normal;display: inline;">
        Для регистрации пройдите по ссылке
      </h4>
      <h3 style="display: inline;color: #954bff;">
        http://bit.do/speed-code
      </h3>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <h1 v-show="this.$store.state.report.game.status === 'FINISHED'">
        Игра закончена!
      </h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
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
  </div>
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
          taskNumber = userStat.tasks.length
          userStat.scope = userStat.tasks.reduce(
            (sum: number, task: any) => sum + task.scope,
            0
          )
          return userStat
        })
        .sort((stat1: any, stat2: any) => {
          if (stat1.scope === stat2.scope) {
            return stat1.lastCommit < stat2.lastCommit
              ? -1
              : stat2.lastCommit > stat1.lastCommit
                ? 1
                : 0
          } else {
            return stat2.scope < stat1.scope ? -1 : 1
          }
        })
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
