import { Route, elEvent } from 'nextbone-routing'
import { inject } from 'next-service'
import './frontpage-view'

class FrontPageRoute extends Route {
  static component = 'frontpage-view'

  @inject
  sessionService

  activate() {
    this.listenTo(this.sessionService, 'login', this.onLogin)
    this.listenTo(this.sessionService, 'login:error', this.onLoginError)
  }

  deactivate() {
    this.stopListening(this.sessionService)
  }

  onLogin() {
    this.el.isLoading = false
    this.$router.transitionTo('application')
  }

  onLoginError(error) {
    this.el.isLoading = false
    this.el.loginError = error
  }

  @elEvent('login:request', { dom: false })
  onLoginRequest(data) {
    this.el.isLoading = true
    this.sessionService.login(data)
  }
}

export { FrontPageRoute }
