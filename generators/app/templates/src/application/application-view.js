import { Component, html } from 'component'
import './application-view.scss'
import { routerLinks } from 'nextbone-routing'

@routerLinks
class ApplicationView extends Component {
  static outlet = 'main'

  render() {
    return html`
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
        <input
          class="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#">Sign out</a>
          </li>
        </ul>
      </nav>

      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column" routerlinks>
                <li class="nav-item">
                  <a route="dashboard" class="nav-link">
                    <i class="fa fa-home"></i>
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a route="notifications" class="nav-link">
                    <i class="fa fa-file"></i>
                    Notifications
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-shopping-cart"></i>
                    Products
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-users"></i>
                    Customers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-bar-chart"></i>
                    Reports
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-random"></i>
                    Integrations
                  </a>
                </li>
              </ul>

              <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              >
                <span>Saved reports</span>
                <a class="d-flex align-items-center text-muted" href="#">
                  <i class="fa fa-plus-circle"></i>
                </a>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-file-pdf-o"></i>
                    Current month
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-file-pdf-o"></i>
                    Last quarter
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-file-pdf-o"></i>
                    Social engagement
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-file-pdf-o"></i>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4"></main>
        </div>
      </div>
    `
  }
}

customElements.define('application-view', ApplicationView)
