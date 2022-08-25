import http from "../http-common";
import BlogType from "../types/BlogActionType";


class BlogSerice {
    getAll() {
        return http.get<Array<BlogType>>("/posts/");
    }

    get(id: any) {
        return http.get<Array<BlogType>>(`/posts/${id}`);
    }

    create(data: BlogType) {
        return http.post<BlogType>("/posts/", data);
    }

    update(data: BlogType, id: any) {
        return http.patch<any>(`/posts/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/posts/${id}`);
    }
}

export default new BlogSerice();