import http from "../http-common";
import UserType from "../types/UserActionType";
import UserLogin from "../types/LoginActionType";


class UserSerice {
    login(data: UserLogin) {
        return http.post<Array<UserLogin>>("/users/login", data);
    }

    create(data: UserType) {
        return http.post<UserType>("/users/signup", data);
    }

    // update(data: UserType, id: any) {
    //     return http.put<any>(`/users/${id}`, data);
    // }

    // delete(id: any) {
    //     return http.delete<any>(`/users/${id}`);
    // }
}

export default new UserSerice();