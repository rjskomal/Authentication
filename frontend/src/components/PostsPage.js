import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/getAllPosts", { withCredentials: true });
            setPosts(res.data);
        } catch (err) {
            toast.error("Failed to fetch posts");
        }
    };

    const createPost = async () => {
        if (!text.trim()) {
            toast.error("Post cannot be empty!");
            return;
        }
        try {
            await axios.post("http://localhost:5000/createPost", { text }, { withCredentials: true });
            toast.success("Post created!");
            setText("");
            fetchPosts();
        } catch (err) {
            toast.error("Failed to create post");
        }
    };

    const likePost = async (postId) => {
        try {
            await axios.post("http://localhost:5000/likePost", { postId }, { withCredentials: true });
            toast.success("Post liked!");
            fetchPosts();
        } catch (err) {
            toast.error("Failed to like post");
        }
    };

    const flagPost = async (postId) => {
        try {
            await axios.post("http://localhost:5000/flagPost", { postId }, { withCredentials: true });
            toast.success("Post flagged!");
            fetchPosts();
        } catch (err) {
            toast.error("Failed to flag post");
        }
    };

    return (
        <div className="posts-container">
            <UserDetails />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write something..."
                className="input-field"
            />
            <button onClick={createPost} className="btn">Post</button>

            <h3>All Posts</h3>
            {posts.length === 0 ? <p>No posts yet.</p> : posts.map(post => (
                <div key={post._id} className="post-card">
                    <p><strong>{post.createdBy.username}</strong> <br /> <br /> {post.text}</p>
                    <div className="post-actions">
                        <button onClick={() => likePost(post._id)} className="like-btn">❤️ {post.likes}</button>
                        <button onClick={() => flagPost(post._id)} className="flag-btn">🚩</button>
                    </div>
                </div>
            ))}
            <button onClick={() => navigate("/login")} className="btn">Logout</button>
        </div>
    );
};

export default PostsPage;
