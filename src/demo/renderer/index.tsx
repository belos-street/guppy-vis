import { createRenderer } from 'lib/core/renderer'
import React, { useEffect, useRef } from 'react'

export const Renderer = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 清除之前的内容
    containerRef.current.innerHTML = ''

    // 创建渲染器
    const renderer = createRenderer('600', '400')

    // 获取SVG节点并设置样式
    const svg = renderer.node()
    svg.style.border = '1px solid #ccc'
    svg.style.backgroundColor = '#f9f9f9'

    /** step1 */
    // 将SVG节点挂载到DOM
    containerRef.current.appendChild(svg)

    // 绘制一个矩形
    renderer.rect({
      x: 50,
      y: 50,
      width: 100,
      height: 80,
      fill: '#6495ED',
      rx: 10,
      ry: 10
    })

    // 绘制一个圆形
    renderer.circle({
      cx: 250,
      cy: 90,
      r: 40,
      fill: '#FF7F50'
    })

    // 绘制一条线
    renderer.line({
      x1: 50,
      y1: 200,
      x2: 350,
      y2: 200,
      stroke: '#2F4F4F',
      'stroke-width': 2
    })

    /** step2 */
    renderer.save()
    //平移和旋转
    renderer.translate(400, 100)
    renderer.rotate(45)

    // 在变换后的坐标系中绘制矩形
    renderer.rect({
      x: 0,
      y: 0,
      width: 60,
      height: 60,
      fill: '#9370DB'
    })
    renderer.restore()

    /** step3 */
    // 使用skewX和skewY变换（倾斜）
    renderer.save()
    renderer.translate(100, 300)
    renderer.skewX(30) // X轴倾斜30度

    // 在倾斜变换后绘制矩形
    renderer.rect({
      x: 0,
      y: 0,
      width: 80,
      height: 40,
      fill: '#4CAF50',
      stroke: '#333',
      'stroke-width': 1
    })
    renderer.restore()

    /** step4 */
    // 使用matrix变换（矩阵变换）
    renderer.save()
    // matrix(a, b, c, d, e, f) 对应 [a c e; b d f; 0 0 1] 的矩阵
    // 这里使用的是缩放和旋转的组合
    renderer.matrix(0.8, 0.2, -0.2, 0.8, 350, 300)

    // 在矩阵变换后绘制矩形
    renderer.rect({
      x: -30,
      y: -30,
      width: 60,
      height: 60,
      fill: '#FF5722',
      stroke: '#333',
      'stroke-width': 1
    })
    renderer.restore()

    /** step5 */
    renderer.save()
    // 绘制文本
    renderer.text({
      x: 200,
      y: 300,
      text: 'SVG 渲染器演示',
      'font-size': 24,
      'text-anchor': 'middle',
      fill: '#333'
    })

    // 绘制路径
    renderer.path({
      d: 'M100,250 C150,200 250,200 300,250',
      fill: 'none',
      stroke: '#228B22',
      'stroke-width': 3
    })
    renderer.restore()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">SVG 渲染器演示</h2>

      <div ref={containerRef}></div>

      <div className="mt-4 text-sm text-gray-600">
        <p>这个示例展示了如何使用 createRenderer 创建 SVG 渲染器并绘制各种图形。</p>
        <p>包括矩形、圆形、线条、文本和路径，以及如何应用变换（平移、旋转、倾斜和矩阵变换）。</p>
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <h3 className="font-bold">变换操作示例</h3>
          <ul className="list-disc list-inside mt-1">
            <li>translate(x, y): 平移变换</li>
            <li>rotate(angle): 旋转变换</li>
            <li>skewX(angle): X轴倾斜变换</li>
            <li>skewY(angle): Y轴倾斜变换</li>
            <li>matrix(a, b, c, d, e, f): 矩阵变换</li>
            <li>save()/restore(): 保存和恢复变换状态</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
