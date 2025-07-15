import { describe, expect, it } from 'vitest'
import { group } from '../src/array'

describe('utils/array', () => {
  it('group', () => {
    const array = [1, 2, 3, 4, 5]
    const key = (d: number) => (d % 2 === 0 ? 'even' : 'odd')
    const result = group(array, key)
    expect(result).toEqual(
      new Map([
        ['even', [2, 4]],
        ['odd', [1, 3, 5]]
      ])
    )
  })
})
