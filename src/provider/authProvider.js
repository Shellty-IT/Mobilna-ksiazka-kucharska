import React, { useState } from "react";
import { authMethods } from "../firebase/authMethods";

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);

    const handleSignUp = () => {
        authMethods.signup(inputs.email, inputs.password, setToken, setErrors);
    };

    const handleSignIn = () => {
        authMethods.signin(inputs.email, inputs.password, setToken, setErrors);
    };

    return (
        <firebaseAuth.Provider
            value={{
                handleSignUp,
                handleSignIn,
                inputs,
                setInputs,
                errors,
                token,
            }}
        >
            {props.children}
        </firebaseAuth.Provider>
    );
};

export default AuthProvider;