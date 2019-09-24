import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      drawer: null,
      items: [
        { icon: 'apps', title: 'Dashboard', to: '/' },
        { icon: 'ballot', title: 'Reports', to: '/reports' },
        { icon: 'ballot', title: 'Gitlab', to: '/gitlab' },
        { icon: 'person', title: 'Users', to: '/users', isAuth: true }
      ],
      title: 'Gherkin cafe'
    }
  }
}
