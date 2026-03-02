import React, { createContext, useContext, useState, useEffect } from "react";
import { attachAuthListener } from "../firebase/authMethods";

const AuthContext = createContext();

export const authStates = {
    INITIAL_VALUE: "unknown",
    LOGGED_IN: "logged_in",
    LOGGED_OUT: "logged_out",
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

const AuthProvider = ({ children }) => {
    console.log("AuthProvider mounted");

    const [user, setUser] = useState(null);
    const [authState, setAuthState] = useState(authStates.INITIAL_VALUE);

    useEffect(() => {
        console.log("AuthProvider useEffect - attaching listener");
        const unsubscribe = attachAuthListener((currentUser) => {
            console.log("Auth state changed:", currentUser ? "logged in" : "logged out");
            setUser(currentUser);
            setAuthState(
                currentUser ? authStates.LOGGED_IN : authStates.LOGGED_OUT
            );
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        authState,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;