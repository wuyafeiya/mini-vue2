import { newPrototype } from './array'
class Observe {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    // 判断 data 是对象还是 数组
    if (Array.isArray(data)) {
      // 如果是数组 就把 数组 当前方法 重构
      data.__proto__ = newPrototype
    } else {
      this.walk(data)
    }
  }

  // 循环 对象
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach((key) => defineRelative(data, key, data[key]))
  }
  // 循环 数组
  observeArray(data) {
    data.forEach((item) => observe(item))
  }
}

function defineRelative(target, key, value) {
  observe(value)
  Object.defineProperty(target, key, {
    get: function () {
      return value
    },
    set: function (newValue) {
      if (newValue == value) return
      value = newValue
    }
  })
}

export function observe(data) {
  // 判断 data 是不是 对象 或者为null 直接return
  if (typeof data !== 'object' || data == null) {
    return
  }
  if (data.__ob__ instanceof Observe) {
    return data.__ob__
  }
  // 然后掉 Observe 这个类
  return new Observe(data)
}
