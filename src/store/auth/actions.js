export default {
  async login({ commit }, { email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    try {
      const data = await this.$axios.$post('/api/auth/login', {
        email,
        password
      }) // TODO почини после
      commit('setUser', data)
    } catch (error) {
      throw new Error('Wrong email or password')
    }
  },
  async register({ commit }, { email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    try {
      const data = await this.$axios.$post('/api/auth/register', {
        email,
        password
      })
      commit('setUser', data)
    } catch (error) {
      switch (error.response.status || 500) {
        case 409:
          throw new Error('Such email is already registered')
        case 500:
          throw new Error('Internal server error')
      }
    }
  },
  async logout({ commit }) {
    const data = await this.$axios.$post('/api/auth/logout')
    if (data.ok) {
      commit('setUser', null)
    }
  },
  async changePassword({ commit }, { currentPassword, newPassword }) {
    if (!currentPassword || !newPassword) {
      throw new Error('All fields are required')
    }
    try {
      await this.$axios.$patch('/api/auth', { currentPassword, newPassword })
    } catch (error) {
      throw new Error('Wrong password')
    }
  }
}
