import '../main.scss'
import './services'
import './components'
import './icons'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
