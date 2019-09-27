<template>
  <span></span>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    public polling: any = null

    async checkGameStatus() {
      await this.$store.dispatch('report/loadGameStatus');
    }

    async created () {
      this.polling = setInterval(async () => {
        this.checkGameStatus()
      }, 5000)
      this.checkGameStatus()
    }
    beforeDestroy () {
      clearInterval(this.polling)
    }
  }

</script>
