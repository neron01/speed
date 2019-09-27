<template>
  <span v-if="this.$store.state.report.game === undefined || this.$store.state.report.game.status === 'CREATED'">
    Вы авторизованы, ждите игра скоро начнется
  </span>
  <v-row v-else-if="this.$store.state.report.game.status === 'IN_PROGRESS'">
    <template v-if="selectedTask === null">
      <v-col style="min-width: 300px;" :key="task.id" v-for="task of this.$store.getters['report/completedTasks']">
        <v-card max-width="344" class="mx-auto">
          <v-card-title>{{ task.title }}</v-card-title>
          <div :class="['tag', task.status]">{{task.status}}</div>
          <v-card-text class="text-left">
            {{ task.description }}
            <h3 class="text--primary scope-block">{{ task.scope }} очков</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="loadTask(task.id)">Начать</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    <v-row v-else>
      <v-col class="text-left">
        <v-row no-gutters>
          <v-col>
            <span style="font-size: 14px;">Задание:</span>
            <span class="font-weight-bold">{{ taskTitle }}</span>
          </v-col>
          <v-col class="text-right">
            <v-btn @click="backToTask">Вернуться к задачам</v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters><span>Описание:</span></v-row>
        <v-row no-gutters>
          <v-card>
            <v-card-text>
              <div class="text--primary">
                {{ taskDescription }}
              </div>
            </v-card-text>
          </v-card>
        </v-row>
        <br />
        <v-row no-gutters><span>Пример теста:</span></v-row>
        <v-row no-gutters>
          <client-only placeholder="Codemirror Loading...">
            <codemirror
              class="testSample"
              v-model="taskSample"
              :options="cmOption"
            />
          </client-only>
        </v-row>
      </v-col>
      <v-col>
        <div class="container2" style="width: 100%;height: 300px;">
          <v-row no-gutters><span>Поле для ввода решения:</span></v-row>
          <client-only placeholder="Codemirror Loading...">
            <codemirror
              class="codeResult"
              v-model="codeVariant"
              :options="cmOption"
            />
          </client-only>
          <v-row style="padding: 10px;">
            <v-btn @click="sendToServer">Отправить результат</v-btn>
            <span style="padding: 5px;" v-if="taskResult !== null">
              Результат: {{ taskResult.currentStatus === true ? "Пройдено, переходите к следующей задаче" : "Не верно" }}
            </span>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-row>
  <v-row v-else-if="this.$store.state.report.game.status === 'FINISHED'">
    <span>Время вышло</span>
  </v-row>
  <span v-else>Что-то пошло не так</span>
</template>

<script lang="ts" src="./Game.vue.ts"></script>

<style>
.container2 {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  text-align: left;
}
.testSample {
  width: 100%;
}
.testSample .CodeMirror {
  height: 100px;
}
.codeResult .CodeMirror {
  height: 550px;
}
.scope-block {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.tag {
  border-radius: 5px;
  color: white;
  vertical-align: middle;
  line-height: 16px;
  padding: 5px;
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 0;
}
.done {
  background-color: #8bc34a;
}
.in-progress {
  background-color: #ffd54f;
}
</style>
