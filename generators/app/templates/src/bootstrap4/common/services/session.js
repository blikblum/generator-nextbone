import { Events } from 'nextbone'
import { service } from 'next-service'

@service('sessionService')
class SessionService extends Events {
  isAuthenticated = false

  login({ email, password }) {
    setTimeout(() => {
      if (email === 'jon@hotmail.com' && password === '123') {
        this.isAuthenticated = true
        this.trigger('login')
      } else {
        this.trigger('login:error', 'Invalid email or password')
      }
    }, 600)
  }

  logout() {
    this.isAuthenticated = false
    this.trigger('logout')
  }
}
