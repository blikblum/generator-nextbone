---
to: <%- path%><%- tagName %>.js
---
import { Component, html } from 'component'

class <%- componentName %> extends Component {
  render () {
    return html `
      <div class="row">
        Hello!
      </div>
    `
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
