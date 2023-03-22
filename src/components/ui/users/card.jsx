import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "./avatar";
import { useAuthContext } from "../../../hooks/useAuth";

const Card = ({ user, pathName }) => {
    const { stateUserCurrent } = useAuthContext();
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    {stateUserCurrent._id === user._id && (
                        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <Link to={`${pathName}/edit`}>
                                <i className="bi bi-gear"></i>
                            </Link>
                        </button>
                    )}
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <Avatar />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">
                                {user.profession.name}
                            </p>
                            <div className="text-muted">
                                <i
                                    className="bi bi-caret-down-fill text-primary"
                                    role="button"
                                ></i>
                                <i
                                    className="bi bi-caret-up text-secondary"
                                    role="button"
                                ></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Card.propTypes = {
    user: PropTypes.object,
    pathName: PropTypes.string
};

export default Card;
