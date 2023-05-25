import { type UploadFileInfo } from 'naive-ui'

// 上传成功后的文件信息
export interface UploadedFileInfo extends UploadFileInfo {
  // 接口响应数据
  response?: { id: number; fileName: string; ossUrl: string; [k: string]: any }
}
