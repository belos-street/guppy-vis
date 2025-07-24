type Threshold<T> = {
  domain: [number, number]
  range: T[]
}

/**
 * 创建Threshold比例尺，它的定义域是连续的，并且会被指定的分割值分成不同的组，每个组对应一个值域中的值
 * @param domain 定义域
 * @param range 值域
 * @returns 阈值比例尺
 */
export function createThreshold<T>({ domain, range }: Threshold<T>) {
  const scale = (value: number) => {}
}
