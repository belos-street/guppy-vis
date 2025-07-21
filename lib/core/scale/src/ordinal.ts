type OrdinalProps<T, U> = {
  domain: T[]
  range: U[]
}

/**
 * 序数比例尺，将序数属性映射为同为序数属性的视觉属性，比如颜色，形状等
 * @param domain 定义域
 * @param range 值域
 * @returns 序数比例尺函数
 */
export function createOrdinal<T, U>({ domain, range }: OrdinalProps<T, U>) {
  // 使用JSON.stringify作为键函数，确保复杂对象可以正确作为Map的键
  const keyFn = (value: T): string => JSON.stringify(value)

  // 使用字符串作为Map的键，避免对象引用问题
  const indexMap = new Map<string, number>(domain.map((x, i) => [keyFn(x), i]))

  return (key: T) => {
    const stringKey = keyFn(key)
    const index = indexMap.get(stringKey)
    if (index === undefined) return range[0] // 处理找不到键的情况，返回默认值或第一个range值
    return range[index % range.length]
  }
}
