import React from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

    const isAuthenticated = () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token)
            return false;

        const decodedToken = jwtDecode(token.access);
        const currTime = Date.now() / 1000;
        return decodedToken.exp > currTime;
    }

    const login = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;