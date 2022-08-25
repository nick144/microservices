import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogService from "../../services/Blog.service";

const DeleteBlog = () => {
    const params = useParams();
    const postId = params.id;
    const nav = useNavigate();

    useEffect(() => {
        if (!postId) {
          return;
        }
        
        BlogService.delete(postId);
        nav("/blogs");
      }, []);

}

export default DeleteBlog;