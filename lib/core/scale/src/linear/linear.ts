import { ceil, floor } from 'lib/utils'
import { normalize } from './src/helper'
import { interpolateNumber, type RGBColor } from './src/interpolate'
import { nice } from './src/nice'
import { ticks, tickStep } from './src/ticks'

/**
 * 线性比例尺
 * @template T 值域类型
 * @template U 输出类型
 * @param domain 定义域
 * @param range 值域
 * @param interpolate 插值函数
 * @returns 线性比例尺函数
 *
 * @example
 * // 数字插值示例
 * const { scale, ticks, nice } = createLinear(
 *  [0, 1],   // 输入的范围是 [0, 1]
 *  [0, 10]   // 输出的范围是 [0, 10]
 * )
 *
 * scale(0.5) // 5
 * scale(0.2) // 2
 */
export function createLinear<T extends number | RGBColor, U>(
  domain: [d0: number, d1: number],
  range: [r0: T, r1: T],
  interpolate: (ratio: number, start: T, stop: T) => U = interpolateNumber as any
) {
  const scale = (value: number): U => {
    const normalizedRatio = normalize(value, domain[0], domain[1])
    return interpolate(normalizedRatio, range[0], range[1])
  }

  // 挂载方法到scale对象上
  scale.ticks = (tickCount: number = 10) => ticks(domain[0], domain[1], tickCount)
  scale.nice = (tickCount: number = 10) => {
    if (domain[0] === domain[1]) return
    const step = tickStep(domain[0], domain[1], tickCount)
    const [newDomain0, newDomain1] = nice(domain, {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step)
    })
    domain[0] = newDomain0
    domain[1] = newDomain1
  }

  return scale
}
