export default {
  userScope: state => {
    return state.userStat ? state.userStat.tasks.reduce(
      (sum, task) => sum + task.scope,
      0
    ) : 0;
  },
  completedTasks: state => {
    const tasks = state.tasks;
    const userStatTasks = state.userStat.tasks;
    for (const task of tasks) {
      for (const userTask of userStatTasks) {
        if (task.id === userTask.taskId) {
          task.status = userTask.status;
        }
      }
    }
    return tasks;
  }
}
