/**
 * 创建SVG元素
 * @param type - SVG元素类型
 * @returns 创建的SVG元素
 */
export function createSVGElement(type: string): SVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}