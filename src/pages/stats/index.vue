<template>
  <v-container>
    <h3 class="title-custom">
      Результаты
      <img
        src="https://newitfest.ru/images/newITFestLogo.svg"
        alt=""
        class="hero_logo__img"
      />
    </h3>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Участник</th>
            <th class="text-center">Задание 1</th>
            <th class="text-center">Задание 2</th>
            <th class="text-center">Задание 3</th>
            <th class="text-center">Задание 4</th>
            <th class="text-center">Задание 5</th>
            <th class="text-center">Задание 6</th>
            <th class="text-center">Очки</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>
              <div :class="['tag', item.task1]">{{ item.task1 }}</div>
            </td>
            <td>
              <div :class="['tag', item.task2]">{{ item.task2 }}</div>
            </td>
            <td>
              <div :class="['tag', item.task3]">{{ item.task3 }}</div>
            </td>
            <td>
              <div :class="['tag', item.task4]">{{ item.task4 }}</div>
            </td>
            <td>
              <div :class="['tag', item.task5]">{{ item.task5 }}</div>
            </td>
            <td>
              <div :class="['tag', item.task6]">{{ item.task6 }}</div>
            </td>
            <td>{{ item.scope }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'dark2'
  // middleware: 'auth',
})
export default class extends Vue {
  public async asyncData({ $axios }: any) {
    const data = await $axios.$get('/api/stats')
    return { oooo: data }
  }
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          task1: 'done',
          task2: 'in-progress',
          task3: 'done',
          task4: 'empty',
          task5: 'empty',
          task6: 'empty',
          scope: 159
        },
        {
          name: 'Ice cream sandwich',
          task1: 'done',
          task2: 'in-progress',
          task3: 'empty',
          task4: 'empty',
          task5: 'done',
          task6: 'empty',
          scope: 15
        },
        {
          name: 'Eclair',
          task1: 'done',
          task2: 'in-progress',
          task3: 'empty',
          task4: 'empty',
          task5: 'empty',
          task6: 'empty',
          scope: 189
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        }
      ].sort((a, b) => (b.scope || 0) - (a.scope || 0))
    }
  }
  public head() {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
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
.title-custom {
  background: linear-gradient(60deg, #954bff 0%, #954bff73 100%);
  color: white;
  font-size: 36px;
  vertical-align: middle;
  line-height: 180px;
  text-align: left;
  padding-left: 50px;
  margin: -25px -25px 0 -25px;
}
th {
  font-size: 16px;
}
img {
  float: right;
  margin: 10px 10px 0 0;
}
</style>
