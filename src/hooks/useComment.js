import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import commentService from "../service/coment.service";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuth";
import { useParams } from "react-router-dom";

const CommentsContext = React.createContext();

export const useCommentsContext = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
    const { id } = useParams();
    const [stateComments, setStateComments] = useState();
    const [isLoading, setLoading] = useState(true);
    const { stateUserCurrent } = useAuthContext();

    async function getSortedComment(id) {
        try {
            const { data } = await commentService.getSorted(id);
            setStateComments(data.content);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    const onSubmitForm = async (payload) => {
        try {
            await commentService.create({
                ...payload,
                created_at: Date.now(),
                _id: nanoid()
            });
            await getSortedComment(id);
            setLoading(false);
            toast.success("Сообщение отправлено");
        } catch (e) {
            console.error(e);
            setLoading(false);
            toast.error("Не удалось отправить сообщение, попробуйте позже");
        }
    };

    const onRemoveComment = async (id) => {
        setStateComments(stateComments.filter((item) => item._id !== id));
        try {
            await commentService.delete(id);
            toast.success("Сообщение удалено");
        } catch (e) {
            console.error(e);
            setLoading(false);
            toast.error("Не удалось удалить сообщение, попробуйте позже");
        }
    };

    useEffect(() => {
        if (stateUserCurrent !== null) {
            getSortedComment(id);
        }
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
