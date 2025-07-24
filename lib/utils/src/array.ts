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
 * 恒等函数 - 数据处理中的基础工具函数
 * 用于在不需要数据转换时作为默认的访问器函数
 * @param value 任意类型的输入值
 * @returns 原样返回输入值，保持类型不变
 * @template T 输入值的类型
 */
function identity<T>(value: T): T {
  return value
}

/**
 * 二分查找算法 - 在有序数组中高效定位插入位置
 *
 * 这是一个经典的二分查找实现，专门用于在已排序的数组中找到目标值的正确插入位置，
 * 以保持数组的有序性。算法时间复杂度为 O(log n)，适用于大规模数据的快速查找。
 *
 * 核心原理：
 * 1. 维护左右边界指针，不断缩小搜索范围
 * 2. 通过中点比较，决定搜索左半部分还是右半部分
 * 3. 当左右边界重合时，找到插入位置
 *
 * @param sortedArray 已按升序排列的数组，必须保证有序性
 * @param targetValue 需要查找插入位置的目标值
 * @param searchStart 搜索范围的起始索引（包含），默认从数组开头开始
 * @param searchEnd 搜索范围的结束索引（不包含），默认到数组末尾
 * @param valueExtractor 值提取函数，用于从复杂对象中提取用于比较的值，默认直接返回元素本身
 * @returns 目标值应该插入的位置索引，插入后数组仍保持有序
 *
 * @template T 数组元素的类型
 * @template U 用于比较的值的类型
 *
 * @example
 * // 基础用法：在数字数组中查找插入位置
 * const numbers = [1, 3, 5, 7, 9]
 * const insertIndex = bisect(numbers, 4)
 * console.log(insertIndex) // 输出: 2，表示4应该插入到索引2的位置
 *
 * @example
 * // 复杂对象：使用值提取函数
 * const users = [
 *   { id: 1, age: 20 },
 *   { id: 2, age: 25 },
 *   { id: 3, age: 30 }
 * ]
 * const insertIndex = bisect(users, 27, 0, users.length, user => user.age)
 * console.log(insertIndex) // 输出: 2，表示年龄27的用户应该插入到索引2
 *
 * @example
 * // 指定搜索范围：只在数组的一部分中查找
 * const data = [10, 20, 30, 40, 50]
 * const insertIndex = bisect(data, 25, 1, 4) // 只在索引1-3范围内查找
 * console.log(insertIndex) // 输出: 2
 */
export function bisect<T, U>(
  sortedArray: T[],
  targetValue: U,
  searchStart: number = 0,
  searchEnd: number = sortedArray.length,
  valueExtractor: (item: T) => U = identity as (item: T) => U
): number {
  // 初始化搜索边界
  let leftBoundary = searchStart
  let rightBoundary = searchEnd

  // 二分查找主循环：当搜索范围存在时继续
  while (leftBoundary < rightBoundary) {
    // 计算中点索引，使用无符号右移避免整数溢出
    const middleIndex = (leftBoundary + rightBoundary) >>> 1

    // 提取中点元素的比较值
    const middleValue = valueExtractor(sortedArray[middleIndex])

    // 根据比较结果调整搜索范围
    if (middleValue < targetValue) {
      leftBoundary = middleIndex + 1 // 中点值小于目标值，搜索右半部分
    } else {
      rightBoundary = middleIndex // 中点值大于等于目标值，搜索左半部分（包含中点）
    }
  }

  return leftBoundary // 返回插入位置：此时 leftBoundary === rightBoundary
}
