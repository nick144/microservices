import React, { useEffect, useState } from "react";
import BlogService from "../../services/Blog.service";
import BlogData from "../../models/Blog.type";


const Blogs = () => {
    const initValue = [{
        title: '',
        description: ''
    }];

    const [posts, setPosts] = useState<BlogData[]>(initValue);

    const postList = (posts) ? posts.map((post) => 
            <div key={post.id}>
                <h3 className="text-1xl font-semibold">{post.title}</h3>
                <p>{post.description}</p>
            </div>
        ) : '';

    useEffect(() => {
        BlogService.getAll().then(response => {
            if (!response.status) {
                return;
            }
            setPosts(response.data?.data);
        }, error => {
    
        })        
    }, []);


    
    
    return (
        <div className="Posts">
            <div className="px-5 py-5 my-20 max-w-3xl mx-auto space-y-6 border border-teal-400 rounded">
                <h1 className="text-3xl font-semibold">Blog</h1>
                { posts &&(postList) }
            </div>
        </div>
    )
};



export default Blogs;