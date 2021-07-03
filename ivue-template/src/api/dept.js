import request from '@/utils/request'

export function getDeptDetail() {
  return request({
    url: '/sys/config/dept/getDeptDetail',
    method: 'get'
  })
}

export function getAllDept() {
  return request({
    url: '/sys/config/dept/getAll',
    method: 'get'
  })
}

export function updateDept(data) {
  return request({
    url: '/sys/config/dept/update',
    method: 'post',
    data
  })
}

export function deleteDept(data) {
  return request({
    url: '/sys/config/dept/delete',
    method: 'post',
    data
  })
}

export function addDept(data) {
  return request({
    url: '/sys/config/dept/add',
    method: 'post',
    data
  })
}
