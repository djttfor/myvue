import request from '@/utils/request'

export function pageQuery(current, pageSize) {
  return request({
    url: `/emp/basic/page/${current}/${pageSize}`,
    method: 'get'
  })
}

export function addEmp(){
  return request({
    url: `/emp/basic/add`,
    method: 'post'
  })
}
