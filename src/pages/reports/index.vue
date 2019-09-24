<template>
  <div>
    <v-subheader> Last reports </v-subheader>
    <v-list three-line>
      <template v-for="(test, index) in reportState.reports">
        <v-list-tile
          class="list-tile"
          :key="test.startTime"
          @click=""
          :to="{ name: 'reports-id', params: { id: test._id } }"
          v-bind:class="{
            'error-mark': test.hasError,
            'skipped-mark': test.skipped !== 0,
            'passed-mark': !test.hasError && test.skipped === 0
          }"
        >
          <v-list-tile-avatar>
            {{ (test.passed / test.total) * 100 }}%
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>{{ formatDate(test.startTime) }}</span>
              <span
                style="float: right;"
                v-if="test.tags && test.tags.length > 0"
                >Tags: {{ test.tags.toString() }}</span
              >
            </v-list-tile-title>
            <v-list-tile-sub-title>
              Total: {{ test.total + test.skipped }}, Passed: {{ test.passed }},
              Failed: {{ test.total - test.passed }}, Skipped:
              {{ test.skipped }} Time: {{ execTime(test) }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </div>
</template>
<script lang="ts" src="./index.vue.ts"></script>

<style scoped>
.list-tile {
  color: black;
}
.skipped-mark {
  border-left: 5px solid #f1c40f;
}
.error-mark {
  border-left: 5px solid #e84c3d;
}
.passed-mark {
  border-left: 5px solid #2dcc70;
}
</style>
