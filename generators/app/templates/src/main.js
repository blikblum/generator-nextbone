import './setup/main'
import { Router } from 'nextbone-routing'
import { sessionService } from 'services/session'

// route classes
import { ApplicationRoute } from './application/ApplicationRoute'
import { FrontPageRoute } from './frontpage/FrontPageRoute'
// route views / components
import './application/dashboard/dashboard-view'

const router = new Router({
  outlet: '#main-view',
  log: true,
  logError: true,
})

router.map(function(route) {
  route('frontpage', { path: '/', class: FrontPageRoute })
  route('application', { path: '/app', class: ApplicationRoute, abstract: true }, () => {
    route('dashboard', { path: '', component: 'dashboard-view' })
  })
})

router.on('transition:error', (transition, err) => {
  console.error(err)
})

router.on('before:activate', (transition, route) => {
  if (!sessionService.isAuthenticated && process.env.NODE_ENV !== 'development') {
    transition.redirectTo('frontpage')
  }
})

router.listen()
