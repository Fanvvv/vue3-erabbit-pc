import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm'

// 准备div
const divVNode = createVNode('div', { class: 'xtx-confirm-container' })
render(divVNode, document.body)
// 获取 DOM 节点
const div = divVNode.el

// 导出函数可通过调用 Confirm() 函数动态创建 XtxConfirm 组件
// 函数的返回值是 Promise 对象
export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      render(null, div)
      resolve()
    }
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    const ConfirmVNode = createVNode(XtxConfirm, { title, text, confirmCallback, cancelCallback })
    render(ConfirmVNode, div)
  })
}
