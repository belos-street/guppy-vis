import { describe, test, expect } from 'vitest'
import { transform, matrix, translate, rotate, scale, skewX, skewY } from '../transform'
import { createContext } from '../context'

describe('test core/renderer/transform', () => {
  test('transform', () => {
    const context = createContext('400', '400')
    transform('translate', context, 10, 20)
    transform('rotate', context, 45)
    transform('scale', context, 2, 3)
    transform('skewX', context, 45)
    transform('skewY', context, 45)
    transform('matrix', context, 1, 2, 3, 4, 5, 6)

    console.log(context.group.getAttribute('transform'))

    expect(context.group.getAttribute('transform')).toBe(
      'translate(10, 20) rotate(45) scale(2, 3) skewX(45) skewY(45) matrix(1, 2, 3, 4, 5, 6)'
    )
  })

  test('matrix', () => {
    const context = createContext('400', '400')
    matrix(context, 1, 2, 3, 4, 5, 6)
    expect(context.group.getAttribute('transform')).toBe('matrix(1, 2, 3, 4, 5, 6)')
  })

  test('translate', () => {
    const context = createContext('400', '400')
    translate(context, 10, 20)
    expect(context.group.getAttribute('transform')).toBe('translate(10, 20)')
  })

  test('rotate', () => {
    const context = createContext('400', '400')
    rotate(context, 45)
    expect(context.group.getAttribute('transform')).toBe('rotate(45)')
  })

  test('scale', () => {
    const context = createContext('400', '400')
    scale(context, 2, 3)
    expect(context.group.getAttribute('transform')).toBe('scale(2, 3)')
  })

  test('skewX', () => {
    const context = createContext('400', '400')
    skewX(context, 45)
    expect(context.group.getAttribute('transform')).toBe('skewX(45)')
  })

  test('skewY', () => {
    const context = createContext('400', '400')
    skewY(context, 45)
    expect(context.group.getAttribute('transform')).toBe('skewY(45)')
  })
})
