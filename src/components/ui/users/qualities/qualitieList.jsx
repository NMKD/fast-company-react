import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useQualitiesContext } from "../../../../hooks/useQualities";

const QualitieList = ({ qualities }) => {
    const { getQualities } = useQualitiesContext();
    const data = getQualities(qualities);
    return (
        <>
            <p className="card-text">
                {data &&
                    data.map((q) => <Qualitie key={q.color + q.name} {...q} />)}
            </p>
        </>
    );
};
QualitieList.propTypes = {
    qualities: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string)
    ])
};

export default QualitieList;
