# SVG 渲染器

这是一个轻量级、灵活的 SVG 渲染器，用于创建和操作 SVG 图形。它提供了简洁的 API 来绘制各种形状、应用变换和管理渲染上下文。

## 特性

- 支持基本形状绘制：线条、圆形、矩形、路径和文本
- 提供完整的变换操作：平移、旋转、缩放、倾斜和矩阵变换
- 状态管理：保存和恢复渲染上下文
- 类型安全：完整的 TypeScript 类型定义
- 可扩展：支持自定义渲染函数

## 基本结构

渲染器由以下几个主要部分组成：

- **上下文 (Context)**：管理 SVG 画布和挂载节点
- **形状 (Shape)**：提供各种形状的绘制函数
- **变换 (Transform)**：提供各种变换操作
- **渲染器 (Renderer)**：整合上述功能，提供统一的 API

## 使用方法

### 创建渲染器

```typescript
import { createRenderer } from 'lib/core/renderer'

// 创建一个 600x400 的渲染器
const renderer = createRenderer('600', '400')

// 获取 SVG 节点并挂载到 DOM
const svg = renderer.node()
document.body.appendChild(svg)
```

### 绘制形状

```typescript
// 绘制一个圆形
renderer.circle({
  cx: 100,
  cy: 100,
  r: 50,
  fill: 'red',
  stroke: 'black',
  'stroke-width': 2
})

// 绘制一条线
renderer.line({
  x1: 0,
  y1: 0,
  x2: 100,
  y2: 100,
  stroke: 'blue',
  'stroke-width': 2
})

// 绘制一个矩形
renderer.rect({
  x: 150,
  y: 50,
  width: 100,
  height: 80,
  fill: 'green',
  opacity: 0.5
})

// 绘制文本
renderer.text({
  x: 200,
  y: 200,
  text: 'Hello SVG',
  'font-size': 24,
  'text-anchor': 'middle'
})

// 绘制路径
renderer.path({
  d: 'M10,10 L50,10 L50,50 Z',
  fill: 'purple'
})

// 或者使用数组形式
renderer.path({
  d: ['M', 10, 60, 'L', 50, 60, 'L', 50, 100, 'Z'],
  fill: 'orange'
})
```

### 应用变换

```typescript
// 保存当前状态
renderer.save()

// 平移
renderer.translate(100, 100)

// 旋转 45 度
renderer.rotate(45)

// 缩放
renderer.scale(2)

// 在变换后的坐标系中绘制形状
renderer.circle({
  cx: 0,
  cy: 0,
  r: 20,
  fill: 'yellow'
})

// 恢复之前的状态
renderer.restore()

// 应用倾斜变换
renderer.skewX(15)
renderer.skewY(10)

// 应用矩阵变换
renderer.matrix(1, 0, 0.5, 1, 0, 0) // 水平倾斜
```

### 自定义渲染函数

```typescript
import { createRenderer, line as defaultLine } from 'lib/core/renderer'
import type { RendererContext, LineSVGAttributes } from 'lib/core/renderer/type'

// 自定义线条绘制函数
function customLine(context: RendererContext, attributes: LineSVGAttributes) {
  // 添加默认样式
  const enhancedAttributes = {
    ...attributes,
    stroke: attributes.stroke || 'blue',
    'stroke-width': attributes['stroke-width'] || 2
  }
  
  return defaultLine(context, enhancedAttributes)
}

// 创建使用自定义线条函数的渲染器
const renderer = createRenderer('600', '400', {
  line: customLine
})

// 使用自定义渲染器绘制线条
renderer.line({
  x1: 0,
  y1: 0,
  x2: 100,
  y2: 100
  // 不需要指定 stroke 和 stroke-width，会使用默认值
})
```

## 架构设计

### 上下文 (Context)

上下文管理 SVG 画布和挂载节点，提供状态管理功能：

- `createContext`: 创建渲染上下文
- `save`: 保存当前状态
- `restore`: 恢复之前的状态

### 形状 (Shape)

形状模块提供各种 SVG 形状的绘制函数：

- `shape`: 通用形状创建函数
- `circle`: 绘制圆形
- `rect`: 绘制矩形
- `line`: 绘制线条
- `path`: 绘制路径
- `text`: 绘制文本

### 变换 (Transform)

变换模块提供各种 SVG 变换操作：

- `transform`: 通用变换函数
- `translate`: 平移变换
- `rotate`: 旋转变换
- `scale`: 缩放变换
- `skewX`/`skewY`: 倾斜变换
- `matrix`: 矩阵变换

### 渲染器 (Renderer)

渲染器整合上述功能，提供统一的 API：

- 创建和管理渲染上下文
- 提供形状绘制方法
- 提供变换操作方法
- 支持自定义渲染函数

## 类型定义

渲染器提供完整的 TypeScript 类型定义：

- `RendererContext`: 渲染上下文类型
- `SVGShapeType`: SVG 元素类型
- `TransformType`: SVG 变换类型
- `BaseSVGAttributes`: 基础 SVG 属性
- 各种形状的属性类型：`CircleSVGAttributes`, `RectSVGAttributes` 等
- `Renderer`: 渲染器接口
- `RendererOptions`: 渲染器配置选项

## 工具函数

渲染器使用以下工具函数：

- `createSVGElement`: 创建 SVG 元素
- `applyAttributes`: 应用属性到 SVG 元素
- `applyTransform`: 应用变换到 SVG 元素
- `mount`: 将子元素挂载到父元素

## 扩展性

渲染器设计具有良好的扩展性：

1. 可以通过 `RendererOptions` 自定义各种绘制函数
2. 可以通过 `context` 选项增强渲染上下文
3. 可以基于现有函数创建更复杂的图形和效果

## 注意事项

- 所有尺寸和位置值都可以是数字或字符串
- 变换操作会影响后续的所有绘制操作，直到调用 `restore()`
- 路径的 `d` 属性可以是字符串或数组
- 文本的 `text` 属性用于设置文本内容