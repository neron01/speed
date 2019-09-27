export default {
  setUserStats(state, userStat) {
    state.userStat = userStat
  },
  setTasksState(state, tasks) {
    state.tasks = tasks
  },
  setGameStatus(state, game) {
    state.game = game
  },
  setReports(state, reports) {
    state.reports = reports
  },
  setReport(state, report) {
    state.selectedReport = report
  }
}
