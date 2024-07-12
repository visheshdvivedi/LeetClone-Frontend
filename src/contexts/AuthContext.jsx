import React from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const isAuthenticated = () => {
        return user != null;
    }

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;