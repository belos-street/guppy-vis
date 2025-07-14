/**
 * @function createIdentity
 * @description 恒等映射 - 比例尺，将输入映射为输出
 */
export function createIdentity<T>() {
  return (x: T) => x
}
