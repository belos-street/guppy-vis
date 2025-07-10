import type { RendererContext, RectSVGAttributes } from 'lib/core/renderer/type'
import { shape } from '../shape'

export function rect(context: RendererContext, attributes: RectSVGAttributes) {
  const { width, height, x, y } = attributes

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(Number(width)),
    height: Math.abs(Number(height)),
    x: Number(width) > 0 ? x : Number(x) + Number(width),
    y: Number(height) > 0 ? y : Number(y) + Number(height)
  })
}
