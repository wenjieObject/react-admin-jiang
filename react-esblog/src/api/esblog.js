import service from '../utils/request'

export function getesblog(data) {
   return service.request({
        url: '/esblog/list',
        method: 'post',
        data: data , //适用于post、put
    });
}