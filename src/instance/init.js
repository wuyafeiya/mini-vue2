import { compileToFunction } from '../compile/index'
import { mountComponent } from './lifecycle'
import { initState } from './state'
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)
    // 判断 有没有 el
    if (options.el) {
      vm.$mount(options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    el = document.querySelector(el)
    let ops = vm.$options
    // 优先级 render > template > el
    if (!ops.render) {
      let template
      // 没有 template 有el
      if (!ops.template && el) {
        template = el.outerHTML
      } else {
        // 有 template 有 el 就把 template 作为 模版
        if (el) {
          template = ops.template
        }
      }
      if (template && el) {
        const render = compileToFunction(template)
        ops.render = render
        console.log(render)
      }
    }
    mountComponent(vm, el)
  }
}
