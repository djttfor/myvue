import request from '@/utils/request'

//* *******************************************************************

export function getAllRole() {
  return request({
    url: '/sys/config/role/getAll',
    method: 'get'
  })
}

export function getMenuIdByRoleId(rid) {
  return request({
    url: `/sys/config/role/getMidByRid/${rid}`,
    method: 'get'
  })
}

export function deleteRole(rid) {
  return request({
    url: `/sys/config/role/del/${rid}`,
    method: 'get'
  })
}

export function updatePermission(data) {
  return request({
    url: `/sys/config/perm/updatePermission`,
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: `/sys/config/role/add`,
    method: 'post',
    data
  })
}
