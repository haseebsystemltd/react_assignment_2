import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth({ authenticatedUser, authUser, children }) {

    let navigate = useNavigate();

    useEffect(() => {
        if (authUser === "allowed" && !authenticatedUser) {
          navigate("/login");
        }
    
        if (authUser === "not-allowed" && authenticatedUser) {
          navigate("/dashboard");
        }

    }, [authenticatedUser, authUser]);

    if ((authUser === "allowed" && !authenticatedUser) || (authUser === "not-allowed" && authenticatedUser)) {
        return null; // Render nothing while navigating
    }
    
    return <>{children}</>;

}

export default Auth;