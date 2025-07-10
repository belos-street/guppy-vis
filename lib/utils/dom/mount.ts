/**
 * 将子元素挂载到父元素
 * @param parent - 父元素
 * @param child - 子元素
 */
export function mount(parent: SVGElement | HTMLElement | null, child: SVGElement | HTMLElement): void {
  if (parent) {
    parent.appendChild(child);
  }
}