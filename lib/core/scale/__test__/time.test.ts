import { describe, expect, it } from 'vitest'
import { createTime } from '../src/time'
import { interpolateColor, type RGBColor } from '../src/linear/src/interpolate'

describe('scale/time', () => {
  it('createTime 创建时间数字比例尺', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-12-31')
    const { scale } = createTime({
      domain: [startDate, endDate],
      range: [0, 100]
    })

    // 测试起始点映射
    expect(scale(startDate)).toBe(0)
    expect(scale(endDate)).toBe(100)

    // 测试中间点映射
    const midDate = new Date('2023-07-02') // 大约是一年的中点
    expect(scale(midDate)).toBeCloseTo(50, 0) // 使用toBeCloseTo因为日期计算可能有小误差

    // 测试其他点
    const quarterDate = new Date('2023-04-01') // 大约是一年的四分之一
    expect(scale(quarterDate)).toBeCloseTo(25, 0)
  })

  it('createTime 生成时间刻度', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-12-31')
    const { ticks } = createTime({
      domain: [startDate, endDate],
      range: [0, 100]
    })

    // 测试刻度生成
    const timeTicksCount = 6 // 生成6个刻度
    const timeTicks = ticks(timeTicksCount)

    // 验证刻度数量
    expect(timeTicks.length).toBeGreaterThanOrEqual(timeTicksCount)

    // 验证刻度是Date类型
    timeTicks.forEach((tick) => {
      expect(tick instanceof Date).toBe(true)
    })

    // 验证刻度覆盖了大致的时间范围
    // 注意：ticks函数可能会生成超出原始范围的刻度，以便更好地展示数据
    // 验证第一个和最后一个刻度大致在预期范围内
    const firstTickYear = timeTicks[0].getFullYear()
    const lastTickYear = timeTicks[timeTicks.length - 1].getFullYear()
    expect(firstTickYear).toBe(2023)
    expect(lastTickYear).toBe(2023)
  })

  it('createTime nice功能应该正确调整时间范围', () => {
    const startDate = new Date('2023-01-15') // 不是月初
    const endDate = new Date('2023-11-20') // 不是月末

    const { nice, ticks } = createTime({
      domain: [startDate, endDate],
      range: [0, 100]
    })

    // 调用nice函数调整范围
    nice(6)

    // 获取调整后的刻度
    const adjustedTicks = ticks(6)

    // 验证调整后的范围是否更整齐
    // 第一个刻度应该是某个整月的开始或更早
    const firstTick = adjustedTicks[0]
    expect(firstTick.getDate()).toBeLessThanOrEqual(15) // 应该比原始的15号更早或相等

    // 验证调整后的刻度是否覆盖了原始范围
    // 注意：nice函数可能会将范围调整为更整齐的时间单位，这可能导致最后一个刻度的日期不一定大于原始日期
    // 但应该确保调整后的时间范围至少覆盖了原始范围
    const lastTick = adjustedTicks[adjustedTicks.length - 1]
    const lastTickTime = lastTick.getTime()
    const endDateTime = endDate.getTime()
    expect(lastTickTime).toBeGreaterThanOrEqual(endDateTime)
  })

  it('createTime 创建时间颜色比例尺', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-12-31')

    const { scale } = createTime<RGBColor, string>({
      domain: [startDate, endDate],
      range: [
        [255, 0, 0],
        [0, 0, 255]
      ], // 从红色到蓝色
      interpolate: interpolateColor
    })

    // 测试起始点映射
    expect(scale(startDate)).toBe('#ff0000') // 红色
    expect(scale(endDate)).toBe('#0000ff') // 蓝色

    // 测试中间点映射
    const midDate = new Date('2023-07-02') // 大约是一年的中点
    expect(scale(midDate)).toBe('#7f007f') // 紫色 (红色和蓝色的中间)
  })
})
