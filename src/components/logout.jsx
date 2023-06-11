import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
    
    let navigate = useNavigate();

    useEffect(()=>{
        performLogout();
    }, [props]);

    const performLogout = ()=>{
        localStorage.removeItem('user');
        props.setAuthenticatedUser(false);
        
        navigate('/login');
    }

    return null;
}

export default Logout;