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
        try {
            const res = await userService.create(data);
            setStateCurrentUser(res.data.content);
            toast.success("Пользователь успешно создан");
        } catch (e) {
            console.error(e);
            toast.error("Ошибка при создании нового пользователя");
        }
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
            await createUser({ _id: data.localId, email, password, ...rest });
        } catch (e) {
            console.error(e);
            const err = e.response.data.error;
            if (err.code === 400 && err.message === "EMAIL_EXISTS") {
                toast.error("Пользователь с таким email уже существет");
            } else {
                toast.error(e.message);
            }
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
