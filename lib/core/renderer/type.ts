export type RendererContext = {
  node: SVGElement
  group: SVGElement
}

/**
 * SVG元素类型
 */
export type SVGShapeType = 'circle' | 'rect' | 'line' | 'path' | 'text' | 'g' | 'svg' | string

/**
 * SVG变换类型
 */
export type TransformType = 'translate' | 'rotate' | 'scale' | 'skewX' | 'skewY' | 'matrix'

/**
 * 基础SVG属性
 */
export interface BaseSVGAttributes {
  fill?: string
  stroke?: string
  'stroke-width'?: number | string
  'stroke-dasharray'?: string
  'stroke-linecap'?: 'butt' | 'round' | 'square'
  'stroke-linejoin'?: 'miter' | 'round' | 'bevel'
  opacity?: number
  transform?: string
  style?: string
  class?: string
  id?: string
  [key: string]: any // 为了兼容性，保留索引签名
}

/**
 * 圆形SVG属性
 */
export interface CircleSVGAttributes extends BaseSVGAttributes {
  cx?: number | string
  cy?: number | string
  r?: number | string
}

/**
 * 矩形SVG属性
 */
export interface RectSVGAttributes extends BaseSVGAttributes {
  x?: number | string
  y?: number | string
  width?: number | string
  height?: number | string
  rx?: number | string
  ry?: number | string
}

/**
 * 线条SVG属性
 */
export interface LineSVGAttributes extends BaseSVGAttributes {
  x1?: number | string
  y1?: number | string
  x2?: number | string
  y2?: number | string
}

/**
 * 路径SVG属性
 */
export interface PathSVGAttributes extends BaseSVGAttributes {
  d?: string | (string | number)[][]
}

/**
 * 文本SVG属性
 */
export interface TextSVGAttributes extends BaseSVGAttributes {
  x?: number | string
  y?: number | string
  dx?: number | string
  dy?: number | string
  text?: string
  'font-family'?: string
  'font-size'?: number | string
  'text-anchor'?: 'start' | 'middle' | 'end'
  'dominant-baseline'?: 'auto' | 'middle' | 'hanging' | 'text-top' | 'text-bottom'
}

/**
 * SVG属性映射类型
 */
export type SVGAttributesMap = {
  circle: CircleSVGAttributes
  rect: RectSVGAttributes
  line: LineSVGAttributes
  path: PathSVGAttributes
  text: TextSVGAttributes
  [key: string]: BaseSVGAttributes
}
