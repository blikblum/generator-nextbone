---
to: src/application/<%- path %>/route.js
---
import { Route } from 'nextbone-routing'
import { <%- componentName %> } from './<%- tagName %>'

class <%- routeName %> extends Route {
  static component = <%- componentName %>
  
  activate (transition) {

  }
}

export { <%- routeName %> }
