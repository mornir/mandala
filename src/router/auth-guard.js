import { auth } from '../firebase'
export default (to, from, next) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      next()
    } else {
      // User is signed out.
      next('/login')
    }
  })
}
