import cookies from 'react-cookies'


//存储cookie
export function setToken(value){
    cookies.save('adminToken',value)
}

//获取cookie
export function getToken(value){
   return cookies.load('adminToken')
}


//存储username
export function setUsername(value){
    cookies.save('username',value)
}

//获取username
export function getUsername(value){
    return cookies.load('username')
}