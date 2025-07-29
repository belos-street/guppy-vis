import { log } from 'lib/utils'
import { ticks } from './linear/src/ticks'
import { nice } from './linear/src/nice'
import { createLinear } from './linear'
import { interpolateNumber, type RGBColor } from './linear/src/interpolate'

/**
 * 对数比例尺
 * @template T 值域类型
 * @template U 输出类型
 * @param options 配置项
 * @param options.domain 定义域
 * @param options.range 值域
 * @param options.base 对数的底数，默认为自然对数的底数 e
 * @param options.interpolate 插值函数
 * @returns 对数比例尺函数
 *
 * @example
 * // 创建对数比例尺
 * const scale = createLog({
 *   domain: [1, 1000],  // 输入的范围是 [1, 1000]
 *   range: [0, 10],     // 输出的范围是 [0, 10]
 *   base: Math.E        // 使用自然对数底数e
 * })
 *
 * scale(10)   // 约为 3.33
 * scale(100)  // 约为 6.67
 * scale(1000) // 10
 */
export function createLog<T extends number | RGBColor, U = T>(options: {
  domain: [d0: number, d1: number]
  range: [r0: T, r1: T]
  base?: number
  interpolate?: (ratio: number, start: T, stop: T) => U
}): ((x: number) => U) & { ticks: (tickCount?: number) => number[]; nice: (tickCount?: number) => void } {
  const { domain, range, base = Math.E, interpolate = interpolateNumber as any } = options
  const transform = (x: number) => Math.log(x)
  // 确保转换后的domain仍然是元组类型
  const mappedDomain: [number, number] = [transform(domain[0]), transform(domain[1])]
  let linear = createLinear(mappedDomain, range, interpolate)

  const scale = (x: number): U => linear(transform(x)) as U

  // 挂载方法到scale对象上
  scale.ticks = (tickCount: number = 5) => {
    // 对于底数为10的情况，生成10的整数次幂的刻度
    if (base === 10) {
      const log10Min = Math.floor(Math.log10(domain[0]))
      const log10Max = Math.ceil(Math.log10(domain[1]))

      // 生成对数空间中的刻度
      const logTicks = ticks(log10Min, log10Max, tickCount)

      // 将对数空间的刻度转换回原始空间
      return logTicks.map((x) => 10 ** x)
    } else {
      // 对于其他底数，使用通用方法
      const [min, max] = domain.map((x) => log(x, base))
      return ticks(min, max, tickCount).map((x) => base ** x)
    }
  }

  scale.nice = () => {
    if (domain[0] === domain[1]) return

    // 对于底数为10的对数比例尺，我们希望调整到10的整数次幂
    if (base === 10) {
      // 计算log10值并向下/向上取整
      const log10Min = Math.floor(Math.log10(domain[0]))
      const log10Max = Math.ceil(Math.log10(domain[1]))

      // 将结果转换回原始空间
      domain[0] = 10 ** log10Min
      domain[1] = 10 ** log10Max
    } else {
      // 对于其他底数，在对数空间中进行nice操作
      const logDomain = domain.map((d) => log(d, base))
      const [newLogDomain0, newLogDomain1] = nice(logDomain, {
        floor: Math.floor,
        ceil: Math.ceil
      })

      // 将对数空间的结果转换回原始空间
      domain[0] = base ** newLogDomain0
      domain[1] = base ** newLogDomain1
    }

    // 更新mappedDomain为元组类型
    const newMappedDomain: [number, number] = [transform(domain[0]), transform(domain[1])]
    linear = createLinear(newMappedDomain, range, interpolate)
  }

  return scale
}
