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
  } | null = null

  //TEST DATA
  public testcodeVariant: string = ''
  public testtaskDescription: string = ''
  public testtaskTitle: string = ''
  public testtaskSample: string = ''
  public testtaskScope: string = ''

  public testtaskResult: {
    currentStatus: boolean
    totalStatus: boolean
  } | null = null
  // END TEST DATA

  public tasks: any[] = []
  public selectedTask: number | null = null

  public async loadTask(taskId: number) {
    this.taskResult = null
    this.selectedTask = taskId
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
      },
      testtaskDescription: 'Это тестовое задание, оно не влияет на итоговый результат. В данном примере, необходимо написать функцию, которая возвращает цифру 5. Просто, вместо обучения.',
      testtaskTitle: 'Тестовый пример',
      testtaskSample: 'Test.assertEquals(getFive("any"), 5);\n',
      testcodeVariant: 'function getFive(s){\n    return 0\n}',
      testtaskScope: '5',
      testtaskResult: null,

    }
  }
  testsendToServer() {
    let testRes;
    try {
      testRes = eval(this.testcodeVariant + ';getFive();')
    } catch {}
    if (testRes === 5) {
      this.testtaskResult = {currentStatus: true, totalStatus:true}
    } else {
      this.testtaskResult = {currentStatus: false, totalStatus:false}
    }
  }
  public async sendToServer() {
    try {
      this.taskResult = await this.$axios.$post('/api/tasks/check', {
        funcExec: this.codeVariant,
        taskNumber: this.selectedTask
      })
      if (this.taskResult !== null && this.taskResult.currentStatus) {
        this.loadData()
      }
    } catch (e) {
      this.taskResult = e
    }
  }

  async loadTasks() {
    await this.$store.dispatch('report/loadTasks')
  }

  async loadData() {
    await this.$store.dispatch(
      'report/loadUserStats',
      this.$store.state.auth.authUser._id
    )
  }

  backToTask() {
    this.selectedTask = null
  }

  async created() {
    this.loadTasks()
    this.loadData()
  }
}
