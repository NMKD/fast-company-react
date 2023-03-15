import React from "react";
import { useParams } from "react-router-dom";
import UserProvider from "../../hooks/useUsers";
import User from "../ui/users/user";
import UsersList from "../ui/users/usersList";

const Users = () => {
    const { id } = useParams();
    return (
        <UserProvider>{id ? <User userId={id} /> : <UsersList />}</UserProvider>
    );
};

export default Users;
