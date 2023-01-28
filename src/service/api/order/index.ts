import { request } from '@/service'


// 获取订单列表
export const getOrderList = (orderStatus:number,limit: number, offset: number): Promise<any> => {
    return request.get({
        url:'/order/all',
        params: {
            orderStatus,
            limit, offset
        }
    })
}

export const updateOrderStatus = (orderId: string, orderStatus: number):Promise<any> => {
    return request.post({
        url:"/order/pay",
        data:{
            orderId,
            orderStatus
        }
    })
}

export const deleteOrder = (orderId: string) :Promise<any> => {
    return request.delete({
        url:'/order',
        data:{
            orderId
        }
    })
}