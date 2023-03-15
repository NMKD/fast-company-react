/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";
const RadioField = ({ options, name, onChange, value, label }) => {
    const optionsArray =
        typeof options === "object"
            ? Object.keys(options).map((opt) => ({
                  name: options[opt].name,
                  value: options[opt].value
              }))
            : options;
    const handleChangeData = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <p className="mb-0 mt-3">
                <label className="form-label">{label}</label>
            </p>

            {optionsArray.map((opt) => (
                <div
                    key={opt.name + "_" + opt.value}
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={opt.name + "_" + opt.value}
                        value={opt.value}
                        checked={opt.value === value}
                        onChange={handleChangeData}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={opt.name + "_" + opt.value}
                    >
                        {opt.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RadioField;
