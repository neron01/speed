import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  public async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
    try {
      const response = await $axios.$get('/api/tasks/0')
      return {
        codeVariant: response.init,
        taskDescription: response.description,
        taskTitle: response.title,
        taskSample: response.sample,
        taskScope: response.scope,
      }
    } catch {
      return {}
    }
  }
  public data() {
    return {
      taskResult: false,
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
      const response = await this.$axios.$post('/api/tasks/check', {
        funcExec: this.codeVariant,
        taskNumber: 0
      })
      this.taskResult = response
    } catch (e) {
      this.taskResult = e
    }
  }
}
