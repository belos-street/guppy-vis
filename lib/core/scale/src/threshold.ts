import { bisect } from 'lib/utils'

type Threshold<T> = {
  domain: number[]
  range: T[]
}

/**
 * 创建Threshold比例尺，它的定义域是连续的，并且会被指定的分割值分成不同的组，每个组对应一个值域中的值
 * @param domain 定义域
 * @param range 值域
 * @returns 阈值比例尺
 *
 * 定义域（domain）约束
 * 1. 定义域必须是 number[] 类型，即数字数组
 * 2. 定义域数组应该是 有序的 （升序排列），因为内部使用了 bisect 函数进行二分查找
 * 3. 定义域数组表示阈值分割点，用于将连续的输入值分成不同的区间
 *
 * 值域（range）约束
 * 1. 值域可以是任意类型 T 的数组，由泛型参数 T 决定
 * 2. 值域数组的长度应该比定义域数组的长度 多一个 ，这是因为 n 个阈值会将输入空间分成 n+1 个区间
 * 3. 如果值域长度不满足上述条件，函数会通过 rangeIndexLimit 变量进行处理，确保索引不超出范围
 */
export function createThreshold<T>({ domain, range }: Threshold<T>) {
  const rangeIndexLimit = Math.min(domain.length, range.length - 1) // 确保索引不超出范围

  const scale = (value: number) => {
    const index = bisect(domain, value)
    return range[Math.min(index, rangeIndexLimit)]
  }

  scale.thresholds = () => domain
  return scale
}
