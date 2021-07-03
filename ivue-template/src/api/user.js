import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function test1() {
  return request({
    url: '/emp/adv',
    method: 'get'
  })
}

export function test2() {
  return request({
    url: '/emp/adv',
    method: 'get'
  })
}
