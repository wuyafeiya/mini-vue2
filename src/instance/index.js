import { initGlobalAPI } from '../gloablAPI'
import { nextTick } from '../observe/watcher'
import { initMixin } from './init'
import { initLifeCycle } from './lifecycle'

/**
 * 定义 vue 构造函数
 *
 */
function Vue(options) {
  this._init(options)
}
Vue.prototype.$nextTick = nextTick
initMixin(Vue)
initLifeCycle(Vue)
initGlobalAPI(Vue)
export default Vue
