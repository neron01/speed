import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  public codeVariant: string = ''
  public taskDescription: string = ''
  public taskTitle: string = ''
  public taskSample: string = ''
  public taskScope: string = ''

  public taskResult: {
    currentStatus: boolean
    totalStatus: boolean
  } | null = null;
  public tasks: any[] = []
  public selectedTask: number | null = null

  public async loadTask(taskId: number) {
    this.taskResult = null;
    this.selectedTask = taskId;
    try {
      const response = await this.$axios.$get('/api/tasks/' + this.selectedTask)
      this.codeVariant = response.init
      this.taskDescription = response.description
      this.taskTitle = response.title
      this.taskSample = response.sample
      this.taskScope = response.scop
    } catch {
      return {}
    }
  }
  public data() {
    return {
      taskResult: null,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        theme: 'mbo'
      }
    }
  }
  public async sendToServer() {
    try {
      this.taskResult = await this.$axios.$post('/api/tasks/check', {
        funcExec: this.codeVariant,
        taskNumber: this.selectedTask,
      })
      if (this.taskResult !== null && this.taskResult.currentStatus) {
        this.loadData();
      }
    } catch (e) {
      this.taskResult = e
    }
  }

  async loadTasks() {
    await this.$store.dispatch('report/loadTasks');
  }

  async loadData() {
    await this.$store.dispatch('report/loadUserStats', this.$store.state.auth.authUser._id);
  }

  backToTask () {
    this.selectedTask = null;
  }

  async created () {
    this.loadTasks();
    this.loadData();
  }
}
