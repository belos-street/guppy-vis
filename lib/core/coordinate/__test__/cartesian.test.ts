import { cartesian } from '../src/cartesian'
import type { CanvasOptions, Point, Transformer } from '../type'
import { describe, test, expect } from 'vitest'

describe('cartesian', () => {
  test('应该返回正确的变换函数数组', () => {
    const canvasOptions: CanvasOptions = {
      x: 50,
      y: 50,
      width: 400,
      height: 300
    }

    const transformers = cartesian(canvasOptions) as unknown as Transformer[]

    // 验证返回了两个变换函数
    expect(transformers).toHaveLength(2)

    // 验证第一个是缩放函数
    expect(transformers[0].type()).toBe('scale')

    // 验证第二个是平移函数
    expect(transformers[1].type()).toBe('translate')
  })

  test('应该正确地变换坐标点', () => {
    const canvasOptions: CanvasOptions = {
      x: 50,
      y: 30,
      width: 400,
      height: 300
    }

    const transformers = cartesian(canvasOptions) as unknown as Transformer[]

    // 创建一个测试点
    const point: Point = [0.5, 0.5] // 归一化坐标

    // 应用缩放变换
    const scaledPoint = transformers[0](point)
    expect(scaledPoint).toEqual([0.5 * 400, 0.5 * 300])

    // 应用平移变换
    const translatedPoint = transformers[1](scaledPoint)
    expect(translatedPoint).toEqual([0.5 * 400 + 50, 0.5 * 300 + 30])
  })

  test('应该支持柯里化调用', () => {
    // 创建完整的画布选项
    const fullOptions: CanvasOptions = {
      x: 50,
      y: 30,
      width: 400,
      height: 300
    }

    // 测试完整调用
    const transformers1 = cartesian(fullOptions) as unknown as Transformer[]
    expect(transformers1).toHaveLength(2)

    // 测试部分应用 - 不传参数，返回原函数
    const partialCartesian = cartesian()
    expect(typeof partialCartesian).toBe('function')

    // 使用部分应用的函数完成调用
    const transformers2 = partialCartesian(fullOptions) as unknown as Transformer[]

    // 验证返回了两个变换函数
    expect(transformers2).toHaveLength(2)

    // 验证第一个是缩放函数
    expect(transformers2[0].type()).toBe('scale')

    // 验证第二个是平移函数
    expect(transformers2[1].type()).toBe('translate')

    // 测试变换效果
    const point: Point = [0.5, 0.5]
    const scaledPoint = transformers2[0](point)
    expect(scaledPoint).toEqual([0.5 * 400, 0.5 * 300])

    const translatedPoint = transformers2[1](scaledPoint)
    expect(translatedPoint).toEqual([0.5 * 400 + 50, 0.5 * 300 + 30])
  })

  test('应该处理负值和零值', () => {
    const canvasOptions: CanvasOptions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }

    const transformers = cartesian(canvasOptions) as unknown as Transformer[]
    const point: Point = [10, 10]

    // 缩放为零
    const scaledPoint = transformers[0](point)
    expect(scaledPoint).toEqual([0, 0])

    // 平移为零
    const translatedPoint = transformers[1](scaledPoint)
    expect(translatedPoint).toEqual([0, 0])

    // 负值测试
    const negativeOptions: CanvasOptions = {
      x: -10,
      y: -20,
      width: -100,
      height: -200
    }

    const negativeTransformers = cartesian(negativeOptions) as unknown as Transformer[]
    const testPoint: Point = [2, 3]

    // 负缩放
    const negativeScaledPoint = negativeTransformers[0](testPoint)
    expect(negativeScaledPoint).toEqual([-200, -600])

    // 负平移
    const negativeTranslatedPoint = negativeTransformers[1](negativeScaledPoint)
    expect(negativeTranslatedPoint).toEqual([-210, -620])
  })
})
