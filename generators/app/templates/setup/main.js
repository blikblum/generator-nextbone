import '../main.scss'
import './components'

<%- header %>

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
<%- body %>