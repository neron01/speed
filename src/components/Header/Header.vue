<template>
  <v-col v-if="auth.authUser">
    <v-row>
      Ваш счет: {{ this.$store.getters['report/userScope'] }}
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'
import { IUserState } from '~/store/auth/types'

@Component
export default class HeaderComp extends Vue {
  @State('auth')
  public auth!: IUserState
}
</script>
