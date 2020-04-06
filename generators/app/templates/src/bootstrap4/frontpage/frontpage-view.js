import { Component, html, property } from 'component'
import { state, Model, event } from 'nextbone'
import { form } from 'nextbone/form'

@form
class FrontPageView extends Component {
  @state
  model = new Model()

  @property()
  loginError

  @property()
  isLoading

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
          display: flex;
          align-items: center;
          height: 100%;
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #f5f5f5;
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

      <form class="form-signin text-center" @submit=${this.formSubmit}>
        ${this.loginError
          ? html` <div class="alert alert-danger" role="alert">${this.loginError}</div> `
          : ''}
        <h1>My App</h1>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div>Email: jon@hotmail.com Password: 123</div>
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
          <label> <input name="remember" type="checkbox" value="remember-me" /> Remember me </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" ?disabled=${this.isLoading}>
          ${this.isLoading
            ? html`
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              `
            : 'Sign in'}
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
      </form>
    `
  }
}

customElements.define('frontpage-view', FrontPageView)

export { FrontPageView }
