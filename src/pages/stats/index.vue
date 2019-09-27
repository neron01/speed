<template>
  <v-container>
    <h3 class="title-custom">
      Программирование на скорость
      <img
        src="https://newitfest.ru/images/newITFestLogo.svg"
        alt=""
        class="hero_logo__img"
      />
    </h3>
    <client-only><stats></stats></client-only>
  </v-container>
</template>

<script lang="ts">
import Stats from '~/components/Stats.vue'
export default {
  layout: 'stats',
  components: {
    Stats
  },
  head () {
    return {
      title: 'Статистика'
    }
  }
}
</script>

<style scoped>
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
.title-custom img {
  float: right;
  margin: 10px 10px 0 0;
}
</style>
