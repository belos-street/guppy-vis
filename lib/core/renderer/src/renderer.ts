import { createContext, restore, save } from './context'
import { line, circle, text, rect, path } from './shape'
import { scale, translate, rotate, skewX, skewY, matrix } from './transform'
import type {
  RendererContext,
  CircleSVGAttributes,
  LineSVGAttributes,
  PathSVGAttributes,
  RectSVGAttributes,
  TextSVGAttributes
} from '../type'

/**
 * 渲染器配置选项
 */
type RendererOptions = {
  line?: typeof line
  circle?: typeof circle
  text?: typeof text
  rect?: typeof rect
  path?: typeof path
  context?: (context: RendererContext) => RendererContext
}

/**
 * 渲染器接口
 */
type Renderer = {
  line: (attributes: LineSVGAttributes) => SVGElement
  circle: (attributes: CircleSVGAttributes) => SVGElement
  text: (attributes: TextSVGAttributes) => SVGElement
  rect: (attributes: RectSVGAttributes) => SVGElement
  path: (attributes: PathSVGAttributes) => SVGElement
  restore: () => void
  save: () => void
  scale: (sx: number, sy?: number) => void
  rotate: (theta: number, cx?: number, cy?: number) => void
  translate: (tx: number, ty: number) => void
  skewX: (angle: number) => void
  skewY: (angle: number) => void
  matrix: (a: number, b: number, c: number, d: number, e: number, f: number) => void
  node: () => SVGElement
  group: () => SVGElement
}

/**
 * 创建渲染器
 * @param width - 画布宽度
 * @param height - 画布高度
 * @param options - 渲染器配置选项
 * @returns 渲染器
 */
export function createRenderer(width: string, height: string, options: RendererOptions = {}): Renderer {
  const {
    line: drawLine = line,
    circle: drawCircle = circle,
    text: drawText = text,
    rect: drawRect = rect,
    path: drawPath = path,
    context: intensifyContext = (ctx: RendererContext) => ctx
  } = options

  const context = intensifyContext(createContext(width, height))

  return {
    // 图形元素
    line: (attributes) => drawLine(context, attributes),
    circle: (attributes) => drawCircle(context, attributes),
    text: (attributes) => drawText(context, attributes),
    rect: (attributes) => drawRect(context, attributes),
    path: (attributes) => drawPath(context, attributes),

    // 变换元素
    restore: () => restore(context),
    save: () => save(context),

    // 变换方法
    scale: (...args) => scale(context, ...args),
    rotate: (...args) => rotate(context, ...args),
    translate: (...args) => translate(context, ...args),
    skewX: (angle) => skewX(context, angle),
    skewY: (angle) => skewY(context, angle),
    matrix: (a, b, c, d, e, f) => matrix(context, a, b, c, d, e, f),

    // 上下文方法
    node: () => context.node,
    group: () => context.group
  }
}
