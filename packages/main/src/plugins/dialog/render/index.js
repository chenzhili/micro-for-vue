import { h, render } from 'vue'

const instanceMap = new Map()

const initInstance = (component, options, container) => {
  const vnode = h(component, options)
  render(vnode, container)
  document.body.appendChild(container)
  return vnode.component
}

const genContainer = () => {
  var _div = document.createElement('div')
  _div.setAttribute('class', 'ql-dialog')
  return _div
}

const show = (component, options) => {
  const container = genContainer()
  // console.log(container)
  options.onVanish = () => {
    render(null, container)
    document.body.removeChild(container)
    instanceMap.clear()
  }
  options.onAction = (action) => {
    const resolve = action
    const currentMsg = instanceMap.get(vm)
    if (action === 'cancel') {
      currentMsg.reject('cancel')
    } else if (action === 'close') {
      currentMsg.reject('close')
    } else if (action === 'confirm') {
      currentMsg.resolve('confirm')
    } else {
      currentMsg.resolve(resolve)
    }
    document.body.className = ''
  }

  const instance = initInstance(component, options, container)
  const vm = instance.proxy
  vm.visible = true
  document.body.className = 'no-scroll'
  return vm
}

function qlDialog (component, options = {}) {
  return new Promise((resolve, reject) => {
    const vm = show(component, options)
    instanceMap.set(vm, {
      options,
      resolve,
      reject
    })
  })
}

export default qlDialog
