/**
 * 应用属性到SVG元素
 * @param element - 目标SVG元素
 * @param attributes - 要应用的属性对象
 */
export function applyAttributes(element: SVGElement, attributes: Record<string, string | number>): void {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`);
    element.setAttribute(kebabCaseKey, String(value));
  }
}