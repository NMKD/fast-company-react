import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import AddCommentForm from "./addCommentForm";
import CommentList from "./commentList";
import { orderBy } from "lodash";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState();
    const [users, setUsers] = useState([]);

    const getUserId = (name) => {
        const user = users.find(
            (item) => item.name.toLowerCase() === name.toLowerCase()
        );
        return user._id;
    };

    const handlSubmit = async (data) => {
        await api.comments.add({
            pageId: userId,
            userId: getUserId(data.name),
            content: data.content,
            created_at: JSON.stringify(new Date())
        });
        setComments(await api.comments.fetchCommentsForUser(userId));
    };

    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) => setComments(comments.filter((i) => i._id !== id)));
    };

    useEffect(() => {
        console.log("fetch to api/users/comments");
        async function fetchData() {
            try {
                setComments(await api.comments.fetchCommentsForUser(userId));
                setUsers(await api.users.fetchAll());
            } catch (error) {
                throw new Error(
                    "error when mounting the component Comments in ui/users/user, check the server requests to api/users/comments"
                );
            }
        }
        fetchData();
    }, []);

    const sortedComments = orderBy(comments, ["created-by"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    {users && (
                        <AddCommentForm onSubmit={handlSubmit} users={users} />
                    )}
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentList
                        comments={sortedComments}
                        onRemove={handleRemoveComment}
                    />
                </div>
            </div>
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string.isRequired
};

export default Comments;
