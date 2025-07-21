import { describe, expect, it } from 'vitest'
import { createOrdinal } from '../src/ordinal'

describe('scale/ordinal', () => {
  it('应该正确处理基本类型', () => {
    const ordinalScale = createOrdinal({
      domain: ['苹果', '香蕉', '橙子'],
      range: ['red', 'yellow', 'orange']
    })

    expect(ordinalScale('苹果')).toBe('red')
    expect(ordinalScale('香蕉')).toBe('yellow')
    expect(ordinalScale('橙子')).toBe('orange')
    // 测试未知值返回第一个range值
    expect(ordinalScale('葡萄')).toBe('red')
  })

  it('应该正确处理复杂对象', () => {
    const domain = [
      { id: 1, name: '苹果' },
      { id: 2, name: '香蕉' },
      { id: 3, name: '橙子' }
    ]
    
    const ordinalScale = createOrdinal({
      domain,
      range: ['red', 'yellow', 'orange']
    })

    // 测试相同结构的新对象实例
    expect(ordinalScale({ id: 1, name: '苹果' })).toBe('red')
    expect(ordinalScale({ id: 2, name: '香蕉' })).toBe('yellow')
    expect(ordinalScale({ id: 3, name: '橙子' })).toBe('orange')
    
    // 测试未知对象返回第一个range值
    expect(ordinalScale({ id: 4, name: '葡萄' })).toBe('red')
  })

  it('应该处理属性顺序不同但内容相同的对象', () => {
    const ordinalScale = createOrdinal({
      domain: [{ a: 1, b: 2 }],
      range: ['red', 'blue']
    })

    // JSON.stringify会保持键的顺序，所以这两个对象应该被视为相同
    expect(ordinalScale({ a: 1, b: 2 })).toBe('red')
    // 属性顺序不同但内容相同的对象
    expect(ordinalScale({ b: 2, a: 1 })).toBe('red')
  })
})