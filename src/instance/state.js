import { observe } from '../observe/index'
export function initState(vm) {
  const opts = vm.$options
  // 判断 vm.$options data 属性 存不存在
  if (opts.data) {
    initData(vm)
  }
}

// 代理
function Proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    }
  })
}

/**
 *  初始化 数据
 * @param {*} vm
 */

function initData(vm) {
  let data = vm.$options.data
  // 如果data是 函数就直接执行 不然就直接data 或者为空 对象
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  observe(data)
  console.log(vm)

  for (let key in data) {
    Proxy(vm, '_data', key)
  }
}
