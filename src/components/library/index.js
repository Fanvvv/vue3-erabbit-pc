// 扩展原有的功能：全局组件、自定义指令、挂载原型方法。注意：没有全局过滤器
// import XtxSkeleton from './xtx-skeleton'
// import XtxCarousel from './xtx-carousel'
// import XtxMore from './xtx-more'
import defaultImg from '@/assets/images/200.png'
import Message from './Message'

// 使用 webpack 提供的 require.context 方法进行组件的导入，再进行统一注册
// 自动导入组件
const file = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // 统一注册组件
    file.keys().map(item => {
      // 获取
      const component = file(item).default
      // 注册
      app.component(component.name, component)
    })
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    // 需要操作 dom，所以需要再 mounted 中
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        // 判断进入或离开
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
  // 如果想挂载全局的属性，能够通过组件实例调用的属性 this.$message
  app.config.globalProperties.$message = Message// 原型函数
}

// 创建观察对象实例
// const observer = new IntersectionObserver(callback[, options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom
