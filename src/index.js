import { version } from '../package.json'

const MicroModal = (() => {
  'use strict'

  const FOCUSABLE_ELEMENTS = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])'
  ]

  class Modal {
    constructor ({
      targetModal,
      triggers = [],
      onShow = () => {},
      onClose = () => {}
    } = {}) {
      this.modal = document.getElementById(targetModal)
      if (triggers.length > 0) this.registerTriggers(...triggers)
      this.callbacks = { onShow, onClose }

      this.onClick = this.onClick.bind(this)
      this.onKeydown = this.onKeydown.bind(this)
    }

    registerTriggers (...triggers) {
      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => this.showModal())
      })
    }

    showModal () {
      this.activeElement = document.activeElement
      this.modal.setAttribute('aria-hidden', 'false')
      this.setFocusToFirstNode()
      this.addEventListeners()
      this.callbacks.onShow(this.modal)
    }

    closeModal () {
      this.modal.setAttribute('aria-hidden', 'true')
      this.removeEventListeners()
      this.activeElement.focus()
      this.callbacks.onClose(this.modal)
    }

    addEventListeners () {
      this.modal.addEventListener('touchstart', this.onClick)
      this.modal.addEventListener('click', (event) => {
        if (event.target.hasAttribute('data-micromodal-close')) {
          this.onClick(event)
        }
      })
      document.addEventListener('keydown', this.onKeydown)
    }

    removeEventListeners () {
      this.modal.removeEventListener('touchstart', this.onClick)
      this.modal.removeEventListener('click', this.onClick)
      document.removeEventListener('keydown', this.onKeydown)
    }

    onClick (event) {
      this.closeModal()
      event.preventDefault()
    }

    onKeydown (event) {
      if (event.keyCode === 27) this.closeModal(event)
      if (event.keyCode === 9) this.maintainFocus(event)
    }

    getFocusableNodes () {
      const nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS)
      return Object.keys(nodes).map((key) => nodes[key])
    }

    setFocusToFirstNode () {
      const focusableNodes = this.getFocusableNodes()
      if (focusableNodes.length) focusableNodes[0].focus()
    }

    maintainFocus (event) {
      var focusableNodes = this.getFocusableNodes()
      var focusedItemIndex = focusableNodes.indexOf(document.activeElement)

      if (event.shiftKey && focusedItemIndex === 0) {
        focusableNodes[focusableNodes.length - 1].focus()
        event.preventDefault()
      }

      if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
        focusableNodes[0].focus()
        event.preventDefault()
      }
    }
  }

  const generateTriggerMap = triggers => {
    const triggerMap = []

    triggers.forEach(trigger => {
      const targetModal = trigger.dataset.micromodalTrigger
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = []
      triggerMap[targetModal].push(trigger)
    })

    return triggerMap
  }

  const validateArgs = (triggers, triggerMap) => {
    if (triggers.length <= 0) {
      console.warn(`MicroModal v${version}: \u2757Please specify at least one %c'micromodal-trigger'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.')
      console.warn(`MicroModal v${version}: %cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<a href="#" data-micromodal-trigger="my-modal"></a>`)
      return false
    }

    for (var id in triggerMap) {
      if (!document.getElementById(id)) {
        console.warn(`MicroModal v${version}: \u2757Seems like you have missed %c'${id}'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.')
        console.warn(`MicroModal v${version}: %cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<div class="modal" id="${id}"></div>`)
        return false
      }
    }
    return true
  }

  const init = config => {
    const options = config || {}

    const triggers = document.querySelectorAll('[data-micromodal-trigger]')
    const triggerMap = generateTriggerMap(triggers)

    if (validateArgs(triggers, triggerMap)) {
      for (var key in triggerMap) {
        let value = triggerMap[key]
        options.targetModal = key
        options.triggers = [...value]
        new Modal(options) // eslint-disable-line no-new
      }
    }
  }

  const show = targetModal => {
    const modal = new Modal({ targetModal: targetModal }) // eslint-disable-line no-new
    modal.showModal()
  }

  return { init, show }
})()

export default MicroModal
