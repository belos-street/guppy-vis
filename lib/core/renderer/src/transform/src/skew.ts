import type { RendererContext } from 'lib/core/renderer/type'
import { transform } from '../transform'

/**
 * X轴倾斜变换
 * @param context - 渲染上下文
 * @param angle - 倾斜角度（度）
 */
export function skewX(context: RendererContext, angle: number): void {
  transform('skewX', context, angle)
}

/**
 * Y轴倾斜变换
 * @param context - 渲染上下文
 * @param angle - 倾斜角度（度）
 */
export function skewY(context: RendererContext, angle: number): void {
  transform('skewY', context, angle)
}
