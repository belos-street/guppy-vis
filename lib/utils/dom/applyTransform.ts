/**
 * 应用变换到SVG元素
 * @param element - 目标SVG元素
 * @param transform - 变换字符串
 */
export function applyTransform(element: SVGElement, transform: string): void {
  const oldTransform = element.getAttribute('transform') || '';
  const prefix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
}