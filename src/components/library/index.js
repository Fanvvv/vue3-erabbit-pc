// 全局注册组件
import XtxSkeleton from './xtx-skeleton'
import XtxCarousel from './xtx-carousel'

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
  }
}
