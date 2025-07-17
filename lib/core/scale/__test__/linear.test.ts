import { describe, expect, it } from 'vitest'
import { normalize } from '../src/linear/src/helper'
import { interpolateNumber, interpolateColor } from '../src/linear/src/interpolate'
import { createLinear } from '../src/linear'
import { tickStep, ticks } from '../src/linear/src/ticks'

describe('scale/linear', () => {
  it('helper/normalize 应该正确归一化值', () => {
    expect(normalize(5, 0, 10)).toBe(0.5)
    expect(normalize(0, 0, 10)).toBe(0)
    expect(normalize(10, 0, 10)).toBe(1)
    expect(normalize(2, 0, 4)).toBe(0.5)
    expect(normalize(-5, -10, 0)).toBe(0.5)
  })

  it('interpolateNumber 应该正确插值数字', () => {
    expect(interpolateNumber(0, 0, 10)).toBe(0)
    expect(interpolateNumber(1, 0, 10)).toBe(10)
    expect(interpolateNumber(0.5, 0, 10)).toBe(5)
    expect(interpolateNumber(0.5, -10, 10)).toBe(0)
    expect(interpolateNumber(0.25, 0, 100)).toBe(25)
    expect(interpolateNumber(0.3, 0, 3)).toBeCloseTo(0.9)
    expect(interpolateNumber(0.3, 1, 3)).toBeCloseTo(1.6)
  })

  it('interpolateColor 应该正确插值颜色', () => {
    expect(interpolateColor(0, [255, 0, 0], [0, 0, 255])).toBe('#ff0000')
    expect(interpolateColor(1, [255, 0, 0], [0, 0, 255])).toBe('#0000ff')
    expect(interpolateColor(0.5, [255, 0, 0], [0, 0, 255])).toBe('#7f007f')
    expect(interpolateColor(0.5, [0, 0, 0], [255, 255, 255])).toBe('#7f7f7f')
  })

  it('tickStep 应该正确计算刻度步长', () => {
    // 测试不同刻度数量下的步长计算
    expect(tickStep(0, 10, 1)).toBe(10) // 只有一个刻度时，步长应为整个范围
    expect(tickStep(0, 10, 2)).toBe(5) // 两个刻度时，步长应为5
    expect(tickStep(0, 10, 5)).toBe(2) // 五个刻度时，步长应为2
    expect(tickStep(0, 10, 10)).toBe(1) // 十个刻度时，步长应为1

    // 测试不同数据范围的步长计算
    expect(tickStep(0, 100, 5)).toBe(20) // 0-100范围，5个刻度
    expect(tickStep(0, 1, 5)).toBe(0.2) // 0-1范围，5个刻度
    expect(tickStep(-10, 10, 4)).toBe(5) // -10到10范围，4个刻度

    // 测试小数范围的步长计算
    expect(tickStep(0, 0.1, 5)).toBe(0.02) // 0-0.1范围，5个刻度
    expect(tickStep(0.1, 0.9, 4)).toBe(0.2) // 0.1-0.9范围，4个刻度
  })

  it('ticks 应该正确计算刻度', () => {
    // 测试基本刻度生成
    expect(ticks(0, 10, 5)).toEqual([0, 2, 4, 6, 8, 10]) // 0-10范围，步长为2的刻度
    expect(ticks(0, 5, 6)).toEqual([0, 1, 2, 3, 4, 5]) // 0-5范围，步长为1的刻度

    // 测试负数范围的刻度生成
    expect(ticks(-10, 10, 5)).toEqual([-10, -5, 0, 5, 10]) // -10到10范围，步长为5的刻度

    // 测试小数范围的刻度生成
    expect(ticks(0, 1, 5)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]) // 0-1范围，步长为0.2的刻度

    // 测试边界情况
    expect(ticks(5, 5, 5)).toEqual([5]) // 最小值等于最大值时，应返回单值数组
    expect(ticks(0, 10, 0)).toEqual([]) // 刻度数为0时，应返回空数组

    // 测试大范围数据
    expect(ticks(0, 1000, 5)).toEqual([0, 200, 400, 600, 800, 1000]) // 0-1000范围，步长为200的刻度
  })

  it('createLinear 创建线性数字比例尺', () => {
    const { scale, ticks } = createLinear([0, 1], [0, 10])
    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(5)
    expect(scale(0.6)).toBe(6)
    expect(scale(1)).toBe(10)

    expect(ticks(5)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    expect(ticks(10)).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
  })

  it('createLinear 增强定义域可读性', () => {
    const { ticks, nice, scale } = createLinear([0.1, 9.9], [0, 100])
    expect(ticks(6)).toEqual([2, 4, 6, 8])

    nice(6) // 定义域变成了[0, 10]
    expect(ticks(6)).toEqual([0, 2, 4, 6, 8, 10])

    expect(scale(0.1)).toBe(1)
    expect(scale(9.9)).toBe(99)
  })

  // it('createLinear 创建线性颜色比例尺', () => {
  //   const { scale } = createLinear(
  //     [0, 1],
  //     [
  //       [255, 0, 0],
  //       [0, 0, 255]
  //     ],
  //     interpolateColor
  //   )
  //   expect(scale(0)).toBe('#ff0000')
  //   expect(scale(0.5)).toBe('#7f007f')
  //   expect(scale(1)).toBe('#0000ff')
  // })
})
