import React from "react";
import PropTypes from "prop-types";
import TableBody from "../table/tableBody";
import TableHeader from "../table/tableHeader";

const Table = ({ currentSort, onSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ currentSort, onSort, columns }} />
                    <TableBody {...{ data, columns }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    currentSort: PropTypes.object,
    onSort: PropTypes.func,
    columns: PropTypes.object,
    children: PropTypes.array
};

export default Table;
