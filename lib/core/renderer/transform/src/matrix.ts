import type { RendererContext } from 'lib/core/renderer/type'
import { transform } from '../transform'

/**
 * 矩阵变换
 * @param context - 渲染上下文
 * @param a - 水平缩放
 * @param b - 水平倾斜
 * @param c - 垂直倾斜
 * @param d - 垂直缩放
 * @param e - 水平移动
 * @param f - 垂直移动
 */
export function matrix(context: RendererContext, a: number, b: number, c: number, d: number, e: number, f: number): void {
  transform('matrix', context, a, b, c, d, e, f)
}
