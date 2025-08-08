const API_CHECK_LOGIN_FB = '/fb-login'
import Client from '../Client';
export const LoginFBService = {
    checkUserHashInSystem(dataFB){
        return Client.post(API_CHECK_LOGIN_FB , dataFB)
    },
    completeInfo (id ,data){
        return Client.post(`/${id}/complete-register` , data)
    },
    updateUser(data){
        return Client.post(`/me` , data)
    },
    getUser(){
        return Client.get(`/me`)
    },
    disconnectFb(){
        return Client.post(`/disconnect-fb`)
    }
}