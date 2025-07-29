# 比例尺 (Scale)

比例尺本质上是一个函数，会将一个值（变量）从一个特定的范围（定义域）映射到另一个特定的范围（值域）。定义域（Domain）是由数据的属性决定，值域（Range）是由图形的视觉属性决定。根据定义域和值域的不同，我们需要选择不同的比例尺。

## 比例尺分类

根据映射关系的不同，比例尺可以分为以下几类：

### 连续比例尺 (Continuous Scales)

连续比例尺将连续的定义域映射到连续的值域，适用于处理连续数值数据。

#### 线性比例尺 (Linear Scale)

线性比例尺是最基础的比例尺，它将连续的定义域线性映射到连续的值域。

```typescript
import { createLinear } from 'lib/core/scale'

// 创建线性比例尺
const scale = createLinear(
  [0, 100],  // 定义域
  [0, 500]   // 值域
)

scale(50)  // 返回 250
```

#### 对数比例尺 (Log Scale)

对数比例尺将连续的定义域通过对数函数映射到连续的值域，适用于处理跨度很大的数据。

```typescript
import { createLog } from 'lib/core/scale'

// 创建对数比例尺
const scale = createLog({
  domain: [1, 1000],  // 定义域
  range: [0, 10],     // 值域
  base: 10            // 对数的底数，默认为自然对数的底数 e
})

scale(10)   // 约为 3.33
scale(100)  // 约为 6.67
scale(1000) // 10
```

#### 时间比例尺 (Time Scale)

时间比例尺是线性比例尺的一种特例，它将时间映射到连续的值域。

```typescript
import { createTime } from 'lib/core/scale'

// 创建时间比例尺
const scale = createTime({
  domain: [new Date(2020, 0, 1), new Date(2020, 11, 31)],  // 定义域
  range: [0, 500]                                         // 值域
})

scale(new Date(2020, 6, 1))  // 返回约 250
```

### 离散比例尺 (Discrete Scales)

离散比例尺将离散的定义域映射到离散或连续的值域，适用于处理分类数据。

#### 序数比例尺 (Ordinal Scale)

序数比例尺将离散的定义域映射到离散的值域，常用于将分类数据映射到颜色、形状等视觉属性。

```typescript
import { createOrdinal } from 'lib/core/scale'

// 创建序数比例尺
const scale = createOrdinal({
  domain: ['苹果', '香蕉', '橙子'],           // 定义域
  range: ['red', 'yellow', 'orange']  // 值域
})

scale('苹果')  // 返回 'red'
scale('香蕉')  // 返回 'yellow'
```

#### 带状比例尺 (Band Scale)

带状比例尺将离散的定义域映射到连续的值域，常用于条形图等需要将分类数据映射到位置的场景。

```typescript
import { createBand } from 'lib/core/scale'

// 创建带状比例尺
const scale = createBand({
  domain: ['苹果', '香蕉', '橙子'],  // 定义域
  range: [0, 300],                // 值域
  padding: 0.1                    // 条带之间的间隔
})

scale('苹果')  // 返回条带的起始位置
scale.bandWidth()  // 返回条带的宽度
```

#### 点状比例尺 (Point Scale)

点状比例尺是带状比例尺的一种特例，它将离散的定义域映射到连续值域中的点，常用于散点图等需要将分类数据映射到位置的场景。

```typescript
import { createPoint } from 'lib/core/scale'

// 创建点状比例尺
const scale = createPoint({
  domain: ['苹果', '香蕉', '橙子'],  // 定义域
  range: [0, 300]                 // 值域
})

scale('苹果')  // 返回点的位置
```

### 阈值比例尺 (Threshold Scales)

阈值比例尺将连续的定义域根据阈值分成不同的区间，每个区间对应一个值域中的值。

#### 阈值比例尺 (Threshold Scale)

```typescript
import { createThreshold } from 'lib/core/scale'

// 创建阈值比例尺
const scale = createThreshold({
  domain: [0, 50, 100],                  // 阈值
  range: ['small', 'medium', 'large', 'xlarge']  // 值域
})

scale(-10)  // 返回 'small'
scale(30)   // 返回 'small'
scale(60)   // 返回 'medium'
scale(150)  // 返回 'xlarge'
```

#### 量化比例尺 (Quantize Scale)

量化比例尺是阈值比例尺的一种特例，它将连续的定义域等分成n段，其中n是值域的长度减1。

```typescript
import { createQuantize } from 'lib/core/scale'

// 创建量化比例尺
const scale = createQuantize({
  domain: [0, 100],                      // 定义域
  range: ['small', 'medium', 'large', 'xlarge']  // 值域
})

// 定义域被等分成3段：[0, 25), [25, 50), [50, 75), [75, 100]
scale(10)   // 返回 'small'
scale(30)   // 返回 'medium'
scale(80)   // 返回 'xlarge'
```

#### 分位数比例尺 (Quantile Scale)

分位数比例尺是阈值比例尺的一种特例，它根据数据分布将定义域划分为等频率的区间。

```typescript
import { createQuantile } from 'lib/core/scale'

// 创建分位数比例尺
const scale = createQuantile({
  domain: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  // 定义域
  range: ['small', 'medium', 'large', 'xlarge']   // 值域
})

// 定义域被划分为3个等频率区间
scale(2)   // 返回 'small'
scale(5)   // 返回 'medium'
scale(8)   // 返回 'large'
```

### 特殊比例尺

#### 恒等比例尺 (Identity Scale)

恒等比例尺是一种特殊的比例尺，它直接返回输入值，不进行任何映射。

```typescript
import { createIdentity } from 'lib/core/scale'

// 创建恒等比例尺
const scale = createIdentity()

scale(10)  // 返回 10
scale('hello')  // 返回 'hello'
```

## 比例尺方法

大多数比例尺都提供了一些额外的方法，用于生成刻度、调整定义域等操作。

### ticks

`ticks` 方法用于生成刻度，常用于坐标轴的刻度生成。

```typescript
const scale = createLinear([0, 100], [0, 500])
scale.ticks(5)  // 返回 [0, 20, 40, 60, 80, 100]
```

### nice

`nice` 方法用于调整定义域，使其更美观，常用于坐标轴的范围调整。

```typescript
const scale = createLinear([0.12, 99.87], [0, 500])
scale.nice(5)  // 调整定义域为 [0, 100]
```

## 使用场景

- **线性比例尺**：适用于处理连续的数值数据，如散点图的位置、柱状图的高度等。
- **对数比例尺**：适用于处理跨度很大的数据，如人口增长、股票价格等。
- **时间比例尺**：适用于处理时间数据，如时间序列图等。
- **序数比例尺**：适用于处理分类数据，如将分类映射到颜色、形状等。
- **带状比例尺**：适用于条形图等需要将分类数据映射到位置的场景。
- **点状比例尺**：适用于散点图等需要将分类数据映射到位置的场景。
- **阈值比例尺**：适用于根据阈值将连续数据分成不同的类别，如热力图等。
- **量化比例尺**：适用于将连续数据等分成不同的类别，如色阶图等。
- **分位数比例尺**：适用于根据数据分布将数据分成等频率的类别，如箱线图等。