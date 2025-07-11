import type { RendererContext } from 'lib/core/renderer/type'
import { transform } from '../transform'

/**
 * 旋转变换
 * @param context - 渲染上下文
 * @param theta - 旋转角度（度）
 * @param cx - 可选，旋转中心X坐标
 * @param cy - 可选，旋转中心Y坐标
 */
export function rotate(context: RendererContext, theta: number, cx?: number, cy?: number): void {
  if (cx !== undefined && cy !== undefined) {
    transform('rotate', context, theta, cx, cy)
  } else {
    transform('rotate', context, theta)
  }
}
