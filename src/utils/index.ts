/**
 * 获取本地资源文件
 * @param filePath 文件名或者相对 /src/assets 的文件路径
 * @returns url
 */
export const resolveAssetFile = (filePath: string) => {
  const url = new URL(`/src/assets/${filePath}`, import.meta.url).href
  return url
}
/**
 * 若传入的 value 为布尔类型则取反，否则取默认值
 * @param value any
 * @param defaultVal 默认布尔值
 * @returns boolean
 */
export const invertIfBoolean = (value: unknown, defaultVal = true): boolean => {
  return typeof value === 'boolean' ? !value : defaultVal
}
