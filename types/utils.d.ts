declare namespace Utils {
  // 属性变为可选，值可为 undefined / null
  type PartialNullable<T, NotNullK extends keyof T = ''> = {
    [K in keyof T]?: K extends NotNullK ? T[K] : T[K] | null
  }
}
