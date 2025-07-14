import type { RendererContext, PathSVGAttributes } from 'lib/core/renderer/type'
import { shape } from '../shape'

/**
 * @param context
 * @param attributes
 * @returns
 */
export function path(context: RendererContext, attributes: PathSVGAttributes) {
  const { d } = attributes
  const path = Array.isArray(d) ? d.flat().join(' ') : d
  return shape('path', context, { ...attributes, d: path })
}
