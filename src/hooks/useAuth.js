import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import userService from "../service/user.service";
import { toast } from "react-toastify";
import userService from "../service/user.service";

const AuthContext = React.createContext();
const http = axios.create();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const TOKEN_KYE = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

const AuthProvider = ({ children }) => {
    const [stateUserCurrent, setStateCurrentUser] = useState();
    function setToken({ expiresIn = 3600, idToken, refreshToken }) {
        const expiresDate = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem(TOKEN_KYE, idToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(EXPIRES_KEY, expiresDate);
    }
    async function createUser(data) {
        const content = await userService.create(data);
        if (typeof content !== "string") {
            setStateCurrentUser(content.data.content);
        }
        console.log(stateUserCurrent);
    }
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await http.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setToken(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (e) {
            console.error(e);
            toast.error(e.message);
        }
    }

    return (
        <AuthContext.Provider value={{ signUp, stateUserCurrent }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
