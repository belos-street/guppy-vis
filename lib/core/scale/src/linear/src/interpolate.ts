import { rgbToHex } from 'lib/utils/src/color'
// 插值函数

// 定义RGB颜色数组类型
export type RGBColor = [number, number, number]

// 定义插值函数接口
export type InterpolateFunction<T, U> = {
  (ratio: number, start: T, stop: T): U
}

// 数字插值函数类型
export type NumberInterpolate = InterpolateFunction<number, number>

// 颜色插值函数类型
export type ColorInterpolate = InterpolateFunction<RGBColor, string>

/**
 * 线性插值函数
 * @param ratio 归一化值
 * @param start 起始值
 * @param stop 结束值
 * @returns 插值结果
 */
export function interpolateNumber(ratio: number, start: number, stop: number): number {
  return (stop - start) * ratio + start
}

/**
 * 线性插值颜色函数
 * @param ratio 归一化值
 * @param start 起始颜色值
 * @param stop 结束颜色值
 * @returns 插值结果（十六进制颜色字符串）
 */
export function interpolateColor(ratio: number, start: RGBColor, stop: RGBColor): string {
  const r = interpolateNumber(ratio, start[0], stop[0])
  const g = interpolateNumber(ratio, start[1], stop[1])
  const b = interpolateNumber(ratio, start[2], stop[2])
  return rgbToHex(r, g, b)
}
