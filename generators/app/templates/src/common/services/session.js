import { Events } from 'nextbone'

class SessionService extends Events {
  isAuthenticated = false

  login({ email, password }) {
    if (email === 'jon@hotmail.com' && password === '123') {
      this.isAuthenticated = true
      this.trigger('login')
    } else {
      this.trigger('login:error', 'Invalid email or password')
    }
  }

  logout() {
    this.isAuthenticated = false
    this.trigger('logout')
  }
}

export const sessionService = new SessionService()
