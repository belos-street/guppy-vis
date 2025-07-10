import { createSVGElement, applyAttributes, mount } from 'lib/utils'
import type { RendererContext, SVGShapeType, BaseSVGAttributes, SVGAttributesMap } from '../type'

/**
 * 创建SVG形状元素
 * @param type - SVG元素类型
 * @param context - 渲染上下文
 * @param attributes - 元素属性
 * @returns 创建的SVG元素
 */
export function shape<T extends SVGShapeType>(
  type: T,
  context: RendererContext,
  attributes: T extends keyof SVGAttributesMap ? SVGAttributesMap[T] : BaseSVGAttributes
): SVGElement {
  const { group } = context
  const el = createSVGElement(type)
  applyAttributes(el, attributes)
  mount(group, el)
  return el
}
