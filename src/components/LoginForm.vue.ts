import Vue from 'vue'
import Component from 'vue-class-component'
import { Action, State } from 'vuex-class'
import { IUserState } from '~/store/auth/types'
const namespace: string = 'auth'

@Component
export default class LoginForm extends Vue {
  @State('auth')
  public auth!: IUserState

  @Action('login', { namespace })
  public login: any

  @Action('register', { namespace })
  public register: any

  @Action('changePassword', { namespace })
  public changePassword: any

  public form = {
    currentPassword: '', // For change password form,
    email: '',
    error: null,
    password: '',
    passwordAgain: ''
  }
  public modalShown = false
  public mode = {
    passwordRecovery: false,
    register: true
  }

  public reset() {
    this.form = {
      currentPassword: '', // For change password form,
      email: '',
      error: null,
      password: '',
      passwordAgain: ''
    }
    this.modalShown = false
    this.mode = {
      passwordRecovery: false,
      register: true
    }
  }
  public async authSubmit() {
    try {
      if (this.mode.register) {
        this.register({
          email: this.form.email,
          password: this.form.email
        })
      } else {
        this.login({
          email: this.form.email,
          password: this.form.email
        })
      }
      this.reset()
    } catch (e) {
      this.form.error = e.message
    }
  }
  public async logout() {
    try {
      await this.$store.dispatch('auth/logout')
      this.reset()
    } catch (e) {
      this.form.error = e.message
    }
  }

}
