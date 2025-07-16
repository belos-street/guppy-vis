/**
 * 向上取整
 * @param n 要取整的数值
 * @param base 取整的倍数
 * @returns 向上取整后的数值
 *
 * @example
 * ceil(10, 5) // 15
 * ceil(15, 5) // 15
 * ceil(20, 5) // 25
 */
export function ceil(n: number, base: number) {
  return base * Math.ceil(n / base)
}

/**
 * 向下取整
 * @param n 要取整的数值
 * @param base 取整的倍数
 * @returns 向下取整后的数值
 *
 * @example
 * floor(10, 5) // 10
 * floor(15, 5) // 10
 * floor(20, 5) // 20
 */
export function floor(n: number, base: number) {
  return base * Math.floor(n / base)
}

/**
 * 四舍五入
 * @param n 要取整的数值
 * @returns 四舍五入后的数值
 *
 * @example
 * round(10.123456) // 10.1235
 * round(10.123456789) // 10.1235
 */
export function round(n: number) {
  return Math.round(n * 1e12) / 1e12
}

/**
 * 对数函数
 * @param n 要取对数的数值
 * @param base 对数的底数
 * @returns 对数的结果
 *
 * @example
 * log(10, 2) // 3.321928094887362
 * log(10, 10) // 1
 */
export function log(n: number, base: number) {
  return Math.log(n) / Math.log(base)
}
