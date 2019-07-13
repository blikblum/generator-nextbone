import { Component, html, property } from 'component'
import { state, Model, event } from 'nextbone'
import { formBind } from 'nextbone/formbind'

@formBind
class FrontPageView extends Component {
  @state
  model = new Model()

  @property()
  loginError

  @event('input', 'input')
  oninput() {
    // reset error state on input
    this.loginError = null
  }

  formSubmit(e) {
    e.preventDefault()
    this.trigger('login:request', this.model.attributes)
    this.model.clear()
  }

  render() {
    return html`
      <style>
        frontpage-view {
          display: block;
          background-color: #f5f5f5;
          height: 100vh;
        }

        .container-signin {
          display: flex;
          align-items: center;
          height: 100%;
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .login-error {
          background-color: red;
        }

        .form-signin {
          width: 100%;
          max-width: 330px;
          padding: 15px;
          margin: auto;
        }
        .form-signin .checkbox {
          font-weight: 400;
        }
        .form-signin .form-control {
          position: relative;
          box-sizing: border-box;
          height: auto;
          padding: 10px;
          font-size: 16px;
        }
        .form-signin .form-control:focus {
          z-index: 2;
        }
        .form-signin input[type='email'] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        .form-signin input[type='password'] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      </style>

      <div class="container-signin text-center">
        <form class="form-signin" @submit=${this.formSubmit}>
          ${this.loginError
            ? html`
                <div class="login-error">${this.loginError}</div>
              `
            : ''}
          <h1>My App</h1>
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            name="email"
            placeholder="Email address"
            autofocus
            .value=${this.model.get('email') || null}
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            name="password"
            placeholder="Password"
            .value=${this.model.get('password') || null}
          />
          <div class="checkbox mb-3">
            <label> <input type="checkbox" value="remember-me" /> Remember me </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
        </form>
      </div>
    `
  }
}

customElements.define('frontpage-view', FrontPageView)

export { FrontPageView }
