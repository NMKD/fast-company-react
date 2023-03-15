import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, col) => {
        const component = columns[col].component;
        if (component && typeof component === "function") {
            return component(item);
        }
        return _.get(item, columns[col].path);
    };
    return (
        <>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {Object.keys(columns).map((col) => (
                            <td key={col}>{renderContent(item, col)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
};

TableBody.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
