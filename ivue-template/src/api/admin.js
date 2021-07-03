import request from '@/utils/request'

export function pageQuery(current, pageSize) {
  return request({
    url: `/admin/page/${current}/${pageSize}`,
    method: 'get'
  })
}

export function getAll() {
  return request({
    url: `/admin/all`,
    method: 'get'
  })
}

export function deleteById(aid, rid) {
  return request({
    url: `/admin/role/delete/${aid}/${rid}`,
    method: 'get'
  })
}

export function addRelation(data) {
  return request({
    url: `/admin/role/addRelation`,
    method: 'post',
    data
  })
}

export function switchStatus(data) {
  return request({
    url: `/admin/switchStatus`,
    method: 'post',
    data
  })
}


