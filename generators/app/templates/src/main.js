import './setup/main'
import { Router } from 'nextbone-routing'
import { ApplicationRoute } from './application/route'
import { FrontPageRoute } from './frontpage/route'
import { sessionService } from 'services/session'

const router = new Router({
  outlet: '#main-view',
  log: true,
  logError: true,
})

router.map(function(route) {
  route('frontpage', { path: '/', class: FrontPageRoute })
  route('app', { path: '/app', class: ApplicationRoute, abstract: true }, () => {
    //route('dashboard', { path: '', class: DashboardRoute })
  })
})

router.on('transition:error', (transition, err) => {
  console.error(err)
})

router.on('before:activate', (transition, route) => {
  if (!sessionService.isAuthenticated) {
    transition.redirectTo('frontpage')
  }
})

router.listen()
