import { describe, expect, it } from 'vitest'
import { identity, compose, curry } from '../src/functional'

describe('utils/functional/identity', () => {
  it('should return the same value for any input', () => {
    expect(identity(5)).toBe(5)
    expect(identity('hello')).toBe('hello')
    expect(identity(null)).toBe(null)
    expect(identity(undefined)).toBe(undefined)
    expect(identity([1, 2, 3])).toEqual([1, 2, 3])
    expect(identity({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
  })
})

describe('utils/functional/compose', () => {
  it('should compose functions from right to left', () => {
    const add1 = (x: number) => x + 1
    const multiply2 = (x: number) => x * 2
    const subtract3 = (x: number) => x - 3

    const composed = compose(subtract3, multiply2, add1)
    expect(composed(5)).toBe(9) // ((5 + 1) * 2) - 3 = 9
  })

  it('should work with single function', () => {
    const add1 = (x: number) => x + 1
    const composed = compose(add1)
    expect(composed(5)).toBe(6)
  })

  it('should work with no functions (identity)', () => {
    const composed = compose()
    expect(composed(5)).toBe(5)
    expect(composed('hello')).toBe('hello')
  })

  it('should work with string transformations', () => {
    const toUpper = (s: string) => s.toUpperCase()
    const addPrefix = (s: string) => 'Hello ' + s
    const addSuffix = (s: string) => s + '!'

    const composed = compose(addSuffix, addPrefix, toUpper)
    expect(composed('world')).toBe('Hello WORLD!')
  })

  it('should work with array transformations', () => {
    const toSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)
    const multiply = (factor: number) => (x: number) => x * factor
    const add = (value: number) => (x: number) => x + value

    const composed = compose(add(10), multiply(2), toSum)
    expect(composed([1, 2, 3])).toBe(22) // ([1,2,3] -> 6 -> 12 -> 22)
  })
})

describe('utils/functional/curry', () => {
  it('should curry a simple binary function', () => {
    const add = (a: number, b: number) => a + b
    const curriedAdd = curry(add)

    expect(curriedAdd(2, 3)).toBe(5)
    expect(curriedAdd(2)(3)).toBe(5)
  })

  it('should curry a ternary function', () => {
    const add3 = (a: number, b: number, c: number) => a + b + c
    const curriedAdd3 = curry(add3)

    expect(curriedAdd3(1, 2, 3)).toBe(6)
    expect(curriedAdd3(1)(2, 3)).toBe(6)
    expect(curriedAdd3(1, 2)(3)).toBe(6)
    expect(curriedAdd3(1)(2)(3)).toBe(6)
  })

  it('should handle empty arguments correctly', () => {
    const add = (a: number, b: number) => a + b
    const curriedAdd = curry(add)

    // Empty args should return the same curried function
    const curriedWithEmpty = curriedAdd()
    expect(typeof curriedWithEmpty).toBe('function')
    expect(curriedWithEmpty(2, 3)).toBe(5)
    expect(curriedWithEmpty(2)(3)).toBe(5)
  })

  it('should work with functions that accept undefined', () => {
    const greet = (name: string | undefined, greeting: string) => 
      `${greeting}, ${name || 'World'}!`
    const curriedGreet = curry(greet)

    expect(curriedGreet('Alice', 'Hello')).toBe('Hello, Alice!')
    expect(curriedGreet('Alice')('Hi')).toBe('Hi, Alice!')
    expect(curriedGreet(undefined, 'Hi')).toBe('Hi, World!')
  })

  it('should preserve function behavior', () => {
    const multiply = (a: number, b: number) => a * b
    const curriedMultiply = curry(multiply)

    // Test that original behavior is preserved
    expect(curriedMultiply(4, 5)).toBe(20)
    expect(curriedMultiply(4)(5)).toBe(20)
    expect(curriedMultiply(2)(3)).toBe(6)
  })

  it('should handle single argument functions', () => {
    const square = (x: number) => x * x
    const curriedSquare = curry(square)

    expect(curriedSquare(5)).toBe(25)
    expect(curriedSquare(5)).toBe(25) // Should work same as original
  })
})