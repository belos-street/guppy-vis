/**
 * 简单刻度函数
 * @param min 定义域的最小值
 * @param max 定义域的最大值
 * @param count 坐标刻度的数量
 * @returns 刻度数组
 */
export function simpleTicks(min: number, max: number, count: number) {
  const step = (max - min) / (count - 1)
  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = min + step * i
  }
  return values
}
