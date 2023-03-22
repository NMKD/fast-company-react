import React from "react";
import PropTypes from "prop-types";
import AddCommentForm from "./addCommentForm";
import CommentList from "./commentList";
import { orderBy } from "lodash";
import { useCommentsContext } from "../../../hooks/useComment";
import { useAuthContext } from "../../../hooks/useAuth";

const Comments = ({ paramId }) => {
    const { stateUserCurrent } = useAuthContext();
    const { stateComments, onSubmitForm, onRemoveComment } =
        useCommentsContext();

    const handlSubmit = async (data) => {
        await onSubmitForm({
            ...data,
            pageId: paramId,
            userId: stateUserCurrent._id
        });
    };

    const handleRemoveComment = (id) => {
        onRemoveComment(id);
    };

    const sortedComments = orderBy(stateComments, ["created-by"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    {paramId && <AddCommentForm onSubmit={handlSubmit} />}
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
    paramId: PropTypes.string.isRequired
};

export default Comments;
