import { describe, expect, it } from 'vitest'
import { createQuantize } from '../src/quantize'

describe('scale/quantize', () => {
  it('should create a quantize scale with correct domain and range mapping', () => {
    const domain: [number, number] = [0, 100]
    const range = ['a', 'b', 'c', 'd']
    const scale = createQuantize({ domain, range })

    // 测试边界值和中间值的映射
    expect(scale(-10)).toBe('a') // 小于定义域最小值
    expect(scale(0)).toBe('a') // 定义域最小值
    expect(scale(20)).toBe('a') // 小于第一个阈值
    expect(scale(25)).toBe('a') // 大于第一个阈值
    expect(scale(50)).toBe('b') // 小于第二个阈值
    expect(scale(51)).toBe('c') // 大于第二个阈值
    expect(scale(75)).toBe('c') // 小于第三个阈值
    expect(scale(76)).toBe('d') // 大于第三个阈值
    expect(scale(100)).toBe('d') // 定义域最大值
    expect(scale(110)).toBe('d') // 大于定义域最大值
  })

  it('should correctly calculate thresholds', () => {
    const domain: [number, number] = [0, 90]
    const range = ['a', 'b', 'c']
    const scale = createQuantize({ domain, range })

    // 计算阈值：
    // n = range.length - 1 = 2
    // step = (90 - 0) / (2 + 1) = 30
    // thresholds = [0 + 30, 0 + 60] = [30, 60]
    const thresholds = scale.thresholds()
    expect(thresholds).toHaveLength(2)
    expect(thresholds[0]).toBe(30)
    expect(thresholds[1]).toBe(60)
  })

  it('should handle numeric ranges', () => {
    const domain: [number, number] = [0, 100]
    const range = [0, 25, 50, 75, 100]
    const scale = createQuantize({ domain, range })

    // 测试数值范围
    expect(scale(0)).toBe(0)
    expect(scale(20)).toBe(0)
    expect(scale(25)).toBe(25)
    expect(scale(40)).toBe(25)
    expect(scale(50)).toBe(50)
    expect(scale(60)).toBe(50)
    expect(scale(75)).toBe(75)
    expect(scale(80)).toBe(75)
    expect(scale(100)).toBe(100)
  })

  it('should handle edge cases', () => {
    // 测试值域只有两个元素的情况
    const scale2 = createQuantize({ domain: [0, 100], range: ['a', 'b'] })
    expect(scale2(0)).toBe('a')
    expect(scale2(50)).toBe('a')
    expect(scale2(51)).toBe('b')
    expect(scale2(100)).toBe('b')
  })
})
