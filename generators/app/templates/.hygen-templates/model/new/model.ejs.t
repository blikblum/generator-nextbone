---
to: "<%= fileScope === 'global' ? h.rootDir() + '/src/common/entities/' : path %><%- name.toLowerCase() %>.js"
---
import { Model, Collection } from 'nextbone'
import { computed } from 'nextbone/computed'
import { validation } from 'nextbone/validation'

class <%- name %> extends Model {
  defaults () {
    return {

    }
  }
}

class <%- collection %> extends Collection {
  static model = <%- name %>
}

export { <%- name %>, <%- collection %> }
