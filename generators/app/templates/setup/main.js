import '../main.scss'
import './components'
import './icons'

<%- header %>

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
<%- body %>