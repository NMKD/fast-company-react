import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "../users/avatar";
import api from "../../../api";
import { formstDate } from "../../../utils/formatDate";

const Comment = ({
    content,
    _id: id,
    userId,
    created_at: created,
    onRemove
}) => {
    const [user, setUser] = useState();
    useEffect(() => {
        console.log("fetch to api in component Comment");
        async function fetchData() {
            try {
                setUser(await api.users.getById(userId));
            } catch (error) {
                throw new Error(
                    "error when mounting the component Comment , check the server requests"
                );
            }
        }
        fetchData();
    }, []);
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar />
                        {user && (
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small mx-2">
                                                {formstDate(created)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    // edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onRemove: PropTypes.func
};

export default Comment;
