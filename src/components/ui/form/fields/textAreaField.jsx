import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ value, onChange, name, label, error }) => {
    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };
    const handleChangeData = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className={"mb-3"}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                className={getInputClasses()}
                id={name}
                value={value}
                onChange={handleChangeData}
                name={name}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
