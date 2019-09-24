export default function({ store, redirect, error }) {
  if (!store.state.auth.authUser) {
    return redirect('/')
  }
}
