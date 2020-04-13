const MicroModal = (() => {
  'use strict'

  const FOCUSABLE_ELEMENTS = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    'select:not([disabled]):not([aria-hidden])',
    'textarea:not([disabled]):not([aria-hidden])',
    'button:not([disabled]):not([aria-hidden])',
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
      onShow = () => { },
      onClose = () => { },
      openTrigger = 'data-micromodal-trigger',
      closeTrigger = 'data-micromodal-close',
      openClass = 'is-open',
      disableScroll = false,
      disableFocus = false,
      awaitCloseAnimation = false,
      awaitOpenAnimation = false,
      debugMode = false
    }) {
      // Save a reference of the modal
      this.modal = document.getElementById(targetModal)

      // Save a reference to the passed config
      this.config = { debugMode, disableScroll, openTrigger, closeTrigger, openClass, onShow, onClose, awaitCloseAnimation, awaitOpenAnimation, disableFocus }

      // Register click events only if pre binding eventListeners
      if (triggers.length > 0) this.registerTriggers(triggers)

      // pre bind functions for event listeners
      this.onClick = this.onClick.bind(this)
      this.onKeydown = this.onKeydown.bind(this)
    }

    /**
     * Loops through all openTriggers and binds click event
     * @param  {array} triggers [Array of node elements]
     * @return {void}
     */
    registerTriggers (triggers) {
      triggers.filter(Boolean).forEach(trigger => {
        trigger.addEventListener('click', event => this.showModal(event))
      })
    }

    showModal (event = null) {
      this.activeElement = document.activeElement
      this.modal.setAttribute('aria-hidden', 'false')
      this.modal.classList.add(this.config.openClass)
      this.scrollBehaviour('disable')
      this.addEventListeners()

      if (this.config.awaitOpenAnimation) {
        const handler = () => {
          this.modal.removeEventListener('animationend', handler, false)
          this.setFocusToFirstNode()
        }
        this.modal.addEventListener('animationend', handler, false)
      } else {
        this.setFocusToFirstNode()
      }

      this.config.onShow(this.modal, this.activeElement, event)
    }

    closeModal (event = null) {
      const modal = this.modal
      this.modal.setAttribute('aria-hidden', 'true')
      this.removeEventListeners()
      this.scrollBehaviour('enable')
      if (this.activeElement && this.activeElement.focus) {
        this.activeElement.focus()
      }
      this.config.onClose(this.modal, this.activeElement, event)

      if (this.config.awaitCloseAnimation) {
        let openClass = this.config.openClass // <- old school ftw
        this.modal.addEventListener('animationend', function handler () {
          modal.classList.remove(openClass)
          modal.removeEventListener('animationend', handler, false)
        }, false)
      } else {
        modal.classList.remove(this.config.openClass)
      }
    }

    closeModalById (targetModal) {
      this.modal = document.getElementById(targetModal)
      if (this.modal) this.closeModal()
    }

    scrollBehaviour (toggle) {
      if (!this.config.disableScroll) return
      const body = document.querySelector('body')
      switch (toggle) {
        case 'enable':
          Object.assign(body.style, { overflow: '' })
          break
        case 'disable':
          Object.assign(body.style, { overflow: 'hidden' })
          break
        default:
      }
    }

    addEventListeners () {
      this.modal.addEventListener('touchstart', this.onClick)
      this.modal.addEventListener('click', this.onClick)
      document.addEventListener('keydown', this.onKeydown)
    }

    removeEventListeners () {
      this.modal.removeEventListener('touchstart', this.onClick)
      this.modal.removeEventListener('click', this.onClick)
      document.removeEventListener('keydown', this.onKeydown)
    }

    onClick (event) {
      if (event.target.hasAttribute(this.config.closeTrigger)) {
        this.closeModal(event)
      }
    }

    onKeydown (event) {
      if (event.keyCode === 27) this.closeModal(event) // esc
      if (event.keyCode === 9) this.retainFocus(event) // tab
    }

    getFocusableNodes () {
      const nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS)
      return Array.prototype.slice.call(nodes)
    }

    /**
     * Tries to set focus on a node which is not a close trigger
     * if no other nodes exist then focuses on first close trigger
     */
    setFocusToFirstNode () {
      if (this.config.disableFocus) return

      const focusableNodes = this.getFocusableNodes()

      // no focusable nodes
      if (focusableNodes.length === 0) return

      // remove nodes on whose click, the modal closes
      // could not think of a better name :(
      const nodesWhichAreNotCloseTargets = focusableNodes.filter(node => {
        return !node.hasAttribute(this.config.closeTrigger)
      })

      if (nodesWhichAreNotCloseTargets.length > 0) nodesWhichAreNotCloseTargets[0].focus()
      if (nodesWhichAreNotCloseTargets.length === 0) focusableNodes[0].focus()
    }

    retainFocus (event) {
      let focusableNodes = this.getFocusableNodes()

      // no focusable nodes
      if (focusableNodes.length === 0) return

      /**
       * Filters nodes which are hidden to prevent
       * focus leak outside modal
       */
      focusableNodes = focusableNodes.filter(node => {
        return (node.offsetParent !== null)
      })

      // if disableFocus is true
      if (!this.modal.contains(document.activeElement)) {
        focusableNodes[0].focus()
      } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement)

        if (event.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus()
          event.preventDefault()
        }

        if (!event.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
          focusableNodes[0].focus()
          event.preventDefault()
        }
      }
    }
  }

  /**
   * Modal prototype ends.
   * Here on code is responsible for detecting and
   * auto binding event handlers on modal triggers
   */

  // Keep a reference to the opened modal
  let activeModal = null

  /**
   * Generates an object containing modals and it's
   * respective triggers
   * @param  {array} triggers     An array of all triggers
   * @param  {string} triggerAttr The data-attribute which triggers the module
   * @return {object}
   */
  const generateTriggerMap = (triggers, triggerAttr) => {
    const triggerMap = {}

    triggers.forEach(trigger => {
      const targetModal = trigger.attributes[triggerAttr].value
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = []
      triggerMap[targetModal].push(trigger)
    })

    return triggerMap
  }

  /**
   * Validates whether a modal of the given id exists
   * in the DOM
   * @param  {number} id  The id of the modal
   * @return {boolean}
   */
  const validateModalPresence = id => {
    if (!document.getElementById(id)) {
      console.warn(`MicroModal: \u2757Seems like you have missed %c'${ id }'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.')
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<div class="modal" id="${ id }"></div>`)
      return false
    }
  }

  /**
   * Validates if there are modal triggers present
   * in the DOM
   * @param  {array} triggers An array of data-triggers
   * @return {boolean}
   */
  const validateTriggerPresence = triggers => {
    if (triggers.length <= 0) {
      console.warn(`MicroModal: \u2757Please specify at least one %c'micromodal-trigger'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.')
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<a href="#" data-micromodal-trigger="my-modal"></a>`)
      return false
    }
  }

  /**
   * Checks if triggers and their corresponding modals
   * are present in the DOM
   * @param  {array} triggers   Array of DOM nodes which have data-triggers
   * @param  {object} triggerMap Object containing modals and their triggers
   * @return {boolean}
   */
  const validateArgs = (triggers, triggerMap) => {
    validateTriggerPresence(triggers)
    if (!triggerMap) return true
    for (var id in triggerMap) validateModalPresence(id)
    return true
  }

  /**
   * Binds click handlers to all modal triggers
   * @param  {object} config [description]
   * @return void
   */
  const init = config => {
    // Create an config object with default openTrigger
    const options = Object.assign({}, { openTrigger: 'data-micromodal-trigger' }, config)

    // Collects all the nodes with the trigger
    const triggers = Array.prototype.slice.call(document.querySelectorAll(`[${ options.openTrigger }]`))

    // Makes a mappings of modals with their trigger nodes
    const triggerMap = generateTriggerMap(triggers, options.openTrigger)

    // Checks if modals and triggers exist in dom
    if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return

    // For every target modal creates a new instance
    for (var key in triggerMap) {
      let valueArr = triggerMap[key]
      options.targetModal = key
      options.triggers = valueArr
      activeModal = new Modal(options) // eslint-disable-line no-new
    }
  }

  /**
   * Shows a particular modal
   * @param  {string} targetModal [The id of the modal to display]
   * @param  {object} config [The configuration object to pass]
   * @return {void}
   */
  const show = (targetModal, config) => {
    const options = config || {}
    options.targetModal = targetModal

    // Checks if modals and triggers exist in dom
    if (options.debugMode === true && validateModalPresence(targetModal) === false) return

    // clear events in case previous modal wasn't close
    if (activeModal) activeModal.removeEventListeners()

    // stores reference to active modal
    activeModal = new Modal(options) // eslint-disable-line no-new
    activeModal.showModal()
  }

  /**
   * Closes the active modal
   * @param  {string} targetModal [The id of the modal to close]
   * @return {void}
   */
  const close = targetModal => {
    targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal()
  }

  return { init, show, close }
})()

export default MicroModal
window.MicroModal = MicroModal
