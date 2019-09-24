<template>
  <v-container fluid grid-list-md text-xs-center>
    <div v-if="$store.state.auth.authUser">
      <span>Вы авторизованы, ждите игра скоро начнется</span>
      <v-row>
        <v-col class="text-left">
          <v-row no-gutters
            ><span>Задание: {{ taskTitle }}</span></v-row
          >
          <v-row no-gutters><span>Описание:</span></v-row>
          <v-row no-gutters>
            <v-card
            ><v-card-text><div class="text--primary">{{ taskDescription }}</div></v-card-text></v-card
            ></v-row
          >
          <br />
          <v-row no-gutters><span>Пример теста:</span></v-row>
          <v-row no-gutters>
            <client-only placeholder="Codemirror Loading...">
              <codemirror
                style="line-height: 20px; height: 80px; width: 100%;"
                class="testSample"
                v-model="taskSample"
                :options="cmOption"
              />
            </client-only>
          </v-row>
        </v-col>
        <v-col>
          <div class="container2" style="width: 100%;height: 300px;">
            <client-only placeholder="Codemirror Loading...">
              <codemirror
                style="line-height: 20px;"
                class="codeResult"
                v-model="codeVariant"
                :options="cmOption"
              />
            </client-only>
            Result: {{ taskResult }}
            <v-btn @click="sendToServer">Send</v-btn>
          </div></v-col
        >
      </v-row>
    </div>
    <div v-else>
      Авторизуйтесь
    </div>
  </v-container>
</template>

<script lang="ts" src="./index.vue.ts"></script>

<style scoped>
.start-title {
  vertical-align: middle;
  line-height: 100vh;
}
.container2 {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  text-align: left;
}
.testSample .CodeMirror {
  height: 100px;
}
.codeResult .CodeMirror {
  height: 550px;
}
</style>
