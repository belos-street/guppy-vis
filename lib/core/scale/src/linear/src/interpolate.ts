import { rgbToHex } from 'lib/utils/src/color'
//插值函数

/**
 * 线性插值函数
 * @param ratio 归一化值
 * @param start 起始值
 * @param stop 结束值
 * @returns 插值结果
 */
export function interpolateNumber(ratio: number, start: number, stop: number) {
  return (stop - start) * ratio + start
}

/**
 * 线性插值颜色函数
 * @param ratio 归一化值
 * @param start 起始颜色值
 * @param stop 结束颜色值
 * @returns 插值结果
 */
export function interpolateColor(ratio: number, start: number[], stop: number[]) {
  const r = interpolateNumber(ratio, start[0], stop[0])
  const g = interpolateNumber(ratio, start[1], stop[1])
  const b = interpolateNumber(ratio, start[2], stop[2])
  return rgbToHex(r, g, b)
}
