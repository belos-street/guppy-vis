//Ordinal比例尺要求值域必须是序数的，如果值域是 数值 类型的话，就需要 Band 比例尺了

import { createOrdinal } from './ordinal'

type BandProps<T> = {
  domain: T[]
  range: [number, number] // Band比例尺的range必须是一个数值区间
  padding?: number // 内边距，控制条带之间的间隔
  margin?: number // 外边距，控制条带与区间边界的间隔
}

type BandScale<T, U> = {
  (key: T): U
  bandWidth: () => number
  step: () => number
}

/**
 * 创建Band比例尺，将序数属性映射为连续数值区间内的条带
 * @param options 配置项，包括domain、range、padding和margin
 * @returns Band比例尺函数，附加bandWidth和step方法
 */
export function createBand<T>({ domain, range, padding = 0, margin = padding }: BandProps<T>): BandScale<T, number> {
  const { bandRange, bandWidth, step } = band({ domain, range, padding, margin });
  const scale = createOrdinal({ domain, range: bandRange });

  // 扩展scale函数，添加bandWidth和step方法
  const bandScale = scale as BandScale<T, number>;
  bandScale.bandWidth = () => bandWidth;
  bandScale.step = () => step;

  return bandScale;
}

/**
 * 计算Band比例尺的内部参数
 * @param options 配置项
 * @returns 计算结果，包括bandRange、bandWidth和step
 */
function band<T>({ domain, range, padding = 0, margin = padding }: BandProps<T>) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (margin * 2 + n - padding);
  const bandWidth = step * (1 - padding);
  const x = (_: any, i: number) => r0 + margin * step + step * i;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x),
  };
}
