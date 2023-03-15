import React from "react";
import PropTypes from "prop-types";
import IconsCaret from "./iconsCaret";

const TableHeader = ({ currentSort, onSort, columns }) => {
    const columnsToArray = Object.values(columns);

    const getActiveColumn = (currentSort, currentPath) => {
        if (currentPath === null) return;
        if (currentSort.path === currentPath) {
            return <IconsCaret {...{ currentSort }} />;
        }
    };

    const handleSort = (currentPath) => {
        if (currentPath === null) return;
        onSort({
            path: currentPath,
            order: currentSort.order === "asc" ? "desc" : "asc"
        });
    };

    return (
        <>
            <thead>
                <tr>
                    {columnsToArray.map((col, i) => (
                        <th
                            key={`${col.path}-${i}`}
                            onClick={
                                col.path ? () => handleSort(col.path) : null
                            }
                            {...{ role: col.path && "button" }}
                            scope="col"
                        >
                            {col.name}
                            {getActiveColumn(currentSort, col.path)}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
};

TableHeader.propTypes = {
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
