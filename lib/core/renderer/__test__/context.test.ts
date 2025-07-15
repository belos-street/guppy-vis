import { describe, test, expect } from 'vitest'
import { createContext, save, restore } from '../src/context'

describe('test core/renderer/context', () => {
  test('createContext', () => {
    const context = createContext('400', '250')
    const { group, node } = context

    // 测试SVG节点属性
    expect(node.getAttribute('width')).toBe('400')
    expect(node.getAttribute('height')).toBe('250')
    expect(node.getAttribute('viewBox')).toBe('0 0 400 250')
    expect(node.tagName).toBe('svg')

    // 测试g节点
    expect(group.tagName).toBe('g')

    // 测试node是否为group的父级
    expect(group.parentNode).toBe(node)
  })

  test('save should create a new group and update context', () => {
    const context = createContext('400', '250')
    const originalGroup = context.group

    // 保存上下文
    save(context)

    // 测试新的group是否已创建并更新到context
    expect(context.group).not.toBe(originalGroup)
    expect(context.group.tagName).toBe('g')

    // 测试新的group是否已挂载到原来的group下
    expect(context.group.parentNode).toBe(originalGroup)
  })

  test('restore should revert to the previous group', () => {
    const context = createContext('400', '250')
    const originalGroup = context.group

    // 保存上下文
    save(context)
    const newGroup = context.group

    // 恢复上下文
    restore(context)

    // 测试group是否已恢复到原来的group
    expect(context.group).toBe(originalGroup)
    expect(context.group).not.toBe(newGroup)
  })

  test('save and restore should work with multiple levels', () => {
    const context = createContext('400', '250')
    const level0Group = context.group

    // 第一级保存
    save(context)
    const level1Group = context.group

    // 第二级保存
    save(context)

    // 恢复到第一级
    restore(context)
    expect(context.group).toBe(level1Group)

    // 恢复到原始级别
    restore(context)
    expect(context.group).toBe(level0Group)
  })
})
