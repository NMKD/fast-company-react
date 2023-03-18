import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../service/profession.service";

const ProfessionContext = React.createContext();

export const useProfessionContext = () => {
    return useContext(ProfessionContext);
};

const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState();
    const [isLoading, setLoading] = useState(true);
    const getProfession = (id) => professions.find((item) => item._id === id);

    useEffect(() => {
        async function fetchData() {
            const allProfessions = await professionService.fetchAll();
            if (typeof allProfessions !== "string") {
                const { data } = allProfessions;
                setProfessions(data.content);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(`Ошибка: ${allProfessions}`);
            }
        }
        fetchData();
    }, []);

    return (
        <ProfessionContext.Provider value={{ professions, getProfession }}>
            {isLoading ? "Loading" : children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProfessionProvider;
