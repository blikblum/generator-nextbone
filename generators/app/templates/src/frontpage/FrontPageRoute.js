import { Route, elEvent } from 'nextbone-routing'
import { sessionService } from 'services/session'
import './frontpage-view'

class FrontPageRoute extends Route {
  static component = 'frontpage-view'

  activate() {
    this.listenTo(sessionService, 'login', this.onLogin)
    this.listenTo(sessionService, 'login:error', this.onLoginError)
  }

  deactivate() {
    this.stopListening(sessionService)
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
    sessionService.login(data)
  }
}

export { FrontPageRoute }
