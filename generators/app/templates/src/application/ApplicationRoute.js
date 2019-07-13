import { Route } from 'nextbone-routing'
import './application-view'

class ApplicationRoute extends Route {
  static component = 'application-view'

  activate(transition) {
    // configure app level here
  }
}

export { ApplicationRoute }
