import http from "../http-common";
import BlogType from "../types/BlogActionType";

const jwtToken = sessionStorage.getItem('jwttoken') || '';
const config = {
    headers:{
        "Content-type": "application/json",
        "Authorization": (jwtToken) ?  'Bearer ' + jwtToken : ''
    }
};


class BlogSerice {
    getAll() {
        return http.get<Array<BlogType>>("/posts/", config);
    }

    get(id: any) {
        return http.get<Array<BlogType>>(`/posts/${id}`, config);
    }

    create(data: BlogType) {
        return http.post<BlogType>("/posts/", data, config);
    }

    update(data: BlogType, id: any) {
        return http.patch<any>(`/posts/${id}`, data, config);
    }

    delete(id: any) {
        return http.delete<any>(`/posts/${id}`, config);
    }
}

export default new BlogSerice();