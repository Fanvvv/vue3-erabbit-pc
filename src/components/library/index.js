// 全局注册组件
import XtxSkeleton from './xtx-skeleton'

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
