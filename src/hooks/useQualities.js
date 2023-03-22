import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadQualitiesList, getQualitiesState } from "../store/qualities";

const QualitiesContext = React.createContext();

export const useQualitiesContext = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const {
        entities: stateQualities,
        isLoading,
        error
    } = useSelector(getQualitiesState());
    const dispatch = useDispatch();

    const getQualities = (q) => {
        const arrayQualities = [];
        q.forEach((id) => {
            stateQualities.forEach((item) => {
                if (item._id === id) {
                    arrayQualities.push(item);
                }
            });
        });
        return arrayQualities;
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    });

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    return (
        <QualitiesContext.Provider value={{ stateQualities, getQualities }}>
            {isLoading ? "Loading" : children}
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
