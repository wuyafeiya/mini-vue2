/**
 * 重写数组方法
 */
let oldPrototype = Array.prototype
// Objecr.create 创建一个新对象 把 参数给新对象的原型上
export let newPrototype = Object.create(oldPrototype)

/**
 * 数组变异方法
 */

let methods = ['push', 'pop', 'unshift', 'shift', 'reserve', 'splice', 'sort']
methods.forEach((method) => {
  // 向新数组中添加方法 方法执行还是原数组本身的
  newPrototype[method] = function (...args) {
    const result = oldPrototype[method].call(this, ...args)
    let inserted
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default:
        break
    }
    if (inserted) {
      ob.observeArray(inserted)
    }
    return result
  }
})
