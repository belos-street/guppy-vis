type Point = [number, number]
type TransformerFn = (point: Point) => Point
type Transformer = TransformerFn & {
  type: () => string
}

/**
 * 创建一个带类型标识的坐标变换函数
 * @param type 变换类型的名称
 * @param transformer 执行坐标变换的函数
 * @returns 带有类型信息的变换函数
 */
function transform(type: string, transformer: TransformerFn): Transformer {
  const transformerWithType = transformer as Transformer
  transformerWithType.type = () => type
  return transformerWithType
}

/**
 * 创建一个转置变换函数，交换 x 和 y 坐标
 * @returns 转置变换函数，将点 [x, y] 变换为 [y, x]
 */
export function transpose(): Transformer {
  return transform('transpose', ([px, py]: Point): Point => [py, px])
}

/**
 * 创建一个平移变换函数
 * @param tx x轴方向的平移距离，默认为0
 * @param ty y轴方向的平移距离，默认为0
 * @returns 平移变换函数，将点 [x, y] 变换为 [x + tx, y + ty]
 */
export function translate(tx: number = 0, ty: number = 0): Transformer {
  return transform('translate', ([px, py]: Point): Point => [px + tx, py + ty])
}

/**
 * 创建一个缩放变换函数
 * @param sx x轴方向的缩放比例，默认为1
 * @param sy y轴方向的缩放比例，默认为1
 * @returns 缩放变换函数，将点 [x, y] 变换为 [x * sx, y * sy]
 */
export function scale(sx: number = 1, sy: number = 1): Transformer {
  return transform('scale', ([px, py]: Point): Point => [px * sx, py * sy])
}

/**
 * 创建一个关于原点的反射变换函数
 * @returns 反射变换函数，将点 [x, y] 变换为 [-x, -y]
 */
export function reflect(): Transformer {
  return transform('reflect', scale(-1, -1))
}

/**
 * 创建一个关于y轴的反射变换函数
 * @returns 反射变换函数，将点 [x, y] 变换为 [-x, y]
 */
export function reflectX(): Transformer {
  return transform('reflectX', scale(-1, 1))
}

/**
 * 创建一个关于x轴的反射变换函数
 * @returns 反射变换函数，将点 [x, y] 变换为 [x, -y]
 */
export function reflectY(): Transformer {
  return transform('reflectY', scale(1, -1))
}

/**
 * 创建一个极坐标到笛卡尔坐标的变换函数
 * @returns 极坐标变换函数，将极坐标点 [theta, radius] 变换为笛卡尔坐标点 [x, y]
 * 其中 x = radius * cos(theta), y = radius * sin(theta)
 */
export function polar(): Transformer {
  return transform('polar', ([theta, radius]: Point): Point => {
    const x = radius * Math.cos(theta)
    const y = radius * Math.sin(theta)
    return [x, y]
  })
}
