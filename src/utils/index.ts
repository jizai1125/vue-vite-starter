/**
 * 获取本地资源文件
 * @param filePath 文件名或者相对 /src/assets 的文件路径
 * @returns url
 */
export const resolveAssetFile = (filePath: string) => {
  const url = new URL(`/src/assets/${filePath}`, import.meta.url).href
  return url
}
