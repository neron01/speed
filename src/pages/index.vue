<template>
  <v-container fluid grid-list-md text-xs-center>
    <header-comp></header-comp>
    <div v-if="$store.state.auth.authUser">
      <client-only>
        <game></game>
      </client-only>
    </div>
    <div v-else>
      Авторизуйтесь
    </div>
  </v-container>
</template>

<script lang="ts" src="./index.vue.ts"></script>

<style></style>
