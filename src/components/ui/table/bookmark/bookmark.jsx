import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ id, status, toogle }) => {
    return (
        <>
            <button
                onClick={() => toogle(id)}
                className={"btn " + (!status ? " btn-primary" : "btn-success")}
            >
                <i className={"bi bi-bookmark" + (status ? "-fill" : " ")}></i>
                {status}
            </button>
        </>
    );
};

BookMark.propTypes = {
    id: PropTypes.string,
    status: PropTypes.bool,
    toogle: PropTypes.func
};

export default BookMark;
