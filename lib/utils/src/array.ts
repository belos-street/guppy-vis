// 数组操作的工具函数，主要用于数据处理、统计计算和可视化相关的操作

/**
 * 根据指定的键函数将数组元素分组, 用于数据分类和聚合
 * @param array 待分组的数组
 * @param keyFn 用于分组的键函数, 接受数组元素并返回分组的键值
 * @returns 分组后的 Map, 键为分组的键值, 值为分组的数组
 * @example
 * group([1, 2, 3, 4, 5], (d) => d % 2 === 0 ? 'even' : 'odd')
 * Map { 'even' => [2, 4], 'odd' => [1, 3, 5] }
 */
export function group<T>(array: T[], keyFn?: (item: T) => string): Map<string, T[]> {
  const keyGroups = new Map<string, T[]>()
  if (!keyFn) keyFn = (d) => d as string
  for (const item of array) {
    const key = keyFn(item)
    const group = keyGroups.get(key)
    if (group) {
      group.push(item)
    } else {
      keyGroups.set(key, [item])
    }
  }
  return keyGroups
}
