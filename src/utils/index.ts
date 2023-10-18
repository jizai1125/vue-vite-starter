import { Component, h, VNode } from 'vue'
import { NIcon } from 'naive-ui'
/**
 * 获取本地资源文件
 * @param filePath 文件名或者相对 /src/assets 的文件路径
 * @returns url
 */
export const resolveAssetFile = (filePath: string): string => {
  const url = new URL(`/src/assets/${filePath}`, import.meta.url).href
  return url
}

/**
 * 渲染图标组件/图片为 NIcon 组件
 * @param icon 图标组件 / 图片地址
 * @param props 图标组件 props / img 属性
 * @returns VNode
 */
export const renderNIcon = (icon: Component | string, props?: object): VNode => {
  let iconVNode: VNode
  if (typeof icon === 'string') {
    iconVNode = h('img', { src: icon, style: { width: '100%' }, ...props })
  } else {
    iconVNode = h(icon as Component)
  }
  return h(NIcon, props, { default: () => h(iconVNode) })
}

export const isPlainObject = (val: any) => Object.prototype.toString.call(val) === '[object Object]'
interface Option {
  label: string | number
  value: string | number
}
interface FieldConfig {
  label: string
  format: (value: any) => string
}

/**
 * 将字段配置转成统一格式选项 [{ a: 'a的值' }, ...] => [{label: 'a', value: 'a的值'}, ...]
 * @param fieldConf 字段 => 字段描述映射配置，例如：{ name: 'name 描述', { name: { label: '', format: value => 'xxx'}, ...}
 * @param valObj 数据对象，例如：{name: '姓名', ...}
 * @param excludeField 排除字段
 * @returns [{ label: 'xxx', value: 'xxx' }, ...]
 */
export const normalizeOptionByFieldConf = (
  fieldConf: Record<any, string | FieldConfig>,
  valObj: Record<any, any>,
  excludeField: string[] = []
): Array<Option> => {
  const option = Object.keys(fieldConf).reduce((acc: Option[], field) => {
    if (excludeField.includes(field)) return acc
    const confVal = fieldConf[field]
    const isObj = isPlainObject(confVal)
    const label = isObj ? (confVal as FieldConfig).label : (confVal as string)
    const value = isObj ? (confVal as FieldConfig).format(valObj[field]) : valObj[field]
    acc.push({
      label,
      value
    })
    return acc
  }, [])
  return option
}

export function normalizeOptions(
  valObj: Record<string, any>,
  labelField = 'label',
  valueField = 'value'
) {
  return Object.keys(valObj).reduce((acc, key) => {
    acc.push({
      [labelField]: key,
      [valueField]: valObj[key]
    })
    return acc
  }, [] as any[])
}
