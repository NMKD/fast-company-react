import React from "react";
import PropTypes from "prop-types";
import { useProfessionContext } from "../../../../hooks/useProfession";

const Profession = ({ id }) => {
    const { getProfession } = useProfessionContext();
    const data = getProfession(id);
    return <p>{data && data.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Profession;
