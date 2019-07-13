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
    this.$router.transitionTo('application')
  }

  onLoginError(error) {
    this.el.loginError = error
  }

  @elEvent('login:request', { dom: false })
  onLoginRequest(data) {
    sessionService.login(data)
  }
}

export { FrontPageRoute }
