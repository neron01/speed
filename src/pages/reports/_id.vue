<script lang="ts" src="./_id.vue.ts"></script>

<template>
  <v-layout row wrap text-xs-left>
    <v-flex xs9>
      <h1 class="title">
        Report {{ formatDate(reportState.selectedReport.startTime) }}
      </h1>
      <span class="pr-2"
        >{{ reportState.selectedReport.passed }}/{{
          reportState.selectedReport.total
        }}
        Passed</span
      >
      <span class="px-2"
        >{{
          reportState.selectedReport.total - reportState.selectedReport.passed
        }}/{{ reportState.selectedReport.total }} Failure</span
      >
      <span class="pl-2"
        >{{ reportState.selectedReport.skipped }}/{{
          reportState.selectedReport.total
        }}
        Skipped</span
      >
    </v-flex>
    <v-flex xs3 text-xs-right>
      <back-button route="/reports" text="Back to Reports" />
    </v-flex>
    <v-flex xs12>
      <span>Time: {{ execTime(reportState.selectedReport) }} </span> <br />
      <span
        v-if="
          reportState.selectedReport.tags &&
            reportState.selectedReport.tags.length > 0
        "
        >Tags: {{ reportState.selectedReport.tags.toString() }}</span
      >
    </v-flex>
    <v-flex>
      <span class="subheading">Tests</span>
      <v-data-table
        :headers="headers"
        :items="reportState.selectedReport.tests"
        :pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator"> {{ props.header.text }} </span>
            <span> {{ props.header.text }} </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <router-link
            tag="tr"
            :to="{
              name: 'tests-id',
              params: { id: props.item._id },
              hash: '#a' + props.item._id
            }"
            class="table-row"
            v-bind:class="{
              'error-row': props.item.errs.length > 0
            }"
          >
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">
              {{ props.item.errs.length === 0 ? 'Passed' : 'Error' }}
            </td>
          </router-link>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2" v-if="pages() > 1">
        <v-pagination
          v-model="pagination.page"
          :length="pages()"
        ></v-pagination>
      </div>
    </v-flex>
    <v-flex xs12 v-show="false">
      <code>{{ reportState.selectedReport }}</code>
    </v-flex>
  </v-layout>
</template>

<style scoped lang="postcss">
.title {
  margin-top: 30px;
}

code {
  width: 100%;
}
.table-row {
  cursor: pointer;
}
.error-row {
  background-color: #f2b8b8;
  &:hover {
    background-color: #f89898 !important;
  }
}
.button {
  margin-top: 30px;
}
</style>
