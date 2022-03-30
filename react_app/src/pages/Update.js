import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Create from "./Create";

function Update() {
    const [post, setPost] = useState();
    const { id } = useParams();
    const navigate = useNavigate();


    const fetchPost = async () => {
        const res = await axios.get(`/post/${id}/`);
        setPost(res.data);
        console.log(res.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await axios.patch(`/post/${id}/`, {
            title: data.get('title'),
            content: data.get('content'),
        });
        navigate('/');
    }

    useEffect(() => {
        fetchPost();
    }, [])

    if (!post) return <div>로딩중</div>

    return (
        <Create
            onSubmit={handleSubmit}
            title={post.title}
            content={post.content}
        />
    );
}

export default Update;