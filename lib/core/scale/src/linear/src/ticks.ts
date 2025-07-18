import { round } from 'lib/utils'

const thresholdFactor10 = Math.sqrt(50) // 大约 7.07，接近 10 的调整阈值
const thresholdFactor5 = Math.sqrt(10) // 大约 3.16，接近 5 的调整阈值
const thresholdFactor2 = Math.sqrt(2) // 大约 1.41，接近 2 的调整阈值
/**
 * 计算刻度步长，这个算法的目的是为图表生成"美观"的刻度值，使它们更易于人类阅读和理解。
 * @param minValue 定义域的最小值
 * @param maxValue 定义域的最大值
 * @param tickCount 期望的坐标刻度数量
 * @returns 优化后的刻度步长
 */
export function tickStep(minValue: number, maxValue: number, tickCount: number) {
  // 如果刻度数小于等于0，返回默认步长1，避免除以0导致Infinity
  if (tickCount <= 0) return 1

  const rawStep = Math.abs(maxValue - minValue) / tickCount // 计算原始步长（范围长度除以刻度数量）
  let niceStep = 10 ** Math.floor(Math.log(rawStep) / Math.LN10) // 将步长取整到最接近的10的幂（如1, 10, 100等）
  const stepRatio = rawStep / niceStep // 计算原始步长与取整步长的比值

  if (stepRatio >= thresholdFactor10) niceStep *= 10 // 如果比值大于√50，步长调整为10的倍数
  else if (stepRatio >= thresholdFactor5) niceStep *= 5 // 如果比值大于√10，步长调整为5的倍数
  else if (stepRatio >= thresholdFactor2) niceStep *= 2 // 如果比值大于√2，步长调整为2的倍数

  return niceStep
}

/**
 * 生成美观且易读的刻度值数组
 * @param minValue 定义域的最小值
 * @param maxValue 定义域的最大值
 * @param count 期望的坐标刻度数量
 * @returns 优化后的刻度值数组
 *
 * @link https://github.com/d3/d3-array/blob/main/src/ticks.js
 */
export function ticks(minValue: number, maxValue: number, count: number) {
  if (count <= 0) return [] // 处理边界情况：如果刻度数小于等于0，返回空数组
  if (minValue === maxValue) return [minValue] // 处理边界情况：如果最小值等于最大值，直接返回单值数组
  const step = tickStep(minValue, maxValue, count) // 计算优化后的刻度步长
  const start = Math.ceil(minValue / step) // 计算起始刻度的索引（向上取整确保不小于最小值）
  const stop = Math.floor(maxValue / step) // 计算结束刻度的索引（向下取整确保不大于最大值）
  const tickCount = Math.ceil(stop - start + 1) // 计算需要生成的刻度数量
  const tickValues = new Array<number>(tickCount) // 创建存储刻度值的数组
  for (let i = 0; i < tickCount; i++) {
    tickValues[i] = round((start + i) * step) // 计算每个刻度值并进行四舍五入
  }
  return tickValues // 返回生成的刻度数组
}
