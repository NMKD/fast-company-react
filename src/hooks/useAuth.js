import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../service/user.service";
import localStorageService, { setToken } from "../service/localstorage.service";
import { randomInt } from "../utils/randomInt";

const AuthContext = React.createContext();

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [stateUserCurrent, setStateCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
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

    async function getAuthUser(id) {
        try {
            if (!id || typeof id === "object" || id === null) return;
            const { data } = await userService.getAuth(id);
            setLoading(false);
            setStateCurrentUser(data.content);
        } catch (e) {
            if (
                e.response.status === 401 &&
                e.response.statusText === "Unauthorized"
            ) {
                toast.error("Неавторизованный пользователь");
            }
            setLoading(false);
            console.error(e.response);
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setToken(data);
            await createUser({
                _id: data.localId,
                email,
                password,
                completedMeetings: randomInt(0, 100),
                rate: randomInt(1, 5),
                ...rest
            });
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.error(e.response);
            const err = e.response.data.error;
            if (err.code === 400 && err.message === "EMAIL_EXISTS") {
                toast.error("Пользователь с таким email уже существет");
            } else {
                toast.error(e.message);
            }
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            if (data) {
                setLoading(false);
                setToken(data);
                getAuthUser(data.idToken);
                toast.success("Добро пожаловать в сервис");
            }
        } catch (e) {
            setLoading(false);
            console.error(e.response);
            const err = e.response.data.error;
            if (err.code === 400 && err.message === "EMAIL_EXISTS") {
                toast.error("Email введен неверно");
            } else if (err.code === 400 && err.message === "INVALID_PASSWORD") {
                toast.error("Пароль введен неверно");
            } else {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        if (stateUserCurrent !== null) return;
        if (localStorageService.getAccessToken()) {
            getAuthUser(localStorageService.getUserId());
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, signIn, stateUserCurrent }}>
            {!isLoading && children}
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
