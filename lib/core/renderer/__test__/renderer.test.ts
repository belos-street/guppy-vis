import { createRenderer } from '../renderer'
import { describe, test, expect } from 'vitest'

describe('test core/renderer/renderer', () => {
  test('createRenderer', () => {
    const renderer = createRenderer('200', '200')
    expect(renderer).toBeDefined()
  })
})
