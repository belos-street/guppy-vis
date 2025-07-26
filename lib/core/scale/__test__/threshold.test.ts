import { describe, expect, it } from 'vitest'
import { createThreshold } from '../src/threshold'

describe('createThreshold', () => {
  it('should return the correct value for a given input', () => {
    const domain = [0, 10, 20]
    const range = ['low', 'medium', 'high', 'very high']
    const scale = createThreshold({ domain, range })

    expect(scale(-5)).toBe('low')
    expect(scale(0)).toBe('low') // value = 0
    expect(scale(5)).toBe('medium') // 0 < value < 10
    expect(scale(10)).toBe('medium') // value = 10
    expect(scale(15)).toBe('high') // 10 < value < 20
    expect(scale(20)).toBe('high') // value = 20
    expect(scale(25)).toBe('very high') // value ≥ 20
  })

  it('should return the correct thresholds', () => {
    const domain = [0, 10, 20]
    const range = ['low', 'medium', 'high', 'very high']
    const scale = createThreshold({ domain, range })

    expect(scale.thresholds()).toEqual(domain)
  })

  it('should handle edge cases with empty domain', () => {
    const domain: number[] = []
    const range = ['single']
    const scale = createThreshold({ domain, range })

    expect(scale(0)).toBe('single')
    expect(scale(100)).toBe('single')
    expect(scale(-100)).toBe('single')
  })

  it('should handle single threshold', () => {
    const domain = [50]
    const range = ['below', 'above']
    const scale = createThreshold({ domain, range })

    expect(scale(49)).toBe('below')
    expect(scale(50)).toBe('below')
    expect(scale(51)).toBe('above')
  })

  it('should handle numeric ranges', () => {
    const domain = [10, 20, 30]
    const range = [1, 2, 3, 4]
    const scale = createThreshold({ domain, range })

    expect(scale(5)).toBe(1)
    expect(scale(10)).toBe(1)
    expect(scale(15)).toBe(2)
    expect(scale(20)).toBe(2)
    expect(scale(25)).toBe(3)
    expect(scale(30)).toBe(3)
    expect(scale(35)).toBe(4)
  })

  it('should handle mismatched domain and range lengths', () => {
    const domain = [10, 20, 30, 40]
    const range = ['a', 'b', 'c']
    const scale = createThreshold({ domain, range })

    // 测试域长度大于范围长度的情况
    // 根据实现，rangeIndexLimit = Math.min(domain.length, range.length - 1) = 2
    // 所以最大只能使用到 range[2]，即 'c'
    expect(scale(5)).toBe('a') // 小于第一个阈值
    expect(scale(10)).toBe('a') // 等于第一个阈值
    expect(scale(15)).toBe('b') // 在第一和第二个阈值之间
    expect(scale(20)).toBe('b') // 等于第二个阈值
    expect(scale(25)).toBe('c') // 在第二和第三个阈值之间
    expect(scale(30)).toBe('c') // 等于第三个阈值

    // 注意：当索引超过 rangeIndexLimit 时，会使用 range[rangeIndexLimit]
    expect(scale(35)).toBe('c') // 在第三和第四个阈值之间
    expect(scale(40)).toBe('c') // 等于第四个阈值
    expect(scale(45)).toBe('c') // 大于所有阈值

    // 验证 thresholds 方法返回完整的 domain
    expect(scale.thresholds()).toEqual(domain)
  })
})
