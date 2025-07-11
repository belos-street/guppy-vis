import { createSVGElement, mount } from 'lib/core/renderer/dom'
import type { RendererContext } from './type'

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
 * @function save
 * @param context 渲染上下文
 * @description 保存当前的状态，包括当前的变换矩阵、当前的填充颜色、当前的边框粗细等。
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
 * @description 恢复之前保存的状态。
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
