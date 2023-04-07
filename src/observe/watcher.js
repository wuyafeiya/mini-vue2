import Dep from './dep'

let id = 0

// 观察者
class Watcher {
  constructor(vm, fn, options) {
    this.id = id++
    this.renderWatcher = options
    this.getter = fn
    this.deps = [] // 计算属性
    this.depsId = new Set()
    this.get()
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  get() {
    Dep.target = this
    this.getter()
    Dep.target = null
  }
  update() {
    queueWatcher(this) // 当前的watcher暂存起来
  }
  run() {
    // console.log('run')
    this.get()
  }
}
function flushSchedulerQueue() {
  let flushQueue = queue.slice(0)
  queue = []
  has = {}
  pending = false
  flushQueue.forEach((q) => q.run())
}

let queue = []
let has = {}
let pending = false

// 去重 watcher

function queueWatcher(watcher) {
  const id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = true
    if (!pending) {
      setTimeout(flushSchedulerQueue, 0)
      pending = true
    }
  }
}

let callbacks = []
let waiting = false

function flushCallbacks() {
  // slice 拷贝数组
  let cbs = callbacks.slice(0)
  waiting = false
  callbacks = []
  cbs.forEach((cb) => cb())
}

let timerFunc
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) {
  let observe = new MutationObserver(flushCallbacks)
  let textNode = document.createTextNode(1)
  observe.observe(textNode, {
    characterData: true
  })
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  setTimeout(flushCallbacks)
}
export function nextTick(cb) {
  callbacks.push(cb)
  if (!waiting) {
    timerFunc()
    waiting = true
  }
}

export default Watcher
