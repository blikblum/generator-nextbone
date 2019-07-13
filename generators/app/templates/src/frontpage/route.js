import { Route, elEvent } from 'nextbone-routing'
import { FrontPageView } from './frontpage-view'
import { sessionService } from 'services/session'

class FrontPageRoute extends Route {
  static component = FrontPageView

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
