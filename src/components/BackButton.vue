<template>
  <v-btn router :to="route" color="blue-grey" class="white--text">
    <v-icon right dark>arrow_back_ios</v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: ['route', 'text']
}
</script>
