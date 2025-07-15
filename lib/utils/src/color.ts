/**
 * 16进制颜色字符串转换为RGB数组
 * @param hex 16进制颜色字符串
 * @returns RGB数组
 *
 * @example
 * hexToRgb('#ff0000') // [255, 0, 0]
 */
export function hexToRgb(hex: string) {
  const rgb = []
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`))
  }
  return rgb
}

/**
 * RGB数组转换为16进制颜色字符串
 * @param r 红色值
 * @param g 绿色值
 * @param b 蓝色值
 * @returns 16进制颜色字符串
 *
 * @example
 * rgbToHex(255, 0, 0) // '#ff0000'
 */
export function rgbToHex(r: number, g: number, b: number) {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`
}
