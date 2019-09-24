export default {
  async loadReports({ commit }) {
    const data = await this.$axios.$get('/api/reports')
    return commit('setReports', data.reports)
  },
  async loadSelectedReport({ commit }, reportId) {
    const report = await this.$axios.$get(`/api/reports/${reportId}?tests=true`)
    report.tests = report.tests
      .concat(report.tests)
      .concat(report.tests)
      .concat(report.tests)
      .concat(report.tests)
      .concat(report.tests)
      .concat(report.tests)

    return commit('setReport', report)
  }
}
