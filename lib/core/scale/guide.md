# 比例尺（Scale）详解

## 什么是比例尺？

在数据可视化中，比例尺是连接数据与视觉表现的桥梁。比例尺本质上是一个函数，它将数据值从一个定义域（Domain）映射到一个值域（Range）。

- **定义域（Domain）**：数据的取值范围，由数据的属性决定
- **值域（Range）**：视觉属性的取值范围，由图形的视觉表现决定

例如，当我们要将一组数据值（如 [0, 100]）映射到屏幕上的一段距离（如 [0, 500]像素）时，我们需要使用比例尺来进行转换。

## 为什么需要比例尺？

1. **数据归一化**：将不同量级和单位的数据统一到相同的视觉空间
2. **视觉映射**：将抽象数据转换为人类可感知的视觉属性（位置、大小、颜色等）
3. **坐标转换**：在不同坐标系统之间进行转换
4. **数据缩放**：处理极端值和异常值，使可视化更加合理

## 比例尺的类型

根据数据类型和映射方式的不同，比例尺可以分为多种类型：

### 1. 连续型比例尺

适用于连续的数值数据，将连续的定义域映射到连续的值域。

#### 1.1 线性比例尺（Linear Scale）

最常用的比例尺，执行简单的线性映射，适用于大多数数值数据。

```typescript
// 创建一个线性比例尺，将[0, 100]映射到[0, 500]
const linearScale = createLinear([0, 100], [0, 500]);
console.log(linearScale(50)); // 输出: 250
```

线性比例尺的实现原理：

```typescript
export function createLinear(domain: [d0: number, d1: number], range: [r0: number, r1: number], interpolate = interpolateNumber) {
  return (value: number) => {
    const t = normalize(value, domain[0], domain[1])
    return interpolate(t, range[0], range[1])
  }
}
```

#### 1.2 对数比例尺（Log Scale）

适用于数据范围跨度很大的情况，如人口、财富分布等。

```typescript
// 创建一个对数比例尺，将[1, 10000]映射到[0, 500]
const logScale = createLog([1, 10000], [0, 500]);
console.log(logScale(100)); // 输出接近: 250
```

#### 1.3 时间比例尺（Time Scale）

专门处理时间数据，将时间映射到视觉属性。

```typescript
// 创建一个时间比例尺，将日期范围映射到[0, 500]
const timeScale = createTime(
  [new Date(2023, 0, 1), new Date(2023, 11, 31)], 
  [0, 500]
);
console.log(timeScale(new Date(2023, 6, 1))); // 输出接近: 250
```

### 2. 离散型比例尺

适用于分类数据，将离散的定义域映射到离散或连续的值域。

#### 2.1 序数比例尺（Ordinal Scale）

将离散的定义域映射到离散的值域，常用于分类数据的颜色映射。

```typescript
// 创建一个序数比例尺，将类别映射到颜色
const ordinalScale = createOrdinal(
  ['苹果', '香蕉', '橙子'], 
  ['red', 'yellow', 'orange']
);
console.log(ordinalScale('香蕉')); // 输出: 'yellow'
```

#### 2.2 带状比例尺（Band Scale）

将离散的定义域映射到连续的值域，常用于条形图的位置计算。

```typescript
// 创建一个带状比例尺，将类别映射到位置
const bandScale = createBand(
  ['A', 'B', 'C', 'D'], 
  [0, 400], 
  0.1 // 间隔比例
);
console.log(bandScale('B')); // 输出带状区域的起始位置
console.log(bandScale.bandwidth()); // 输出带宽
```

#### 2.3 点状比例尺（Point Scale）

带状比例尺的特例，带宽为0，常用于散点图的位置计算。

```typescript
// 创建一个点状比例尺，将类别映射到点的位置
const pointScale = createPoint(
  ['A', 'B', 'C', 'D'], 
  [0, 400]
);
console.log(pointScale('C')); // 输出点的位置
```

### 3. 阈值比例尺

根据阈值将连续的定义域映射到离散的值域。

#### 3.1 分位比例尺（Quantile Scale）

根据数据的分位数将数据分成几个部分，每个部分映射到一个离散的值。

```typescript
// 创建一个分位比例尺，将数据分成3个部分
const quantileScale = createQuantile(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
  ['small', 'medium', 'large']
);
console.log(quantileScale(4)); // 根据分位数输出对应的值
```

#### 3.2 阈值比例尺（Threshold Scale）

根据指定的阈值将数据分成几个部分，每个部分映射到一个离散的值。

```typescript
// 创建一个阈值比例尺，根据阈值将数据分类
const thresholdScale = createThreshold(
  [3, 7], // 阈值
  ['small', 'medium', 'large'] // 对应的值
);
console.log(thresholdScale(5)); // 输出: 'medium'
```

#### 3.3 量化比例尺（Quantize Scale）

将连续的定义域等分成几个部分，每个部分映射到一个离散的值。

```typescript
// 创建一个量化比例尺，将[0, 10]等分成3个部分
const quantizeScale = createQuantize(
  [0, 10], 
  ['small', 'medium', 'large']
);
console.log(quantizeScale(3.5)); // 输出对应的值
```

### 4. 特殊比例尺

#### 4.1 恒等比例尺（Identity Scale）

最简单的比例尺，输出等于输入，常用于不需要转换的情况。

```typescript
const identityScale = createIdentity<number>();
console.log(identityScale(42)); // 输出: 42
```

恒等比例尺的实现非常简单：

```typescript
export function createIdentity<T>() {
  return (x: T) => x
}
```

## 比例尺的常用操作

### 1. 定义域和值域的设置

```typescript
// 创建比例尺时设置
const scale = createLinear([0, 100], [0, 500]);

// 或者后续修改
scale.domain([0, 200]);
scale.range([0, 1000]);
```

### 2. 刻度计算

比例尺可以帮助计算坐标轴的刻度值，使其更加美观和易读。

```typescript
const scale = createLinear([0, 100], [0, 500]);
const ticks = scale.ticks(5); // 生成5个刻度值
// 输出: [0, 20, 40, 60, 80, 100]
```

### 3. 反向映射

有时我们需要从值域反向映射到定义域，比如从屏幕坐标确定数据值。

```typescript
const scale = createLinear([0, 100], [0, 500]);
const value = scale.invert(250); // 从值域反向映射到定义域
// 输出: 50
```

## 在可视化中的应用

### 1. 坐标轴

比例尺用于计算坐标轴的位置、刻度和标签。

```typescript
// 创建X轴的比例尺
const xScale = createLinear([0, 100], [50, 750]);

// 创建Y轴的比例尺
const yScale = createLinear([0, 500], [550, 50]);
```

### 2. 数据映射

将数据值映射到视觉属性，如位置、大小、颜色等。

```typescript
// 位置映射
const xPosition = xScale(dataPoint.x);
const yPosition = yScale(dataPoint.y);

// 大小映射
const sizeScale = createLinear([0, 1000], [5, 50]);
const circleRadius = sizeScale(dataPoint.value);

// 颜色映射
const colorScale = createLinear(
  [0, 100], 
  [[255, 0, 0], [0, 0, 255]], 
  interpolateColor
);
const color = colorScale(dataPoint.temperature);
```

### 3. 交互和动画

比例尺在交互和动画中也扮演重要角色，如缩放、平移等操作。

```typescript
// 缩放操作
function zoom(factor) {
  const currentDomain = xScale.domain();
  const newDomain = [
    currentDomain[0] * factor,
    currentDomain[1] * factor
  ];
  xScale.domain(newDomain);
  // 重新渲染图表
}
```

## 总结

比例尺是数据可视化中不可或缺的工具，它将抽象的数据转换为人类可感知的视觉属性，是构建可视化图表的基础。根据数据类型和映射需求的不同，我们可以选择不同类型的比例尺，如线性比例尺、对数比例尺、序数比例尺等。

在实际应用中，合理选择和配置比例尺可以使可视化更加准确、美观和易于理解。通过比例尺，我们可以轻松处理各种数据映射问题，创建出丰富多样的可视化效果。