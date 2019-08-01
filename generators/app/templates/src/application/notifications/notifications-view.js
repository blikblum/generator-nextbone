import { Component, html } from 'component'
import { flashesService } from 'services/flashes'

class NotificationsView extends Component {
  displayAlert(e) {
    const el = e.target
    flashesService.add({
      type: el.dataset.type,
      title: el.textContent.trim(),
    })
  }

  render() {
    return html`
      <h1 class="h2">Notifications</h1>
      <div class="row">Show alerts / flashes</div>
      <div class="row">
        <button data-type="danger" class="btn btn-danger" @click=${this.displayAlert}>
          Danger
        </button>
        <button data-type="success" class="btn btn-success" @click=${this.displayAlert}>
          Success
        </button>
        <button data-type="info" class="btn btn-info" @click=${this.displayAlert}>Info</button>
      </div>
    `
  }
}

customElements.define('notifications-view', NotificationsView)

export { NotificationsView }
