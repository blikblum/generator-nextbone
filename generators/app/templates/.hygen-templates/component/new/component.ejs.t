---
to: "<%= fileScope === 'global' ? h.rootDir() + '/src/common/components/' + h.inflection.transform(name, ['underscore', 'dasherize']).replace('-view', '') : h.inflection.transform(name, ['underscore', 'dasherize'])%>.js"
---
import { Component, html } from 'basecomponent'

class <%- name %> extends Component {
  render () {
    return html `
      <div class="row">
        Hello!
      </div>
    `
  }
})

export { <%- name %> }
