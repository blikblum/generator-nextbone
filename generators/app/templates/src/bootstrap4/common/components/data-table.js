import { Component, classMap, html } from 'component'
import { property } from 'lit-element'
import { state, event } from 'nextbone'

class DataTable extends Component {
  @property()
  fields = []

  @property()
  selected

  @state
  collection

  // css options
  @property({ type: Boolean })
  dark

  @property({ type: Boolean })
  hover

  @property({ type: Boolean })
  bordered

  @property({ type: Boolean })
  borderless

  @property({ type: Boolean })
  sm

  @property({ type: Boolean })
  striped

  @property({ type: Boolean, attribute: 'thead-dark' })
  theadDark

  @property({ type: Boolean, attribute: 'thead-light' })
  theadLight

  @event('click', 'tr.item-row')
  onRowClick(e) {
    this.dispatchEvent(
      new CustomEvent('row-select', { bubbles: true, detail: { model: e.selectorTarget.model } })
    )
  }

  render() {
    const tableClasses = {
      'table-dark': this.dark,
      'table-hover': this.hover,
      'table-bordered': this.bordered,
      'table-borderless': this.borderless,
      'table-striped': this.striped,
      'table-sm': this.sm
    }

    const theadClasses = {
      'thead-dark': this.theadDark,
      'thead-light': this.theadLight
    }

    return html`
      <table class="table ${classMap(tableClasses)}">
        <thead class=${classMap(theadClasses)}>
          <tr>
            ${this.fields.map(field => {
              return html`
                <th>${field.title}</th>
              `
            })}
          </tr>
        </thead>
        <tbody>
          ${this.collection.map(model => {
            return html`
              <tr
                class="item-row ${classMap({
                  'table-active': model === this.selected
                })}"
                .model=${model}
              >
                ${this.fields.map(field => {
                  return html`
                    <td>${field.render ? field.render(model) : model.get(field.attr)}</td>
                  `
                })}
              </tr>
            `
          })}
        </tbody>
      </table>
    `
  }
}

customElements.define('data-table', DataTable)

export { DataTable }
