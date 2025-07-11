import { createSVGElement, applyAttributes, applyTransform, mount } from '../dom'
import { describe, test, expect } from 'vitest'

describe('test core/renderer/dom', () => {
  test('createSVGElement', () => {
    const svg = createSVGElement('svg')
    expect(svg.tagName).toBe('svg')
  })

  test('applyAttributes', () => {
    const svg = createSVGElement('svg')
    applyAttributes(svg, {
      width: 100,
      height: 100,
      viewBox: '0 0 100 100'
    })
    expect(svg.getAttribute('width')).toBe('100')
    expect(svg.getAttribute('height')).toBe('100')
    expect(svg.getAttribute('view-box')).toBe('0 0 100 100')
  })

  test('applyTransform', () => {
    const svg = createSVGElement('svg')
    applyTransform(svg, 'translate(100, 100)')
    expect(svg.getAttribute('transform')).toBe('translate(100, 100)')

    applyTransform(svg, 'rotate(45)')
    expect(svg.getAttribute('transform')).toBe('translate(100, 100) rotate(45)')

    applyTransform(svg, 'scale(2, 2)')
    expect(svg.getAttribute('transform')).toBe('translate(100, 100) rotate(45) scale(2, 2)')
  })

  test('mount', () => {
    const svg = createSVGElement('svg')
    const g = createSVGElement('g')
    mount(svg, g)
    expect(svg.firstChild).toBe(g)
  })
})
