import { createRenderer } from 'lib/core/renderer'

export const bootStrap = () => {
  const renderer = createRenderer('400', '400')
  renderer.rect({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red'
  })

  renderer.scale(2, 2)
  document.querySelector('#api #renderer')!.innerHTML = renderer.node().outerHTML
}
