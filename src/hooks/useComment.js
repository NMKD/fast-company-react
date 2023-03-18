import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import commentService from "../service/coment.service";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuth";

const CommentsContext = React.createContext();

export const useCommentsContext = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
    const [stateComments, setStateComments] = useState();
    const [isLoading, setLoading] = useState(true);
    const { stateUserCurrent } = useAuthContext();
    const onSubmitForm = async (payload) => {
        try {
            const { data } = await commentService.create({
                ...payload,
                created_at: new Date(),
                _id: nanoid()
            });
            setLoading(false);
            setStateComments(data.content);
            toast.success("Сообщение отправлено");
            console.log(data);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error("Не удалось отправить сообщение, попробуйте позже");
        }
    };

    const onRemoveComment = (id) => {
        console.log(id);
        setStateComments(stateComments.filter((item) => item._id !== id));
    };

    async function getComments(userId) {
        const allComments = await commentService.get(userId);
        if (typeof allComments !== "string") {
            const { data } = allComments;
            setStateComments(data.content);
            setLoading(false);
        } else {
            setLoading(false);
            toast.error(`Ошибка: ${allComments}`);
        }
    }

    useEffect(() => {
        getComments(stateUserCurrent._id);
    }, []);

    return (
        <CommentsContext.Provider
            value={{
                stateComments,
                onSubmitForm,
                onRemoveComment
            }}
        >
            {isLoading ? "loading.." : children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CommentsProvider;
