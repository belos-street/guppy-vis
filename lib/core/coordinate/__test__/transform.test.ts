import { transpose, translate, scale, reflect, reflectX, reflectY, polar } from '../src/transform'
import { describe, test, expect } from 'vitest'

describe('坐标变换函数测试', () => {
  // 测试转置函数
  describe('transpose', () => {
    test('应该交换 x 和 y 坐标', () => {
      const transposeFn = transpose()
      expect(transposeFn([3, 4])).toEqual([4, 3])
      expect(transposeFn([-2, 5])).toEqual([5, -2])
    })

    test('应该有正确的类型标识', () => {
      const transposeFn = transpose()
      expect(transposeFn.type()).toBe('transpose')
    })
  })

  // 测试平移函数
  describe('translate', () => {
    test('应该按指定的距离平移坐标', () => {
      const translateFn = translate(10, 5)
      expect(translateFn([0, 0])).toEqual([10, 5])
      expect(translateFn([3, 4])).toEqual([13, 9])
    })

    test('使用默认参数时应该不改变坐标', () => {
      const translateFn = translate()
      expect(translateFn([3, 4])).toEqual([3, 4])
    })

    test('应该有正确的类型标识', () => {
      const translateFn = translate(10, 5)
      expect(translateFn.type()).toBe('translate')
    })
  })

  // 测试缩放函数
  describe('scale', () => {
    test('应该按指定的比例缩放坐标', () => {
      const scaleFn = scale(2, 3)
      expect(scaleFn([3, 4])).toEqual([6, 12])
      expect(scaleFn([-2, 5])).toEqual([-4, 15])
    })

    test('使用默认参数时应该不改变坐标', () => {
      const scaleFn = scale()
      expect(scaleFn([3, 4])).toEqual([3, 4])
    })

    test('应该有正确的类型标识', () => {
      const scaleFn = scale(2, 3)
      expect(scaleFn.type()).toBe('scale')
    })
  })

  // 测试关于原点的反射函数
  describe('reflect', () => {
    test('应该关于原点反射坐标', () => {
      const reflectFn = reflect()
      expect(reflectFn([3, 4])).toEqual([-3, -4])
      expect(reflectFn([-2, 5])).toEqual([2, -5])
    })

    test('应该有正确的类型标识', () => {
      const reflectFn = reflect()
      expect(reflectFn.type()).toBe('reflect')
    })
  })

  // 测试关于y轴的反射函数
  describe('reflectX', () => {
    test('应该关于y轴反射坐标', () => {
      const reflectXFn = reflectX()
      expect(reflectXFn([3, 4])).toEqual([-3, 4])
      expect(reflectXFn([-2, 5])).toEqual([2, 5])
    })

    test('应该有正确的类型标识', () => {
      const reflectXFn = reflectX()
      expect(reflectXFn.type()).toBe('reflectX')
    })
  })

  // 测试关于x轴的反射函数
  describe('reflectY', () => {
    test('应该关于x轴反射坐标', () => {
      const reflectYFn = reflectY()
      expect(reflectYFn([3, 4])).toEqual([3, -4])
      expect(reflectYFn([-2, 5])).toEqual([-2, -5])
    })

    test('应该有正确的类型标识', () => {
      const reflectYFn = reflectY()
      expect(reflectYFn.type()).toBe('reflectY')
    })
  })

  // 测试极坐标到笛卡尔坐标的变换函数
  describe('polar', () => {
    test('应该将极坐标转换为笛卡尔坐标', () => {
      const polarFn = polar()
      
      // 测试角度为0，半径为1的点 (应该是 [1, 0])
      const result1 = polarFn([0, 1])
      expect(result1[0]).toBeCloseTo(1)
      expect(result1[1]).toBeCloseTo(0)
      
      // 测试角度为90度（π/2），半径为1的点 (应该是 [0, 1])
      const result2 = polarFn([Math.PI / 2, 1])
      expect(result2[0]).toBeCloseTo(0)
      expect(result2[1]).toBeCloseTo(1)
      
      // 测试角度为45度（π/4），半径为Math.sqrt(2)的点 (应该是 [1, 1])
      const result3 = polarFn([Math.PI / 4, Math.sqrt(2)])
      expect(result3[0]).toBeCloseTo(1)
      expect(result3[1]).toBeCloseTo(1)
    })

    test('应该有正确的类型标识', () => {
      const polarFn = polar()
      expect(polarFn.type()).toBe('polar')
    })
  })
})
