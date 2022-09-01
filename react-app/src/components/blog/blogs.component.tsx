import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import PostReducer, { INITIAL_STATE } from "../../reducer/PostReducer";
import BlogService from "../../services/Blog.service";
import { ACTIONS_TYPES } from "../../types/PostActionType";


const Blogs = () => {
    const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);
    
    useEffect(() => {
        dispatch({ type: ACTIONS_TYPES.INIT });
        BlogService.getAll().then(response => {
            if (!response.status) {
                return;
            }
            dispatch({ type: ACTIONS_TYPES.FETCH_SUCCESS, payload: {
                post: response.data.data,
                success: 'Form submitted Sucessfully'
            } });
            
        }, error => {
            dispatch({
                type: ACTIONS_TYPES.FETCH_ERROR, payload: {
                    errorMsg: 'There was some error while fetching blog, please try again'
                }
            });
        })
    }, []);


    const postList = (state.posts) ? state.posts.map((post: any) => 
            <div key={post._id} className="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100 overflow-hidden">
                <h3 className="text-1xl font-semibold">
                    {post.title}
                    { (state.isLogin && post.userId === state.user.user_id) &&(
                        <span className="float-right">
                            <Link
                            to={`/blog/${post._id}`}
                            className="px-2 py-2 space-y-6">Edit</Link>
                            <Link 
                            to={`/blog/delete/${post._id}`}
                            className="px-2 py-2 space-y-6">delete</Link>
                        </span>
                    )}
                </h3>
                <p>{post.description}</p>
                <div className="clear-both"></div>                
            </div>
        ) : '';
    
    return (
        <div className="Posts">
            <div className="px-5 py-5 my-20 max-w-full mx-auto space-y-6 border border-teal-400 rounded flex flex-row flex-wrap">
                <div className="w-full py-3">
                    <h2 className="text-gray-800 text-2xl font-bold">
                        <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>Blog
                    </h2>
                </div>
                { state.posts &&(postList) }
            </div>
            {state.formError && (
                <h4 className="text-red-500 text-xs italic">{state.formError}</h4>
            )}
        </div>
    )
};



export default Blogs;