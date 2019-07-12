import './setup/main'
import { Router } from 'nextbone-routing'
import { ApplicationRoute } from './application/route'
import { IndexRoute } from './index/route'

const router = new Router({ 
  outlet: '#main-view', 
  log: true, 
  logError: true 
})

router.map(function(route) {  
  route('app', { path: '/', class: ApplicationRoute, abstract: true }, () => {
    route('index', { path: '', class: IndexRoute })    
  })
})

router.on('transition:error', (transition, err) => {
  console.error(err)
})

router.on('before:activate', (transition, route) => {
  // do some authentication
})

router.listen()
