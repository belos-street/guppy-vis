//Point比例尺是Band比例尺的特例，padding设置为1，使得每个点都位于区间的中心位置

import { createBand, type BandProps, type BandScale } from './band'

/**
 * 创建Point比例尺，将序数属性映射为连续数值区间内的点
 * Point比例尺是Band比例尺的特例，padding设置为1，使得每个点都位于区间的中心位置
 * @param options 配置项，包括domain、range和margin
 * @returns Point比例尺函数，附加bandWidth和step方法
 */
export function createPoint<T>(options: Omit<BandProps<T>, 'padding'>): BandScale<T, number> {
  return createBand({ ...options, padding: 1 })
}
