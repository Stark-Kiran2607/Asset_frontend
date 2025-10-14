import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");

        navigate("/signin", { replace: true });
    }, [navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h4>Signing out...</h4>
        </div>
    );
};

export default SignOut;
