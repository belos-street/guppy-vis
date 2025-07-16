import { normalize } from './src/helper'
import { interpolateNumber } from './src/interpolate'

/**
 * 线性比例尺
 * @param domain 定义域
 * @param range 值域
 * @param interpolate 插值函数
 * @returns 线性比例尺函数
 *
 * @example
 * const scale = createLinear(
 *  [0, 1],   // 输入的范围是 [0, 1]
 *  [0, 10]   // 输出的范围是 [0, 10]
 * )
 *
 * scale(0.5) // 5
 * scale(0.2) // 2
 */
export function createLinear(domain: [d0: number, d1: number], range: [r0: number, r1: number], interpolate = interpolateNumber) {
  return (value: number) => {
    const normalizedRatio = normalize(value, domain[0], domain[1])
    return interpolate(normalizedRatio, range[0], range[1])
  }
}
