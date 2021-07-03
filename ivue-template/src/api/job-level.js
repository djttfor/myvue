import request from '@/utils/request'

export function getAllJobLevel() {
  return request({
    url: `/sys/config/jobLevel/getAll`,
    method: 'get'
  })
}

export function addJobLevel(data) {
  return request({
    url: `/sys/config/jobLevel/add`,
    method: 'post',
    data
  })
}

export function updateJobLevel(data) {
  return request({
    url: `/sys/config/jobLevel/update`,
    method: 'post',
    data
  })
}

export function delJobLevel(id) {
  return request({
    url: `/sys/config/jobLevel/${id}`,
    method: 'get'
  })
}

export function delSelected(data) {
  return request({
    url: `/sys/config/jobLevel/selected`,
    method: 'post',
    data
  })
}
