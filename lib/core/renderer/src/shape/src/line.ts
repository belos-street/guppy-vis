import type { RendererContext, LineSVGAttributes } from 'lib/core/renderer/type'
import { shape } from '../shape'

export function line(context: RendererContext, attributes: LineSVGAttributes) {
  return shape('line', context, attributes)
}
