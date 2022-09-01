import http from "../http-common";
import UserType from "../types/UserActionType";
import UserLogin from "../types/LoginActionType";


const jwtToken = sessionStorage.getItem('jwttoken') || '';
const config = {
    headers:{
        "Content-type": "application/json",
        "Authorization": (jwtToken) ?  'Bearer ' + jwtToken : ''
    }
};

class UserSerice {
    login(data: UserLogin) {
        return http.post<Array<UserLogin>>("/users/login", data, config);
    }

    create(data: UserType) {
        return http.post<UserType>("/users/signup", data, config);
    }

    // update(data: UserType, id: any) {
    //     return http.put<any>(`/users/${id}`, data);
    // }

    // delete(id: any) {
    //     return http.delete<any>(`/users/${id}`);
    // }
}

export default new UserSerice();