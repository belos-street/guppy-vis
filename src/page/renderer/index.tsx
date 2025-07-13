import { createRenderer } from 'lib/core/renderer'
import React, { useEffect, useState } from 'react'

export const Renderer = () => {
  const [step, setStep] = useState(0)
  const [svgContent, setSvgContent] = useState('')

  useEffect(() => {
    // 创建渲染器
    const renderer = createRenderer('400', '400')

    // 初始状态 - 绘制红色矩形
    if (step >= 0) {
      renderer.rect({
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'red'
      })
    }

    // 第一级保存 - 添加白色线条
    if (step >= 1) {
      renderer.save() // 保存第一级上下文
      renderer.line({
        x1: 40,
        y1: 40,
        x2: 140,
        y2: 140,
        stroke: 'white',
        'stroke-width': 2
      })
    }

    // 第二级保存 - 添加蓝色圆形
    if (step >= 2) {
      renderer.save() // 保存第二级上下文
      renderer.circle({
        cx: 200,
        cy: 100,
        r: 50,
        fill: 'blue'
      })
    }

    // 恢复到第一级 - 添加绿色矩形
    if (step >= 3) {
      renderer.restore() // 恢复到第一级上下文
      renderer.rect({
        x: 150,
        y: 200,
        width: 80,
        height: 80,
        fill: 'green'
      })
    }

    // 恢复到原始级别 - 添加黄色圆形
    if (step >= 4) {
      renderer.restore() // 恢复到原始上下文
      renderer.circle({
        cx: 300,
        cy: 300,
        r: 40,
        fill: 'yellow'
      })
    }

    // 更新SVG内容
    setSvgContent(renderer.node().outerHTML)
  }, [step])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}>
          上一步
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setStep(Math.min(4, step + 1))}
          disabled={step === 4}>
          下一步
        </button>
      </div>

      <div className="mb-4">
        <div className="font-bold">当前步骤: {step}</div>
        <div>
          {step === 0 && '初始状态 - 绘制红色矩形'}
          {step === 1 && '第一级保存 - 添加白色线条'}
          {step === 2 && '第二级保存 - 添加蓝色圆形'}
          {step === 3 && '恢复到第一级 - 添加绿色矩形'}
          {step === 4 && '恢复到原始级别 - 添加黄色圆形'}
        </div>
      </div>

      <div className="border border-gray-300 rounded p-2">
        <div id="renderer" className="w-[400px] h-[400px]" dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>

      <div className="mt-4 p-4 rounded max-w-[600px] overflow-auto">
        <h3 className="font-bold mb-2">SVG结构:</h3>
        <pre className="text-xs">{svgContent}</pre>
      </div>
    </div>
  )
}
