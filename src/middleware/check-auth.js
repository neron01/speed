export default async (ctx) => {
  if (process.server && !ctx.store.state.auth.authUser) {
    await ctx.app.$axios.$get('/api/auth/callback').then(
      (response) => {
        if (response.user) {
          ctx.store.commit('auth/setUser', response.user)
        } else {
          ctx.store.commit('auth/setUser', null)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
