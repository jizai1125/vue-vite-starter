declare namespace Utils {
  // 使值可为 undefined / null
  type PartialNullable<T, NotNullK extends keyof T = ''> = {
    [K in keyof T]?: K extends NotNullK ? T[K] : T[K] | null
  }
}
