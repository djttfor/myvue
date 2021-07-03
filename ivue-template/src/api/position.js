import request from '@/utils/request'

export function getAllPosition() {
  return request({
    url: `/sys/config/getAll`,
    method: 'get'
  })
}

export function addPosition(data) {
  return request({
    url: `/sys/config/add`,
    method: 'post',
    data
  })
}

export function updatePosition(data) {
  return request({
    url: `/sys/config/update`,
    method: 'post',
    data
  })
}

export function delPosition(id) {
  return request({
    url: `/sys/config/${id}`,
    method: 'get'
  })
}

export function delSelected(data) {
  return request({
    url: `/sys/config/selected`,
    method: 'post',
    data
  })
}
