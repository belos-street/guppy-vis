import type { RendererContext, CircleSVGAttributes } from 'lib/core/renderer/type'
import { shape } from '../shape'

export function circle(context: RendererContext, attributes: CircleSVGAttributes) {
  return shape('circle', context, attributes)
}
