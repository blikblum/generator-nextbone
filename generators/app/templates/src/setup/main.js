import '../main.scss'
import './components'



if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
