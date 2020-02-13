import { Route } from 'nextbone-routing'
import './notifications-view'

class NotificationsRoute extends Route {
  static component = 'notifications-view'

  activate(transition) {}
}

export { NotificationsRoute }
