import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [users, setUsers] = useState([]);
    const [flaggedPosts, setFlaggedPosts] = useState([]);
    const [view, setView] = useState("dashboard"); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
            .then(() => {
                toast.success("Logged out successfully");
                navigate("/");
            })
            .catch(() => {
                toast.error("Logout failed, please try again");
            });
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                const adminRes = await axios.get("http://localhost:5000/userdetails", { withCredentials: true });
                
                if (adminRes.data.role !== "admin") {
                    toast.error("Unauthorized access!");
                    navigate("/login"); 
                    return;
                }

                setAdminDetails(adminRes.data);

                const usersRes = await axios.get("http://localhost:5000/getAllUserDetails", { withCredentials: true });
                setUsers(usersRes.data.filter(user => user.role === "user"));

                const flaggedRes = await axios.get("http://localhost:5000/getFlaggedPosts", { withCredentials: true });
                setFlaggedPosts(flaggedRes.data);

                setLoading(false);
            } catch (err) {
                toast.error("Failed to fetch admin data.");
                navigate("/login");
            }
        };

        fetchAdminData();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.post("http://localhost:5000/deleteUser", { userId }, { withCredentials: true });
            setUsers(users.filter(user => user._id !== userId));
            toast.success("User deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete user.");
        }
    };

    const handleUnflag = async (postId) => {
        try {
            await axios.post("http://localhost:5000/unflagPost", { postId }, { withCredentials: true });
            setFlaggedPosts(flaggedPosts.filter(post => post._id !== postId));
            toast.success("Post unflagged!");
        } catch (err) {
            toast.error("Failed to unflag post.");
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.post("http://localhost:5000/deleteFlaggedPost", { postId }, { withCredentials: true });
            setFlaggedPosts(flaggedPosts.filter(post => post._id !== postId));
            toast.success("Post deleted!");
        } catch (err) {
            toast.error("Failed to delete post.");
        }
    };

    if (loading) {
        return <h2>Loading Admin Dashboard...</h2>;
    }

    return (
        <div className="admin-container">
            <h2>Welcome, {adminDetails?.username} (Admin)</h2>
            <button onClick={() => setView("dashboard")} className="btn">Admin Dashboard</button>
            <button onClick={() => setView("flagged")} className="btn">Review Flagged Posts</button>

            {view === "dashboard" ? (
                <div>
                    <h3>Manage Users</h3>
                    {users.length === 0 ? <p>No users found.</p> :
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>User ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user._id}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user._id)} className="delete-btn"> Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            ) : (
                <div>
                    <h3>Flagged Posts</h3>
                    {flaggedPosts.length === 0 ? <p>No flagged posts.</p> :
                        flaggedPosts.map(post => (
                            <div key={post._id} className="post-card">
                                <p><strong>{post.createdBy.username}:</strong> {post.text}</p>
                                <button onClick={() => handleUnflag(post._id)} className="btn">Unflag</button>
                                <button onClick={() => handleDeletePost(post._id)} className="delete-btn">Delete</button>
                            </div>
                        ))
                    }
                </div>
            )}
            <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
