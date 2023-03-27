import { initMixin } from './init'

/**
 * 定义 vue 构造函数
 *
 */

function Vue(options) {
  this._init(options)
}
initMixin(Vue)

export default Vue
