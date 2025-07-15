import { createSVGElement, mount } from 'lib/core/renderer/src/dom'
import type { RendererContext } from 'lib/core/renderer/type'

/**
 * @function createContext
 * @description 上下文（Context）主要用于保存一些绘制或者其他功能需要的全局的信息，比如挂载画布的容器，当前的填充颜色，边框粗细等。
 * - 画布节点：这是一个 svg 节点，方便使用者将其挂载到 DOM 需要的位置。
 * - 挂载节点：这是一个 g 节点，是当前可以挂载新元素的节点。
 * @param width - 画布宽度
 * @param height - 画布高度
 * @returns RendererContext 渲染上下文
 *
 */
export function createContext(width: string, height: string): RendererContext {
  const svg = createSVGElement('svg')
  svg.setAttribute('width', width)
  svg.setAttribute('height', height)
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

  const g = createSVGElement('g')
  mount(svg, g)
  return {
    node: svg, //画布节点
    group: g //挂载节点
  }
}

/**
 * - context.group 就像一个指针，指向当前活动的SVG group 元素，通过改变这个指针的指向，来实现不同层级的绘制操作。
 * - 这种设计使得渲染器可以方便地管理变换状态和元素层级，类似于图形API中的状态栈概念，但实现方式是通过改变指针指向而不是真正的栈操作。
 */

/**
 * @function save
 * @param context 渲染上下文
 * @description  创建新的 g 节点，将其挂载到当前group节点下，并更新上下文的group指向这个新节点。
 */
export function save(context: RendererContext) {
  const { group } = context
  const newGroup = createSVGElement('g')
  mount(group, newGroup)
  context.group = newGroup
}

/**
 * @function restore
 * @param context 渲染上下文
 * @description 将context 的 group 节点指向 父级g节点。
 */
export function restore(context: RendererContext) {
  const { group } = context
  const { parentNode } = group
  if (parentNode instanceof SVGElement) {
    context.group = parentNode
  } else {
    throw new Error('父节点不是有效的 SVG 元素')
  }
}
