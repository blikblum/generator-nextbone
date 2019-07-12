import { Component, html } from 'component'

class IndexView extends Component {  
  render () {
    return html`
      <div>Hello ${this.message}</div>
    `
  }
}

customElements.define('index-view', IndexView)

export { IndexView }