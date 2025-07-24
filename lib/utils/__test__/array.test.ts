import { describe, expect, it } from 'vitest'
import { group, bisect } from '../src/array'

describe('utils/array', () => {
  it('group', () => {
    const array = [1, 2, 3, 4, 5]
    const key = (d: number) => (d % 2 === 0 ? 'even' : 'odd')
    const result = group(array, key)
    expect(result).toEqual(
      new Map([
        ['even', [2, 4]],
        ['odd', [1, 3, 5]]
      ])
    )
  })

  it('should find correct insertion position in sorted number array', () => {
    const sortedArray = [1, 3, 5, 7, 9]

    // 测试插入位置
    expect(bisect(sortedArray, 0)).toBe(0) // 小于所有元素
    expect(bisect(sortedArray, 2)).toBe(1) // 在1和3之间
    expect(bisect(sortedArray, 4)).toBe(2) // 在3和5之间
    expect(bisect(sortedArray, 6)).toBe(3) // 在5和7之间
    expect(bisect(sortedArray, 8)).toBe(4) // 在7和9之间
    expect(bisect(sortedArray, 10)).toBe(5) // 大于所有元素
  })

  it('should handle exact matches correctly', () => {
    const sortedArray = [1, 3, 5, 7, 9]

    // 测试精确匹配
    expect(bisect(sortedArray, 1)).toBe(0) // 匹配第一个元素
    expect(bisect(sortedArray, 3)).toBe(1) // 匹配第二个元素
    expect(bisect(sortedArray, 5)).toBe(2) // 匹配中间元素
    expect(bisect(sortedArray, 7)).toBe(3) // 匹配倒数第二个元素
    expect(bisect(sortedArray, 9)).toBe(4) // 匹配最后一个元素
  })

  it('should work with duplicate values', () => {
    const sortedArray = [1, 3, 3, 3, 5, 7, 7, 9]

    // 测试重复值的处理
    expect(bisect(sortedArray, 3)).toBe(1) // 返回第一个匹配位置
    expect(bisect(sortedArray, 7)).toBe(5) // 返回第一个匹配位置
  })





  it('should handle empty array', () => {
    const emptyArray: number[] = []

    // 测试空数组
    expect(bisect(emptyArray, 5)).toBe(0)
  })

  it('should handle single element array', () => {
    const singleArray = [5]

    // 测试单元素数组
    expect(bisect(singleArray, 3)).toBe(0) // 小于唯一元素
    expect(bisect(singleArray, 5)).toBe(0) // 等于唯一元素
    expect(bisect(singleArray, 7)).toBe(1) // 大于唯一元素
  })

  it('should work with string arrays', () => {
    const stringArray = ['apple', 'banana', 'cherry', 'date', 'elderberry']

    // 测试字符串数组
    expect(bisect(stringArray, 'avocado')).toBe(1)
    expect(bisect(stringArray, 'coconut')).toBe(3)
    expect(bisect(stringArray, 'fig')).toBe(5)
  })

  it('should work with simplified bisect function', () => {
    const sortedArray = [10, 20, 30, 40, 50]

    // 测试简化后的 bisect 函数
    expect(bisect(sortedArray, 5)).toBe(0)  // 小于所有元素
    expect(bisect(sortedArray, 15)).toBe(1) // 在10和20之间
    expect(bisect(sortedArray, 20)).toBe(1) // 等于数组中的元素
    expect(bisect(sortedArray, 35)).toBe(3) // 在30和40之间
    expect(bisect(sortedArray, 60)).toBe(5) // 大于所有元素
  })


})
