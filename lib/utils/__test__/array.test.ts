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

  describe('bisect', () => {
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

    it('should work with custom search range', () => {
      const sortedArray = [1, 3, 5, 7, 9, 11, 13]
      
      // 测试自定义搜索范围
      expect(bisect(sortedArray, 6, 2, 5)).toBe(3) // 在索引2-5范围内查找
      expect(bisect(sortedArray, 4, 1, 4)).toBe(2) // 在索引1-4范围内查找
    })

    it('should work with accessor function for complex objects', () => {
      const objectArray = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 30 },
        { id: 4, value: 40 },
        { id: 5, value: 50 }
      ]
      
      const valueExtractor = (item: { value: number }) => item.value
      
      // 测试使用访问器函数
      expect(bisect(objectArray, 15, 0, objectArray.length, valueExtractor)).toBe(1)
      expect(bisect(objectArray, 25, 0, objectArray.length, valueExtractor)).toBe(2)
      expect(bisect(objectArray, 35, 0, objectArray.length, valueExtractor)).toBe(3)
      expect(bisect(objectArray, 45, 0, objectArray.length, valueExtractor)).toBe(4)
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

    it('should handle edge cases with search boundaries', () => {
      const sortedArray = [1, 3, 5, 7, 9]
      
      // 测试边界情况
      expect(bisect(sortedArray, 4, 0, 0)).toBe(0) // 空搜索范围
      expect(bisect(sortedArray, 4, 2, 2)).toBe(2) // 单点搜索范围
      expect(bisect(sortedArray, 4, 1, 3)).toBe(2) // 部分搜索范围
    })
  })
})
