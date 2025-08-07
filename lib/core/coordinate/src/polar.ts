import { curry } from 'lib/utils'
import { scale, translate, polar } from './transform'
import type { CanvasOptions, Transformer } from '../type'

/**
 * 创建极坐标系变换函数
 * @param canvasOptions 画布选项，定义坐标系的位置和大小
 * @returns 极坐标系变换函数数组
 */
function coordinate(canvasOptions: CanvasOptions): Transformer[] {
  const { x, y, width, height } = canvasOptions
  // 极坐标系通常需要先进行极坐标变换，然后缩放和平移
  return [polar(), scale(width / 2, height / 2), translate(x + width / 2, y + height / 2)]
}

export const polarCoordinate = curry(coordinate)