import { createThreshold } from './threshold'

type Quantize<T> = {
  domain: [number, number]
  range: T[]
}

/**
 * 创建Quantize比例尺，它将连续的定义域等分成n段，其中n是值域的长度减1
 * @param domain 定义域，必须是一个包含两个数字的数组 [最小值, 最大值]
 * @param range 值域，可以是任意类型的数组
 * @returns 量化比例尺
 */
export function createQuantize<T>({ domain: [d0, d1], range }: Quantize<T>) {
  const segmentCount = range.length - 1 // 将定义域分割的段数，等于值域长度减1
  const step = (d1 - d0) / (segmentCount + 1) // 每段的步长，用于计算阈值
  const quantizeDomain = new Array(segmentCount).fill(0).map((_, i) => d0 + step * (i + 1)) // 生成阈值数组
  return createThreshold({ domain: quantizeDomain, range })
}
