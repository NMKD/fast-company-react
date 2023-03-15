import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ color, name }) => {
    return <span className={`m-2 badge bg-${color}`}>{name}</span>;
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualitie;
