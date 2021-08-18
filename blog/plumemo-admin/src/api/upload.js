import { axios } from '@/utils/request'

export function uploadFile (data) {
  return axios({
    url: '/file/file/v1/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

export function selectPage(data) {
  return axios({
    url: `/myImg/selectPage/${data.current}/${data.pageSize}/${data.imgType}`,
    method: 'get',
  })
}

export function removeImg(data) {
  return axios({
    url: `/myImg/removeImg/${data.id}`,
    method: 'get',
  })
}
