/**
 * 表示一个二维坐标点 [x, y]
 */
export type Point = [number, number]

/**
 * 坐标变换函数类型，接收一个点并返回变换后的点
 */
export type TransformerFn = (point: Point) => Point

/**
 * 带有类型标识的坐标变换函数
 */
export type Transformer = TransformerFn & {
  type: () => string
}

/**
 * 画布选项接口，用于定义坐标系的位置和大小
 */
export interface CanvasOptions {
  x: number
  y: number
  width: number
  height: number
}
