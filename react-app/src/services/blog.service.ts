import http from "../http-common";
import BlogType from "../models/Blog.type";


class BlogSerice {
    getAll() {
        return http.get<Array<BlogType>>("/post");
    }

    create(data: BlogType) {
        return http.post<BlogType>("/post", data);
    }

    update(data: BlogType, id: any) {
        return http.put<any>(`/post/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/post/${id}`);
    }
}

export default new BlogSerice();