import { describe, expect, it } from 'vitest'
import { hexToRgb, rgbToHex } from '../src/color'

describe('utils/color', () => {
  it('hexToRgb 应该正确将16进制颜色转换为RGB数组', () => {
    expect(hexToRgb('#ff0000')).toEqual([255, 0, 0])
    expect(hexToRgb('#00ff00')).toEqual([0, 255, 0])
    expect(hexToRgb('#0000ff')).toEqual([0, 0, 255])
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
    expect(hexToRgb('#123456')).toEqual([18, 52, 86])
  })

  it('rgbToHex 应该正确将RGB值转换为16进制颜色字符串', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(18, 52, 86)).toBe('#123456')
  })
})
