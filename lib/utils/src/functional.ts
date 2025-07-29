export function identity<T>(x: T): T {
  return x
}

/**
 * 从右到左组合函数
 * @param fns 函数数组
 * @returns 组合后的函数
 */
export function compose<T extends any[], R>(): (x: R) => R
export function compose<T extends any[], A, R>(f1: (a: A) => R): (x: A) => R
export function compose<T extends any[], A, B, R>(f1: (b: B) => R, f2: (a: A) => B): (x: A) => R
export function compose<T extends any[], A, B, C, R>(f1: (c: C) => R, f2: (b: B) => C, f3: (a: A) => B): (x: A) => R
export function compose<T extends any[], A, B, C, D, R>(
  f1: (d: D) => R,
  f2: (c: C) => D,
  f3: (b: B) => C,
  f4: (a: A) => B
): (x: A) => R
export function compose<T extends any[], A, B, C, D, E, R>(
  f1: (e: E) => R,
  f2: (d: D) => E,
  f3: (c: C) => D,
  f4: (b: B) => C,
  f5: (a: A) => B
): (x: A) => R
export function compose<A, R>(...fns: Array<(a: any) => any>): (x: A) => R {
  return fns.reduceRight((total, cur) => (x) => cur(total(x)), identity)
}

// 辅助类型：提取函数参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never

// 辅助类型：提取函数返回值类型
type ReturnType<T> = T extends (...args: any) => infer R ? R : never

// 柯里化函数类型
type Curry<F extends (...args: any[]) => any> = <Args extends any[]>(
  ...args: Args['length'] extends 0
    ? []
    : Args['length'] extends Parameters<F>['length']
    ? Parameters<F>
    : Args extends [...infer A]
    ? A
    : never
) => Args['length'] extends 0
  ? Curry<F>
  : Args['length'] extends Parameters<F>['length']
  ? ReturnType<F>
  : Curry<(...args: DropFirst<Parameters<F>, Args['length']>) => ReturnType<F>>

// 辅助类型：从元组中删除前N个元素
type DropFirst<T extends any[], N extends number, I extends any[] = []> = I['length'] extends N
  ? T
  : T extends [any, ...infer Rest]
  ? DropFirst<Rest, N, [...I, any]>
  : []

/**
 * 将函数转换为柯里化函数
 * @param fn 要柯里化的函数
 * @returns 柯里化后的函数
 */
export function curry<F extends (...args: any[]) => any>(fn: F): Curry<F> {
  const arity = fn.length
  function curried(...args: any[]): any {
    if (args.length === 0) {
      return curried
    }
    if (args.length >= arity) {
      return fn(...args)
    }
    return curried.bind(null, ...args)
  }
  return curried as Curry<F>
}
