let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = [] // 存放
  }
  // 依赖
  depend() {
    // 不希望放 重复的watcher
    Dep.target.addDep(this)
  }
  // 增加订阅者
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 通知 更新
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}
export default Dep
