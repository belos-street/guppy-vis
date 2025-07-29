import { createThreshold } from './threshold'

/**
 * Quantile比例尺模块
 *
 * 和Quantize比例尺不同，Quantile比例尺采用了基于数据频率的分割策略：
 * 它根据数据出现的频率将数据分组，使得每个区间包含大致相等数量的数据点。
 * 这种比例尺特别适用于需要按百分位数或分位数划分数据的场景，如统计分析和数据可视化。
 */

/**
 * Quantile比例尺的配置类型
 */
export type Quantile<T> = {
  /**
   * 定义域，必须是数字数组
   * 这些数值将根据其分布被分成几个等频率的区间
   */
  domain: number[]
  /**
   * 值域，可以是任意类型的数组
   * 长度应该至少为2，因为n个区间需要n+1个值
   */
  range: T[]
}

/**
 * 创建Quantile比例尺，它根据数据分布将定义域划分为等频率的区间
 *
 * Quantile比例尺与Quantize比例尺的主要区别在于：
 * - Quantize比例尺将定义域按值的范围等分
 * - Quantile比例尺将定义域按数据频率等分（即每个区间包含相近数量的数据点）
 *
 * @param options Quantile比例尺配置选项
 * @param options.domain 定义域，必须是数字数组，这些数值将根据其分布被分成几个等频率的区间
 * @param options.range 值域，可以是任意类型的数组，长度应该至少为2（n+1个值对应n个区间）
 * @returns 返回一个函数，该函数接受一个数值参数，返回对应的值域值
 *
 * @example
 * // 创建一个将数据分为3个等频率区间的比例尺
 * const scale = createQuantile({
 *   domain: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
 *   range: ['small', 'medium', 'large', 'xlarge']
 * })
 *
 * scale(2) // 返回 'small'
 * scale(5) // 返回 'medium'
 * scale(8) // 返回 'large'
 */

/**
 * 创建Quantile比例尺的工厂函数
 */
export function createQuantile<T>({ domain, range }: Quantile<T>) {
  const intervalCount = range.length - 1 // 计算区间数量（值域长度减1）
  const sortedDomain = domain.slice().sort((a, b) => a - b) // 对定义域进行排序，确保数据有序
  const quantileStep = (sortedDomain.length - 1) / (intervalCount + 1) // 计算每个区间的步长，用于确定分位点

  // 计算分位点的值，作为阈值比例尺的定义域
  const quantileDomain = new Array(intervalCount).fill(0).map((_, index) => {
    // 计算当前分位点的位置
    const position = (index + 1) * quantileStep
    // 获取位置的整数部分（下界索引）
    const lowerIndex = Math.floor(position)
    // 获取位置的上界索引
    const upperIndex = lowerIndex + 1
    // 获取下界值
    const lowerValue = sortedDomain[lowerIndex]
    // 获取上界值
    const upperValue = sortedDomain[upperIndex]
    // 线性插值计算分位点的精确值
    return lowerValue * (upperIndex - position) + upperValue * (position - lowerIndex)
  })
  return createThreshold({
    domain: quantileDomain,
    range
  })
}
