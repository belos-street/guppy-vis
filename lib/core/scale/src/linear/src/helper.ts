/**
 * 归一化值到指定范围 ，它的作用是将一个数值从原始范围映射到0到1之间的 比例值
 * @param value 要归一化的值
 * @param start 原始范围的最小值
 * @param stop 原始范围的最大值
 * @returns 归一化后的值
 *
 * @example
 * normalize(5, 0, 10) // 0.5
 */
export function normalize(value: number, start: number, stop: number) {
  return (value - start) / (stop - start)
}
