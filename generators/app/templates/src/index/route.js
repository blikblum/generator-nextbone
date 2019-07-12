import { Route, elProperty } from 'nextbone-routing'
import { IndexView } from './index-view';

class IndexRoute extends Route {
  static component = IndexView

  @elProperty
  message = 'World'

  activate (transition) {
    
  }  
}

export { IndexRoute }
