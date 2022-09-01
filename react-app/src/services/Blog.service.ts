import http from "../http-common";
import BlogType from "../models/Blog.type";


class BlogSerice {
    getAll() {
        return http.get<Array<BlogType>>("/posts/");
    }

    create(data: BlogType) {
        return http.post<BlogType>("/posts/", data);
    }

    update(data: BlogType, id: any) {
        return http.put<any>(`/posts/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/posts/${id}`);
    }
}

export default new BlogSerice();