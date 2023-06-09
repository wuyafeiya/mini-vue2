import Watcher from '../observe/watcher'
import { createElementVNode, createTextVNode } from '../vdom/index'

function createElm(vnode) {
  let { tag, data, children, text } = vnode
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    patchProps(vnode.el, data)
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function patchProps(el, props) {
  // console.log(props)
  for (let key in props) {
    if (key === 'style') {
      for (let styleName in props.style) {
        el.style[styleName] = props.style[styleName]
      }
    } else {
      el.setAttribute(key, props[key])
    }
  }
}

function patch(oldVNode, vnode) {
  const isRealElement = oldVNode.nodeType
  if (isRealElement) {
    const elm = oldVNode // 获取真实的元素
    const parentElm = elm.parentNode // 拿到父元素
    // console.log(parentElm)
    let newElm = createElm(vnode)
    parentElm.insertBefore(newElm, elm.nextSibing)
    parentElm.removeChild(elm)
    return newElm
  } else {
    // diff 算法
  }
}

export function initLifeCycle(Vue) {
  Vue.prototype._update = function (vnode) {
    // console.log(vnode)
    const vm = this
    const el = vm.$el
    vm.$el = patch(el, vnode)
  }

  Vue.prototype._c = function () {
    return createElementVNode(this, ...arguments)
  }

  Vue.prototype._v = function () {
    return createTextVNode(this, ...arguments)
  }
  Vue.prototype._s = function (value) {
    if (typeof value !== 'object') return value
    return JSON.stringify(value)
  }
  Vue.prototype._render = function () {
    return this.$options.render.call(this)
  }
}

export function mountComponent(vm, el) {
  vm.$el = el
  const updateComponent = () => {
    // 只有调用 这个方法 才可以 更新 视图
    vm._update(vm._render())
  }
  const watch = new Watcher(vm, updateComponent, true)
  console.log(watch)
}

export function callHook(vm, hook) {
  // 调用钩子函数
  const handlers = vm.$options[hook]
  if (handlers) {
    handlers.forEach((handler) => handler.call(vm))
  }
}
