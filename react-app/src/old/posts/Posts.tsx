import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


function Posts() {
    const url = '/api/v1/posts/';
    const [posts, setPosts] = useState();
    const jwtToken = sessionStorage.getItem('jwttoken');
    useEffect(() => {
        axios.get(url, {
            headers: {
                "x-access-token": jwtToken
            }
        }).then(response => {
            if (!response.status) {
                return;
            }
            setPosts(response.data.data.posts);
        }, error => {
    
        })
    }, []);

    const postList = (posts) ? posts.map((post) => 
        <div>
        <h3 className="text-1xl font-semibold">{post.title}</h3>
        <p>{post.body}</p>
        </div>
    ) : '';

    return (
        <div className="Posts">
            <div className="px-5 py-5 my-20 max-w-3xl mx-auto space-y-6 border border-teal-400 rounded">
                <h1 className="text-3xl font-semibold">Blog</h1>
                { posts &&(postList) }
            </div>
            <Outlet context={[posts, setPosts]} />
        </div>
    )
}

export default Posts;