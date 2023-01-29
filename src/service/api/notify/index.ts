import { request } from '@/service'

export const getNotify = ():Promise<any> => {
    return request.get({
        url:'/notify'
    })
}
export const createNotify = (notify:string):Promise<any> => {
    return request.post({
        url:'/notify',
        data:{
            notify
        }
    })
}
export const deleteNotify = (id:string):Promise<any> => {
    return request.delete({
        url:'/notify',
        data:{
            id
        }
    })
}

export const updateNotify = (id:string,notify:string):Promise<any> => {
    return request.post({
        url:'/notify/update',
        data:{
            id,
            notify
        }
    })
}