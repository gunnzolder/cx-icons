class CxIcon extends HTMLElement {
  constructor () {
    super()
    // this.root = this.attachShadow({mode: 'open'})
    this.root = this
    this.name = this.textContent
    this.textContent = null

    const template = document.createElement('template')
    template.innerHTML = `<svg><use xlink:href="${CxIcon.setIconUri(this.name)}"></use></svg>`
    this.root.appendChild(template.content.cloneNode(true))
  }

  get name () {
    return this.getAttribute('name')
  }

  set name (value) {
    if (value) {
      this.setAttribute('name', value)
    } else {
      this.removeAttribute('name')
    }
  }

  static setIconUri (icon) {
    const { origin, pathname, search } = document.location
    return origin + pathname + search + '#cx-' + icon
  }

  static get observedAttributes () {
    return ['name']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.root.querySelector('use').setAttribute('xlink:href', CxIcon.setIconUri(newValue))
        break
    }
  }
}

window.customElements.define('cx-icon', CxIcon)
