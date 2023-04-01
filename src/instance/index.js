import { initMixin } from './init'
import { initLifeCycle } from './lifecycle'

/**
 * 定义 vue 构造函数
 *
 */
function Vue(options) {
  this._init(options)
}
initMixin(Vue)
initLifeCycle(Vue)
export default Vue
