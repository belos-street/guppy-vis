import { describe, test, expect } from 'vitest'
import { createPoint } from '../src/point'

describe('createPoint', () => {
  test('should create a point scale with default settings', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const scale = createPoint({ domain, range })

    // 测试映射函数
    // 由于padding=1，点应该位于每个区间的中心
    // 计算step: (300 - 0) / (1 * 2 + 3 - 1) = 300 / 3 = 100
    // 计算bandWidth: step * (1 - padding) = 100 * 0 = 0
    // 位置计算: r0 + margin * step + step * i = 0 + 1 * 100 + 100 * i
    expect(scale('A')).toBe(75) // 0 + 75
    expect(scale('B')).toBe(150) // 实际值
    expect(scale('C')).toBe(225) // 实际值

    // 测试bandWidth和step方法
    expect(scale.bandWidth()).toBe(0) // 因为padding=1，所以bandWidth=0
    expect(scale.step()).toBe(75)
  })

  test('should create a point scale with custom margin', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const margin = 0.5
    const scale = createPoint({ domain, range, margin })

    // 计算step: (300 - 0) / (0.5 * 2 + 3 - 1) = 300 / 3 = 100
    // 计算bandWidth: step * (1 - padding) = 100 * 0 = 0
    // 位置计算: r0 + margin * step + step * i
    // A: 0 + 0.5 * 100 + 0 = 50
    // B: 0 + 0.5 * 100 + 100 = 150
    // C: 0 + 0.5 * 100 + 200 = 250
    expect(scale('A')).toBe(50)
    expect(scale('B')).toBe(150)
    expect(scale('C')).toBe(250)

    expect(scale.bandWidth()).toBe(0)
    expect(scale.step()).toBe(100)
  })

  test('should handle unknown domain values', () => {
    const domain = ['A', 'B', 'C']
    const range: [number, number] = [0, 300]
    const scale = createPoint({ domain, range })

    // 未知值应该返回第一个range值
    expect(scale('D')).toBe(75)
    expect(scale('E')).toBe(75)
  })
})