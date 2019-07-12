---
to: src/forms/<%- formName %>/route.js
---

import { Route } from 'nextbone-routing'
import { <%- componentName %> } from './component'
import { container } from 'di'
import { Model } from 'nextbone'
import { validation } from 'nextbone/validation';

@validation({
  name: {
    required: true
  },
  age: {
    pattern: 'number'
  },
  gender: {
    required: true
  },
  dates: {
    required: true
  }
})
class FormModel extends Model {}

class <%- routeName %> extends Route {
  static component = <%- componentName %>;

  activate () {
    this.user = container.user
    this.model = this.model || new FormModel()
  }  

  prepareEl (el) {
    Object.assign(el, {
      user: this.user,
      model: this.model
    })
  }
}

export { <%- routeName %> }