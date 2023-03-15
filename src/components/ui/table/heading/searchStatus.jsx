import React from "react";
import PropTypes from "prop-types";
import findNumber from "../../../../utils/binarySearch";
const SearchStatus = ({ length }) => {
    const numbers = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44];
    const renderPhrase = (number) => {
        return findNumber(numbers, number)
            ? `${number} человека тусанут с тобой сегодня`
            : `${number} человек тусанет с тобой сегодня`;
    };
    return (
        <button
            className={"btn " + (length === 0 ? "btn-danger" : "btn-primary")}
        >
            {length > 0 ? renderPhrase(length) : "Никто с тобой не тусанет"}
        </button>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
