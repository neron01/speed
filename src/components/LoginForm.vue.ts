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
    register: false
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
      register: false
    }
  }
  public async authSubmit() {
    try {
      if (
        this.mode.register &&
        this.form.password !== this.form.passwordAgain
      ) {
        throw Error('Passwords should match')
      }
      if (this.mode.register) {
        this.register({
          email: this.form.email,
          password: this.form.password
        })
      } else {
        this.login({
          email: this.form.email,
          password: this.form.password
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
  public async changePass() {
    if (!this.mode.passwordRecovery) {
      this.mode.passwordRecovery = true
      return
    }
    try {
      if (this.form.password !== this.form.passwordAgain) {
        throw Error('Passwords should match')
      }
      await this.changePassword({
        currentPassword: this.form.currentPassword,
        newPassword: this.form.password
      })
      this.reset()
    } catch (e) {
      this.form.error = e.message
    }
  }
}
