import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import userService from "../service/user.service";
import { toast } from "react-toastify";
import userService from "../service/user.service";
import { setToken } from "../service/localstorage.service";

const AuthContext = React.createContext();
const http = axios.create();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [stateUserCurrent, setStateCurrentUser] = useState();

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
