import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../service/user.service";
import { toast } from "react-toastify";
const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const getUser = (id) => users.find((item) => item._id === id);

    const toogleBookmark = (id) => {
        setUsers(
            users.map((user) => ({
                ...user,
                bookmark:
                    user._id === id
                        ? (user.bookmark = !user.bookmark)
                        : user.bookmark
            }))
        );
    };

    useEffect(() => {
        async function fetchData() {
            const allUsers = await userService.fetchAll();
            if (typeof allUsers !== "string") {
                const { data } = allUsers;
                setUsers(data.content);
            } else {
                toast.error(`Ошибка: ${allUsers}`);
            }
        }
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ users, getUser, toogleBookmark }}>
            {users.length > 0 ? (
                children
            ) : (
                <h1>Hello! Waiting for loading...</h1>
            )}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
