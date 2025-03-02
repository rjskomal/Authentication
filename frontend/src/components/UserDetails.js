import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserDetails() {
    const [userID , setUserID] = useState();
    const navigate = useNavigate();

    axios.get("http://localhost:5000/UserDetails",{withCredentials:true}).then((res)=>{
        setUserID(res.data);
    }).catch((err)=>{
        navigate('/login');
    })

    function handleLogout() {
        axios.post("http://localhost:5000/logout" ,{}, { withCredentials: true })
            .then(() => {
                toast.success("Logged out successfully");
                navigate("/"); 
            })
            .catch(err => {
                toast.error("Check your code once");
            });
    }

    return (
        <div>
            <h1>The user ID is {userID?._id}</h1>
            <button className='btn' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserDetails;
