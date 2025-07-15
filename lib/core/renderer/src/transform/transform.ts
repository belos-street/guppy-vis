import { applyTransform } from 'lib/core/renderer/src/dom'
import type { RendererContext, TransformType } from 'lib/core/renderer/type'

/**
 * 应用变换到渲染上下文
 * @param type - 变换类型
 * @param context - 渲染上下文
 * @param params - 变换参数
 */
export function transform(type: TransformType, context: RendererContext, ...params: number[]): void {
  const { group } = context
  applyTransform(group, `${type}(${params.join(', ')})`)
}
