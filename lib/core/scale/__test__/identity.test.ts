import { describe, expect, it } from 'vitest'
import { createIdentity } from 'lib/core/scale'

describe('scale/identity', () => {
  it('should return the same value', () => {
    const identity = createIdentity<number | string>()
    expect(identity(1)).toBe(1)
    expect(identity('hello')).toBe('hello')
  })
})
