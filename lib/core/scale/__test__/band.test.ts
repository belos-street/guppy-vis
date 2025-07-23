import { describe, test, expect } from 'vitest'
import { createBand } from '../src/band'

describe('createBand', () => {
  test('should create a band scale with default padding', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const scale = createBand({ domain, range })

    // 测试映射函数
    expect(scale('A')).toBe(0)
    expect(scale('B')).toBe(100)
    expect(scale('C')).toBe(200)

    // 测试bandWidth和step方法
    expect(scale.bandWidth()).toBe(100)
    expect(scale.step()).toBe(100)
  })

  test('should create a band scale with padding', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const padding = 0.2
    const scale = createBand({ domain, range, padding })

    // 计算step: (300 - 0) / (0.2 * 2 + 3 - 0.2) = 300 / 3.2 = 93.75
    // 计算bandWidth: step * (1 - padding) = 93.75 * 0.8 = 75
    expect(scale.step()).toBeCloseTo(93.75, 2)
    expect(scale.bandWidth()).toBeCloseTo(75, 2)

    // 测试映射函数，带有padding的情况下，起始位置会有偏移
    // r0 + margin * step = 0 + 0.2 * 93.75 = 18.75
    // r0 + margin * step + step = 0 + 0.2 * 93.75 + 93.75 = 112.5
    // r0 + margin * step + 2 * step = 0 + 0.2 * 93.75 + 2 * 93.75 = 206.25
    expect(scale('A')).toBeCloseTo(18.75, 2)
    expect(scale('B')).toBeCloseTo(112.5, 2)
    expect(scale('C')).toBeCloseTo(206.25, 2)
  })

  test('should create a band scale with different margin and padding', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const padding = 0.1
    const margin = 0.2
    const scale = createBand({ domain, range, padding, margin })

    // 计算step: (300 - 0) / (0.2 * 2 + 3 - 0.1) = 300 / 3.3 ≈ 90.91
    // 计算bandWidth: step * (1 - padding) = 90.91 * 0.9 ≈ 81.82
    expect(scale.step()).toBeCloseTo(90.91, 2)
    expect(scale.bandWidth()).toBeCloseTo(81.82, 2)

    // 测试映射函数
    // r0 + margin * step = 0 + 0.2 * 90.91 ≈ 18.18
    // r0 + margin * step + step = 0 + 0.2 * 90.91 + 90.91 ≈ 109.09
    // r0 + margin * step + 2 * step = 0 + 0.2 * 90.91 + 2 * 90.91 ≈ 200
    expect(scale('A')).toBeCloseTo(18.18, 2)
    expect(scale('B')).toBeCloseTo(109.09, 2)
    expect(scale('C')).toBeCloseTo(200, 2)
  })

  test('should handle unknown domain values', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const scale = createBand({ domain, range })

    // 未知值应该返回range的第一个值
    expect(scale('D')).toBe(0)
    expect(scale('E')).toBe(0)
  })
})
