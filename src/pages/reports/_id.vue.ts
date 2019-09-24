import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'
import BackButton from '~/components/BackButton.vue'
import { DateUtils } from '~/services/DateUtils'
import { IReport, IReportState } from '~/store/report/types'

@Component({
  components: {
    BackButton
  }
})
export default class extends Vue {
  @State('report')
  public reportState!: IReportState

  public pagination: any = {
    rowsPerPage: 10
  }

  public headers = [
    {
      align: 'left',
      text: 'Test name',
      value: 'name'
    },
    { text: 'Status', value: 'status' }
  ]

  public execTime(report: IReport): string {
    return DateUtils.beautyTimes(report.startTime, report.endTime)
  }
  public formatDate(date: string): string {
    return DateUtils.formatFull(date)
  }

  public async fetch({ store, params }: any) {
    if (
      store.state.report.selectedReport === undefined ||
      store.state.report.selectedReport._id !== params.id
    ) {
      await store.dispatch('report/loadSelectedReport', params.id)
    }
  }
  public head() {
    return {
      title: `Report: ${
        this.reportState.selectedReport
          ? this.reportState.selectedReport.startTime
          : ''
      }`
    }
  }

  public pages() {
    if (
      this.pagination.rowsPerPage == null ||
      this.pagination.totalItems == null
    ) {
      return 0
    }
    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
  }
}
