import type { RendererContext, TextSVGAttributes } from 'lib/core/renderer/type'
import { shape } from '../shape'

export function text(context: RendererContext, attributes: TextSVGAttributes) {
  const { text, ...rest } = attributes
  const textElement = shape('text', context, rest)
  if (text) textElement.textContent = text
  return textElement
}
