import { Component, html } from 'component'
import { state } from 'nextbone'
import 'bootstrap/js/dist/alert'
import './styles.scss'

export default class FlashesView extends Component {
  @state
  flashes

  render() {
    return html`
      <div class="flashes__container">
        ${this.flashes.map(
          model => html`
            <div role="alert" class="flashes__alert alert alert-${model.get('type')}">
              <strong>${model.get('title')}</strong>
              ${Boolean(model.get('dismissible')) &&
                html`
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                `}
            </div>
          `
        )}
      </div>
    `
  }
}

customElements.define('flashes-view', FlashesView)
