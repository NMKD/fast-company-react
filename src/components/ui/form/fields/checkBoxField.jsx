import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, errors }) => {
    const handleChange = () => {
        onChange({ name, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-label " + (errors ? "is-invalid" : "");
    };
    return (
        <div className="form-check mb-2 mt-3">
            <input
                className="form-check-input"
                type="checkbox"
                value={value}
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className={getInputClasses()} htmlFor={name}>
                {children}
            </label>
            {errors && <div className="invalid-feedback">{errors}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
    name: PropTypes.string,
    errors: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CheckBoxField;
