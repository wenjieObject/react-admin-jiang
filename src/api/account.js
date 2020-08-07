import service from '../../src/utils/request'

export function login(data) {
   return service.request({
        url: '/ssdi008/GetLoginInfo',
        method: 'post',
        //params: data, //适用于get、delete
        data: data , //适用于post、put
    });
}


export function getCode(data) {
    return service.request({
         url: '/tamtoolstype/gettamtoolstype',
         method: 'post',
         //params: data, //适用于get、delete
         data: data , //适用于post、put
     });
 }




