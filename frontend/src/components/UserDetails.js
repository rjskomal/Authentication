import React, { useState } from 'react'
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

    return (
        <div>
            
            <h1>Welcome {userID?.username}</h1>
            
        </div>
    )
}

export default UserDetails;
