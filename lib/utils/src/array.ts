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

/**
 * 二分查找算法 - 在有序数组中高效定位插入位置
 *
 * 这是一个经典的二分查找实现，专门用于在已排序的数组中找到目标值的正确插入位置，
 * 以保持数组的有序性。算法时间复杂度为 O(log n)，适用于大规模数据的快速查找。
 *
 * @param sortedArray 已按升序排列的数组，必须保证有序性
 * @param targetValue 需要查找插入位置的目标值
 * @returns 目标值应该插入的位置索引，插入后数组仍保持有序s
 *
 * @example
 * //在数字数组中查找插入位置
 * const numbers = [1, 3, 5, 7, 9]
 * const insertIndex = bisect(numbers, 4)
 * console.log(insertIndex) // 输出: 2，表示4应该插入到索引2的位置
 */
export function bisect<T>(sortedArray: T[], targetValue: T): number {
  // 初始化搜索边界
  let leftBoundary = 0
  let rightBoundary = sortedArray.length

  // 二分查找主循环：当搜索范围存在时继续
  while (leftBoundary < rightBoundary) {
    // 计算中点索引，使用无符号右移避免整数溢出
    const middleIndex = (leftBoundary + rightBoundary) >>> 1

    // 获取中点元素的值
    const middleValue = sortedArray[middleIndex]

    // 根据比较结果调整搜索范围
    if (middleValue < targetValue) {
      leftBoundary = middleIndex + 1 // 中点值小于目标值，搜索右半部分
    } else {
      rightBoundary = middleIndex // 中点值大于等于目标值，搜索左半部分（包含中点）
    }
  }

  return leftBoundary // 返回插入位置：此时 leftBoundary === rightBoundary
}
