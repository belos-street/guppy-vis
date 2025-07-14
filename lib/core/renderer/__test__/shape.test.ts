import { describe, test, expect } from 'vitest'
import { shape, circle, rect, line, path, text } from '../shape'
import { createContext } from '../context'

describe('test core/renderer/dom', () => {
  test('shape', () => {
    const context = createContext('400', '400')
    const el = shape('circle', context, {})
    expect(el.tagName).toBe('circle')
  })

  test('circle', () => {
    const context = createContext('400', '400')
    const el = circle(context, { cx: 100, cy: 100, r: 50 })
    expect(el.tagName).toBe('circle')
    expect(el.getAttribute('cx')).toBe('100')
    expect(el.getAttribute('cy')).toBe('100')
    expect(el.getAttribute('r')).toBe('50')
  })

  test('rect', () => {
    const context = createContext('400', '400')
    const el = rect(context, { x: 100, y: 100, width: 50, height: 50 })
    expect(el.tagName).toBe('rect')
    expect(el.getAttribute('x')).toBe('100')
    expect(el.getAttribute('y')).toBe('100')
    expect(el.getAttribute('width')).toBe('50')
    expect(el.getAttribute('height')).toBe('50')
  })

  test('line', () => {
    const context = createContext('400', '400')
    const el = line(context, { x1: 100, y1: 100, x2: 200, y2: 200 })
    expect(el.tagName).toBe('line')
    expect(el.getAttribute('x1')).toBe('100')
    expect(el.getAttribute('y1')).toBe('100')
    expect(el.getAttribute('x2')).toBe('200')
    expect(el.getAttribute('y2')).toBe('200')
  })

  test('path', () => {
    const context = createContext('400', '400')
    const el = path(context, { d: [['M', 10, 10], ['L', 100, 100], ['L', 100, 10], ['Z']] })
    expect(el.tagName).toBe('path')
    expect(el.getAttribute('d')).toBe('M 10 10 L 100 100 L 100 10 Z')
  })

  test('text', () => {
    const context = createContext('400', '400')
    const el = text(context, { x: 100, y: 100, text: 'hello' })
    expect(el.tagName).toBe('text')
    expect(el.getAttribute('x')).toBe('100')
    expect(el.getAttribute('y')).toBe('100')
    expect(el.textContent).toBe('hello')
  })
})
