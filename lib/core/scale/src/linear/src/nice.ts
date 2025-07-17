/**
 * 优化定义域
 * 定义域  本身的可读性不是很强，但如果我们能根据刻度间隔去调整定义域的范围，使得最小值和最大值都是刻度间隔的整数倍
 * 比如 [0.1, 9.9] 刻度间隔为 1，优化后为 [0, 10]
 * @param domain 定义域
 * @param interval 刻度间隔
 * @returns 优化后的定义域
 */
type NiceInterval = { floor: (x: number) => number; ceil: (x: number) => number }
export function nice(domain: number[], interval: NiceInterval) {
  const [min, max] = domain
  return [interval.floor(min), interval.ceil(max)]
}
