export default {
  async loadUserStats({ commit }, userId) {
    let userStat = {}
    try {
      const { userStats = [] } = await this.$axios.$get(
        '/api/stats?userId=' + userId
      )
      userStat = userStats[0]
    } catch {}
    return commit('setUserStats', userStat)
  },
  async loadTasks({ commit }) {
    let tasks = [];
    try {
      tasks = await this.$axios.$get('/api/tasks');
    } catch {}
    return commit('setTasksState', tasks)
  },
  async loadGameStatus({ commit }) {
    let game = {};
    try {
      const { games } = await this.$axios.$get('/api/game')
      game = games[0]
    } catch {}
    return commit('setGameStatus', game)
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
