import { describe, expect, it } from 'vitest'
import { normalize } from '../src/linear/src/helper'
import { interpolateNumber, interpolateColor } from '../src/linear/src/interpolate'
import { createLinear } from '../src/linear'

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

  it('createLinear 创建线性数字比例尺', () => {
    const scale = createLinear([0, 1], [0, 10])
    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(5)
    expect(scale(0.6)).toBe(6)
    expect(scale(1)).toBe(10)
  })

  // it('createLinear 创建线性颜色比例尺', () => {
  //   const scale = createLinear([0, 1], [[255, 0, 0], [0, 0, 255]],interpolateColor)
  //   expect(scale(0)).toBe('#ff0000')
  //   expect(scale(0.5)).toBe('#7f007f')
  //   expect(scale(1)).toBe('#0000ff')
  // })
})
