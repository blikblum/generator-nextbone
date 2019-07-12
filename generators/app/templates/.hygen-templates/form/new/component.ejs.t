---
to: src/forms/<%- formName %>/component.js
---
import { BaseFormView } from '../baseview'
import MDBInput from 'mdbcomponents/MDBInput'
import { GenderInput } from 'components/GenderInput'
import { DatePicker } from 'components/DatePicker'
import 'datepicker'
import { html } from 'basecomponent'

export class <%- componentName %> extends BaseFormView {
  formName = '<%- formName %>'

  render () {
    return (html`<div>
      <form>
        <p class='h5 text-center mb-4'><%- formName %></p>

        <div class='form-row'>
          ${MDBInput(this.model, 'name', 'Nome paciente',  {class:'col-md-6', id: '<%- formName %>-form-name'}) }

          ${MDBInput(this.model, 'age', 'Idade',  {class:'col-md-2', id: '<%- formName %>-form-age', type: 'number'}) }            
        
          ${GenderInput(this.model, {id: '<%- formName %>-form-gender'})}
          
        </div>

        <div class='form-row'>
          ${DatePicker(this.model, 'dates', 'Datas', {class: 'col-md-6', multidate: true})}
        </div>

        <div class='text-center mt-4'>
          <button class='btn btn-default' id='view-report'>Visualizar</button>
        </div>
      </form>
      <div class='row'>
        <pdf-viewer style="width: 800px; height: 800px;"></pdf-viewer>
      </div>
    </div>`
    )
  }
}

customElements.define('x-<%- formName %>-form', <%- componentName %>)
