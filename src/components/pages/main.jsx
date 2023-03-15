import React from "react";
import useMockData from "../../service/mockData";
const Main = () => {
    const { error, status, initialize, progress } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container">
            <h3>Инициализация данных в Firebase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error !== null && <li>Error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
