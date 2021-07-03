import request from '@/utils/request'

export function getMenu() {
  return request({
    url: `/sys/config/menu/getAll`,
    method: 'get'
  })
}
