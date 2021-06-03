import request from '@/utils/request'

// api地址
const api = {
  image: 'upload/image',
  upload: 'wxapp/appInfo'
}

// 图片上传
export const image = (files) => {
  // 文件上传大小, 2M
  const maxSize = 1024 * 1024 * 6
  // 执行上传
  return new Promise((resolve, reject) => {
    request.urlFileUpload({ files, maxSize })
      .then(result => {
        const fileIds = result.map(item => {
          return item.data.fileInfo.file_id
        })
        resolve(fileIds, result)
      })
      .catch(err => reject(err))
  })
}

// app更新
export const upload = (param, option) => {
  return request.post(api.upload, param)
}
