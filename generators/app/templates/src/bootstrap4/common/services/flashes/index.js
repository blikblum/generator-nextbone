import { Region } from 'nextbone/dom-utils'
import { defineAsyncMethods } from 'nextbone/class-utils'
import { service } from 'next-service'
import { Flashes } from './model'
import FlashesView from './flashes-view'

@service('flashesService')
class FlashesService {
  setup(options = {}) {
    this.container = options.container
  }

  start() {
    const { container } = this
    if (container instanceof Region) {
      this.containerRegion = container
    } else if (container instanceof HTMLElement) {
      this.containerRegion = new Region(container)
    } else {
      this.containerRegion = new Region(document.querySelector(container))
    }
    this.flashes = new Flashes()
    this.el = new FlashesView()
    this.el.flashes = this.flashes
    this.containerRegion.show(this.el)
  }

  add(flash) {
    this.flashes.add(flash)
  }

  remove(flash) {
    const model = this.flashes.findWhere(flash)
    if (model) {
      model.destroy()
    }
  }
}

defineAsyncMethods(FlashesService, ['add', 'remove'])
