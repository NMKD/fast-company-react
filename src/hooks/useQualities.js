import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../service/quality.service";

const QualitiesContext = React.createContext();

export const useQualitiesContext = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const [stateQualities, setQualities] = useState();
    const [isLoading, setLoading] = useState(true);
    const getQualities = (qualities) => {
        const arrayQualities = [];
        qualities.forEach((id) => {
            stateQualities.forEach((item) => {
                if (item._id === id) {
                    arrayQualities.push(item);
                }
            });
        });
        return arrayQualities;
    };

    useEffect(() => {
        async function fetchData() {
            const allQualities = await qualityService.fetchAll();
            if (typeof allQualities !== "string") {
                const { data } = allQualities;
                setQualities(data.content);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(`Ошибка: ${allQualities}`);
            }
        }
        fetchData();
    }, []);

    return (
        <QualitiesContext.Provider value={{ stateQualities, getQualities }}>
            {!isLoading && children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualitiesProvider;
