import React from 'react'

import { getMeDetailsService } from '../services/account';

import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom'

const GoogleLogin = () => {

    const navigate = useNavigate();
    const { login } = React.useContext(AuthContext);
    const [params, setParams] = useSearchParams();

    const performLogin = async () => {
        const resp = await getMeDetailsService();
        if (!resp.status) {
            alert(resp.json.message);
            navigate("/login");
        }
        else {
            login(resp.json);
            navigate("/dashboard");
        }
    }

    React.useEffect(() => {
        const access = params.get("access");
        const refresh = params.get("refresh");

        if (access && refresh) {
            localStorage.setItem("token", JSON.stringify({ access: access, refresh: refresh }));
            console.log("Email login access token:", access);
            performLogin();
        }
        else {
            alert("Tokens not provided");
        }
    }, []);

    return (
        <>Please wait for login process to complete...</>
    )
}

export default GoogleLogin