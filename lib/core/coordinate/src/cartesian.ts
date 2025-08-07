import { curry } from 'lib/utils'
import { scale, translate } from './transform'
import type { CanvasOptions, Transformer } from '../type'

function coordinate(canvasOptions: CanvasOptions): Transformer[] {
  const { x, y, width, height } = canvasOptions
  return [scale(width, height), translate(x, y)]
}

export const cartesian = curry(coordinate)
