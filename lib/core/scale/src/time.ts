import { createLinear } from './linear'
import type { RGBColor } from './linear/src/interpolate'

type TimeProps<T extends number | RGBColor, U> = {
  domain: [Date, Date]
  range: [T, T]
  interpolate?: (ratio: number, start: T, stop: T) => U
}
/**
 * 时间比例尺
 * @param domain 定义域
 * @param range 值域
 * @param interpolate 插值函数
 * @returns 时间比例尺
 */
export function createTime<T extends number | RGBColor, U>({ domain, range, interpolate }: TimeProps<T, U>) {
  const transform = (x: Date) => x.getTime()
  const transformedDomain = domain.map(transform) as [number, number]

  const { scale, ticks, nice } = createLinear(transformedDomain, range, interpolate)

  return {
    scale: (x: Date) => scale(transform(x)),
    ticks: (tickCount: number) => ticks(tickCount).map((x) => new Date(x)),
    nice
  }
}
