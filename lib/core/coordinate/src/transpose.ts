import { curry } from 'lib/utils'
import { scale, translate, transpose } from './transform'
import type { CanvasOptions, Transformer } from '../type'

/**
 * 创建转置坐标系变换函数
 * @param canvasOptions 画布选项，定义坐标系的位置和大小
 * @returns 转置坐标系变换函数数组
 */
function coordinate(canvasOptions: CanvasOptions): Transformer[] {
  const { x, y, width, height } = canvasOptions
  // 转置坐标系需要先进行转置变换，然后缩放和平移
  return [transpose(), scale(height, width), translate(x, y)]
}

export const transposeCoordinate = curry(coordinate)