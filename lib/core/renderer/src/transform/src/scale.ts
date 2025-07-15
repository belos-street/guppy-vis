import type { RendererContext } from 'lib/core/renderer/type'
import { transform } from '../transform'

/**
 * 缩放变换
 * @param context - 渲染上下文
 * @param sx - X轴缩放比例
 * @param sy - Y轴缩放比例，如果未提供则使用sx值
 */
export function scale(context: RendererContext, sx: number, sy: number = sx): void {
  transform('scale', context, sx, sy)
}
