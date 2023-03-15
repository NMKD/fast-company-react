/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    defaulOption,
    name,
    options,
    onChange,
    value,
    error
}) => {
    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };

    const profession =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((opt) => ({
                  name: options[opt].name,
                  value: options[opt].value
              }))
            : options;

    const handleChangeData = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                id={name}
                className={getInputClasses()}
                onChange={handleChangeData}
                name={name}
                value={value}
            >
                <option disabled value="">
                    {defaulOption}
                </option>
                {profession &&
                    profession.map((prof) => (
                        <option
                            key={prof.name + "_" + prof.value}
                            value={prof.name}
                        >
                            {prof.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    defaulOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
