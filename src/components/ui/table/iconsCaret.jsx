import React from "react";
import PropTypes from "prop-types";

const IconsCaret = ({ currentSort }) => {
    return (
        <>
            <i
                className={
                    "bi bi-caret-" +
                    (currentSort.order === "asc" ? "down-fill" : "up-fill")
                }
            ></i>
        </>
    );
};

IconsCaret.propTypes = {
    currentSort: PropTypes.object.isRequired
};

export default IconsCaret;
