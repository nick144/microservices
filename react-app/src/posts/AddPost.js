import React, { useMemo, useState } from "react";
import { useOutletContext } from 'react-router-dom';


function AddPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("Description");
    const [postOutlet, setPostOutlet] = useOutletContext();
    const jwtToken = sessionStorage.getItem('jwttoken');
    const isValid = useMemo(() => body.length != 0, [body]);
    
    const submit = (e) => {
        e.preventDefault();
        if (!isValid) {
            return false;
        }
        fetch("/api/v1/posts/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": jwtToken
            },
            mode:'cors',
            body: JSON.stringify({
                title: title,
                body: body
            })
        }).then((results) => {
            results.json().then((r) => {
                setPostOutlet([...postOutlet, r.data.post]);
            }, (e) => {
                throw e;
            });         
        }, (e) => {
            console.log(e);
        });

        setTitle("");
        setBody("");
    };

    return (
        <div className="AddPost">
            <form onSubmit={submit} className="px-5 py-5 my-20 max-w-3xl mx-auto space-y-6 border border-teal-400 rounded">
                <div>
                <h1 className="text-3xl font-semibold ">Add new Blog</h1>
                </div>
                { (isValid) ? "border-red-400" : "border-grey-400" }
                <div className="">
                    <div className="my-5">
                        <input type="text"
                            isRequired
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                            placeholder='Username'
                            className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
                        />
                    </div>
                    <div className="">
                        <textarea
                            validationState={ !isValid ? 'valid' : 'invalid'}
                            onChange={event => setBody(event.target.value)}
                            value={body}
                            className={`border ${ (isValid) ? "border-red-400" : "border-grey-400" } block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500 max-w-3xl`}>
                        </textarea>
                    </div>
                </div>
                <button className="px-10 py-1 text-white  bg-cyan-500 hover:bg-cyan-600 rounded-lg">Add Blog</button>
            </form>
        </div>
    )
}

export default AddPost;