import { request } from '@/service'

export const getSuggestionList = ():Promise<any> => {
    return request.get({
        url:'/suggestion'
    })
}