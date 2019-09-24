<template>
  <div>
    Start date: {{ startDate }} End date: {{ endDate }} <br />
    <template v-for="(team, indexTeam) in teams">
      <div
        style="display: inline-block; vertical-align: top; text-align: left;"
      >
        {{ team.name }} Среднее время = {{ team.sum }} часа
        <template v-for="(mr, indexMr) in team.mrs">
          <br />Номер: {{ mr.iid }}, Изменений: {{ mr.changes }}, Автор:
          {{ mr.assignee }}, Время: {{ mr.time }} {{ mr.measure }}.
        </template>
      </div>
    </template>
    <br />
    <div>Количество измененных файлов:</div>
    <template v-for="(member, indexTeam) in members">
      <div>
        Автор {{ member.name }} - {{ member.count }} измененных файлов,
        {{ member.discussion }} - дискуссий
      </div>
    </template>
  </div>
</template>

<script lang="ts" src="./index.vue.ts"></script>
