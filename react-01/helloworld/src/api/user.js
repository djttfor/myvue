import service from '../util/axios'

export function hello() {
    return service({
        url: '/hello',
        method: 'get'
    })
}