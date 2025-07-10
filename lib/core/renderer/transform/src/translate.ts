import type { RendererContext } from 'lib/core/renderer/type'
import { transform } from '../transform'

/**
 * 平移变换
 * @param context - 渲染上下文
 * @param tx - X轴平移距离
 * @param ty - Y轴平移距离
 */
export function translate(context: RendererContext, tx: number, ty: number): void {
  transform('translate', context, tx, ty)
}
