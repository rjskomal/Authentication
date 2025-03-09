import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newUsername, setNewUsername] = useState("");
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
                
                const adminRes = await axios.get("http://localhost:5000/userdetails", { withCredentials: true });
                setAdminDetails(adminRes.data);

                
                const usersRes = await axios.get("http://localhost:5000/getAllUserDetails", { withCredentials: true });

                
                const filteredUsers = usersRes.data.filter(user => user.role === "user");
                setUsers(filteredUsers);
            } catch (err) {
                console.log("Error fetching data:", err.response?.data);
                toast.error("Failed to fetch data.");
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

    
    const handleUpdate = async (userId) => {
        try {
            await axios.post("http://localhost:5000/updateUser", { userId, newUsername }, { withCredentials: true });
            setUsers(users.map(user => user._id === userId ? { ...user, username: newUsername } : user));
            setEditingUserId(null);
            toast.success("Username updated!");
        } catch (err) {
            toast.error("Failed to update username.");
        }
    };

    return (
        <div className="admin-container">
            <h2>Welcome, {adminDetails?.username} (Admin)</h2>

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
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                
                                <td>
                                    {editingUserId === user._id ? (
                                        <input 
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                    {editingUserId === user._id ? (
                                        <button onClick={() => handleUpdate(user._id)}>Save</button>
                                    ) : (
                                        <button onClick={() => { setEditingUserId(user._id); setNewUsername(user.username); }}>
                                            ✏ Edit
                                        </button>
                                    )}
                                </td>

                                <td>{user.email}</td>
                                <td>{user._id}</td>

                                
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="delete-btn"> Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
